import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Host,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { FieldSetBaseDirective } from '../../../directives/form/fieldset-base/fieldset-base.directive';
import { ActionsDirective } from '../../../directives/content-projection/actions/actions.directive';
import { HeaderDirective } from '../../../directives/content-projection/header/header.directive';
import { FudisGridWidth, FudisGridAlign } from '../../../types/grid';
import { FudisComponentChanges, FudisSpacing } from '../../../types/miscellaneous';
import { ContentDirective } from '../../../directives/content-projection/content/content.directive';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';
import { FudisFormErrorSummarySection, FudisInputSize } from '../../../types/forms';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FormComponent } from '../form/form.component';
import { FudisFocusService } from '../../../services/focus/focus.service';

@Component({
  selector: 'fudis-fieldset',
  templateUrl: './fieldset.component.html',
  styleUrls: ['./fieldset.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FieldSetComponent
  extends FieldSetBaseDirective
  implements AfterViewInit, OnInit, OnDestroy, OnChanges
{
  constructor(
    @Host() @Optional() private _parentForm: FormComponent | null,
    private _errorSummaryService: FudisInternalErrorSummaryService,
    private _focusService: FudisFocusService,
    _translationService: FudisTranslationService,
    _idService: FudisIdService,
    _changeDetectorRef: ChangeDetectorRef,
  ) {
    super(_idService, _translationService, _changeDetectorRef);
  }

  /**
   * Content directive for Field Set Actions
   */
  @ContentChild(ActionsDirective) protected _headerActions: ActionsDirective | null;

  /**
   * Content directive for Field Set Notifications
   */
  @ContentChild(HeaderDirective) protected _headerContent: HeaderDirective;

  /**
   * Content directive for Field Set Content
   */
  @ContentChild(ContentDirective) protected _content: ContentDirective;

  /**
   * Legend elementRef to trigger initialFocus
   */
  @ViewChild('fieldsetLegend') private _fieldsetLegend: ElementRef;

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
   * Margin top for the Grid
   */
  @Input() marginTop: FudisSpacing = 'none';

  /**
   * Margin bottom for the Grid
   */
  @Input() marginBottom: FudisSpacing = 'none';

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
   * Display "Required" text next to Field Set main label. By default set to 'undefined'.
   */
  @Input() required: boolean | undefined = undefined;

  /**
   * Visual size of label legend. Default 'md' and 'sm' is similar to standard input label, used in e. g. RadioButtonGroup.
   */
  @Input() labelSize: 'md' | 'sm' = 'md';

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

  ngOnInit(): void {
    this._setFieldsetId();
    this._addToErrorSummary(this.label);
    this._setClasses();

    this._initFinished = true;
  }

  ngAfterViewInit(): void {
    if (this.initialFocus && !this._focusService.isIgnored(this.id)) {
      this._fieldsetLegend.nativeElement.focus();
    }
  }

  ngOnChanges(changes: FudisComponentChanges<FieldSetComponent>): void {
    if (this._initFinished) {
      if (changes.label?.currentValue) {
        this._addToErrorSummary(changes.label?.currentValue);
      }

      if (changes.inputSize) {
        this._setClasses();
      }
    }
  }

  ngOnDestroy(): void {
    this._removeFromErrorSummary();
  }

  protected _handleLegendFocus(event: FocusEvent): void {
    if (event.relatedTarget) {
      const elementHasLinkClass = (event.relatedTarget as HTMLElement).classList.contains(
        'fudis-link',
      );

      if (elementHasLinkClass) {
        this._legendFocusVisible = true;
      }
    }
  }

  protected _handleLegendBlur(): void {
    this._legendFocusVisible = false;
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
