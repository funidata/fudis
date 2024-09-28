import {
  Component,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
  OnChanges,
  Optional,
  Host,
} from '@angular/core';
import { FudisBodyText, FudisTextAlign } from '../../../types/typography';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisComponentChanges } from '../../../types/miscellaneous';
import { BehaviorSubject } from 'rxjs';
import { BreadcrumbsItemComponent } from '../../breadcrumbs/breadcrumbs-item/breadcrumbs-item.component';

@Component({
  selector: 'fudis-body-text',
  templateUrl: './body-text.component.html',
  styleUrls: ['./body-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BodyTextComponent implements OnChanges {
  constructor(
    @Host() @Optional() protected _breadcrumbsItem: BreadcrumbsItemComponent,
    private _idService: FudisIdService,
  ) {
    this._id = _idService.getNewId('body-text');
  }

  /**
   * Class for the parent wrapper element
   */
  @HostBinding('class') private _classes = 'fudis-body-text-host';

  /**
   * Variant for the paragraph
   */
  @Input() variant: FudisBodyText = 'md-regular';

  /**
   * Text alignment
   */
  @Input() align: FudisTextAlign = 'left';

  /**
   * Id generated from Id Service
   */
  protected _id: string;

  /**
   * To add default CSS class if app hasn't provided any variant
   */
  protected _defaultClass = new BehaviorSubject<boolean>(true);

  ngOnChanges(changes: FudisComponentChanges<BodyTextComponent>): void {
    if (changes.variant?.currentValue !== changes.variant?.previousValue) {
      if (!changes.variant?.currentValue) {
        this._defaultClass.next(true);
      } else {
        this._defaultClass.next(false);
      }
    }
  }
}
