import {
  ChangeDetectionStrategy,
  Component,
  Host,
  HostBinding,
  Input,
  OnInit,
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
export class BreadcrumbsItemComponent implements OnInit {
  constructor(
    private _idService: FudisIdService,
    @Host() protected _breadCrumbs: BreadcrumbsComponent,
  ) {}

  @HostBinding('class') private _classes = 'fudis-breadcrumbs-item-host';

  /**
   * Visible label
   */
  @Input({ required: true }) label: string;

  /**
   * Angular Router url
   */
  @Input({ required: true }) url: string;

  protected _id: string;

  ngOnInit(): void {
    this._id = this._idService.getNewChildId('breadcrumbs', this._breadCrumbs.id);
  }
}
