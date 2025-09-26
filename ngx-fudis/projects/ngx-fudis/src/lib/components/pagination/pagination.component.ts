import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter,
} from '@angular/core';
import { FudisTranslationService } from '../../services/translation/translation.service';
import { BehaviorSubject } from 'rxjs';
import { FudisIdService } from '../../services/id/id.service';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { NgxFudisModule } from '../../ngx-fudis.module';
import { ButtonComponent } from '../button/button.component';

enum Ellipsis {
  start = 'start-ellipsis',
  end = 'end-ellipsis',
}
@Component({
  selector: 'fudis-pagination',
  imports: [CommonModule, NgxFudisModule],
  providers: [IconComponent, ButtonComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  constructor(
    private _translationService: FudisTranslationService,
    private _idService: FudisIdService
  ) {
    this._id = this._idService.getNewParentId('pagination');
    this._paginationPrefix.next(this._translationService.getTranslations()().PAGINATION.PREFIX);
  }

  @Input({ required: true }) label: string;

  @Input() pageCount: number;

  @Input() pageIndex = 0;

  /**
   * The number of pages shown in each side of the current page
   */
  @Input() siblingCount = 2;

  /**
   * A function for generating the href of pages
   */
  @Input() pageHref: (index: number) => string = (i) => `#${i + 1}`;

  @Output() pageChange = new EventEmitter<number>();

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

  protected range = (start: number, end: number): number[] => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  get itemList(): (Ellipsis | number)[] {
    return this.createPaginationItemList(this.pageCount, this.pageIndex, this.siblingCount);
  }

  private createPaginationItemList(
    pageCount: number,
    pageIndex: number,
    siblingCount: number,
  ): (Ellipsis | number)[] {
    const startPages = this.range(1, Math.min(1, pageCount));
    const endPages = this.range(Math.max(pageCount, 2), pageCount);

    const siblingsStart = Math.max(
      Math.min(pageIndex + 1 - siblingCount, pageCount - 1 - siblingCount * 2 - 1),
      3,
    );
    const siblingsEnd = Math.min(
      Math.max(pageIndex + 1 + siblingCount, 1 + siblingCount * 2 + 2),
      endPages.length > 0 ? endPages[0] - 2 : pageCount - 1,
    );

    return [
      ...startPages,
      ...(siblingsStart > 3 ? [Ellipsis.start] : pageCount - 1 > 2 ? [2] : []),
      ...this.range(siblingsStart, siblingsEnd),
      ...(siblingsEnd < pageCount - 2 ? [Ellipsis.end] : pageCount - 1 > 1 ? [pageCount - 1] : []),
      ...endPages,
    ];
  }

  goToPage(index: number, event?: Event) {
    console.log('minua painettiin', index);
    event?.preventDefault();
    if (index >= 0 && index < this.pageCount) {
      this.pageChange.emit(index);
    }
  }
}
