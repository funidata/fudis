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
   * Selectable value of a single Radio Button, e.g. "fair-trade-banana"
   */
  @Input({ required: true }) value: string | boolean | object | null | unknown;

  /**
   * Visible label for a single Radio Button, e. g. "Fair trade banana"
   */
  @Input({ required: true }) label: string;

  /**
   * Blur event output
   */
  @Output() radioButtonBlur = new EventEmitter<string>();

  /**
   * Id for single Radio Button
   */
  protected _id: string;

  /**
   * Blur handler
   */
  protected _handleBlur(): void {
    this.radioButtonBlur.emit();
  }

  /**
   * Selected Radio Button change
   */
  protected _onChange(): void {
    /**
     * Call parent's function, which triggers Radio Button Group's emit
     */
    this._parentGroup.triggerEmit(this._id, this.label);
  }

  ngOnInit(): void {
    if (this._id) {
      this._idService.addNewChildId('radio-button-group', this._parentGroup.id, this._id);
    } else {
      this._id = this._idService.getNewChildId('radio-button-group', this._parentGroup.id);
    }
  }
}
