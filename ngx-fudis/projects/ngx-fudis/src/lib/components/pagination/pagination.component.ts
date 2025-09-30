import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter,
  OnInit,
  signal,
  OnDestroy,
  computed,
  ElementRef,
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
export class PaginationComponent implements OnInit, OnDestroy {
  constructor(
    private _translationService: FudisTranslationService,
    private _idService: FudisIdService,
    private _elementRef: ElementRef<HTMLElement>,
  ) {
    this._id = this._idService.getNewParentId('pagination');
    this._paginationPrefix.next(this._translationService.getTranslations()().PAGINATION.PREFIX);
    this._paginationPreviousButton.next(
      this._translationService.getTranslations()().PAGINATION.BUTTON_PREVIOUS,
    );
    this._paginationNextButton.next(
      this._translationService.getTranslations()().PAGINATION.BUTTON_NEXT,
    );
  }

  /**
   * Aria-Label has always prefix `Pagination:`. Give aria-label that best describes the pagination
   * in use
   */
  @Input({ required: true }) paginationAriaLabel: string;

  protected _pageCount = signal(0);

  protected _pageIndex = signal(0);

  /**
   * Set current page index
   */
  @Input() set pageCount(value: number) {
    this._pageCount.set(value);
  }

  /**
   * Set total amount of pages
   */
  @Input() set pageIndex(value: number) {
    this._pageIndex.set(value);
  }

  /**
   * A function for generating the href of pages
   */
  @Input() pageHref: (index: number) => string = (i) => `#${i + 1}`;

  /**
   * Internal input for the number of pages shown in each side of the current page
   */
  @Input() set siblingCount(value: number) {
    this._siblingCount.set(value);
  }

  /**
   * PageChange Emitter
   */
  @Output() pageChange = new EventEmitter<number>();

  private _siblingCount = signal(2);

  /**
   * Prefix for aria-label from Fudis translation keys
   */
  protected _paginationPrefix = new BehaviorSubject<string>(
    this._translationService.getTranslations()().PAGINATION.PREFIX,
  );

  /**
   * Previous button label from Fudis translation keys
   */
  protected _paginationPreviousButton = new BehaviorSubject<string>('');

  /**
   * Next button label from Fudis translation keys
   */
  protected _paginationNextButton = new BehaviorSubject<string>('');

  /**
   * Returns an array of numbers from given starting to ending number
   */
  protected range = (start: number, end: number): number[] => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  /**
   * HTML id
   */
  protected _id: string;

  itemList = computed(() =>
    this.createPaginationItemList(this._pageCount(), this._pageIndex(), this._siblingCount()),
  );

  /**
   * Getter for id
   */
  get id(): string {
    return this._id;
  }

  /**
   * Get translation for aria-live page openend announcement
   */
  get liveAnnouncement(): string {
    if (this._pageCount() === 0) return '';
    return (
      this._translationService.getTranslations()().PAGINATION.OPENED_PAGE +
      ` ${this._pageIndex() + 1}`
    );
  }

  /**
   * Create function that determines when to show ellipsis on start or end of the pagination list
   */
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

  private observer?: ResizeObserver;

  ngOnInit() {
    this.observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;

        // update sibling count based on width
        if (width < 465) {
          this._siblingCount.set(1);
        } else {
          this._siblingCount.set(2);
        }
      }
    });

    this.observer.observe(this._elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  /**
   * Emit pageChange event on pagination item click
   */
  goToPage(index: number, event?: Event) {
    event?.preventDefault();
    if (index >= 0 && index < this._pageCount()) {
      this.pageChange.emit(index);
      this._pageIndex.set(index);
    }
  }
}
