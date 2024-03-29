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
import { FudisSpacing } from '../../types/miscellaneous';
import { FudisInternalErrorSummaryService } from '../../services/form/error-summary/internal-error-summary.service';
import { FudisFormErrorSummarySection } from '../../types/forms';
import { ActionsDirective } from '../../directives/content-projection/actions/actions.directive';
import { FormComponent } from '../form/form/form.component';

// TODO: Write Stroybook documentation and add missing internal documentation for the functions
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

  @ContentChild(NotificationsDirective) notifications: NotificationsDirective | null;

  @ContentChild(ContentDirective) content: ContentDirective | null;

  @ContentChild(ActionsDirective) headerActions: ActionsDirective | null;

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
  @Input() titleLevel: FudisHeadingLevel = 2;

  /**
   * Heading size for the section title
   */
  @Input() titleSize: FudisHeadingSize = 'lg';

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
   * Custom CSS classes for Grid element
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
  protected _classList: string[];

  /**
   * Internal, separate title property to send to error summary service
   */
  protected _title: string;

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

    this._classList = this._getClasses();
    this._title = this.title;
    this._addToErrorSummary();
  }

  ngOnChanges(): void {
    this._classList = this._getClasses();

    if (this.title !== this._title && this.id) {
      this._title = this.title;
      this._addToErrorSummary();
    }
  }

  ngOnDestroy(): void {
    this._removeFromErrorSummary();
  }

  private _addToErrorSummary(): void {
    if (this.errorSummaryBreadcrumb && this._parentForm) {
      this._errorSummaryInfo = {
        id: this.id,
        formId: this._parentForm.id,
        title: this._title,
      };
      this._errorSummaryService.addSection(this._errorSummaryInfo);
      this._errorSummaryInfoSent = true;
    }
  }

  private _removeFromErrorSummary(): void {
    if (this._errorSummaryInfoSent) {
      this._errorSummaryService.removeSection(this._errorSummaryInfo);
    }
  }

  private _getClasses(): string[] {
    const cssClasses = this.classes ?? [];

    cssClasses.push('fudis-section');

    return cssClasses;
  }

  private _setSectionId(): void {
    if (this.id) {
      this._idService.addNewId('section', this.id);
    } else {
      this.id = this._idService.getNewId('section');
    }
  }
}
