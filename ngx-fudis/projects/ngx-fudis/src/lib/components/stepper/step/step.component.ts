import { Component, Input } from '@angular/core';

@Component({
  selector: 'fudis-step',
  imports: [],
  templateUrl: './step.component.html',
  styleUrl: './step.component.scss',
})
export class StepComponent {
  @Input({ required: true }) label: string;
  @Input({ required: true }) index: number;
  @Input({ required: true }) totalSteps: number;
  @Input({ required: true }) orientation: 'horizontal' | 'vertical';
  @Input() isCurrent: boolean;
  @Input() isDone: boolean;
  @Input({ required: true }) stepTranslation: string;
}
