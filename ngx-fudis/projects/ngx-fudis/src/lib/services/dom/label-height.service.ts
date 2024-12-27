import { Inject, Injectable } from '@angular/core';
import { FudisLabelData } from '../../types/miscellaneous';
import { DOCUMENT } from '@angular/common';
import { debounceTime, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class FudisLabelHeightService {
  constructor(@Inject(DOCUMENT) private _document: Document) {
    // Observe resizes of window
    fromEvent(window, 'resize')
      .pipe(takeUntilDestroyed(), debounceTime(25))
      .subscribe(() => {
        this.triggerLabelHeightSet(null);
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

    this.triggerLabelHeightSet(data.id);
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
  public triggerLabelHeightSet(triggerId: string | null): void {
    this._labelCalculateGuard = triggerId;
    setTimeout(() => {
      if (this._labelCalculateGuard === triggerId) {
        this._labelData = this._calculateLabelHeights();
        this._setLabelHeights();
        this._labelCalculateGuard = null;
      }
    }, 50);
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
