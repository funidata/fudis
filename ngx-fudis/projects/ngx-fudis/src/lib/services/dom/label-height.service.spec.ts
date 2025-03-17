import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FudisLabelHeightService } from './label-height.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../components/button/button.component';
import { GuidanceComponent } from '../../components/form/guidance/guidance.component';
import { IconComponent } from '../../components/icon/icon.component';
import { LabelComponent } from '../../components/form/label/label.component';
import { TextInputComponent } from '../../components/form/text-input/text-input.component';
import { FudisInternalErrorSummaryService } from '../form/error-summary/internal-error-summary.service';

@Component({
  standalone: false,
  selector: 'mock-text-input',
  template: `<fudis-text-input
    [id]="'my-test-id'"
    [control]="control"
    [label]="'Test label'"
  ></fudis-text-input>`,
})
class MockTextInputComponent {
  control: FormControl = new FormControl('');
}

describe('LabelHeightService', () => {
  let service: FudisLabelHeightService;
  let fixture: ComponentFixture<MockTextInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockTextInputComponent,
        ButtonComponent,
        GuidanceComponent,
        IconComponent,
        LabelComponent,
        TextInputComponent,
      ],
      imports: [ReactiveFormsModule],
      providers: [FudisInternalErrorSummaryService],
    });

    fixture = TestBed.createComponent(MockTextInputComponent);
  });

  beforeEach(() => {
    service = TestBed.inject(FudisLabelHeightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call registerNewLabel when component with label is initialized', () => {
    const register = jest.spyOn(service, 'registerNewLabel');
    fixture.detectChanges();

    const labelElement = fixture.nativeElement.querySelector('label');

    expect(register).toHaveBeenCalledWith({
      id: 'my-test-id-label',
      element: labelElement as HTMLLabelElement,
    });
  });

  it('should call triggerLabelHeightSet when component with label is initialized', () => {
    const triggerCalculation = jest.spyOn(service, 'triggerLabelHeightSet');
    fixture.detectChanges();

    expect(triggerCalculation).toHaveBeenCalledWith('my-test-id-label');
  });

  it('should call deleteLabelData when component with label is destroyed', () => {
    const deleteData = jest.spyOn(service, 'deleteLabelData');
    fixture.destroy();

    expect(deleteData).toHaveBeenCalled();
  });
});
