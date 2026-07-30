import { ChangeDetectionStrategy, Component, Host, Input } from '@angular/core';
import { FudisIdService } from '../../../services/id/id.service';
import { DropdownMenuComponent } from '../dropdown-menu.component';

/**
 * Groups related dropdown items.
 *
 * Use this component to organize related menu options to improve readability.
 *
 * @example
 *   ```html
 *   <fudis-icon-button [ariaLabel]="'Actions'" [icon]="'three-dots'" [asMenuButton]="true">
 *     <fudis-dropdown-menu>
 *       <fudis-dropdown-menu-group [label]="'File'">
 *         <fudis-dropdown-menu-item [label]="'New'" (handleClick)="newFile()"></fudis-dropdown-menu-item>
 *         <fudis-dropdown-menu-item [label]="'Open'" (handleClick)="openFile()"></fudis-dropdown-menu-item>
 *       </fudis-dropdown-menu-group>
 *     </fudis-dropdown-menu>
 *   </fudis-icon-button>
 *   ```;
 */
@Component({
  selector: 'fudis-dropdown-menu-group',
  templateUrl: './dropdown-menu-group.component.html',
  styleUrls: ['./dropdown-menu-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenuGroupComponent {
  constructor(
    private _idService: FudisIdService,
    @Host() private _parentDropdownMenu: DropdownMenuComponent,
  ) {
    if (_parentDropdownMenu) {
      this.id = this._idService.getNewGroupId('dropdown-menu', this._parentDropdownMenu.id);
    }
  }

  /**
   * Visible label for this group of items
   */
  @Input({ required: true }) label: string;

  /**
   * Id for this Dropdown Menu Group. Generated with FudisIdService and used for accessibility
   * attributes.
   */
  public id: string;
}
