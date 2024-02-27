import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { FieldSetBaseDirective } from '../../../directives/form/fieldset-base/fieldset-base.directive';
import { ActionsDirective } from '../../../directives/content-projection/actions/actions.directive';
import { NotificationsDirective } from '../../../directives/content-projection/notifications/notifications.directive';
import { FudisGridWidth, FudisGridAlign } from '../../../types/grid';
import { FudisSpacing } from '../../../types/miscellaneous';
import { ContentDirective } from '../../../directives/content-projection/content/content.directive';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';
import { FudisFormErrorSummarySection, FudisInputSize } from '../../../types/forms';
import { FudisTranslationService } from '../../../services/translation/translation.service';

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
    _idService: FudisIdService,
    _translationService: FudisTranslationService,
    private _errorSummaryService: FudisInternalErrorSummaryService,
  ) {
    super(_idService, _translationService);
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
   * View for native fieldset HTMLelement
   */
  @ViewChild('fieldset') private _fieldset: ElementRef;

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
   * Error Summary Breadcrumb is the title of the current Field Set and is visible in the clickable link in Error Summary.
   */
  @Input() errorSummaryBreadcrumb: boolean = true;

  /**
   * Display "Required" text next to Field Set main title. By default set to 'undefined'.
   */
  @Input() required: boolean | undefined = undefined;

  /**
   * Visual size of title legend. Default 'md' and 'sm' is similar to standard input label, used in e. g. RadioButtonGroup.
   */
  @Input() titleSize: 'md' | 'sm' = 'md';

  /**
   * Title property to send to Error Summary Service
   */
  protected _title: string;

  /**
   * CSS classes for the native fieldset HTMLelement
   */
  protected _classes: string[];

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

    this._title = this.title;
    this._addToErrorSummary();
    this._setClasses();
  }

  ngAfterViewInit(): void {
    if (this.initialFocus) {
      this._fieldset.nativeElement.focus();
    }
  }

  ngOnChanges(): void {
    if (this.title !== this._title && this.id) {
      this._title = this.title;
      this._addToErrorSummary();
    }
    this._setClasses();
  }

  ngOnDestroy(): void {
    this._removeFromErrorSummary();
  }

  /**
   * Add Field Set title to Error Summary
   */
  private _addToErrorSummary(): void {
    if (this.errorSummaryBreadcrumb) {
      this._fieldsetInfo = {
        id: this.id,
        title: this._title,
      };

      this._errorSummaryService.addFieldset(this._fieldsetInfo);

      this._fieldsetSent = true;
    }
  }

  /**
   * Remove Field Set title from Error Summary
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
