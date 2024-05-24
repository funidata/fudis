import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  Host,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import { FudisHeadingVariant, FudisHeadingLevel } from '../../../types/typography';
import { FudisIdService } from '../../../services/id/id.service';
import { HeaderDirective } from '../../../directives/content-projection/header/header.directive';
import { ActionsDirective } from '../../../directives/content-projection/actions/actions.directive';
import { ContentDirective } from '../../../directives/content-projection/content/content.directive';
import { GridApiDirective } from '../../../directives/grid/grid-api/grid-api.directive';
import { FudisBadgeVariant } from '../../../types/miscellaneous';
import { FudisFormErrorSummaryLink } from '../../../types/forms';
import { DialogComponent } from '../../dialog/dialog.component';
import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';

@Component({
  selector: 'fudis-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormComponent extends GridApiDirective implements OnInit, AfterContentInit, OnDestroy {
  constructor(
    private _idService: FudisIdService,
    private _elementRef: ElementRef,
    private _errorSummaryService: FudisInternalErrorSummaryService,
    @Host() @Optional() protected _dialogParent: DialogComponent,
  ) {
    super();
  }

  /**
   * Content directive for Form Header Actions
   */
  @ContentChild(ActionsDirective) protected _headerActions: ActionsDirective;

  /**
   * Content directive for Form Header Content
   */
  @ContentChild(HeaderDirective) protected _headerContent: HeaderDirective;

  /**
   * Content directive for Form Main Content
   */
  @ContentChild(ContentDirective) protected _mainContent: ContentDirective;

  /**
   * Help text displayed in Error Summary before listing individual errors
   */
  @Input({ required: true }) errorSummaryHelpText: string;

  /**
   * Form id. If not given, id will be generated with IdService. Set only in component initialisation.
   */
  @Input() id: string;

  /**
   * Form title
   */
  @Input() title: string;

  /**
   * Heading level for the form title
   */
  @Input() titleLevel: FudisHeadingLevel;

  /**
   * Heading size for the form title
   */
  @Input() titleSize: FudisHeadingVariant = 'xl';

  /**
   * Help text positioned under form title
   */
  @Input() helpText: string;

  /**
   * Add badge to the form title
   */
  @Input() badge: FudisBadgeVariant | null;

  /**
   * Badge text
   */
  @Input() badgeText: string | null;

  /**
   * Set Error Summary visibility manually. Usually set true on form submit with Button binded with 'fudisFormSubmit' directive.
   */
  @Input() errorSummaryVisible: boolean = false;

  /**
   * Type of the clickable error link in Error Summary. If your App uses Angular Router, use default value 'router'. Otherwise use 'onClick'.
   */
  @Input() errorSummaryLinkType: FudisFormErrorSummaryLink = 'router';

  /**
   * HTML FormElement
   */
  protected _formElement: HTMLFormElement | undefined;

  ngOnInit(): void {
    this._setFormId();

    this._errorSummaryService.addNewFormId(this.id);

    if (this._dialogParent) {
      this._dialogParent.closeButtonPositionAbsolute = true;
    }
  }

  ngAfterContentInit(): void {
    this._formElement = this._elementRef.nativeElement as HTMLFormElement;
  }

  ngOnDestroy(): void {
    this._errorSummaryService.removeFormId(this.id);
  }

  /**
   * Add or generate id with IdService
   */
  private _setFormId(): void {
    if (this.id) {
      this._idService.addNewId('form', this.id);
    } else {
      this.id = this._idService.getNewId('form');
    }
  }
}
