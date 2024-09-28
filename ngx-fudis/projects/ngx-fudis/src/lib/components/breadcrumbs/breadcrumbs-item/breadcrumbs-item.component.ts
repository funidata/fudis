import {
  ChangeDetectionStrategy,
  Component,
  Host,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { FudisIdService } from '../../../services/id/id.service';
import { BreadcrumbsComponent } from '../breadcrumbs.component';

@Component({
  selector: 'fudis-breadcrumbs-item',
  templateUrl: './breadcrumbs-item.component.html',
  styleUrls: ['./breadcrumbs-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BreadcrumbsItemComponent {
  constructor(
    private _idService: FudisIdService,
    @Host() protected _breadCrumbs: BreadcrumbsComponent,
  ) {
    this._id = this._idService.getNewChildId('breadcrumbs', this._breadCrumbs.id);
  }

  /**
   * Binding host CSS class to component wrapper
   */
  @HostBinding('class') private _classes = 'fudis-breadcrumbs-item-host';

  /**
   * Id from Id Service
   */
  protected _id: string;
}
