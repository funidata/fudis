import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
  signal,
  OnInit,
  inject,
  Injector,
  Output,
  EventEmitter,
} from '@angular/core';

import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';
import { FudisErrorSummaryFormErrors } from '../../../types/errorSummary';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { NotificationComponent } from '../../notification/notification.component';

type ErrorSummaryDOMListItem = {
  id: string;
  message: string;
  element: HTMLElement | null;
};

@Component({
  selector: 'fudis-error-summary',
  templateUrl: './error-summary.component.html',
  styleUrls: ['./error-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ErrorSummaryComponent implements AfterViewInit, OnInit {
  constructor(
    private _errorSummaryService: FudisInternalErrorSummaryService,
    protected _translationService: FudisTranslationService,
  ) {}

  @ViewChild('focusTarget') private _focusTarget: NotificationComponent;

  /**
   * Form parent element of this ErrorSummaryComponent
   */
  @Input({ required: true }) parentComponent: HTMLFormElement;

  /**
   * Title text displayed in Error Summary before listing individual errors. If not provided, Fudis
   * will display its default helper title text
   */
  @Input() title: string;

  /**
   * Id of parent Form component
   */
  @Input({ required: true }) formId: string;

  @Output() handleUpdatedErrorList = new EventEmitter<{ id: string; message: string }[] | null>();

  /**
   * Visible errors
   */
  protected _visibleErrorList = signal<ErrorSummaryDOMListItem[]>([]);

  /**
   * Focus counter to hit the correct focus field
   */
  private _numberOfFocusTries: number = 0;

  /**
   * To enable clicking Error Summary links and then moving focus to corresponding form field. This
   * was needed, as not all Fudis applications use Angular Router, so alternative approach was
   * needed.
   *
   * @param event Original click event
   * @param clickedId Id of clicked link in Error Summary
   */
  protected handleErrorClick(event: Event, clickedId: string): void {
    event.preventDefault();

    const elementToFocus = this.parentComponent.querySelector(`#${clickedId}`) as
      | HTMLInputElement
      | HTMLDivElement;

    if (elementToFocus) {
      elementToFocus.focus();
    }
  }

  /**
   * Sort errors the same order they appear in the DOM
   */
  private _sortErrorOrder(a: ErrorSummaryDOMListItem, b: ErrorSummaryDOMListItem): 0 | -1 | 1 {
    if (a.id === b.id) {
      return 0;
    }

    if (a.element && b.element) {
      const position = a.element.compareDocumentPosition(b.element);

      if (
        position & Node.DOCUMENT_POSITION_FOLLOWING ||
        position & Node.DOCUMENT_POSITION_CONTAINED_BY
      ) {
        return -1;
      } else if (
        position & Node.DOCUMENT_POSITION_PRECEDING ||
        position & Node.DOCUMENT_POSITION_CONTAINS
      ) {
        return 1;
      }
    }
    return 0;
  }

  /**
   * Update Error Summary content with possible parent Fieldsets, Sections and Expandables
   * (Sections)
   */
  private _updateSummaryContent(content: FudisErrorSummaryFormErrors): void {
    const newErrorList: ErrorSummaryDOMListItem[] = [];

    const fieldsets: { [id: string]: string } =
      this._errorSummaryService.formStructure[this.formId].fieldsets;

    const sections: { [id: string]: string } =
      this._errorSummaryService.formStructure[this.formId].sections;

    Object.keys(content).forEach((errorId) => {
      Object.values(content[errorId]).forEach((error: string) => {
        const parentFieldset = Object.keys(fieldsets).find((fieldset) => {
          if (this.parentComponent?.querySelector(`#${fieldset} #${errorId}`)) {
            return fieldset;
          }
          return null;
        });

        const parentSection = Object.keys(sections).find((section) => {
          if (this.parentComponent?.querySelector(`#${section} #${errorId}`)) {
            return section;
          }
          return null;
        });

        const parentSectionString = parentSection ? `${sections[parentSection]} / ` : '';

        const parentFieldsetString = parentFieldset ? `${fieldsets[parentFieldset]} / ` : '';

        const cleanedError = error.replace(/[:!?]$/, '');

        const newItem: ErrorSummaryDOMListItem = {
          id: errorId,
          message: `${parentSectionString}${parentFieldsetString}${cleanedError}`,
          element: this.parentComponent.querySelector(`#${errorId}`),
        };

        newErrorList.push(newItem);
      });
    });

    const sortedList = newErrorList.sort(this._sortErrorOrder);

    this._visibleErrorList.set(sortedList);

    if (sortedList.length > 0) {
      const newOutputList: { id: string; message: string }[] = [];

      sortedList.forEach((item) => {
        newOutputList.push({ id: item.id, message: item.message });
      });

      this.handleUpdatedErrorList.emit(newOutputList);
    } else {
      this.handleUpdatedErrorList.emit(null);
    }

    if (this._errorSummaryService.focusToFormOnReload === this.formId) {
      this._focusToErrorSummary();
    }
  }

  /**
   * Move focus to Error Summary if errors are visible
   */
  private _focusToErrorSummary(): void {
    if (this._focusTarget?.articleElement && this._visibleErrorList().length > 0) {
      this._numberOfFocusTries = 0;
      this._focusTarget.focus();
    } else if (this._numberOfFocusTries < 20) {
      setTimeout(() => {
        this._numberOfFocusTries += 1;
        this._focusToErrorSummary();
      }, 100);
    }
  }

  private _injector = inject(Injector);

  ngOnInit(): void {
    /**
     * Fetch and update current visible errors when reloadErrors() is called
     */
    toObservable(this._errorSummaryService.errorsSignal[this.formId], {
      injector: this._injector,
    }).subscribe((value) => {
      this._updateSummaryContent(value);
    });
  }

  ngAfterViewInit(): void {
    this._focusToErrorSummary();
  }
}
