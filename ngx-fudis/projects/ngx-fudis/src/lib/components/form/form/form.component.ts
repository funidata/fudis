import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  Host,
  Input,
  OnInit,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import { FudisHeadingSize, FudisHeadingLevel } from '../../../types/typography';
import { FudisIdService } from '../../../services/id/id.service';
import { HeaderDirective } from '../../../directives/content-projection/header/header.directive';
import { ActionsDirective } from '../../../directives/content-projection/actions/actions.directive';
import { ContentDirective } from '../../../directives/content-projection/content/content.directive';
import { GridApiDirective } from '../../../directives/grid/grid-api/grid-api.directive';
import { FudisBadgeVariant } from '../../../types/miscellaneous';
import { FudisFormErrorSummaryLink } from '../../../types/forms';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'fudis-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormComponent extends GridApiDirective implements OnInit, AfterContentInit {
  constructor(
    private _idService: FudisIdService,
    private _elementRef: ElementRef,
    @Host() @Optional() protected _dialogParent: DialogComponent,
  ) {
    super();
  }

  /**
   * Content directive for Fudis Form Actions
   */
  @ContentChild(ActionsDirective) headerActions: ActionsDirective;

  /**
   * Content directive for Fudis Form Header
   */
  @ContentChild(HeaderDirective) headerContent: HeaderDirective;

  /**
   * Content directive for Fudis Form Content
   */
  @ContentChild(ContentDirective) mainContent: ContentDirective;

  /**
   * Help text displayed in Error Summary before listing individual errors
   */
  @Input({ required: true }) errorSummaryHelpText: string;

  /**
   * Form id
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
  @Input() titleSize: FudisHeadingSize = 'xl';

  /**
   * Help text positioned under form title
   */
  @Input() helpText: string;

  /**
   * Optional badge to append to the form title
   */
  @Input() badge: FudisBadgeVariant | null;

  /**
   * Badge text
   */
  @Input() badgeText: string | null;

  /**
   * Set Error Summary visibility, usually set on click of form submit button
   */
  @Input() errorSummaryVisible: boolean = false;

  /**
   * Type of the clickable error link in Error Summary
   */
  @Input() errorSummaryLinkType: FudisFormErrorSummaryLink = 'router';

  /**
   * HTML FormElement
   */
  protected _formElement: HTMLFormElement | undefined;

  ngOnInit(): void {
    this._setFormId();

    if (this._dialogParent) {
      this._dialogParent.closeButtonPositionAbsolute = true;
    }
  }

  ngAfterContentInit(): void {
    this._formElement = this._elementRef.nativeElement as HTMLFormElement;
  }

  /**
   * Create unique id through Fudis Id Service
   */
  private _setFormId(): void {
    if (this.id) {
      this._idService.addNewId('form', this.id);
    } else {
      this.id = this._idService.getNewId('form');
    }
  }

  /**
   * Getter function for FormElement
   */
  public get formElement(): HTMLFormElement | undefined {
    return this._formElement;
  }
}
