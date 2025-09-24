import { Component, Host, HostBinding } from '@angular/core';
import { FudisIdService } from '../../../services/id/id.service';
import { PaginationComponent } from '../pagination.component';
// import { PaginationComponent } from '../pagination.component';

@Component({
  standalone: true,
  selector: 'fudis-pagination-item',
  templateUrl: './pagination-item.component.html',
  styleUrl: './pagination-item.component.scss',
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
@HostBinding('class') _classes = 'fudis-pagination-item';
  @HostBinding('class.hidden')
  get hidden(): boolean {
  return !this._pagination.visibleItems.includes(this._id);
  }

  /**
   * Id from Id Service
   */
  protected _id: string;
}
