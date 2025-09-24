import { ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList, ViewEncapsulation, OnChanges, SimpleChanges, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { FudisTranslationService } from '../../services/translation/translation.service';
import { BehaviorSubject } from 'rxjs';
import { FudisIdService } from '../../services/id/id.service';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { NgxFudisModule } from '../../ngx-fudis.module';
import { PaginationItemComponent } from './pagination-item/pagination-item.component';

@Component({
  selector: 'fudis-pagination',
  imports: [CommonModule, NgxFudisModule],
  providers: [IconComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements AfterContentInit, OnChanges {
  constructor(
    private _translationService: FudisTranslationService,
    private _idService: FudisIdService,
    private cdr: ChangeDetectorRef
  ) {
    this._id = this._idService.getNewParentId('pagination');
    this._paginationPrefix.next(this._translationService.getTranslations()().PAGINATION.PREFIX);
  }

  @ContentChildren(PaginationItemComponent) allItems!: QueryList<PaginationItemComponent>;

  @Input({ required: true }) label: string;

  totalPages = 0;

  visibleItems: (number | string)[] = [];

  private _paginationChildrenIds: string[] = [];

  private _currentPage = 1;

  @Input()
  set currentPage(val: number) {
    this._currentPage = val;
    this.updateVisibleIds();
    this.cdr.detectChanges();
  }
  get currentPage(): number {
    return this._currentPage;
  }

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

  ngAfterContentInit() {
    this._paginationChildrenIds = this._idService.getAllChildrenIds('pagination', this._id);
    this.updateVisibleIds();
      this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentPage']) {
      this.updateVisibleIds();
    }
  }

  private updateVisibleIds() {
    const totalPages = this._paginationChildrenIds.length;

    console.log('total', totalPages);

  if (totalPages <= 9) {
    this.visibleItems = [...this._paginationChildrenIds];
    console.log('mitä tapahtuu', this.visibleItems);
    return;
  }

  if (this._currentPage < 3 && totalPages >= 10) {
    console.log('olen täällä');
    console.log('current Page', this._currentPage);

    this.visibleItems = [...this._paginationChildrenIds];
    this.visibleItems.splice(totalPages - 2, 1, 'ellipsis-right');
  }
  

  // More than 10: compute window around current page
  // const items: (string | 'ellipsis-left' | 'ellipsis-right')[] = [
  //   this._paginationChildrenIds[0] // always show first
  // ];

  // const currentIndex = Math.min(this.currentPage - 1, totalPages - 1);
  // const start = Math.max(1, currentIndex - 2);
  // const end = Math.min(totalPages - 2, currentIndex + 2);

  

  // if (start > 1) items.push('ellipsis-left'); // left ellipsis
  // items.push(...this._paginationChildrenIds.slice(start, end + 1)); // pages around current
  // if (end < totalPages - 2) items.push('ellipsis-right'); // right ellipsis

  // items.push(this._paginationChildrenIds[totalPages - 1]); // always show last
  // this.visibleItems = items;

  console.log(this.visibleItems);
  }

  isEllipsis(id: unknown): boolean {
    return typeof id === 'string' && id.startsWith('ellipsis');
  }
}
