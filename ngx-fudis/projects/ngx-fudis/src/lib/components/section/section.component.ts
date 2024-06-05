import {
  Component,
  ContentChild,
  Host,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import { FudisIdService } from '../../services/id/id.service';
import { FudisHeadingSize, FudisHeadingLevel } from '../../types/typography';
import { NotificationsDirective } from '../../directives/content-projection/notifications/notifications.directive';
import { ContentDirective } from '../../directives/content-projection/content/content.directive';
import { FudisGridWidth, FudisGridAlign } from '../../types/grid';

import { TooltipApiDirective } from '../../directives/tooltip/tooltip-api.directive';
import { FudisBadgeVariant, FudisComponentChanges, FudisSpacing } from '../../types/miscellaneous';
import { FudisInternalErrorSummaryService } from '../../services/form/error-summary/internal-error-summary.service';
import { FudisFormErrorSummarySection } from '../../types/forms';
import { ActionsDirective } from '../../directives/content-projection/actions/actions.directive';
import { FormComponent } from '../form/form/form.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'fudis-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SectionComponent extends TooltipApiDirective implements OnInit, OnChanges, OnDestroy {
  constructor(
    @Host() @Optional() private _parentForm: FormComponent | null,
    private _idService: FudisIdService,
    private _errorSummaryService: FudisInternalErrorSummaryService,
  ) {
    super();
  }

  /**
   * Content projection for notifications inside Section
   */
  @ContentChild(NotificationsDirective) protected _notifications: NotificationsDirective | null;

  /**
   * Content projection for Section content
   */
  @ContentChild(ContentDirective) protected _content: ContentDirective | null;

  /**
   * Content projection for Section heading
   */
  @ContentChild(ActionsDirective) protected _headerActions: ActionsDirective | null;

  /**
   * Section title
   */
  @Input({ required: true }) title: string;

  /**
   * Section id
   */
  @Input() id: string;

  /**
   * Heading level for the section title
   */
  @Input() level: FudisHeadingLevel = 2;

  /**
   * Heading size for the section title
   */
  @Input() titleSize: FudisHeadingSize = 'lg';

  /**
   * Add badge to the section title
  */
  @Input() badge: FudisBadgeVariant | null;

  /**
   * Badge text
   */
  @Input() badgeText: string | null;

  /**
   * Maximum width of Grid. When viewport gets narrower, grid automatically adjusts to lower sizes.
   * xxl = Default value. Viewports of 1600px and larger
   * xl = Viewports smaller than 1600px
   * lg = Viewports smaller than 1200px
   * md = Viewports smaller than 992px
   * sm = Viewports smaller than 768px
   * xs = Viewports smaller than 576px
   */
  @Input() width: FudisGridWidth = 'initial';

  /**
   * Alignment of Grid component inside its parent
   */
  @Input() align: FudisGridAlign = 'start';

  /**
   * Margin top for the Grid
   */
  @Input() marginTop: FudisSpacing = 'none';

  /**
   * Margin bottom for the Grid
   */
  @Input() marginBottom: FudisSpacing = 'none';

  /**
   * Custom CSS classes
   */
  @Input() classes: string[];

  /**
   * Is section title shown in error summary breadcrumb
   */
  @Input() errorSummaryBreadcrumb: boolean = false;

  /**
   * Internal, separate unique heading id
   */
  protected _headingId: string;

  /**
   * Section CSS class list
   */
  protected _classList = new BehaviorSubject<string[]>([]);

  /**
   * Object to send to error summary service
   */
  private _errorSummaryInfo: FudisFormErrorSummarySection;

  /**
   * Is info sent to error summary service
   */
  private _errorSummaryInfoSent: boolean = false;

  ngOnInit(): void {
    this._setSectionId();

    this._headingId = `${this.id}-heading`;
    this._classList.next(this._getClasses());
    this._addToErrorSummary();
  }

  ngOnChanges(changes: FudisComponentChanges<SectionComponent>): void {
    if (changes.classes?.currentValue !== changes.classes?.previousValue) {
      this._classList.next(this._getClasses());
    }

    if (changes.title?.currentValue !== changes.title?.previousValue && this.id) {
      this._addToErrorSummary();
    }
  }

  ngOnDestroy(): void {
    this._removeFromErrorSummary();
  }

  /**
   * Send error object to Error Summary Service
   */
  private _addToErrorSummary(): void {
    if (this.errorSummaryBreadcrumb && this._parentForm) {
      this._errorSummaryInfo = {
        id: this.id,
        formId: this._parentForm.id,
        title: this.title,
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
   * Set main CSS class with possible custom classes
   */
  private _getClasses(): string[] {
    const cssClasses = this.classes ?? [];

    cssClasses.push('fudis-section');

    return cssClasses;
  }

  /**
   * Generate id with Id Service
   */
  private _setSectionId(): void {
    if (this.id) {
      this._idService.addNewId('section', this.id);
    } else {
      this.id = this._idService.getNewId('section');
    }
  }
}
