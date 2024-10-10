import {
  AfterViewInit,
  Component,
  ContentChild,
  effect,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  AfterContentInit,
} from '@angular/core';

import { ActionsDirective } from '../../../directives/content-projection/actions/actions.directive';
import { NotificationsDirective } from '../../../directives/content-projection/notifications/notifications.directive';
import { FudisGridWidth, FudisGridAlign } from '../../../types/grid';
import { FudisComponentChanges } from '../../../types/miscellaneous';
import { ContentDirective } from '../../../directives/content-projection/content/content.directive';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';
import { FudisFormErrorSummarySection, FudisInputSize } from '../../../types/forms';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisFocusService } from '../../../services/focus/focus.service';
import { BehaviorSubject } from 'rxjs';
import { TooltipApiDirective } from '../../../directives/tooltip/tooltip-api.directive';

@Component({
  selector: 'fudis-fieldset',
  templateUrl: './fieldset.component.html',
  styleUrls: ['./fieldset.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FieldSetComponent
  extends TooltipApiDirective
  implements AfterViewInit, OnInit, OnDestroy, OnChanges, AfterContentInit
{
  constructor(
    private _element: ElementRef,
    private _errorSummaryService: FudisInternalErrorSummaryService,
    private _focusService: FudisFocusService,
    private _translationService: FudisTranslationService,
    private _idService: FudisIdService,
  ) {
    super();
    effect(() => {
      this._requiredText.next(_translationService.getTranslations()().REQUIRED);
    });
  }

  /**
   * Content directive for Field Set Actions
   */
  @ContentChild(ActionsDirective) protected _headerActions: ActionsDirective | null;

  /**
   * Content directive for Field Set Notifications
   */
  @ContentChild(NotificationsDirective) protected _notifications: NotificationsDirective;

  /**
   * Content directive for Field Set Content
   */
  @ContentChild(ContentDirective) protected _content: ContentDirective;

  /**
   * Legend elementRef to trigger initialFocus
   */
  @ViewChild('fieldsetLegend') private _fieldsetLegend: ElementRef;

  /**
   * Label for the form component.
   */
  @Input({ required: true }) label: string;

  /**
   * Maximum width of Grid. When viewport gets narrower, grid automatically adjusts to lower sizes.
   * xxl = Default value. Viewports of 1600px and larger
   * xl = Viewports smaller than 1600px
   * lg = Viewports smaller than 1200px
   * md = Viewports smaller than 992px
   * sm = Viewports smaller than 768px
   * xs = Viewports smaller than 576px
   */
  @Input() width: FudisGridWidth = 'xxl';

  /**
   * Overrides 'width' input. Used to set Checkbox Group and Radio Button Group as wide as other basic form components.
   */
  @Input() inputSize: FudisInputSize;

  /**
   * Alignment of Grid component inside its parent
   */
  @Input() align: FudisGridAlign = 'start';

  /**
   * Set focus to Field Set when it appears first time
   */
  @Input() initialFocus: boolean = false;

  /**
   * Send information about current Field Set to Error Summary Service.
   * Error Summary Breadcrumb is the label of the current Field Set and is visible in the clickable link in Error Summary.
   */
  @Input() errorSummaryBreadcrumb: boolean = true;

  /**
   * Display "Required" text next to Field Set main label.
   */
  @Input() required: boolean | null;

  /**
   * Visual size of label legend. Default 'md' and 'sm' is similar to standard input label, used in e. g. RadioButtonGroup.
   */
  @Input() labelSize: 'md' | 'sm' = 'md';

  /**
   * Accessibility attribute for describing the whole Fieldset.
   * Used internally in CheckboxGroup.
   */
  @Input() describedbyId: string;

  /**
   * Fieldset id. If not provided when component is initialized, generated by Id Service
   */
  @Input() id: string;

  /**
   * Help text, aligned underneath the input.
   */
  @Input() helpText: string | undefined;

  /**
   * CSS classes for the native fieldset HTMLelement
   */
  protected _classes: string[];

  /**
   * Used to set visible focus on if focus event comes from Error Summary link.
   */
  protected _legendFocusVisible: boolean = false;

  /**
   * Has Field Set been added to Error Summary
   */
  private _fieldsetSent: boolean = false;

  /**
   * Field Set object to send to Error Summary
   */
  private _fieldsetInfo: FudisFormErrorSummarySection;

  private _parentForm: { id: string; errorSummaryVisible: boolean } | null = null;

  /**
   * Fudis translation key for required text
   */
  protected _requiredText = new BehaviorSubject<string>(
    this._translationService.getTranslations()().REQUIRED,
  );

  ngOnInit(): void {
    this._setFieldsetId();
    this._addToErrorSummary(this.label);
    this._setClasses();
  }

  ngAfterContentInit(): void {
    this._parentForm = this._errorSummaryService.getFormAncestor(this._element.nativeElement);

    this._addToErrorSummary(this.label);
  }

  ngAfterViewInit(): void {
    if (this.initialFocus && !this._focusService.isIgnored(this.id)) {
      this._fieldsetLegend?.nativeElement?.focus();
    }
  }

  ngOnChanges(changes: FudisComponentChanges<FieldSetComponent>): void {
    if (
      changes.label?.currentValue &&
      changes.label?.currentValue !== changes.label?.previousValue
    ) {
      this._addToErrorSummary(changes.label?.currentValue);
    }

    if (changes.inputSize?.currentValue !== changes.inputSize?.previousValue) {
      this._setClasses();
    }
  }

  ngOnDestroy(): void {
    this._removeFromErrorSummary();
  }

  protected _handleLegendBlur(): void {
    this._legendFocusVisible = false;
  }

  protected _handleFocus(event: FocusEvent): void {
    if (event.relatedTarget) {
      const elementHasLinkClass = (event.relatedTarget as HTMLElement).classList.contains(
        'fudis-link',
      );

      if (elementHasLinkClass) {
        this._legendFocusVisible = true;
        this._fieldsetLegend.nativeElement.focus();
      }
    }
  }

  /**
   * Add Field Set label to Error Summary
   */
  private _addToErrorSummary(label: string): void {
    if (this.errorSummaryBreadcrumb && this._parentForm) {
      this._fieldsetInfo = {
        id: this.id,
        formId: this._parentForm.id,
        title: label,
      };

      this._errorSummaryService.addFieldset(this._fieldsetInfo);

      this._fieldsetSent = true;
    }
  }

  /**
   * Remove Field Set label from Error Summary
   */
  private _removeFromErrorSummary(): void {
    if (this.errorSummaryBreadcrumb && this._fieldsetSent) {
      this._errorSummaryService.removeFieldset(this._fieldsetInfo);
    }
  }

  /**
   * Set CSS classes for native fieldset HTMLelement
   */
  private _setClasses(): void {
    if (this.inputSize) {
      this._classes = ['fudis-fieldset', `fudis-input-size__${this.inputSize}`];
    } else {
      this._classes = ['fudis-fieldset'];
    }
  }

  /**
   * Add or generate id with IdService
   */
  private _setFieldsetId(): void {
    if (this.id) {
      this._idService.addNewId('fieldset', this.id);
    } else {
      this.id = this._idService.getNewId('fieldset');
    }
  }
}
