import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  AfterViewInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { TooltipApiDirective } from '../../../directives/tooltip/tooltip-api.directive';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisLabelHeightService } from '../../../services/dom/label-height.service';
import { FudisLabelData } from '../../../types/miscellaneous';

@Component({
  selector: 'fudis-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent extends TooltipApiDirective implements AfterViewInit, OnDestroy {
  constructor(
    protected _translationService: FudisTranslationService,
    private _labelHeightService: FudisLabelHeightService,
  ) {
    super();
  }

  /**
   * Template reference for dropdown item button element
   */
  @ViewChild('labelElementRef') private _labelElementRef: ElementRef<HTMLLabelElement>;

  /**
   * Id for label, e. g. used in Dropdown to link ngMaterial mat-select with 'aria-labelledby' to fudis-label
   */
  @Input({ required: true }) id: string;

  /**
   * Text visible as label
   */
  @Input({ required: true }) text: string;

  /**
   * HTML 'for' attribute. E.g. if text-input's id is 'text-input-1', give this id as 'for' attribute to the label
   */
  @Input() for: string;

  /**
   * Show text indicating if form element associated with the label is required or not
   */
  @Input() required: boolean | null;

  ngAfterViewInit(): void {
    const data: FudisLabelData = {
      id: this.id,
      element: this._labelElementRef.nativeElement,
    };

    this._labelHeightService.registerNewLabel(data);
  }

  ngOnDestroy(): void {
    this._labelHeightService.deleteLabelData(this.id);
  }
}
