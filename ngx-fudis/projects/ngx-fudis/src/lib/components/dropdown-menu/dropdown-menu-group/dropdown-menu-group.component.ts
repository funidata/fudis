import { Component, Host, Input } from '@angular/core';
import { FudisIdService } from '../../../services/id/id.service';
import { DropdownMenuComponent } from '../dropdown-menu.component';

@Component({
  selector: 'fudis-dropdown-menu-group',
  templateUrl: './dropdown-menu-group.component.html',
  styleUrls: ['./dropdown-menu-group.component.scss'],
})
export class DropdownMenuGroupComponent {
  constructor(
    private _idService: FudisIdService,
    @Host() private _parentDropdownMenu: DropdownMenuComponent,
  ) {
    if (_parentDropdownMenu) {
      this.id = this._idService.getNewGroupId('dropdown-menu', this._parentDropdownMenu.id);
      console.log('id', this.id);
      console.log('parent id', this._parentDropdownMenu.id);
    }
  }

  /**
   * Visible label for this group of items
   */
  @Input({ required: true }) label: string;

  /**
   * Id for this Dropdown Menu Group. Generated with FudisIdService and used for accessibility attributes.
   */
  public id: string;
}
