import { Component, HostBinding, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FudisRadioButtonOption, FudisInputSize } from '../../../types/forms';
import { FieldSetBaseDirective } from '../../../directives/form/fieldset-base/fieldset-base.directive';
import { hasRequiredValidator } from '../../../utilities/form/getValidators';

// TODO: Refactor component to work in similar fashion as Checkbox Group, update docs and tests
@Component({
  selector: 'fudis-radio-button-group',
  templateUrl: './radio-button-group.component.html',
  styleUrls: ['./radio-button-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RadioButtonGroupComponent extends FieldSetBaseDirective implements OnInit, OnChanges {
  @HostBinding('class') classes = 'fudis-radio-button-group-host';

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
   * Set fieldset as required. By default set to 'undefined'.
   */
  @Input() required: boolean | undefined = undefined;

  /**
   * Name of the group. If not provided, use id for the name.
   */
  @Input() name: string;

  /**
   * Set requiredText based on this boolean value
   */
  protected _required: boolean = false;

  ngOnInit() {
    this._setParentId('radio-button-group');

    if (this.options.length < 2) {
      throw new Error(
        `Fudis-radio-button-group should have minimum of two options for radio buttons, but it only got ${this.options.length} option.`,
      );
    }

    if (!this.name) {
      this.name = this.id;
    }
  }

  ngOnChanges(): void {
    this._required = hasRequiredValidator(this.control);

    if (!this.name) {
      this.name = this.id;
    }
  }
}
