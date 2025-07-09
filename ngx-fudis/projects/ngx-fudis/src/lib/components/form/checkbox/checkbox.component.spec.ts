import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxComponent } from './checkbox.component';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FudisValidators } from '../../../utilities/form/validators';
import { IconComponent } from '../../icon/icon.component';
import { FudisCheckboxChangeEvent } from 'projects/ngx-fudis/src/public-api';

@Component({
  standalone: false,
  selector: 'fudis-mock-component',
  template: `
    <form [formGroup]="myFormGroup">
      <fudis-checkbox
        [id]="id"
        [control]="myFormGroup.get('accept')"
        [label]="label"
        [ariaLabelledBy]="ariaLabelledBy"
        [ariaDescribedBy]="ariaDescribedBy"
        (handleChange)="checkedChange($event)"
      ></fudis-checkbox>
    </form>
  `,
})
class MockComponent {
  id: string;
  label: string = 'Test Label';
  ariaLabelledBy: string = 'test-id';
  ariaDescribedBy: string = 'test-description-id';

  public myFormGroup = new FormGroup({
    accept: new FormControl<boolean | null>(
      null,
      FudisValidators.required('This selection is required'),
    ),
  });

  eventReceived: FudisCheckboxChangeEvent;

  checkedChange(event: FudisCheckboxChangeEvent): void {
    this.eventReceived = event;
  }
}

describe('CheckboxComponent', () => {
  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockComponent, CheckboxComponent, IconComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Basic inputs and styles', () => {
    it('should create with correct label', () => {
      const checkboxLabel = fixture.nativeElement.querySelector('.fudis-checkbox__label');
      expect(checkboxLabel.textContent).toEqual('Test Label');
    });

    it('should have correct aria-labelledby id', () => {
      const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
      const ariaLabelId = input.getAttribute('aria-labelledby');

      expect(ariaLabelId).toEqual('test-id');
    });

    it('should have correct aria-describedby id', () => {
      const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
      const ariaDescribedById = input.getAttribute('aria-describedby');

      expect(ariaDescribedById).toEqual('test-description-id');
    });

    it('should have correct id', () => {
      const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
      const generatedId = input.getAttribute('id');

      expect(generatedId).toEqual('fudis-checkbox-1');

      component.id = 'custom-id';
      fixture.detectChanges();

      const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
      const customId = inputElement.getAttribute('id');

      expect(customId).toEqual('custom-id');
    });

    it('should have required text indicator', () => {
      const requiredText = fixture.nativeElement.querySelector('.fudis-checkbox__required');
      expect(requiredText.textContent).toEqual('(Required)');
    });

    it('should have disabled styles and attributes', () => {
      component.myFormGroup.disable();
      fixture.detectChanges();

      const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
      const ariaDisabled = input.getAttribute('aria-disabled');
      const tabIndex = input.getAttribute('tabindex');

      expect(ariaDisabled).toBeTruthy();
      expect(tabIndex).toEqual('-1');

      const disabledStyles = fixture.nativeElement.querySelector(
        '.fudis-checkbox__content__box--disabled',
      );
      expect(disabledStyles).toBeTruthy();
    });

    it('should have invalid styled and states, when form group is touched and should display errors', () => {
      component.myFormGroup.controls['accept'].markAsTouched();
      fixture.detectChanges();

      const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
      const ariaInvalid = input.getAttribute('aria-invalid');

      expect(ariaInvalid).toBeTruthy();

      const invalidStyles = fixture.nativeElement.querySelector(
        '.fudis-checkbox__content__box--invalid',
      );
      expect(invalidStyles).toBeTruthy();
    });

    it('should have checked styles and attributes', () => {
      const input: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('fudis-checkbox input');

      input.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      expect(component.myFormGroup.controls['accept'].value).toEqual(true);

      const icon = fixture.nativeElement.querySelector('fudis-icon');
      expect(icon).not.toBeNull();
    });
  });

  describe('Checkbox interaction', () => {
    it('should bind FormControl value to checkbox', () => {
      const input = fixture.nativeElement.querySelector('input[type="checkbox"]');

      expect(input.checked).toBe(false);

      component.myFormGroup.get('accept')?.setValue(true);
      fixture.detectChanges();

      expect(input.checked).toBe(true);
    });

    it('should update FormControl value on user click', () => {
      const input: HTMLInputElement = fixture.nativeElement.querySelector('input[type="checkbox"]');

      input.click();
      fixture.detectChanges();

      expect(component.myFormGroup.get('accept')?.value).toBe(true);
    });

    it('should not be valid when required checkbox is not checked', () => {
      const control = component.myFormGroup.get('accept');
      control?.markAsTouched();
      control?.updateValueAndValidity();
      fixture.detectChanges();

      expect(control?.valid).toBe(false);
    });

    it('should emit change event', () => {
      jest.spyOn(component, 'checkedChange');

      const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
      input.dispatchEvent(new MouseEvent('click'));

      fixture.detectChanges();

      expect(component.checkedChange).toHaveBeenCalled();
    });

    it('should have proper CSS classes before, during and after when input focused', () => {
      const input: HTMLInputElement = fixture.nativeElement.querySelector('input');

      const checkboxElement: HTMLSpanElement = fixture.nativeElement.querySelector(
        '.fudis-checkbox__content__box',
      );

      expect(checkboxElement.className).toEqual('fudis-checkbox__content__box');

      input.dispatchEvent(new Event('focus'));
      fixture.detectChanges();

      expect(checkboxElement.className).toEqual(
        'fudis-checkbox__content__box fudis-checkbox__content__box--focused',
      );

      input.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      expect(checkboxElement.className).toEqual(
        'fudis-checkbox__content__box fudis-checkbox__content__box--invalid',
      );
    });
  });
});
