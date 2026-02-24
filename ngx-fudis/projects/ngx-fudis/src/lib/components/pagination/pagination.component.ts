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
  ViewChild,
  AfterViewChecked,
  effect,
  WritableSignal,
} from '@angular/core';
import { FudisTranslationService } from '../../services/translation/translation.service';
import { BehaviorSubject } from 'rxjs';
import { FudisIdService } from '../../services/id/id.service';
import { CommonModule } from '@angular/common';

/**
 * Enum representing pagination ellipsis markers\
 * Used to indicate hidden page ranges.
 */
enum Ellipsis {
  start = 'start-ellipsis',
  end = 'end-ellipsis',
}

/**
 * Controls navigation through paged data sets.
 *
 * Use this component to split large collections into manageable pages.
 */
@Component({
  selector: 'fudis-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements AfterViewChecked, OnInit, OnDestroy {
  constructor(
    private _translationService: FudisTranslationService,
    private _idService: FudisIdService,
    private _elementRef: ElementRef<HTMLElement>,
  ) {
    this._paginationPrefix.next(this._translationService.getTranslations()().PAGINATION.PREFIX);
    this._paginationCurrent.next(
      this._translationService.getTranslations()().PAGINATION.CURRENT_PAGE,
    );
    this._paginationLast.next(this._translationService.getTranslations()().PAGINATION.LAST_PAGE);
    this._paginationPreviousButton.next(
      this._translationService.getTranslations()().PAGINATION.BUTTON.PREVIOUS.LABEL,
    );
    this._paginationNextButton.next(
      this._translationService.getTranslations()().PAGINATION.BUTTON.NEXT.LABEL,
    );
    this._paginationPreviousButtonAria.next(
      this._translationService.getTranslations()().PAGINATION.BUTTON.PREVIOUS.ARIA_LABEL,
    );
    this._paginationNextButtonAria.next(
      this._translationService.getTranslations()().PAGINATION.BUTTON.NEXT.ARIA_LABEL,
    );

    /**
     * Effect that tracks page index changes. Marks `hasUserChangedPage` as true when the current
     * page differs from the previous one (ignoring the initial load).
     */
    effect(() => {
      const current = this._pageIndex();

      if (
        this.prevPageIndex !== undefined &&
        this.prevPageIndex !== current &&
        !this.hasUserChangedPage
      ) {
        this.hasUserChangedPage = true;
      }

      this.prevPageIndex = current;
    });
  }

  /**
   * Template reference for the active item element
   */
  @ViewChild('activeItem') activeItemRef?: ElementRef<HTMLElement>;

  /**
   * Id for Pagination. By default generated.
   */
  @Input() id: string;

  /**
   * Aria-Label has always prefix `Pagination:`. Give aria-label that best describes the pagination
   * in use
   */
  @Input({ required: true }) paginationAriaLabel: string;

  /**
   * Set total amount of pages
   */
  @Input({ required: true }) set pageCount(value: number) {
    this._pageCount.set(value);
  }

  /**
   * Set current page index
   */
  @Input() set pageIndex(value: number) {
    /**
     * Prevent values that are outside of pageCount scope
     */
    const safeValue =
      this._pageCount() && value >= 0 && value < this._pageCount()
        ? value
        : Math.min(Math.max(value, 0), this._pageCount() - 1);

    this._pageIndex.set(safeValue);
  }

  /**
   * A function that increments **0-based page index** and returns the URL for that page. Example:
   * `href=#2`
   */
  protected pageHref: (index: number) => string = (i) => `#${i + 1}`;

  /**
   * Internal input for setting the number of pages shown in each side of the current page
   */
  @Input() set siblingCount(value: number) {
    this._siblingCount.set(value);
  }

  /**
   * On default behavior, focus will stay on pagination component. When set to false, application takes responsibility on focus handling on pageChange.
   */
  @Input() autoFocusOnPageChange: boolean = true;

  /**
   * PageChange Emitter
   */
  @Output() pageChange = new EventEmitter<number>();

  /**
   * Page index has been changed
   */
  protected hasUserChangedPage = false;

  /**
   * Protected signal for the total amount of pages
   */
  protected _pageCount = signal(0);

  /**
   * Protected signal for the current page index
   */
  protected _pageIndex = signal(0);

  /**
   * Prefix for aria-label from Fudis translation keys
   */
  protected _paginationPrefix = new BehaviorSubject<string>('');

  /**
   * Current page aria-label from Fudis translation keys
   */
  protected _paginationCurrent = new BehaviorSubject<string>('');

  /**
   * Last page aria-label from Fudis translation keys
   */
  protected _paginationLast = new BehaviorSubject<string>('');

  /**
   * Previous button label from Fudis translation keys
   */
  protected _paginationPreviousButton = new BehaviorSubject<string>('');

  /**
   * Next button label from Fudis translation keys
   */
  protected _paginationNextButton = new BehaviorSubject<string>('');

  /**
   * Previous button aria-label from Fudis translation keys
   */
  protected _paginationPreviousButtonAria = new BehaviorSubject<string>('');

  /**
   * Next button aria-label from Fudis translation keys
   */
  protected _paginationNextButtonAria = new BehaviorSubject<string>('');

  /**
   * Main CSS classes for buttons
   */
  protected _mainCssPrevClass: BehaviorSubject<string> = new BehaviorSubject<string>(
    'fudis-pagination-button__previous',
  );
  protected _mainCssNextClass: BehaviorSubject<string> = new BehaviorSubject<string>(
    'fudis-pagination-button__next',
  );

  /**
   * Computed list of pagination items (page numbers + ellipses)\
   * Recalculated whenever page count, current page, or sibling count changes.
   */
  protected itemList = computed(() =>
    this.createPaginationItemList(this._pageCount(), this._pageIndex(), this._siblingCount()),
  );

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

  /**
   * Private signal for counting Pagination item visible siblings
   */
  private _siblingCount = signal(2);

  /**
   * After DOM is updated, restore focus to the new active element
   */
  private userSelectedIndex = -1;

  /**
   * Stores the previous page index for change detection
   */
  private prevPageIndex: number | undefined;

  /**
   * To observe container size changes and adjust Pagination sibling count based on viewport changes
   */
  private observer?: ResizeObserver;

  /** 
   * Signal to track if a pagination button was clicked, and which one, to manage focus in ngAfterViewChecked
   */
  private _buttonClickState: WritableSignal<{ clicked: boolean; type: 'prev' | 'next' | null }> = signal({ clicked: false, type: null });

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
   * Set button collapsed styles if Pagination container is smaller than < 465px
   */
  private _setClasses(collapsed: boolean): void {
    if (collapsed) {
      this._mainCssPrevClass.next('fudis-pagination-button__previous--collapsed');
      this._mainCssNextClass.next('fudis-pagination-button__next--collapsed');
    } else {
      this._mainCssPrevClass.next('fudis-pagination-button__previous');
      this._mainCssNextClass.next('fudis-pagination-button__next');
    }
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

    /**
     * Calculate the first sibling page number to display around the current page
     */
    const siblingsStart = Math.max(
      Math.min(pageIndex + 1 - siblingCount, pageCount - 1 - siblingCount * 2 - 1),
      3,
    );
    /**
     * Calculate the last sibling page number to display around the current page
     */
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

  ngOnInit() {
    if (this.id) {
      this._idService.addNewId('pagination', this.id);
    } else {
      this.id = this._idService.getNewId('pagination');
    }

    this.observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;

        // update sibling count based on width
        if (width < 465) {
          this._siblingCount.set(1);
          this._setClasses(true);
        } else {
          this._siblingCount.set(2);
          this._setClasses(false);
        }
      }
    });

    this.observer.observe(this._elementRef.nativeElement);
  }

  /**
   * After view updates, restore focus to the active page item if user selected one
   */
  ngAfterViewChecked(): void {
    if (this.userSelectedIndex >= 0 && this.activeItemRef) {
      this.activeItemRef.nativeElement.focus();

      this.userSelectedIndex = -1;
    }
    // Keep focus on clicked button
    if(this._buttonClickState().clicked && this.autoFocusOnPageChange){
      const buttonType = this._buttonClickState().type;
      if (buttonType) {
        document.getElementById(`${this.id}-button-${buttonType}`)?.focus();
      }
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  /**
   * Emit pageChange event on pagination item click
   */
  goToPage(index: number, event?: Event, wasButtonClick?: boolean, buttonType?: 'prev' | 'next'): void {
    event?.preventDefault();
    if (index < 0 || index >= this._pageCount()) return;

    const lastPage = this._pageCount() - 1;

    /**
     * When autoFocusOnPageChange is true (default), move focus to the new active page item on page change. 
     * If autoFocusOnPageChange is false, let the application handle focus.
     */
    if (this.autoFocusOnPageChange) {

        if (wasButtonClick) {
          // Set signal to track that a button was clicked and which one, so that focus can be moved to the correct button in ngAfterViewChecked
          this._buttonClickState.set({ clicked: true, type: buttonType || null });
          if (index === 0) {
            // Move focus to first page item
            this.userSelectedIndex = 0;
          } else if (index === lastPage) {
            // Move focus to last page item
            this.userSelectedIndex = lastPage;
          } else {
            // Do not move focus on button click to middle pages
            this.userSelectedIndex = -1;
          }
        } else {
          this._buttonClickState.set({ clicked: false, type: null });
          // Set focus on clicking page numbers
          this.userSelectedIndex = index;
        }
  }
    this.pageChange.emit(index);
    this._pageIndex.set(index);
  }
}
