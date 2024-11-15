import { ComponentFixture, TestBed } from '@angular/core/testing';

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
import { FudisFocusService } from '../../../../services/focus/focus.service';
import { FudisInternalErrorSummaryService } from '../../../../services/form/error-summary/internal-error-summary.service';
import { FudisIdService } from '../../../../services/id/id.service';
import { FudisTranslationService } from '../../../../services/translation/translation.service';

// TODO: write tests for input visible, controlName and variant
@Component({
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ValidatorErrorMessageComponent,
        TextInputWithValidatorErrorMessageComponent,
        TextInputComponent,
        GuidanceComponent,
        IconComponent,
        LabelComponent,
      ],
      imports: [ReactiveFormsModule],
      providers: [
        FudisFocusService,
        FudisInternalErrorSummaryService,
        FudisIdService,
        FudisTranslationService,
      ],
    }).compileComponents();
  });

  function showErrorMessage() {
    textInputComponent.textInputControl.markAllAsTouched();
  }

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInputWithValidatorErrorMessageComponent);
    textInputComponent = fixture.componentInstance;
    fixture.detectChanges();
    showErrorMessage();
  });

  describe('Parent component', () => {
    it('should display Validator Error Message, when control is touched', () => {
      const message = fixture.nativeElement.querySelector(
        'fudis-validator-error-message',
      ) as HTMLElement;

      expect(message).toBeTruthy();
    });

    it('should pass id and label to Validator Error Message', () => {
      const message = fixture.debugElement.query(By.css('fudis-validator-error-message'));

      expect(message.attributes['ng-reflect-focus-id']).toEqual('test-id');
      expect(message.attributes['ng-reflect-label']).toEqual('Test Label');
    });

    it('should pass Fudis Validator type and message to Validator Error Message', () => {
      const message = fixture.debugElement.query(By.css('fudis-validator-error-message'));

      expect(message.attributes['ng-reflect-type']).toEqual('required');
      expect(message.attributes['ng-reflect-message']).toEqual('This field is required');
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

    it('should create error with string message when component is initialized', () => {
      jest.spyOn(component.handleCreateError, 'emit');
      component.message = 'Message for testing';
      component.ngOnChanges({
        message: new SimpleChange(null, component.message, true),
      });

      fixture.detectChanges();

      const testError: FudisErrorSummaryNewError = {
        id: 'test-id',
        error: 'Message for testing',
        formId: 'test-form-id',
        label: 'Test label',
        type: 'required',
        controlName: undefined,
      };

      const errorElementText = getElement(fixture, '.fudis-error-message');

      expect(errorElementText.innerHTML).toEqual('Message for testing');

      expect(component.handleCreateError.emit).toHaveBeenCalledWith(testError);
    });

    it('should remove error with string message when component is destroyed', () => {
      jest.spyOn(component.handleRemoveError, 'emit');
      component.message = 'Error to be removed';

      component.ngOnChanges({
        message: new SimpleChange(null, component.message, true),
      });

      const errorToRemove: FudisErrorSummaryRemoveError = {
        id: 'test-id',
        formId: 'test-form-id',
        type: 'required',
        controlName: undefined,
      };
      component.ngOnDestroy();
      expect(component.handleRemoveError.emit).toHaveBeenCalledWith(errorToRemove);
    });

    it('should create error message with observable message when component is initialized and update it when observable updates', async () => {
      const messageAsObservable: Subject<string> = new BehaviorSubject<string>(
        'First message from observable',
      );

      jest.spyOn(component.handleCreateError, 'emit');

      component.message = messageAsObservable;

      component.ngOnChanges({
        message: new SimpleChange(null, component.message, true),
      });

      fixture.detectChanges();

      const testError: FudisErrorSummaryNewError = {
        id: 'test-id',
        formId: 'test-form-id',
        error: 'First message from observable',
        label: 'Test label',
        type: 'required',
        controlName: undefined,
      };

      const errorElementTextFirst = getElement(fixture, '.fudis-error-message');

      expect(errorElementTextFirst.innerHTML).toEqual('First message from observable');

      expect(component.handleCreateError.emit).toHaveBeenCalledWith(testError);

      messageAsObservable.next('Second message after update');

      fixture.detectChanges();

      const updatedError: FudisErrorSummaryNewError = {
        ...testError,
        error: 'Second message after update',
      };

      const errorElementTextSecond = getElement(fixture, '.fudis-error-message');

      expect(errorElementTextSecond.innerHTML).toEqual('Second message after update');

      expect(component.handleCreateError.emit).toHaveBeenCalledWith(updatedError);
    });

    it('should remove error message with observable message when component is destroyed', () => {
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
        id: 'test-observable-message-id',
        formId: 'test-form-id',
        type: 'required',
        controlName: undefined,
      };

      component.ngOnDestroy();

      expect(component.handleRemoveError.emit).toHaveBeenCalledWith(errorToRemove);
    });

    it('should update error message when label updates', () => {
      const messageAsObservable: Subject<string> = new BehaviorSubject<string>(
        'First message from observable',
      );

      jest.spyOn(component.handleCreateError, 'emit');

      component.message = messageAsObservable;

      component.ngOnChanges({
        message: new SimpleChange(null, component.message, true),
      });

      const testError: FudisErrorSummaryNewError = {
        id: 'test-id',
        formId: 'test-form-id',
        error: 'First message from observable',
        label: 'Test label',
        type: 'required',
        controlName: undefined,
      };

      const updatedError: FudisErrorSummaryNewError = {
        ...testError,
        label: 'New better label',
      };

      expect(component.handleCreateError.emit).toHaveBeenCalledWith(testError);

      component.label = updatedError.label;

      component.ngOnChanges({
        label: new SimpleChange('Test label', component.label, false),
      });

      expect(component.handleCreateError.emit).toHaveBeenCalledWith(updatedError);
    });
  });
});
