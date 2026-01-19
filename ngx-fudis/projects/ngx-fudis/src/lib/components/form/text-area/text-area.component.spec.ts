/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { TextAreaComponent } from './text-area.component';
import { LabelComponent } from '../label/label.component';
import { GuidanceComponent } from '../guidance/guidance.component';
import { FudisInputSize } from '../../../types/forms';
import { FudisValidators } from '../../../utilities/form/validators';
import { IconButtonComponent } from '../../icon-button/icon-button.component';
import { IconComponent } from '../../icon/icon.component';
import { getElement } from '../../../utilities/tests/utilities';
import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';
import { PopoverDirective } from '../../../directives/popover/popover.directive';
import { ValidatorErrorMessageComponent } from '../error-message/validator-error-message/validator-error-message.component';

const textAreaControl: FormControl = new FormControl('');

describe('TextAreaComponent', () => {
  let component: TextAreaComponent;
  let fixture: ComponentFixture<TextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TextAreaComponent,
        GuidanceComponent,
        LabelComponent,
        ValidatorErrorMessageComponent,
      ],
      imports: [IconButtonComponent, IconComponent, ReactiveFormsModule, PopoverDirective],
      providers: [FudisInternalErrorSummaryService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAreaComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('control', textAreaControl);
  });

  function assertTextAreaHasClasses(classes: string): void {
    const childSpan = fixture.nativeElement.childNodes;
    const componentClasses = childSpan[0].className.split(' ').sort();

    expect(componentClasses).toEqual(classes.split(' ').sort());
  }

  function textAreaSizeCheck(size: FudisInputSize): void {
    fixture.componentRef.setInput('size', size);
    fixture.detectChanges();
    assertTextAreaHasClasses(`fudis-text-area fudis-input-size__${size}`);
  }

  it('should init the component successfully', () => {
    const { _updateValueAndValidityTrigger } = component as any;
    jest.spyOn(component as any, '_setControlValueSubscription');
    jest.spyOn(component as any, '_setComponentId');
    jest.spyOn(_updateValueAndValidityTrigger, 'next');

    fixture.detectChanges();

    expect(_updateValueAndValidityTrigger.next).toHaveBeenCalledTimes(1);
    expect((component as any)._setControlValueSubscription).toHaveBeenCalledTimes(1);
    expect((component as any)._setComponentId).toHaveBeenCalledTimes(1);
  });

  it('should destroy the component successfully', () => {
    fixture.detectChanges();
    expect((component as any)._subscription.closed).toBeFalsy();
    expect((component as any)._baseSubscription.closed).toBeFalsy();

    fixture.destroy();

    expect((component as any)._subscription.closed).toBeTruthy();
    expect((component as any)._baseSubscription.closed).toBeTruthy();
  });

  describe('HTML attributes', () => {
    beforeEach(() => fixture.detectChanges());

    it('should have generated id', () => {
      const inputElement = getElement(fixture, 'textarea');

      expect(inputElement.getAttribute('id')).toEqual('fudis-text-area-1');
    });

    it('should have custom id', () => {
      const inputElement = getElement(fixture, 'textarea');
      fixture.componentRef.setInput('id', 'my-custom-id');
      fixture.detectChanges();

      expect(inputElement.getAttribute('id')).toEqual('my-custom-id');
    });
  });

  describe('Control', () => {
    it('should not trigger valueChanges', () => {
      let didEmit = false;
      component.control.valueChanges.subscribe(() => (didEmit = true));
      fixture.detectChanges();
      expect(didEmit).toBeFalsy();
    });

    it('should set control as invalid if required textarea is touched and empty', () => {
      fixture.componentRef.setInput(
        'control',
        new FormControl('', FudisValidators.required('This is required')),
      );
      fixture.detectChanges();

      expect(component.control.value).toEqual('');

      let inputElement = getElement(fixture, 'textarea');
      expect(inputElement.getAttribute('aria-invalid')).toEqual(null);

      component.control.markAsTouched();
      fixture.detectChanges();

      inputElement = getElement(fixture, 'textarea');
      expect(inputElement.getAttribute('aria-invalid')).toEqual('true');
    });

    it('should set control as invalid if text is too short according to given minLength validator value', () => {
      fixture.detectChanges();
      component.control = new FormControl('', [FudisValidators.minLength(10, 'Too short')]);
      component.control.patchValue('too short');

      expect(component.control.value).toEqual('too short');
      expect(component.control.invalid).toBeTruthy();
    });

    it('should set control as invalid if text is too long according to given maxLength validator value', () => {
      fixture.detectChanges();
      component.control = new FormControl('', [FudisValidators.maxLength(10, 'Too long text')]);
      component.control.patchValue('too longy long text');

      expect(component.control.value).toEqual('too longy long text');
      expect(component.control.invalid).toBeTruthy();
    });

    it('should be disabled', () => {
      fixture.detectChanges();
      const inputElement = getElement(fixture, 'textarea');

      component.control.disable(); // Disabled through control
      fixture.detectChanges();

      expect(component.control.disabled).toBeTruthy();
      expect(inputElement.getAttribute('disabled')).toEqual('');
      expect(inputElement.getAttribute('readonly')).toEqual('');
      expect(inputElement.getAttribute('aria-disabled')).toEqual('true');

      component.control.enable();
      fixture.detectChanges();

      expect(inputElement.getAttribute('disabled')).toBeNull();
      expect(inputElement.getAttribute('readonly')).toBeNull();
      expect(inputElement.getAttribute('aria-disabled')).toBeNull();

      fixture.componentRef.setInput('disabled', true); // Disable through Input property
      fixture.detectChanges();

      expect(inputElement.getAttribute('disabled')).toBeNull();
      expect(inputElement.getAttribute('readonly')).toEqual('');
      expect(inputElement.getAttribute('aria-disabled')).toEqual('true');
    });
  });

  describe('CSS classes', () => {
    it('should have respective classes according to given size Input', () => {
      fixture.detectChanges();
      textAreaSizeCheck('sm');
      textAreaSizeCheck('md');
      textAreaSizeCheck('lg');
    });
  });

  describe('Popover', () => {
    it('should be visible', () => {
      fixture.detectChanges();
      fixture.componentRef.setInput('popoverTriggerLabel', 'Additional information');
      fixture.componentRef.setInput('popoverText', 'This is popover text');
      fixture.detectChanges();

      const popoverTriggerElem = getElement(fixture, 'button');

      expect(popoverTriggerElem).toBeTruthy();
      expect(popoverTriggerElem.getAttribute('aria-label')).toEqual('Additional information');
      expect(popoverTriggerElem.getAttribute('ng-reflect-popover-text')).toEqual(
        'This is popover text',
      );
    });
  });
});
