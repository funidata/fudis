import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  Signal,
  ViewChild,
  effect,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';
import {
  FudisFormErrorSummaryObject,
  FudisFormErrorSummaryList,
  FudisFormErrorSummarySection,
  FudisFormErrorSummaryLink,
} from '../../../types/forms';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisTranslationConfig } from '../../../types/miscellaneous';

@Component({
  selector: 'fudis-error-summary',
  templateUrl: './error-summary.component.html',
  styleUrls: ['./error-summary.component.scss'],
})
export class ErrorSummaryComponent implements AfterViewInit {
  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _errorSummaryService: FudisInternalErrorSummaryService,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private _translationService: FudisTranslationService,
  ) {
    /**
     * Update translations on language change
     */
    effect(() => {
      this._translations = _translationService.getTranslations();

      this._attentionText = this._translations().ICON.ATTENTION;
    });
    /**
     * Fetch and update current visible errors when reloadErrors() is called
     */
    effect(() => {
      if (this.formId) {
        console.log('effect');
        const errors = _errorSummaryService.getFormErrorsById(this.formId)();

        this._updateSummaryContent(errors);
      }
    });
  }

  @ViewChild('focusTarget') private _focusTarget: ElementRef;

  /**
   * FieldSet parent element of this ErrorSummaryComponent
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
   * Type of the clickable error link
   */
  @Input() linkType: FudisFormErrorSummaryLink = 'router';

  /**
   * Additional text for screen readers added before help text. E.g. "Attention". Comparable for "alert" icon included in Error Summary.
   */
  protected _attentionText: string;

  /**
   * Fudis translations
   */
  protected _translations: Signal<FudisTranslationConfig>;

  /**
   * Visible errors
   */
  protected _visibleErrorList: FudisFormErrorSummaryList[] = [];

  /**
   * Focus counter to hit the correct focus field
   */
  private _numberOfFocusTries: number = 0;

  /**
   * Sort errors the same order they appear in the DOM
   */
  private _sortErrorOrder(a: FudisFormErrorSummaryList, b: FudisFormErrorSummaryList): 0 | -1 | 1 {
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
   * Update Error Summary content with possible parent Fieldsets, Sections and Expandabled (Sections)
   */
  private _updateSummaryContent(content: FudisFormErrorSummaryObject): void {
    const newErrorList: FudisFormErrorSummaryList[] = [];

    const fieldsets: FudisFormErrorSummarySection[] = this._errorSummaryService.getFieldsetList();

    const sections: FudisFormErrorSummarySection[] = this._errorSummaryService.getSectionList();

    Object.keys(content).forEach((item) => {
      const errorId = content[item].id;
      if (this.parentComponent?.querySelector(`#${errorId}`)) {
        const { label } = content[item];

        Object.values(content[item].errors).forEach((error: string) => {
          const parentFieldset = fieldsets.find((fieldset) => {
            if (this.parentComponent?.querySelector(`#${fieldset.id} #${errorId}`)) {
              return fieldset;
            }
            return null;
          });

          const parentSection = sections.find((section) => {
            if (this.parentComponent?.querySelector(`#${section.id} #${errorId}`)) {
              return section;
            }
            return null;
          });

          const parentSectionString = parentSection ? `${parentSection.title} / ` : '';

          const parentFieldsetString = parentFieldset ? `${parentFieldset.title} / ` : '';

          const cleanedError = error.replace(/[:!?]$/, '');

          newErrorList.push({
            id: errorId,
            message: `${parentSectionString}${parentFieldsetString}${label}: ${cleanedError}`,
            element: this._document.getElementById(errorId),
          });
        });
      }
    });

    if (this._document) {
      this._visibleErrorList = newErrorList.sort(this._sortErrorOrder);
      this._changeDetectorRef.detectChanges();

      if (this._errorSummaryService.focusToSummaryList) {
        this._focusToErrorSummary();
      }
    }
  }

  /**
   * Move focus to Error Summary if errors are visible
   */
  private _focusToErrorSummary(): void {
    if (this._focusTarget && this._visibleErrorList.length > 0) {
      this._numberOfFocusTries = 0;
      (this._focusTarget.nativeElement as HTMLDivElement).focus();
    } else if (this._numberOfFocusTries < 100) {
      setTimeout(() => {
        this._numberOfFocusTries += 1;
        this._focusToErrorSummary();
      }, 100);
    }
  }

  ngAfterViewInit(): void {
    this._errorSummaryService.reloadErrorsByFormId(this.formId);

    const errors = this._errorSummaryService.getFormErrorsById(this.formId)();

    this._updateSummaryContent(errors);
  }
}
