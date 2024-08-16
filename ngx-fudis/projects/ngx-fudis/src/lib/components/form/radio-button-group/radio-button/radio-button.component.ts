import {
  Component,
  Input,
  Output,
  EventEmitter,
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

  /*
   * Selectable form value of a single Radio Button, e.g. "fair-trade-banana"
   */
  @Input({ required: true }) value: string | boolean | object | null;

  /*
   * Visible label for a single Radio Button, e. g. "Fair trade banana"
   */
  @Input({ required: true }) label: string;

  /**
   * Blur event output
   */
  @Output() radioButtonBlur = new EventEmitter<string>();

  /**
   * Checked input change output
   */
  @Output() radioButtonChange = new EventEmitter<FudisRadioButtonChangeEvent>();

  /*
   * Id for single Radio Button
   */
  protected _id: string;

  ngOnInit(): void {
    if (this._id) {
      this._idService.addNewChildId('radio-button-group', this._parentGroup.id, this._id);
    } else {
      this._id = this._idService.getNewChildId('radio-button-group', this._parentGroup.id);
    }
  }

  handleBlur(): void {
    this.radioButtonBlur.emit();
  }

  handleChange(): void {
    const optionToEmit: FudisRadioButtonChangeEvent = {
      id: this._id,
      value: this._parentGroup.control.value,
      label: this.label,
    };

    this.radioButtonChange.emit(optionToEmit);

    this._parentGroup.triggerEmit(this._id, this.label);
  }
}
