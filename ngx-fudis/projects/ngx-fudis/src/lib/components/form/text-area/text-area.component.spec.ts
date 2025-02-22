import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { TextAreaComponent } from './text-area.component';
import { LabelComponent } from '../label/label.component';
import { GuidanceComponent } from '../guidance/guidance.component';
import { FudisInputSize } from '../../../types/forms';
import { FudisValidators } from '../../../utilities/form/validators';
import { TooltipApiDirective } from '../../../directives/tooltip/tooltip-api.directive';
import { ButtonComponent } from '../../button/button.component';
import { IconComponent } from '../../icon/icon.component';
import { TooltipDirective } from '../../../directives/tooltip/tooltip.directive';
import { getElement } from '../../../utilities/tests/utilities';
import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';

const textAreaControl: FormControl = new FormControl('');

describe('TextAreaComponent', () => {
  let component: TextAreaComponent;
  let fixture: ComponentFixture<TextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TextAreaComponent,
        ButtonComponent,
        GuidanceComponent,
        IconComponent,
        LabelComponent,
        TooltipDirective,
        TooltipApiDirective,
      ],
      imports: [ReactiveFormsModule],
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { _updateValueAndValidityTrigger } = component as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn(component as any, '_setControlValueSubscription');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn(component as any, '_setComponentId');
    jest.spyOn(_updateValueAndValidityTrigger, 'next');

    fixture.detectChanges();

    expect(_updateValueAndValidityTrigger.next).toHaveBeenCalledTimes(1);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((component as any)._setControlValueSubscription).toHaveBeenCalledTimes(1);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((component as any)._setComponentId).toHaveBeenCalledTimes(1);
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

    it('should unsubscribe on destroy', () => {
      fixture.detectChanges();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((component as any)._subscription.closed).toBeFalsy();

      fixture.destroy();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((component as any)._subscription.closed).toBeTruthy();
    });

    it('should set control as invalid if required textarea is touched and empty', () => {
      fixture.detectChanges();
      component.control = new FormControl('', FudisValidators.required('This is required'));

      expect(component.control.value).toEqual('');
      expect(component.control.invalid).toBeTruthy();
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

  describe('Tooltip', () => {
    it('should be visible', () => {
      fixture.detectChanges();
      fixture.componentRef.setInput('tooltip', 'This is tooltip text');
      fixture.detectChanges();

      const tooltipTriggerElem = getElement(fixture, 'fudis-button');

      expect(tooltipTriggerElem).toBeTruthy();
      expect(tooltipTriggerElem.getAttribute('ng-reflect-tooltip')).toEqual('This is tooltip text');
    });
  });
});
