import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, OnChanges, SimpleChanges, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { FudisTranslationService } from '../../services/translation/translation.service';
import { BehaviorSubject } from 'rxjs';
import { FudisIdService } from '../../services/id/id.service';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { NgxFudisModule } from '../../ngx-fudis.module';

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

  @Input({ required: true }) label: string;

  @Input() pageCount: number;

  @Input() pageIndex = 0;

  totalPages = 0;

  private _paginationChildrenIds: string[] = [];

  private _currentPage = 1;

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
    this.lastItem = this.visibleItems.length - 1;
    console.log('last',this.lastItem);
  }

  console.log(this.visibleItems);
  }
}
