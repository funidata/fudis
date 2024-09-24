import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MockComponent } from 'ng-mocks';
import { TextAreaComponent } from './text-area.component';
import { LabelComponent } from '../label/label.component';
import { GuidanceComponent } from '../guidance/guidance.component';
import { FudisInputSize } from '../../../types/forms';
import { FudisValidators } from '../../../utilities/form/validators';

const textAreaControl: FormControl = new FormControl('');

describe('TextAreaComponent', () => {
  let component: TextAreaComponent;
  let fixture: ComponentFixture<TextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TextAreaComponent,
        MockComponent(LabelComponent),
        MockComponent(GuidanceComponent),
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
    component.size = size;
    fixture.detectChanges();
    assertTextAreaHasClasses(`fudis-text-area fudis-input-size__${size}`);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
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
  });

  describe('CSS classes', () => {
    it('should have respective classes according to given size Input', () => {
      textAreaSizeCheck('sm');
      textAreaSizeCheck('md');
      textAreaSizeCheck('lg');
    });
  });

  // TODO: Write tests for id constuction, tooltip, disabled state and other props coming from ControlComponentBaseDirective
});
