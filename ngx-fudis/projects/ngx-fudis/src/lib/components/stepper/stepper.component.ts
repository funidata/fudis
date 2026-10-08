import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { FudisTranslationService } from '../../services/translation/translation.service';

interface StepItem {
  label: string;
}

/**
 * Show progress of a process through a series of steps.
 *
 * @example
 *   ```html
 *   <fudis-stepper
 *     [currentStepIndex]="0"
 *     [orientation]="'horizontal'"
 *     [stepList]="[
 *       { label: 'Step 1' },
 *       { label: 'Step 2' },
 *       { label: 'Step 3' }
 *     ]">
 *   </fudis-stepper>
 *   ```;
 */
@Component({
  selector: 'fudis-stepper',
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class StepperComponent {
  constructor(protected _translationService: FudisTranslationService) {}
  /**
   * Index of the currently active step. Indices start from 0.
   */
  @Input({ required: true }) currentStepIndex: number;

  /**
   * Orientation of the stepper steps.
   */
  @Input({ required: true }) orientation: 'horizontal' | 'vertical';

  /**
   * List of steps in the stepper.
   */
  @Input({ required: true }) stepList: StepItem[];

  protected isCompleted(index: number): boolean {
    return index < this.currentStepIndex;
  }

  protected isCurrent(index: number): boolean {
    return index === this.currentStepIndex;
  }

  protected getStepAriaLabel(index: number, label: string): string {
    const translations = this._translationService.getTranslations()().STEPPER.STEP;

    return (
      `${this.isCompleted(index) ? `${translations.COMPLETED} ` : ''}` +
      `${translations.ARIA_LABEL_PREFIX} ${index + 1}/${this.stepList.length} ${label}`
    );
  }
}
