import {
  Component,
  Input,
  HostBinding,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Optional,
  Host,
} from '@angular/core';
import { FudisBodyText } from '../../../types/typography';
import { FudisTextAlign } from '../../../types/miscellaneous';
import { NotificationComponent } from '../../notification/notification.component';

@Component({
  selector: 'fudis-body-text',
  templateUrl: './body-text.component.html',
  styleUrls: ['./body-text.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BodyTextComponent {
  constructor(@Host() @Optional() private _parentNotification: NotificationComponent) {
    if (_parentNotification) {
      this.size = 'lg-regular';
    }
  }

  /**
   * Class for the parent wrapper element
   */
  @HostBinding('class') private _classes = 'fudis-body-text-host';

  /**
   * Font size for the paragraph
   */
  @Input() size: FudisBodyText = 'md-regular';

  /**
   * Option to change text color if background is not compatible with default dark text
   */
  @Input() color: 'default' | 'white' = 'default';

  /**
   * Text alignment
   */
  @Input() align: FudisTextAlign = 'left';

  // TODO: Enable Input spacing for marginBottom
}
