import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { MockComponents } from 'ng-mocks';
import { IconComponent } from '../../../icon/icon.component';
import { FudisValidationErrors, FudisValidators } from '../../../../utilities/form/validators';
import { ErrorMessageComponent } from './error-message.component';
import { TextInputComponent } from '../../text-input/text-input.component';
import { LabelComponent } from '../../label/label.component';
import { GuidanceComponent } from '../../guidance/guidance.component';
import { FudisInternalErrorSummaryService } from '../../../../services/form/error-summary/internal-error-summary.service';
import { ValidatorErrorMessageComponent } from '../validator-error-message/validator-error-message.component';

const controlErrors = {
  required: {
    message: 'This is required',
  },
  'fudis-error-message-1': {
    message: 'Test error message',
  },
};

const controlOnlyRequiredError = {
  required: {
    message: 'This is required',
  },
};

@Component({
  selector: 'fudis-mock-test-error',
  template: `
    <fudis-text-input [control]="control" [label]="'Test label'">
      <fudis-error-message #testError [visible]="errorVisible" [message]="'Test error message'" />
    </fudis-text-input>
  `,
})
class MockTestErrorComponent {
  constructor(private _errorSummaryService: FudisInternalErrorSummaryService) {}

  @ViewChild('testError') testError: ErrorMessageComponent;

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
      fixture.detectChanges();
    });

    it('should emit addError and have proper errors in control when component is created with visible true', () => {
      component.errorVisible = true;
      jest.spyOn(component.testError.handleAddError, 'emit');

      const errorReceived: FudisValidationErrors = {
        'fudis-error-message-1': {
          message: 'Test error message',
        },
      };

      component.testError.ngOnInit();
      fixture.detectChanges();

      expect(component.control.errors).toEqual(controlErrors);
      expect(component.testError.handleAddError.emit).toHaveBeenCalledWith(errorReceived);
    });

    it('should not emit addError before changing visibility to true', () => {
      component.testError.visible = false;
      jest.spyOn(component.testError.handleAddError, 'emit');

      const errorReceived: FudisValidationErrors = {
        'fudis-error-message-1': {
          message: 'Test error message',
        },
      };

      component.testError.ngOnInit();
      fixture.detectChanges();

      expect(component.control.errors).toEqual(controlOnlyRequiredError);
      expect(component.testError.handleAddError.emit).not.toHaveBeenCalled();
      component.testError.visible = true;
      component.testError.ngOnChanges();
      fixture.detectChanges();

      expect(component.control.errors).toEqual(controlErrors);
      expect(component.testError.handleAddError.emit).toHaveBeenCalledWith(errorReceived);
    });

    it('should emit removeError when visible changes to false', () => {
      jest.spyOn(component.testError.handleRemoveError, 'emit');

      const errorReceived: FudisValidationErrors = {
        'fudis-error-message-1': {
          message: 'Test error message',
        },
      };
      component.testError.visible = true;
      component.testError.ngOnInit();
      component.testError.visible = false;
      component.testError.ngOnChanges();
      fixture.detectChanges();

      expect(component.testError.handleRemoveError.emit).toHaveBeenCalledWith(errorReceived);
    });

    it('should emit removeError message when component is destroyed', () => {
      jest.spyOn(component.testError.handleRemoveError, 'emit');
      component.testError.visible = true;
      component.testError.ngOnInit();
      fixture.detectChanges();

      const errorToRemove: FudisValidationErrors = {
        'fudis-error-message-1': {
          message: 'Test error message',
        },
      };

      expect(component.control.errors).toEqual(controlErrors);
      component.control.patchValue('Add value to remove required error');

      expect(component.control.invalid).toBe(true);

      component.testError.ngOnDestroy();
      fixture.detectChanges();

      expect(component.testError.handleRemoveError.emit).toHaveBeenCalledWith(errorToRemove);

      expect(component.control.errors).toBe(null);
      expect(component.control.valid).toBe(true);
    });
  });
});
