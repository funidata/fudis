import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { MockComponents } from 'ng-mocks';
import { BehaviorSubject } from 'rxjs';
import { IconComponent } from '../../../icon/icon.component';
import { FudisValidationErrors, FudisValidators } from '../../../../utilities/form/validators';
import { ErrorMessageComponent } from './error-message.component';
import { TextInputComponent } from '../../text-input/text-input.component';
import { LabelComponent } from '../../label/label.component';
import { GuidanceComponent } from '../../guidance/guidance.component';
import { ValidatorErrorMessageComponent } from '../validator-error-message/validator-error-message.component';

const observableMessage = new BehaviorSubject<string>('Test error message');

const controlErrors = {
  required: {
    message: 'This is required',
  },
  'fudis-error-message-1': {
    message: observableMessage,
  },
};

const controlOnlyRequiredError = {
  required: {
    message: 'This is required',
  },
};

const errorReceived: FudisValidationErrors = {
  'fudis-error-message-1': {
    message: 'Test error message',
  },
};

const errorToRemove: FudisValidationErrors = {
  'fudis-error-message-1': {
    message: 'Test error message',
  },
};

@Component({
  selector: 'fudis-mock-test-error',
  template: `
    <fudis-text-input [control]="control" [label]="'Test label'">
      <fudis-error-message #testError *ngIf="errorVisible" [message]="message" />
    </fudis-text-input>
  `,
})
class MockTestErrorComponent {
  @ViewChild('testError') testError: ErrorMessageComponent;

  message = 'Test error message';

  errorVisible: boolean;

  control: FormControl = new FormControl('', FudisValidators.required('This is required'));
}

describe('ErrorMessageComponent', () => {
  let component: MockTestErrorComponent;
  let fixture: ComponentFixture<MockTestErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ErrorMessageComponent,
        IconComponent,
        MockTestErrorComponent,
        TextInputComponent,
        ValidatorErrorMessageComponent,
        MockComponents(LabelComponent, GuidanceComponent),
      ],
      imports: [ReactiveFormsModule],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockTestErrorComponent);
    component = fixture.componentInstance;
    component.errorVisible = false;
    fixture.detectChanges();
  });

  describe('set control validators', () => {
    beforeEach(() => {
      component.errorVisible = true;
      fixture.detectChanges();
    });

    it('should emit addError', () => {
      jest.spyOn(component.testError.handleAddError, 'emit');
      component.testError.ngOnInit();
      fixture.detectChanges();

      expect(component.testError.handleAddError.emit).toHaveBeenCalledWith(errorReceived);
    });

    it('should have proper errors in control when component is created', () => {
      expect(component.control.errors).toEqual(controlErrors);
    });

    it('should have only required error in control when component is destroyed', () => {
      component.errorVisible = false;
      fixture.detectChanges();

      expect(component.control.errors).toEqual(controlOnlyRequiredError);
    });

    it('should emit removeError message when component is destroyed', () => {
      jest.spyOn(component.testError.handleRemoveError, 'emit');
      component.testError.ngOnDestroy();
      fixture.detectChanges();

      expect(component.testError.handleRemoveError.emit).toHaveBeenCalledWith(errorToRemove);
    });

    it('should have first invalid and then valid control when all errors are removed', () => {
      expect(component.control.invalid).toBe(true);
      component.control.patchValue('Add value to remove required error');
      component.errorVisible = false;

      fixture.detectChanges();

      expect(component.control.errors).toBe(null);
      expect(component.control.valid).toBe(true);
    });

    it('should update string message', () => {
      const newError = 'Error message updated';

      observableMessage.next(newError);
      component.message = newError;
      fixture.detectChanges();

      expect(component.control.errors).toEqual(controlErrors);
    });
  });
});
