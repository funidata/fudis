import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FudisTranslationService } from '../../../../public-api';

@Component({
  selector: 'fudis-step',
  imports: [],
  templateUrl: './step.component.html',
  styleUrl: './step.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepComponent {
  constructor(protected _translationService: FudisTranslationService) {}

  /**
   * Visible label of the step.
   */
  @Input({ required: true }) label: string;

  /**
   * Index of the step. Starts from 0.
   */
  @Input({ required: true }) index: number;

  /**
   * Total number of steps in the stepper.
   */
  @Input({ required: true }) totalSteps: number;

  /**
   * Index of the currently active step.
   */
  @Input({ required: true }) currentStepIndex: number;

  /**
   * Orientation of the stepper steps.
   */
  @Input({ required: true }) orientation: 'horizontal' | 'vertical';

  /**
   * Whether the step has been completed.
   */
  protected get isCompleted(): boolean {
    return this.index < this.currentStepIndex;
  }

  /**
   * Whether the step is the currently active step.
   */
  protected get isCurrent(): boolean {
    return this.index === this.currentStepIndex;
  }

  /**
   * ARIA label for the step, describing its state and position within the stepper.
   */
  protected get ariaLabel(): string {
    const translations = this._translationService.getTranslations()().STEPPER.STEP;

    return (
      `${this.isCompleted ? `${translations.COMPLETED} ` : ''}` +
      `${translations.ARIA_LABEL_PREFIX} ${this.index + 1}/${this.totalSteps} ${this.label}`
    );
  }
}
