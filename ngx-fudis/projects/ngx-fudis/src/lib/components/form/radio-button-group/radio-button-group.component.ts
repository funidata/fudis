import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Host,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { FudisInputSize, FudisRadioButtonGroupChangeEvent } from '../../../types/forms';
import { FieldSetBaseDirective } from '../../../directives/form/fieldset-base/fieldset-base.directive';
import { hasRequiredValidator } from '../../../utilities/form/getValidators';
import { FudisIdService } from '../../../services/id/id.service';
import { FormComponent } from '../form/form.component';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FudisComponentChanges } from '../../../types/miscellaneous';

@Component({
  selector: 'fudis-radio-button-group',
  templateUrl: './radio-button-group.component.html',
  styleUrls: ['./radio-button-group.component.scss'],
})
export class RadioButtonGroupComponent extends FieldSetBaseDirective implements OnInit, OnChanges {
  constructor(
    @Host() @Optional() protected _parentForm: FormComponent | null,
    private _changeDetectorRef: ChangeDetectorRef,
    _idService: FudisIdService,
    _translationService: FudisTranslationService,
  ) {
    super(_idService, _translationService);

    this._updateValueAndValidityTrigger.pipe(takeUntilDestroyed()).subscribe(() => {
      if (this.control) {
        this._required = hasRequiredValidator(this.control);
      }
    });
  }

  /**
   * FormControl for Radio Button Group
   */
  @Input({ required: true }) control: FormControl<unknown>;

  /**
   * Width of Radio Button Group
   */
  @Input() size: FudisInputSize = 'lg';

  /**
   * Emit form control and changed option when one option is clicked
   */
  @Output() handleChange = new EventEmitter<FudisRadioButtonGroupChangeEvent>();

  /**
   * Emit on option focus
   */
  @Output() handleFocus = new EventEmitter<FocusEvent>();

  /**
   * Set requiredText based on this boolean value
   */
  protected _required: boolean = false;

  ngOnInit() {
    this._setParentId('radio-button-group');
    this._updateValueAndValidityTrigger.next();

    if (this.errorSummaryReloadOnInit) {
      this._reloadErrorSummaryTrigger = this._triggerErrorSummaryOnInitReload(
        this._parentForm?.errorSummaryVisible,
        this.control,
      );

      if (this._reloadErrorSummaryTrigger) {
        this._changeDetectorRef.detectChanges();
      }
    }
  }

  /** Add value and validity check when control value changes */
  ngOnChanges(changes: FudisComponentChanges<RadioButtonGroupComponent>): void {
    if (changes.control?.currentValue !== changes.control?.previousValue) {
      const original = this.control.updateValueAndValidity;

      this.control.updateValueAndValidity = () => {
        original.apply(this.control);
        this._updateValueAndValidityTrigger.next();
      };
    }
  }

  /**
   * Triggered from child options when they are fosed
   */
  public optionFocused(event: FocusEvent): void {
    this.handleFocus.emit(event);

    if (this._reloadErrorSummaryTrigger) {
      this._reloadErrorSummaryTrigger = false;
    }
  }

  public triggerEmit(id: string, label: string): void {
    const data: FudisRadioButtonGroupChangeEvent = {
      option: {
        id: id,
        label: label,
        value: this.control?.value,
      },
      control: this.control,
    };
    this.handleChange.emit(data);
  }
}
