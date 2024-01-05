/* eslint-disable max-classes-per-file */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';
import { BehaviorSubject, Subject } from 'rxjs';
import { FudisValidators } from '../../../../utilities/form/validators';
import {
  FudisFormErrorSummaryItem,
  FudisFormErrorSummaryRemoveItem,
} from '../../../../types/forms';
import { ValidatorErrorMessageComponent } from './validator-error-message.component';
import { TextInputComponent } from '../../text-input/text-input.component';
import { GuidanceComponent } from '../../guidance/guidance.component';
import { LabelComponent } from '../../label/label.component';
import { IconComponent } from '../../../icon/icon.component';

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
        LabelComponent,
        MockComponent(IconComponent),
      ],
      imports: [ReactiveFormsModule],
      providers: [],
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
      component.focusId = 'test-id';
      component.label = 'Test label';
      component.type = 'required';
      component.controlName = undefined;
      fixture.detectChanges();
    });

    it('should create error with string message when component is initialized', () => {
      component.message = 'Message for testing';

      fixture.detectChanges();
      jest.spyOn(component.handleCreateError, 'emit');

      const testError: FudisFormErrorSummaryItem = {
        id: 'test-id',
        error: 'Message for testing',
        label: 'Test label',
        type: 'required',
        controlName: undefined,
        language: 'en',
      };

      component.ngOnInit();
      fixture.detectChanges();

      expect(component.handleCreateError.emit).toHaveBeenCalledWith(testError);
    });

    it('should remove error with string message when component is destroyed', () => {
      jest.spyOn(component.handleRemoveError, 'emit');
      component.message = 'Error to be removed';

      component.ngOnInit();
      fixture.detectChanges();

      const errorToRemove: FudisFormErrorSummaryRemoveItem = {
        id: 'test-id',
        type: 'required',
        controlName: undefined,
      };

      component.ngOnDestroy();
      fixture.detectChanges();

      expect(component.handleRemoveError.emit).toHaveBeenCalledWith(errorToRemove);
    });

    it('should create error message with observable message when component is initialized and update it when observable updates', () => {
      const messageAsObservable: Subject<string> = new BehaviorSubject<string>(
        'First message from observable',
      );

      component.message = messageAsObservable;

      fixture.detectChanges();
      jest.spyOn(component.handleCreateError, 'emit');

      const testError: FudisFormErrorSummaryItem = {
        id: 'test-id',
        error: 'First message from observable',
        label: 'Test label',
        type: 'required',
        controlName: undefined,
        language: 'en',
      };

      component.ngOnInit();
      fixture.detectChanges();

      expect(component.handleCreateError.emit).toHaveBeenCalledWith(testError);

      messageAsObservable.next('Second message after update');

      const updatedError: FudisFormErrorSummaryItem = {
        ...testError,
        error: 'Second message after update',
      };

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

      component.ngOnInit();
      fixture.detectChanges();

      const errorToRemove: FudisFormErrorSummaryRemoveItem = {
        id: 'test-observable-message-id',
        type: 'required',
        controlName: undefined,
      };

      component.ngOnDestroy();
      fixture.detectChanges();

      expect(component.handleRemoveError.emit).toHaveBeenCalledWith(errorToRemove);
    });

    it('should update error message when label updates', () => {
      const messageAsObservable: Subject<string> = new BehaviorSubject<string>(
        'First message from observable',
      );

      component.message = messageAsObservable;

      fixture.detectChanges();
      jest.spyOn(component.handleCreateError, 'emit');

      const testError: FudisFormErrorSummaryItem = {
        id: 'test-id',
        error: 'First message from observable',
        label: 'Test label',
        type: 'required',
        controlName: undefined,
        language: 'en',
      };

      component.ngOnInit();
      fixture.detectChanges();

      expect(component.handleCreateError.emit).toHaveBeenCalledWith(testError);

      component.label = 'New better label';

      const updatedError: FudisFormErrorSummaryItem = {
        ...testError,
        label: 'New better label',
      };
      component.ngOnChanges();
      fixture.detectChanges();

      expect(component.handleCreateError.emit).toHaveBeenCalledWith(updatedError);
    });
  });
});
