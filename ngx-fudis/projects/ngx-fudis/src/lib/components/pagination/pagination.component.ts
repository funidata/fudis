import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FudisTranslationService } from '../../services/translation/translation.service';
import { BehaviorSubject } from 'rxjs';
import { FudisIdService } from '../../services/id/id.service';
import { NgxFudisModule } from '../../ngx-fudis.module';
import { PaginationItemComponent } from './pagination-item/pagination-item.component';

@Component({
  selector: 'fudis-pagination',
  imports: [NgxFudisModule, PaginationItemComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  constructor(
    private _translationService: FudisTranslationService,
    private _idService: FudisIdService,
  ) {
    this._id = this._idService.getNewParentId('pagination');
    this._paginationPrefix.next(this._translationService.getTranslations()().PAGINATION.PREFIX);
  }

  @Input({ required: true }) label: string;

  /**
   * Prefix for aria-label from Fudis translation keys
   */
  protected _paginationPrefix = new BehaviorSubject<string>(
    this._translationService.getTranslations()().PAGINATION.PREFIX,
  );

  /**
   * HTML id
   */
  protected _id: string;

  /**
   * Getter for id
   */
  get id(): string {
    return this._id;
  }
}
