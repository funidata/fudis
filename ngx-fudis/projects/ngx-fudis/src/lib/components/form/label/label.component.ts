import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  OnChanges,
} from '@angular/core';
import { TooltipApiDirective } from '../../../directives/tooltip/tooltip-api.directive';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisLabelHeightService } from '../../../services/dom/label-height.service';
import { FudisComponentChanges, FudisLabelData } from '../../../types/miscellaneous';
import { FudisInputSize } from '../../../types/forms';
import { throttle } from '../../../utilities/resizeThrottle';

@Component({
  selector: 'fudis-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent
  extends TooltipApiDirective
  implements AfterViewInit, OnDestroy, OnChanges
{
  constructor(
    protected _translationService: FudisTranslationService,
    private _labelHeightService: FudisLabelHeightService,
  ) {
    super();

    this._resizeObserver = new ResizeObserver(
      throttle(() => {
        _labelHeightService.triggerLabelHeightSet(this.id);
      }, 25),
    );
  }

  /**
   * Template reference Label HTML element
   */
  @ViewChild('labelElementRef') private _labelElementRef: ElementRef<HTMLLabelElement>;

  /**
   * Id for label, e. g. used in Dropdown to link ngMaterial mat-select with 'aria-labelledby' to
   * fudis-label
   */
  @Input({ required: true }) id: string;

  /**
   * Text visible as label
   */
  @Input({ required: true }) text: string;

  /**
   * HTML 'for' attribute. E.g. if text-input's id is 'text-input-1', give this id as 'for'
   * attribute to the label
   */
  @Input() for: string;

  /**
   * Show text indicating if form element associated with the label is required or not
   */
  @Input() required: boolean | null;

  /**
   * Size of Label's parent. Used to trigger Label height calculation if parent's size changes.
   */
  @Input() parentSize: FudisInputSize | 'xs';

  /**
   * To observe size changes of this Label and trigger height calculation as needed
   */
  private _resizeObserver: ResizeObserver;

  ngOnChanges(changes: FudisComponentChanges<LabelComponent>): void {
    const requiredChange =
      changes.required &&
      changes.required.currentValue !== changes.required.previousValue &&
      !changes.required.firstChange;

    const textChange =
      changes.text &&
      changes.text.currentValue !== changes.text.previousValue &&
      !changes.text.firstChange;

    const sizeChange =
      changes.parentSize &&
      changes.parentSize.currentValue !== changes.parentSize.previousValue &&
      !changes.parentSize.firstChange;

    if (requiredChange || textChange || sizeChange) {
      const data: FudisLabelData = {
        id: this.id,
        element: this._labelElementRef.nativeElement,
      };

      this._labelHeightService.registerNewLabel(data);
    }
  }

  ngAfterViewInit(): void {
    const data: FudisLabelData = {
      id: this.id,
      element: this._labelElementRef.nativeElement,
    };

    this._labelHeightService.registerNewLabel(data);

    this._resizeObserver.observe(this._labelElementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this._resizeObserver.disconnect();
    this._labelHeightService.deleteLabelData(this.id);
  }
}
