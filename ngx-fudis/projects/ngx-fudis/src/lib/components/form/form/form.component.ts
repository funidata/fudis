import {
  Component,
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
import { GridApiDirective } from '../../../directives/grid/grid-api/grid-api.directive';
import { FudisBadgeVariant, FudisComponentChanges } from '../../../types/miscellaneous';
import { DialogComponent } from '../../dialog/dialog.component';
import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { getHeadingVariant } from '../../../utilities/typography/typography-utils';

@Component({
  selector: 'fudis-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormComponent extends GridApiDirective implements OnInit, OnDestroy, OnChanges {
  constructor(
    private _idService: FudisIdService,
    protected _elementRef: ElementRef,
    private _errorSummaryService: FudisInternalErrorSummaryService,
    @Host() @Optional() protected _dialogParent: DialogComponent,
  ) {
    super();
  }

  /**
   * Title text displayed in Error Summary before listing individual errors. If not provided, Fudis will display its default helper title text
   */
  @Input() errorSummaryTitle: string;

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
