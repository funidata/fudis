import {
  ChangeDetectorRef,
  Component,
  Host,
  Input,
  OnChanges,
  OnInit,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { FudisRadioButtonOption, FudisInputSize } from '../../../types/forms';
import { FieldSetBaseDirective } from '../../../directives/form/fieldset-base/fieldset-base.directive';
import { hasRequiredValidator } from '../../../utilities/form/getValidators';
import { FudisIdService } from '../../../services/id/id.service';
import { FormComponent } from '../form/form.component';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FudisComponentChanges } from '../../../types/miscellaneous';

// TODO: Refactor component to work in similar fashion as Checkbox Group, update docs and tests
@Component({
  selector: 'fudis-radio-button-group',
  templateUrl: './radio-button-group.component.html',
  styleUrls: ['./radio-button-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RadioButtonGroupComponent extends FieldSetBaseDirective implements OnInit, OnChanges {
  constructor(
    @Host() @Optional() protected _parentForm: FormComponent | null,
    _idService: FudisIdService,
    _translationService: FudisTranslationService,
    _changeDetectorRef: ChangeDetectorRef,
  ) {
    super(_idService, _translationService, _changeDetectorRef);

    this._updateValueAndValidityTrigger.pipe(takeUntilDestroyed()).subscribe(() => {
      if (this.control) {
        this._required = hasRequiredValidator(this.control);
      }
    });
  }

  /*
   * FormControl for Radio Button group
   */
  @Input({ required: true }) control: FormControl<boolean | null>;

  /*
   * Array of options for group of radio buttons
   */
  @Input({ required: true }) options: FudisRadioButtonOption[];

  /**
   * Width of Radiobutton Group
   */
  @Input() size: FudisInputSize = 'lg';


  /**
   * Set requiredText based on this boolean value
   */
  protected _required: boolean = false;

  ngOnInit() {
    this._setParentId('radio-button-group');
    this._updateValueAndValidityTrigger.next();

    this._reloadErrorSummaryOnInit(this._parentForm?.errorSummaryVisible, this.control);
  }

  /** Add value and validity check when form control changes */

  ngOnChanges(changes: FudisComponentChanges<RadioButtonGroupComponent>): void {

    if (changes.control?.currentValue !== changes.control?.previousValue) {
      const original = this.control.updateValueAndValidity;

      this.control.updateValueAndValidity = () => {
        original.apply(this.control);
        this._updateValueAndValidityTrigger.next();
      };
    }
  }
}
