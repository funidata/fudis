import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  AfterContentInit,
} from '@angular/core';
import { FudisIdService } from '../../services/id/id.service';
import { FudisHeadingVariant, FudisHeadingLevel } from '../../types/typography';
import { FudisGridWidth, FudisGridAlign } from '../../types/grid';
import { TooltipApiDirective } from '../../directives/tooltip/tooltip-api.directive';
import { FudisComponentChanges, FudisBadgeVariant } from '../../types/miscellaneous';
import { FudisInternalErrorSummaryService } from '../../services/form/error-summary/internal-error-summary.service';
import { BehaviorSubject } from 'rxjs';
import { getHeadingVariant } from '../../utilities/typography/typography-utils';

@Component({
  selector: 'fudis-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SectionComponent
  extends TooltipApiDirective
  implements OnInit, OnChanges, OnDestroy, AfterContentInit
{
  constructor(
    private _element: ElementRef,
    private _idService: FudisIdService,
    private _errorSummaryService: FudisInternalErrorSummaryService,
  ) {
    super();
  }

  /**
   * Section title
   */
  @Input({ required: true }) title: string;

  /**
   * Heading level for the section title
   */
  @Input({ required: true }) level: FudisHeadingLevel;

  /**
   * Heading variant for the section title
   */
  @Input() titleVariant: FudisHeadingVariant;

  /**
   * Section id
   */
  @Input() id: string;

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
   * Custom CSS classes
   */
  @Input() classes: string;

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
  protected _classList = new BehaviorSubject<string>('');

  /**
   * Is info sent to error summary service
   */
  private _errorSummaryInfoSent: boolean = false;

  private _parentFormId: string | null;

  ngOnInit(): void {
    this._setSectionId();

    if (!this.titleVariant) {
      this.titleVariant = getHeadingVariant(this.level);
    }

    this._headingId = `${this.id}-heading`;
    this._classList.next(this._getClasses());
    this._addToErrorSummary();
  }

  ngAfterContentInit(): void {
    this._errorSummaryService
      .getFormAncestorId(this._element.nativeElement)
      .then((parentFormId) => {
        if (parentFormId) {
          this._parentFormId = parentFormId;
          this._addToErrorSummary();
        }
      });
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
    if (this.errorSummaryBreadcrumb && this._parentFormId) {
      const errorSummaryInfo = {
        id: this.id,
        formId: this._parentFormId,
        title: this.title,
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
      this._errorSummaryService.removeSection(this._parentFormId, this.id);
    }
  }

  /**
   * Set main CSS class with possible custom classes
   */
  private _getClasses(): string {
    if (this.classes) {
      return `fudis-section ${this.classes}`;
    } else {
      return 'fudis-section';
    }
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
