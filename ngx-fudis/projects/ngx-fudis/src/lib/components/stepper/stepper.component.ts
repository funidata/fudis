import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { StepComponent } from './step/step.component';

interface StepItem {
  label: string;
}

/**
 * Show progress of a processthrough a series of steps.
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
  imports: [StepComponent],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class StepperComponent {
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
}
