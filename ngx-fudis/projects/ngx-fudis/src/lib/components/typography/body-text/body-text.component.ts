import {
  Component,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
  Optional,
  Host,
} from '@angular/core';
import { FudisBodyText, FudisTextAlign } from '../../../types/typography';
import { DialogComponent } from '../../dialog/dialog.component';
import { FudisIdService } from '../../../services/id/id.service';

@Component({
  selector: 'fudis-body-text',
  templateUrl: './body-text.component.html',
  styleUrls: ['./body-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BodyTextComponent {
  constructor(
    @Host() @Optional() private _parentDialog: DialogComponent,
    private _idService: FudisIdService,
  ) {
    this._id = _idService.getNewId('body-text');

    if (_parentDialog) {
      this.variant = 'md-light';
    }
  }

  /**
   * Class for the parent wrapper element
   */
  @HostBinding('class') private _classes = 'fudis-body-text-host';

  /**
   * Font variant for the paragraph
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

  // TODO: Enable Input spacing for marginBottom
}
