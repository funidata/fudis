import { ChangeDetectorRef, Component, Host, HostBinding, Input, OnChanges, OnInit, Optional, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FudisRadioButtonOption, FudisInputSize } from '../../../types/forms';
import { FieldSetBaseDirective } from '../../../directives/form/fieldset-base/fieldset-base.directive';
import { hasAtLeastOneRequiredOrMinValidator, hasRequiredValidator } from '../../../utilities/form/getValidators';
import { FudisFocusService } from '../../../services/focus/focus.service';
import { FudisIdService } from '../../../services/id/id.service';
import { FormComponent } from '../form/form.component';
import { FudisTranslationService } from '../../../services/translation/translation.service';

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
    super(_idService,  _translationService, _changeDetectorRef);
  }
  
  /**
   * Binding host CSS class to component wrapper
   */
  @HostBinding('class') private _classes = 'fudis-radio-button-group-host';

  /*
   * FormControl for Radio Button group
   */
  @Input({ required: true }) control: FormControl<boolean | null>;

  /*
   * Array of options for group of radio buttons
   */
  @Input({ required: true }) options: FudisRadioButtonOption[];

  /**
   * Set Radio Button Group's visual style and ARIA attribute as invalid. Does not override if control.invalid is true.
   */
  @Input() invalidState: boolean = false;

  /**
   * Width of Radiobutton Group
   */
  @Input() size: FudisInputSize = 'lg';

  /**
   * Name of the group. If not provided, use id for the name.
   */
  @Input() name: string;

  /**
   * Set requiredText based on this boolean value
   */
  public required: boolean = false;

  ngOnInit() {
    this._setParentId('radio-button-group');

    if (!this.name) {
      this.name = this.id;
    }
  }

  /** Add value and validity check when form control changes */

  ngOnChanges(): void {
    this.required = hasRequiredValidator(this.control);

    if (!this.name) {
      this.name = this.id;
    }
  }
}
