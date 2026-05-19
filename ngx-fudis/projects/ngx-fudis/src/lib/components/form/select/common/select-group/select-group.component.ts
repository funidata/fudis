import {
  ChangeDetectionStrategy,
  Component,
  Host,
  Input,
  Optional,
  signal,
  WritableSignal,
} from '@angular/core';
import { FudisIdService } from '../../../../../services/id/id.service';
import { SelectComponent } from '../../select/select.component';
import { setVisibleOptionsList } from '../utilities/selectUtilities';
import { MultiselectComponent } from '../../multiselect/multiselect.component';

/**
 * Groups select options under a common category.
 *
 * Use this component to organize related options to improve readability.
 */
@Component({
  selector: 'fudis-select-group, fudis-multiselect-group',
  templateUrl: './select-group.component.html',
  styleUrls: ['./select-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
   * Checks if the select group has content and if the group label should be visible or not.
   */
  protected _visibleOptions: WritableSignal<string[]> = signal<string[]>([]);

  /**
   * Called from SelectOption and MultiselectOption to set if the option is visible or not
   *
   * @param value Value of option
   * @param visible State of option's visibility
   */
  public setOptionVisibility(value: string, visible: boolean) {
    this._visibleOptions.set(setVisibleOptionsList(this._visibleOptions(), value, visible));
  }
}
