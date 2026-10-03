import { Component, Input } from '@angular/core';
import { StepComponent } from './step/step.component';

interface StepItem {
  label: string;
}

@Component({
  selector: 'fudis-stepper',
  imports: [StepComponent],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
})
export class StepperComponent {
  @Input({ required: true }) currentStepIndex: number;
  @Input({ required: true }) orientation: "horizontal" | "vertical";
  @Input({ required: true }) label: StepItem[];
  @Input({ required: true }) stepTranslation: string;
  @Input({ required: true }) stepList: StepItem[];
}
