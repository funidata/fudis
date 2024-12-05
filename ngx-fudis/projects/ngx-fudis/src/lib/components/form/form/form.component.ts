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
  OnChanges,
  inject,
  Injector,
} from '@angular/core';
import { FudisHeadingVariant, FudisHeadingLevel } from '../../../types/typography';
import { FudisIdService } from '../../../services/id/id.service';
import { HeaderDirective } from '../../../directives/content-projection/header/header.directive';
import { ActionsDirective } from '../../../directives/content-projection/actions/actions.directive';
import { ContentDirective } from '../../../directives/content-projection/content/content.directive';
import { GridApiDirective } from '../../../directives/grid/grid-api/grid-api.directive';
import { FudisBadgeVariant, FudisComponentChanges } from '../../../types/miscellaneous';
import { DialogComponent } from '../../dialog/dialog.component';
import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { getHeadingVariant } from '../../../utilities/typography/typography-utils';

@Component({
  selector: 'fudis-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormComponent
  extends GridApiDirective
  implements OnInit, AfterContentInit, OnDestroy, OnChanges
{
  constructor(
    private _idService: FudisIdService,
    private _elementRef: ElementRef,
    private _errorSummaryService: FudisInternalErrorSummaryService,
    private _translationService: FudisTranslationService,
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
   * Title displayed in Error Summary before listing individual errors
   */
  @Input() errorSummaryTitle: string =
    this._translationService.getTranslations()().ERROR_SUMMARY.TITLE;

  /**
   * Form title
   */
  @Input({ required: true }) title: string;

  /**
   * Heading level for the form title
   */
  @Input({ required: true }) level: FudisHeadingLevel;

  /**
   * Form id. If not given, id will be generated with IdService. Set only in component initialisation.
   */
  @Input() id: string;

  /**
   * Heading variant for the form title
   */
  @Input() titleVariant: FudisHeadingVariant;

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
   * HTML FormElement
   */
  protected _formElement: HTMLFormElement | undefined;

  private _injector = inject(Injector);

  ngOnInit(): void {
    this._setFormId();

    if (!this.titleVariant) {
      this.titleVariant = getHeadingVariant(this.level);
    }

    this._errorSummaryService.registerNewForm(this.id, this.errorSummaryVisible);

    if (this._dialogParent) {
      this._dialogParent.closeButtonPositionAbsolute.set(true);
    }

    toObservable(this._errorSummaryService.errorSummaryVisibilityStatus[this.id], {
      injector: this._injector,
    }).subscribe((value) => {
      if (value !== this.errorSummaryVisible) {
        this.errorSummaryVisible = !this.errorSummaryVisible;
      }
    });
  }

  ngAfterContentInit(): void {
    this._formElement = this._elementRef.nativeElement as HTMLFormElement;
  }

  ngOnDestroy(): void {
    this._errorSummaryService.removeForm(this.id);
  }

  ngOnChanges(changes: FudisComponentChanges<FormComponent>): void {
    if (
      changes.errorSummaryVisible?.currentValue !== changes.errorSummaryVisible?.previousValue &&
      this.id
    ) {
      this._errorSummaryService.setErrorSummaryVisibility(this.id, this.errorSummaryVisible);
    }
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
