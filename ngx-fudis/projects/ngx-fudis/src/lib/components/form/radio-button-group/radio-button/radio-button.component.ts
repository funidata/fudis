import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  ViewEncapsulation,
  OnInit,
  Host,
} from '@angular/core';

import { FudisIdService } from '../../../../services/id/id.service';
import { RadioButtonGroupComponent } from '../radio-button-group.component';
import { FudisRadioButtonChangeEvent } from '../../../../types/forms';

@Component({
  selector: 'fudis-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RadioButtonComponent implements OnInit {
  constructor(
    private _idService: FudisIdService,
    @Host() protected _parentGroup: RadioButtonGroupComponent,
  ) {}

  /**
   * Binding host CSS class to component wrapper
   */
  @HostBinding('class') private _classes = 'fudis-radio-button-host';

  /*
   * Selectable form value of a single Radio Button, e.g. "fair-trade-banana"
   */
  @Input({ required: true }) value: string | boolean | object | null;

  /*
   * Visible label for a single Radio Button, e. g. "Fair trade banana"
   */
  @Input({ required: true }) label: string;

  /*
   * Id for single Radio Button
   */
  @Input() id: string;

  /**
   * Blur event output
   */
  @Output() radioButtonBlur = new EventEmitter<string>();

  /**
   * Checked input change output
   */
  @Output() radioButtonChange = new EventEmitter<FudisRadioButtonChangeEvent>();

  ngOnInit(): void {
    if (this.id) {
      this._idService.addNewChildId('radio-button-group', this._parentGroup.id, this.id);
    } else {
      this.id = this._idService.getNewChildId('radio-button-group', this._parentGroup.id);
    }
  }

  handleBlur(): void {
    this.radioButtonBlur.emit();
  }

  handleChange(): void {
    const optionToEmit: FudisRadioButtonChangeEvent = {
      id: this.id,
      value: this._parentGroup.control.value,
      label: this.label,
    };

    this.radioButtonChange.emit(optionToEmit);

    this._parentGroup.triggerEmit(this.id, this.label);
  }
}
