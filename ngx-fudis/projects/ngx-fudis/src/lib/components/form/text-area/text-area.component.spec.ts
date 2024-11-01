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
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAreaComponent);
    component = fixture.componentInstance;
    component.control = textAreaControl;
    fixture.detectChanges();
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('HTML attributes', () => {
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
    it('should set control as invalid if required textarea is touched and empty', () => {
      component.control = new FormControl('', FudisValidators.required('This is required'));

      expect(component.control.value).toEqual('');
      expect(component.control.invalid).toBeTruthy();
    });

    it('should set control as invalid if text is too short according to given minLength validator value', () => {
      component.control = new FormControl('', [FudisValidators.minLength(10, 'Too short')]);
      component.control.patchValue('too short');

      expect(component.control.value).toEqual('too short');
      expect(component.control.invalid).toBeTruthy();
    });

    it('should set control as invalid if text is too long according to given maxLength validator value', () => {
      component.control = new FormControl('', [FudisValidators.maxLength(10, 'Too long text')]);
      component.control.patchValue('too longy long text');

      expect(component.control.value).toEqual('too longy long text');
      expect(component.control.invalid).toBeTruthy();
    });

    it('should be disbaled', () => {
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
      textAreaSizeCheck('sm');
      textAreaSizeCheck('md');
      textAreaSizeCheck('lg');
    });
  });

  describe('Tooltip', () => {
    it('should be visible', () => {
      fixture.componentRef.setInput('tooltip', 'This is tooltip text');
      fixture.detectChanges();

      const tooltipTriggerElem = getElement(fixture, 'fudis-button');

      expect(tooltipTriggerElem).toBeTruthy();
      expect(tooltipTriggerElem.getAttribute('ng-reflect-tooltip')).toEqual('This is tooltip text');
    });
  });
});
