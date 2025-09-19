import { Component, Host } from '@angular/core';
import { FudisIdService } from '../../../services/id/id.service';
import { PaginationComponent } from '../pagination.component';

@Component({
  selector: 'fudis-pagination-item',
  templateUrl: './pagination-item.component.html',
  styleUrl: './pagination-item.component.scss',
})
export class PaginationItemComponent {
constructor (
      private _idService: FudisIdService,
      @Host() protected _pagination: PaginationComponent,
) {
      this._id = this._idService.getNewChildId('pagination', this._pagination.id);
}

  /**
   * Id from Id Service
   */
  protected _id: string;
}
