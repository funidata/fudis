import { Component, Host, Input, Optional } from '@angular/core';
import { FudisIdService } from '../../../../../services/id/id.service';
import { SelectComponent } from '../../select/select.component';
import { setVisibleOptionsList } from '../selectUtilities';
import { MultiselectComponent } from '../../multiselect/multiselect.component';

@Component({
  selector: 'fudis-select-group, fudis-multiselect-group',
  templateUrl: './select-group.component.html',
  styleUrls: ['./select-group.component.scss'],
})
export class SelectGroupComponent {
  constructor(
    private _idService: FudisIdService,
    @Host() @Optional() private _parentSelect: SelectComponent,
    @Host() @Optional() private _parentMultiselect: MultiselectComponent,
  ) {
    if (_parentSelect) {
      this.id = this._idService.getNewGroupId('select', this._parentSelect.id);
    } else if (_parentMultiselect) {
      this.id = this._idService.getNewGroupId('multiselect', this._parentMultiselect.id);
    }
  }

  /**
   * Visible title label for this group of options
   */
  @Input({ required: true }) label: string;

  /**
   * Id for this Select Group. Generated with FudisIdService and used for accessibility attributes.
   */
  public id: string;

  /**
   * Used when filtering autocomplete results to check if 'No results found' text is visible
   */
  protected _visibleOptions: string[] = [];

  /**
   * Called from SelectOption and MultiselectOption to set if the option is visible or not
   * @param value value of option
   * @param visible state of option's visibility
   */
  public setOptionVisibility(value: string, visible: boolean) {
    this._visibleOptions = setVisibleOptionsList(this._visibleOptions, value, visible);
  }
}
