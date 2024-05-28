import {
  Component,
  ContentChild,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  OnDestroy,
  OnChanges,
  Optional,
  Host,
} from '@angular/core';
import { FudisComponentChanges, FudisExpandableType } from '../../types/miscellaneous';
import { ContentDirective } from '../../directives/content-projection/content/content.directive';
import { ActionsDirective } from '../../directives/content-projection/actions/actions.directive';
import { FudisIdService } from '../../services/id/id.service';
import { FudisInternalErrorSummaryService } from '../../services/form/error-summary/internal-error-summary.service';
import { FudisFormErrorSummarySection } from '../../types/forms';
import { FormComponent } from '../form/form/form.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'fudis-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ExpandableComponent implements OnDestroy, OnChanges {
  constructor(
    @Host() @Optional() private _parentForm: FormComponent | null,
    private _idService: FudisIdService,
    private _errorSummaryService: FudisInternalErrorSummaryService,
  ) {
    this._id = this._idService.getNewId('expandable');
    this._headingId = `${this._id}-heading`;

    // TODO: write test

    if (_parentForm) {
      _errorSummaryService.allFormErrorsObservable
        .pipe(takeUntilDestroyed())
        .subscribe((errors) => {
          const expandableErrors = errors?.[_parentForm.id];

          if (
            this.closed &&
            this.openOnErrorSummaryReload &&
            _parentForm &&
            expandableErrors &&
            _parentForm.errorSummaryVisible
          ) {
            this._setClosedStatus(false);
          }
        });
    }
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
   *  Lazy loading check for expanding content
   */
  protected _openedOnce: boolean = false;

  /**
   * Object to send to Error Summary Service
   */
  private _errorSummaryInfo: FudisFormErrorSummarySection;

  /**
   * Is info sent to Error Summary Service
   */
  private _errorSummaryInfoSent: boolean = false;

  /**
   * Getter for closed boolean
   */
  get closed(): boolean {
    return this._closed;
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
    if (this.errorSummaryBreadcrumb && this._parentForm) {
      this._errorSummaryInfo = {
        id: this._id,
        formId: this._parentForm.id,
        title: title,
      };
      this._errorSummaryService.addSection(this._errorSummaryInfo);
      this._errorSummaryInfoSent = true;
    }
  }

  /**
   * Remove error object from Error Summary Service
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
