import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StepperComponent } from './stepper.component';

@Component({
  selector: 'fudis-stepper-test-host',
  imports: [StepperComponent],
  template: `
    <fudis-stepper
      [currentStepIndex]="currentStepIndex"
      [orientation]="orientation"
      [stepList]="stepList"
    ></fudis-stepper>
  `,
})
class TestHostComponent {
  currentStepIndex = 1;
  orientation: 'horizontal' | 'vertical' = 'horizontal';
  stepList = [{ label: 'First step' }, { label: 'Current step' }, { label: 'Last step' }];
}

describe('StepperComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it.each(['horizontal', 'vertical'] as const)(
    'passes the step state to each child step in %s orientation',
    (orientation) => {
      hostComponent.orientation = orientation;
      fixture.detectChanges();

      const stepper = fixture.nativeElement.querySelector('nav ol');
      expect(stepper).toBeTruthy();
      expect(stepper.getAttribute('aria-label')).toBe('Action steps');

      const steps = fixture.nativeElement.querySelectorAll('li');
      expect(steps).toHaveLength(3);

      expect(steps[0].textContent).toContain('First step');
      expect(steps[1].textContent).toContain('Current step');
      expect(steps[2].textContent).toContain('Last step');
      expect(steps[0].getAttribute('aria-label')).toBe('Completed Step 1/3 First step');
      expect(steps[1].getAttribute('aria-label')).toBe('Step 2/3 Current step');
      expect(steps[2].getAttribute('aria-label')).toBe('Step 3/3 Last step');
      expect(steps[1].getAttribute('aria-current')).toBe('step');
      expect(steps[0].getAttribute('aria-current')).toBeNull();
    },
  );
});
