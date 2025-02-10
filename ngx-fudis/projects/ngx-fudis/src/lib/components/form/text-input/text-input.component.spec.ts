import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './text-input.component';
import { LabelComponent } from '../label/label.component';
import { GuidanceComponent } from '../guidance/guidance.component';
import { ButtonComponent } from '../../button/button.component';
import { IconComponent } from '../../icon/icon.component';
import { FudisInputSize, FudisInputType } from '../../../types/forms';
import { FudisValidators } from '../../../utilities/form/validators';
import { getElement } from '../../../utilities/tests/utilities';
import { TooltipDirective } from '../../../directives/tooltip/tooltip.directive';
import { TooltipApiDirective } from '../../../directives/tooltip/tooltip-api.directive';
import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';

const textInputControl: FormControl = new FormControl('');

describe('TextInputComponent', () => {
  let component: TextInputComponent;
  let fixture: ComponentFixture<TextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ButtonComponent,
        GuidanceComponent,
        IconComponent,
        LabelComponent,
        TextInputComponent,
        TooltipDirective,
        TooltipApiDirective,
      ],
      imports: [ReactiveFormsModule],
      providers: [FudisInternalErrorSummaryService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInputComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('control', textInputControl);
  });

  function assertTextInputHasClasses(classes: string): void {
    const childSpan = fixture.nativeElement.childNodes;
    const componentClasses = childSpan[0].className.split(' ').sort();

    expect(componentClasses).toEqual(classes.split(' ').sort());
  }

  function textInputSizeCheck(size: FudisInputSize): void {
    fixture.componentRef.setInput('size', size);
    fixture.detectChanges();
    assertTextInputHasClasses(`fudis-text-input fudis-input-size__${size}`);
  }

  function textInputTypeCheck(type: FudisInputType): void {
    fixture.componentRef.setInput('type', type);
    fixture.detectChanges();

    const inputElement = getElement(fixture, 'input');
    const typeAttribute = inputElement.getAttribute('type');

    expect(typeAttribute).toEqual(type);
  }

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('HTML attributes', () => {
    beforeEach(() => fixture.detectChanges());

    it('should have correct type attribute', () => {
      textInputTypeCheck('text');
      textInputTypeCheck('email');
      textInputTypeCheck('number');
      textInputTypeCheck('password');
      textInputTypeCheck('url');
      textInputTypeCheck('tel');
    });

    it('should have generated id', () => {
      const inputElement = getElement(fixture, 'input');

      expect(inputElement.getAttribute('id')).toEqual('fudis-text-input-1');
    });

    it('should have custom id', () => {
      const inputElement = getElement(fixture, 'input');
      fixture.componentRef.setInput('id', 'my-custom-id');
      fixture.detectChanges();

      expect(inputElement.getAttribute('id')).toEqual('my-custom-id');
    });
  });

  describe('Control', () => {
    it('should not trigger valueChages', () => {
      fixture.detectChanges();
    });

    it('should unsubscribe on destroy', () => {
      fixture.detectChanges();
    });

    it('should set control as invalid if required text-input is touched and empty', () => {
      fixture.detectChanges();
      component.control = new FormControl('', FudisValidators.required('This field is required'));

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

    it('should set control as invalid if number is not respective to given min validator value', () => {
      fixture.detectChanges();
      component.control = new FormControl('', [FudisValidators.min(1, 'Too small')]);
      component.control.patchValue('-10');

      expect(component.control.value).toEqual('-10');
      expect(component.control.invalid).toBeTruthy();
    });

    it('should set control as invalid if number is not respective to given max validator value', () => {
      fixture.detectChanges();
      component.control = new FormControl('', [
        FudisValidators.max(99, 'The given number is too big'),
      ]);
      component.control.patchValue('210');

      expect(component.control.value).toEqual('210');
      expect(component.control.invalid).toBeTruthy();
    });

    it('should set value as null, if empty string is passed as value', () => {
      fixture.detectChanges();
      component.control.patchValue('');

      expect(component.control.value).toEqual(null);

      component.control.patchValue('  ');

      expect(component.control.value).toEqual(null);
    });

    it('should not set value as null, if empty string is passed as value', () => {
      component.nullControlOnEmptyString = false;

      fixture.detectChanges();

      component.control.patchValue('');
      expect(component.control.value).toEqual('');

      component.control.patchValue('  ');
      expect(component.control.value).toEqual('  ');
    });

    it('should be disabled', () => {
      fixture.detectChanges();
      const inputElement = getElement(fixture, 'input');

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
      textInputSizeCheck('sm');
      textInputSizeCheck('md');
      textInputSizeCheck('lg');
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
