import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, Subject } from 'rxjs';
import { FudisValidators } from '../../../../utilities/form/validators';
import {
  FudisErrorSummaryNewError,
  FudisErrorSummaryRemoveError,
} from '../../../../types/errorSummary';
import { ValidatorErrorMessageComponent } from './validator-error-message.component';
import { TextInputComponent } from '../../text-input/text-input.component';
import { GuidanceComponent } from '../../guidance/guidance.component';
import { LabelComponent } from '../../label/label.component';
import { IconComponent } from '../../../icon/icon.component';
import { getElement } from '../../../../utilities/tests/utilities';
import { FudisInternalErrorSummaryService } from '../../../../services/form/error-summary/internal-error-summary.service';

@Component({
  standalone: false,
  selector: 'fudis-text-input-with-validator-error-message',
  template: `
    <fudis-text-input
      [control]="textInputControl"
      [id]="'test-id'"
      [label]="'Test Label'"
    ></fudis-text-input>
  `,
})
class TextInputWithValidatorErrorMessageComponent {
  textInputControl: FormControl = new FormControl(
    '',
    FudisValidators.required('This field is required'),
  );
}

describe('ValidatorErrorMessageComponent', () => {
  let component: ValidatorErrorMessageComponent;
  let textInputComponent: TextInputWithValidatorErrorMessageComponent;

  let fixture:
    | ComponentFixture<TextInputWithValidatorErrorMessageComponent>
    | ComponentFixture<ValidatorErrorMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ValidatorErrorMessageComponent,
        TextInputWithValidatorErrorMessageComponent,
        TextInputComponent,
        GuidanceComponent,
        LabelComponent,
      ],
      imports: [IconComponent, ReactiveFormsModule],
      providers: [FudisInternalErrorSummaryService],
    }).compileComponents();
  });

  function showErrorMessage() {
    textInputComponent.textInputControl.markAllAsTouched();
  }

  describe('Parent component', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TextInputWithValidatorErrorMessageComponent);
      textInputComponent = fixture.componentInstance;
      fixture.detectChanges();
      showErrorMessage();
    });

    it('should display Validator Error Message, when control is touched', () => {
      const message = fixture.nativeElement.querySelector(
        'fudis-validator-error-message',
      ) as HTMLElement;

      expect(message).toBeTruthy();
    });

    it('should find correct id and label related to Validator Error Message', () => {
      const textInput = fixture.debugElement.query(By.css('fudis-text-input input'));
      const inputId = textInput.attributes['id'];

      const textInputLabel = fixture.debugElement.query(By.css('fudis-text-input label'));
      const labelText = textInputLabel.nativeElement.textContent;

      expect(inputId).toEqual('test-id');
      expect(labelText).toEqual('Test Label(Required)');
    });

    it('should pass Fudis Validator message to Validator Error Message', () => {
      fixture.detectChanges();

      const validatorComponent = fixture.nativeElement.querySelector(
        'fudis-validator-error-message',
      ) as HTMLElement;

      const message = validatorComponent.textContent;

      expect(message).toEqual('This field is required');
    });
  });

  describe('Validator Error Message', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ValidatorErrorMessageComponent);
      component = fixture.componentInstance;

      component.formId = 'test-form-id';
      component.focusId = 'test-id';
      component.label = 'Test label';
      component.type = 'required';
      component.visible = true;
      component.controlName = undefined;

      fixture.detectChanges();
    });

    it('should create error with string message when component is initialized', fakeAsync(() => {
      jest.spyOn(component.handleCreateError, 'emit');

      component.message = 'Message for testing';
      component.ngOnChanges({
        message: new SimpleChange(null, component.message, true),
      });

      fixture.detectChanges();

      // Flush the microtask so the deferred emit runs
      flushMicrotasks();

      const testError: FudisErrorSummaryNewError = {
        focusId: 'test-id',
        message: 'Test label: Message for testing',
        formId: 'test-form-id',
        id: 'required',
      };

      const errorElementText = getElement(fixture, '.fudis-error-message');

      expect(errorElementText.innerHTML).toEqual('Message for testing');
      expect(component.handleCreateError.emit).toHaveBeenCalledWith(testError);
    }));

    it('should remove error with string message when component is destroyed', () => {
      jest.spyOn(component.handleRemoveError, 'emit');
      component.message = 'Error to be removed';
      component.controlName = 'test-control-name';

      component.ngOnChanges({
        message: new SimpleChange(null, component.message, true),
        controlName: new SimpleChange(null, component.controlName, true),
      });

      const errorToRemove: FudisErrorSummaryRemoveError = {
        focusId: 'test-id',
        formId: 'test-form-id',
        id: 'required_test-control-name',
      };

      component.ngOnDestroy();
      expect(component.handleRemoveError.emit).toHaveBeenCalledWith(errorToRemove);
    });

    it('should create error with observable message when component is initialized and update it when observable updates', fakeAsync(() => {
      jest.spyOn(component.handleCreateError, 'emit');

      const messageAsObservable: Subject<string> = new BehaviorSubject<string>(
        'First message from observable',
      );
      component.message = messageAsObservable;

      component.ngOnChanges({
        message: new SimpleChange(null, component.message, true),
      });

      fixture.detectChanges();

      // Flush the microtask so the deferred emit runs
      flushMicrotasks();

      const testError: FudisErrorSummaryNewError = {
        focusId: 'test-id',
        formId: 'test-form-id',
        message: 'Test label: First message from observable',
        id: 'required',
      };

      const errorElementTextFirst = getElement(fixture, '.fudis-error-message');

      expect(errorElementTextFirst.innerHTML).toEqual('First message from observable');
      expect(component.handleCreateError.emit).toHaveBeenCalledWith(testError);

      messageAsObservable.next('Second message after update');

      fixture.detectChanges();

      // Flush the microtask so the deferred emit runs
      flushMicrotasks();

      const updatedError: FudisErrorSummaryNewError = {
        ...testError,
        message: 'Test label: Second message after update',
      };

      const errorElementTextSecond = getElement(fixture, '.fudis-error-message');

      expect(errorElementTextSecond.innerHTML).toEqual('Second message after update');
      expect(component.handleCreateError.emit).toHaveBeenCalledWith(updatedError);
    }));

    it('should remove error with observable message when component is destroyed', () => {
      jest.spyOn(component.handleRemoveError, 'emit');

      const removedMessageAsObservable: Subject<string> = new BehaviorSubject<string>(
        'Message to be removed',
      );

      component.message = removedMessageAsObservable;
      component.focusId = 'test-observable-message-id';
      component.type = 'required';
      component.controlName = undefined;

      component.ngOnChanges({
        message: new SimpleChange(null, component.message, true),
        focusId: new SimpleChange(null, component.focusId, true),
        type: new SimpleChange(null, component.type, true),
        controlName: new SimpleChange(null, component.controlName, true),
      });

      const errorToRemove: FudisErrorSummaryRemoveError = {
        focusId: 'test-observable-message-id',
        formId: 'test-form-id',
        id: 'required',
      };

      component.ngOnDestroy();

      expect(component.handleRemoveError.emit).toHaveBeenCalledWith(errorToRemove);
    });

    it('should update error message when label updates', fakeAsync(() => {
      jest.spyOn(component.handleCreateError, 'emit');

      const messageAsObservable: Subject<string> = new BehaviorSubject<string>(
        'First message from observable',
      );
      fixture.componentRef.setInput('message', messageAsObservable);
      fixture.detectChanges();

      // Flush the microtask so the deferred emit runs
      flushMicrotasks();

      const testError: FudisErrorSummaryNewError = {
        focusId: 'test-id',
        formId: 'test-form-id',
        message: 'Test label: First message from observable',
        id: 'required',
      };

      expect(component.handleCreateError.emit).toHaveBeenCalledWith(testError);

      fixture.componentRef.setInput('label', 'Better label');
      fixture.detectChanges();

      // Flush the microtask so the deferred emit runs
      flushMicrotasks();

      const updatedError: FudisErrorSummaryNewError = {
        ...testError,
        message: 'Better label: First message from observable',
      };

      expect(component.handleCreateError.emit).toHaveBeenCalledWith(updatedError);
    }));

    it('should update error message when formId updates', fakeAsync(() => {
      jest.spyOn(component.handleCreateError, 'emit');

      component.message = 'Message for testing';
      component.ngOnChanges({
        message: new SimpleChange(null, component.message, true),
      });

      // Flush the microtask so the deferred emit runs
      flushMicrotasks();

      const testError: FudisErrorSummaryNewError = {
        focusId: 'test-id',
        message: 'Test label: Message for testing',
        formId: 'test-form-id',
        id: 'required',
      };

      expect(component.handleCreateError.emit).toHaveBeenCalledWith(testError);

      fixture.componentRef.setInput('formId', 'new-form-id');
      fixture.detectChanges();

      component.ngOnChanges({
        focusId: new SimpleChange(null, component.focusId, true),
      });

      // Flush the microtask so the deferred emit runs
      flushMicrotasks();

      const updatedError: FudisErrorSummaryNewError = {
        focusId: 'test-id',
        message: 'Test label: Message for testing',
        formId: 'new-form-id',
        id: 'required',
      };

      expect(component.handleCreateError.emit).toHaveBeenCalledWith(updatedError);
    }));

    it('should not show error message if visibility conditions are not met', fakeAsync(() => {
      jest.spyOn(component.handleCreateError, 'emit');

      component.message = 'Message for testing';
      component.visible = false;
      component.ngOnChanges({
        message: new SimpleChange(null, component.message, true),
      });

      fixture.detectChanges();

      // Flush the microtask so the deferred emit runs
      flushMicrotasks();

      const testError: FudisErrorSummaryNewError = {
        focusId: 'test-id',
        message: 'Test label: Message for testing',
        formId: 'test-form-id',
        id: 'required',
      };

      const errorElementText = getElement(fixture, '.fudis-error-message');

      expect(errorElementText).toBeFalsy();
      expect(component.handleCreateError.emit).toHaveBeenCalledWith(testError);
    }));

    it('should have respective CSS class according to variant', () => {
      component.message = 'Message for testing';
      component.ngOnChanges({
        message: new SimpleChange(null, component.message, true),
      });

      fixture.detectChanges();

      const errorElement = getElement(fixture, '.fudis-error-message');

      expect(errorElement.className).toContain('fudis-error-message__form-error');

      fixture.componentRef.setInput('variant', 'body-text');
      fixture.detectChanges();

      expect(errorElement.className).toContain('fudis-error-message__body-text');
    });

    it('should have generated id', () => {
      component.message = 'Message for testing';
      component.ngOnChanges({
        message: new SimpleChange(null, component.message, true),
      });

      fixture.detectChanges();

      const errorElement = getElement(fixture, '.fudis-error-message');

      expect(errorElement.getAttribute('id')).toEqual('fudis-validator-error-message-1');
    });

    it('should throw console warning', () => {
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
      jest.useFakeTimers();

      component.ngAfterViewInit();
      jest.runAllTimers();

      expect(warn).toHaveBeenCalledWith(
        `Fudis component with id of 'test-id' is missing error message for error type of: 'required'`,
      );

      fixture.componentRef.setInput('controlName', 'test-control-name');
      fixture.detectChanges();

      component.ngAfterViewInit();
      jest.runAllTimers();

      expect(warn).toHaveBeenCalledWith(
        `Fudis component with id of 'test-id' and control name of 'test-control-name' is missing error message for error type of: 'required'`,
      );
    });
  });
});
