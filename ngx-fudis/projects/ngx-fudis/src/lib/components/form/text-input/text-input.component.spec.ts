import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MockComponent } from 'ng-mocks';
import { TextInputComponent } from './text-input.component';
import { LabelComponent } from '../label/label.component';
import { GuidanceComponent } from '../guidance/guidance.component';
import { FudisInputSize, FudisInputType } from '../../../types/forms';
import { FudisValidators } from '../../../utilities/form/validators';
import { getElement } from '../../../utilities/tests/utilities';

const textInputControl: FormControl = new FormControl('');

describe('TextInputComponent', () => {
  let component: TextInputComponent;
  let fixture: ComponentFixture<TextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TextInputComponent,
        MockComponent(LabelComponent),
        MockComponent(GuidanceComponent),
      ],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInputComponent);
    component = fixture.componentInstance;
    component.control = textInputControl;
    fixture.detectChanges();
  });

  function assertTextInputHasClasses(classes: string): void {
    const childSpan = fixture.nativeElement.childNodes;
    const componentClasses = childSpan[0].className.split(' ').sort();

    expect(componentClasses).toEqual(classes.split(' ').sort());
  }

  function textInputSizeCheck(size: FudisInputSize): void {
    component.size = size;
    fixture.detectChanges();
    assertTextInputHasClasses(`fudis-text-input fudis-input-size__${size}`);
  }

  function textInputTypeCheck(type: FudisInputType): void {
    component.type = type;
    fixture.detectChanges();

    const inputElement = getElement(fixture, 'input');
    const typeAttribute = inputElement.getAttribute('type');

    expect(typeAttribute).toEqual(type);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('HTML attributes', () => {
    it('should have correct type attribute', () => {
      textInputTypeCheck('text');
      textInputTypeCheck('email');
      textInputTypeCheck('number');
      textInputTypeCheck('password');
      textInputTypeCheck('url');
      textInputTypeCheck('tel');
    });
  });

  describe('Control', () => {
    it('should set control as invalid if required text-input is touched and empty', () => {
      component.control = new FormControl('', FudisValidators.required('This field is required'));

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

    it('should set control as invalid if number is not respective to given min validator value', () => {
      component.control = new FormControl('', [FudisValidators.min(1, 'Too small')]);
      component.control.patchValue('-10');

      expect(component.control.value).toEqual('-10');
      expect(component.control.invalid).toBeTruthy();
    });

    it('should set control as invalid if number is not respective to given max validator value', () => {
      component.control = new FormControl('', [
        FudisValidators.max(99, 'The given number is too big'),
      ]);
      component.control.patchValue('210');

      expect(component.control.value).toEqual('210');
      expect(component.control.invalid).toBeTruthy();
    });
  });

  describe('CSS classes', () => {
    it('should have respective classes according to given size Input', () => {
      textInputSizeCheck('sm');
      textInputSizeCheck('md');
      textInputSizeCheck('lg');
    });
  });

  // TODO: Write tests for id constuction, tooltip, disbaled state and other props coming from InputBaseDirective
});
