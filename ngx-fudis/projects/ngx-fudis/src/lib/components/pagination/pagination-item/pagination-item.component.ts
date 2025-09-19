import { Component, Host, HostBinding } from '@angular/core';
import { FudisIdService } from '../../../services/id/id.service';
import { PaginationComponent } from '../pagination.component';
// import { PaginationComponent } from '../pagination.component';

@Component({
  standalone: true,
  selector: 'li[fudis-pagination-item]',
  templateUrl: './pagination-item.component.html',
})
export class PaginationItemComponent {
  constructor(
    private _idService: FudisIdService,
    @Host() protected _pagination: PaginationComponent,
  ) {
    this._id = this._idService.getNewChildId('pagination', this._pagination.id);
  }

  /**
   * Binding host CSS class to component wrapper
   */
  @HostBinding('class') private _classes = 'fudis-pagination-item';

  /**
   * Id from Id Service
   */
  protected _id: string;
}
