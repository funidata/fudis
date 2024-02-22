import {
  Component,
  ContentChild,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  OnInit,
  OnDestroy,
  OnChanges,
} from '@angular/core';
import { FudisExpandableType } from '../../types/miscellaneous';
import { ContentDirective } from '../../directives/content-projection/content/content.directive';
import { ActionsDirective } from '../../directives/content-projection/actions/actions.directive';
import { FudisIdService } from '../../services/id/id.service';
import { FudisInternalErrorSummaryService } from '../../services/form/error-summary/internal-error-summary.service';
import { FudisFormErrorSummarySection } from '../../types/forms';

@Component({
  selector: 'fudis-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ExpandableComponent implements OnInit, OnDestroy, OnChanges {
  constructor(
    private _idService: FudisIdService,
    private _errorSummaryService: FudisInternalErrorSummaryService,
  ) {
    this._id = this._idService.getNewId('expandable');
    this._headingId = `${this._id}-heading`;
  }

  /**
   * Content directive for Fudis Expandable Content
   */
  @ContentChild(ContentDirective) protected _content: ContentDirective;

  /**
   * Content directive for Fudis Expandable Actions
   */
  @ContentChild(ActionsDirective) protected _headerButtons: ActionsDirective | null;

  /**
   * Title of the expandable
   */
  @Input({ required: true }) title: string;

  /**
   * Determines header's semantic aria-level for screen readers, default is equivalent for h2
   */
  @Input() level: number = 2;

  /**
   * Type i.e visual variant of the expandable
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
   *  Lazy loading check for expanding content
   */
  protected _openedOnce: boolean = false;

  /**
   * Internal, separate title property to send to Error Summary service
   */
  protected _title: string;

  /**
   * Object to send to Error Summary service
   */
  private _errorSummaryInfo: FudisFormErrorSummarySection;

  /**
   * Is info sent to Error Summary service
   */
  private _errorSummaryInfoSent: boolean = false;

  /**
   * Getter for closed boolean
   */
  get closed(): boolean {
    return this._closed;
  }

  ngOnInit(): void {
    this._title = this.title;
    this._addToErrorSummary();
  }

  ngOnChanges(): void {
    if (this.title !== this._title && this._id) {
      this._title = this.title;
      this._addToErrorSummary();
    }
  }

  ngOnDestroy(): void {
    this._removeFromErrorSummary();
  }

  /**
   * Send error object to Error Summary service
   */
  private _addToErrorSummary(): void {
    if (this.errorSummaryBreadcrumb) {
      this._errorSummaryInfo = {
        id: this._id,
        title: this._title,
      };
      this._errorSummaryService.addSection(this._errorSummaryInfo);
      this._errorSummaryInfoSent = true;
    }
  }

  /**
   * Remove error object from Error Summary service
   */
  private _removeFromErrorSummary(): void {
    if (this._errorSummaryInfoSent) {
      this._errorSummaryService.removeSection(this._errorSummaryInfo);
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
