import { Inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, fromEvent } from 'rxjs';
import { FudisLabelData } from '../../types/miscellaneous';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class FudisLabelHeightService {
  constructor(@Inject(DOCUMENT) private _document: Document) {
    fromEvent(window, 'resize')
      .pipe(takeUntilDestroyed(), debounceTime(10))
      .subscribe(() => {
        this.triggerLabelHeightSet();
      });
  }

  /**
   * Collection of Labels
   */
  private _labelData: FudisLabelData[] = [];

  /**
   * Used to prevent multiple calculation calls
   */
  private _labelCalculateGuard: string | null;

  /**
   * Register new Label to service. Triggers calculation of all Labels
   * @param data
   */
  public registerNewLabel(data: FudisLabelData): void {
    this._labelData.push(data);

    this._labelCalculateGuard = data.id;

    setTimeout(() => {
      if (this._labelCalculateGuard === data.id) {
        this.triggerLabelHeightSet();
      }
    }, 10);
  }

  /**
   * Delete Label from service
   * @param id
   */
  public deleteLabelData(id: string): void {
    const index = this._labelData.findIndex((item) => item.id === id);

    if (index) {
      this._labelData.splice(index, 1);
    }
  }

  /**
   * Calculate Label heights and match and set heights
   */
  public triggerLabelHeightSet(): void {
    this._labelData = this._calculateLabelHeights();
    this._setLabelHeights();
    this._labelCalculateGuard = null;
  }

  /**
   * Calculate height and position of all registered Labels
   * @returns FudisLabelData array with freshly calculated values
   */
  private _calculateLabelHeights(): FudisLabelData[] {
    const labelDataCopy = [...this._labelData];

    // Get height and y position of each Label
    labelDataCopy.forEach((option, index) => {
      const yPosition = option.element.getBoundingClientRect().y;

      // Reset the height, as it might have been modified
      option.element.style.height = 'initial';

      const height = option.element.offsetHeight;

      const data: FudisLabelData = {
        id: option.id,
        element: option.element,
        height,
        yPosition,
      };

      labelDataCopy[index] = data;
    });

    return labelDataCopy;
  }

  /**
   *
   * @returns
   */
  private _setLabelHeights(): void {
    const fontSize = Number(
      window.getComputedStyle(this._document.body).getPropertyValue('font-size').replace('px', ''),
    );

    const labelGroups: { [key: string]: { highest: number; data: FudisLabelData[] } } = {};

    this._labelData.forEach((option) => {
      const optionYPosition = Math.round(option.yPosition!).toString();

      const optionHeight = option.height!;

      if (!labelGroups[optionYPosition]) {
        labelGroups[optionYPosition] = { highest: optionHeight, data: [option] };
      } else {
        labelGroups[optionYPosition].data.push(option);

        if (labelGroups[optionYPosition].highest < optionHeight) {
          labelGroups[optionYPosition].highest = optionHeight;
        }
      }
    });

    Object.keys(labelGroups).forEach((groupKey) => {
      const height = labelGroups[groupKey].highest;

      labelGroups[groupKey].data.forEach((option) => {
        option.element.style.height = `${height / fontSize}rem`;
      });
    });
  }
}
