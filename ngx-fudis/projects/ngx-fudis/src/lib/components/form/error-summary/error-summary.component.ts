import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
  signal,
} from '@angular/core';

import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';
import { FudisFormErrorSummaryObject } from '../../../types/errorSummary';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
})
export class ErrorSummaryComponent implements AfterViewInit {
  constructor(
    private _errorSummaryService: FudisInternalErrorSummaryService,
    protected _translationService: FudisTranslationService,
  ) {
    /**
     * Fetch and update current visible errors when reloadErrors() is called
     */
    _errorSummaryService.allFormErrorsObservable.pipe(takeUntilDestroyed()).subscribe((value) => {
      const errors = value?.[this.formId];

      if (
        this.parentComponent &&
        this.formId &&
        (_errorSummaryService.formIdToUpdate === this.formId ||
          _errorSummaryService.formIdToUpdate === 'all')
      ) {
        this._updateSummaryContent(errors);
      }
    });
  }

  @ViewChild('focusTarget') private _focusTarget: ElementRef;

  /**
   * Form parent element of this ErrorSummaryComponent
   */
  @Input({ required: true }) parentComponent: HTMLFormElement;

  /**
   * Help text displayed in Error Summary before listing individual errors
   */
  @Input({ required: true }) helpText: string;

  /**
   * Id of parent Form component
   */
  @Input({ required: true }) formId: string;

  /**
   * Visible errors
   */
  protected _visibleErrorList = signal<ErrorSummaryDOMListItem[]>([]);

  /**
   * Focus counter to hit the correct focus field
   */
  private _numberOfFocusTries: number = 0;

  /**
   * To enable clicking Error Summary links and then moving focus to corresponding form field. This was needed, as not all Fudis applications use Angular Router, so alternative approach was needed.
   *
   * @param event Original click event
   * @param clickedId Id of clicked link in Error Summary
   */
  protected handleErrorClick(event: Event, clickedId: string): void {
    event.preventDefault();

    const linkToFocus = this.parentComponent.querySelector(`#${clickedId}`) as HTMLInputElement;

    if (linkToFocus) {
      linkToFocus.focus();
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
   * Update Error Summary content with possible parent Fieldsets, Sections and Expandables (Sections)
   */
  private _updateSummaryContent(content: FudisFormErrorSummaryObject): void {
    const newErrorList: ErrorSummaryDOMListItem[] = [];

    const fieldsets: { [id: string]: string } =
      this._errorSummaryService.formStructure[this.formId].fieldsets;

    const sections: { [id: string]: string } =
      this._errorSummaryService.formStructure[this.formId].sections;

    Object.keys(content).forEach((item) => {
      const errorId = content[item].id;

      const { label } = content[item];

      Object.values(content[item].errors).forEach((error: string) => {
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

        newErrorList.push({
          id: errorId,
          message: `${parentSectionString}${parentFieldsetString}${label}: ${cleanedError}`,
          element: this.parentComponent.querySelector(`#${errorId}`),
        });
      });
    });

    this._visibleErrorList.set(newErrorList.sort(this._sortErrorOrder));

    if (this._errorSummaryService.focusToFormOnReload === this.formId) {
      this._focusToErrorSummary();
    }
  }

  /**
   * Move focus to Error Summary if errors are visible
   */
  private _focusToErrorSummary(): void {
    if (this._focusTarget && this._visibleErrorList().length > 0) {
      this._numberOfFocusTries = 0;
      (this._focusTarget.nativeElement as HTMLDivElement).focus();
    } else if (this._numberOfFocusTries < 20) {
      setTimeout(() => {
        this._numberOfFocusTries += 1;
        this._focusToErrorSummary();
      }, 100);
    }
  }

  ngAfterViewInit(): void {
    this._errorSummaryService.reloadErrorsByFormId(this.formId, true);
  }
}
