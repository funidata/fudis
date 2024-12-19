import {
  Component,
  ContentChild,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  OnDestroy,
  OnChanges,
  ElementRef,
  inject,
  Injector,
  AfterViewInit,
} from '@angular/core';
import { FudisComponentChanges, FudisExpandableType } from '../../types/miscellaneous';
import { FudisIdService } from '../../services/id/id.service';
import { FudisInternalErrorSummaryService } from '../../services/form/error-summary/internal-error-summary.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { ExpandableContentDirective } from './expandable-content.directive';

@Component({
  selector: 'fudis-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ExpandableComponent implements OnDestroy, OnChanges, AfterViewInit {
  constructor(
    private _element: ElementRef,
    private _idService: FudisIdService,
    private _errorSummaryService: FudisInternalErrorSummaryService,
  ) {
    this._id = this._idService.getNewId('expandable');
    this._headingId = `${this._id}-heading`;
  }

  /**
   * Content directive for Fudis Expandable Content
   */
  @ContentChild(ExpandableContentDirective) protected _content: ExpandableContentDirective;

  /**
   * Title of the expandable
   */
  @Input({ required: true }) title: string;

  /**
   * Expandable title's semantic aria-level for screen readers
   */
  @Input({ required: true }) level: number;

  /**
   * Visual variant of the expandable
   */
  @Input() variant: FudisExpandableType = 'regular';

  /**
   * Expandable content padding depth
   */
  @Input() padding: 'default' | 'small' = 'default';

  /**
   * Optional sub title, placed underneath the main title
   */
  @Input() subTitle: string;

  /**
   * Display Expandable title in the breadcrumb of Error Summary
   */
  @Input() errorSummaryBreadcrumb: boolean = false;

  // TODO: write test
  /**
   * If Expandable is used inside Form component, by default it will open itself when ReloadErrors is called in Error Summary Service. To disable this behavior, set this to false.
   */
  @Input() openOnErrorSummaryReload: boolean = true;

  /**
   * Expandable is initially closed by default but can be controlled by [closed] input property
   */
  @Input() set closed(value: boolean) {
    this._setClosedStatus(value);
  }

  /**
   * Optional output function when the closed status changes
   */
  @Output() closedChange = new EventEmitter<boolean>();

  /**
   * Internal boolean of whether the expandable is currently closed
   */
  protected _closed: boolean = true;

  /**
   * Internal id to generate unique id
   */
  protected _id: string;

  /**
   * Internal, separate unique heading id
   */
  protected _headingId: string;

  /**
   * Lazy loading check for expanding content
   */
  protected _openedOnce: boolean = false;

  /**
   * Is info sent to Error Summary Service
   */
  private _errorSummaryInfoSent: boolean = false;

  private _parentFormId: string | null;

  private _getParentForm(): void {
    this._errorSummaryService
      .getFormAncestorId(this._element.nativeElement)
      .then((parentFormId) => {
        if (parentFormId) {
          this._parentFormId = parentFormId;
          if (this.errorSummaryBreadcrumb) {
            this._addToErrorSummary(this.title);
          }

          toObservable(this._errorSummaryService.errorSummaryVisibilityStatus[this._parentFormId], {
            injector: this._injector,
          }).subscribe((value) => {
            if (this.closed && this.openOnErrorSummaryReload && value) {
              this._setClosedStatus(false);
            }
          });
        }
      });
  }

  /**
   * Getter for closed boolean
   */
  get closed(): boolean {
    return this._closed;
  }

  private _injector = inject(Injector);

  ngAfterViewInit(): void {
    this._getParentForm();
  }

  ngOnChanges(changes: FudisComponentChanges<ExpandableComponent>): void {
    if (changes.title || changes.errorSummaryBreadcrumb?.currentValue === true) {
      this._addToErrorSummary(this.title);
    }

    if (changes?.errorSummaryBreadcrumb?.currentValue === false) {
      this._removeFromErrorSummary();
    }
  }

  ngOnDestroy(): void {
    this._removeFromErrorSummary();
  }

  /**
   * Send error object to Error Summary Service
   */
  private _addToErrorSummary(title: string): void {
    if (this.errorSummaryBreadcrumb && this._parentFormId) {
      const errorSummaryInfo = {
        id: this._id,
        formId: this._parentFormId,
        title: title,
      };
      this._errorSummaryService.addSection(errorSummaryInfo);
      this._errorSummaryInfoSent = true;
    }
  }

  /**
   * Remove error object from Error Summary Service
   */
  private _removeFromErrorSummary(): void {
    if (this._errorSummaryInfoSent && this._parentFormId) {
      this._errorSummaryService.removeSection(this._parentFormId, this._id);
    }
  }

  /**
   * Setter for closed boolean
   */
  protected _setClosedStatus(value: boolean): void {
    this._closed = value ?? this._closed;
    this._openedOnce = this._openedOnce || !this._closed;
    this.closedChange.emit(this._closed);
  }
}
