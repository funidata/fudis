import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxComponent } from './checkbox.component';
import { NgxFudisModule } from '../../../ngx-fudis.module';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FudisValidators } from '../../../utilities/form/validators';
import { CommonModule } from '@angular/common';

@Component({
  standalone: false,
  selector: 'fudis-mock-component',
  template: `
    <form [formGroup]="myFormGroup">
        <fudis-checkbox [control]="myFormGroup.get('accept')"></fudis-checkbox>
    </form>
  `,
})
class MockComponent {
    public myFormGroup = new FormGroup(
    {
      accept: new FormControl<boolean | null>(null, FudisValidators.required('This selection is required'))
    }
  );
}

describe('CheckboxComponentWithControl', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockComponent],
      imports: [ NgxFudisModule, ReactiveFormsModule, CheckboxComponent, CommonModule ]
    })
    .compileComponents();
  });

    beforeEach(()=> {
      fixture = TestBed.createComponent(CheckboxComponent);
      component = fixture.componentInstance;
      
      component.label = 'Test Label';
      component.ariaLabelledBy = 'test-id';
      component.required = true;

      fixture.detectChanges();
    });

    describe('Basic inputs and styles', () => {
      it('should create with correct label', () => {
        const checkboxLabel = fixture.nativeElement.querySelector(
          '.fudis-checkbox__label',
        );
        expect(checkboxLabel.textContent).toEqual('Test Label');
      });

      it('should have correct aria-labelledby id', () => {
        const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
        const ariaLabelId = input.getAttribute('aria-labelledby');

        expect(ariaLabelId).toEqual('test-id');
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
        const requiredText = fixture.nativeElement.querySelector(
          '.fudis-checkbox__required',
        );
        expect(requiredText.textContent).toEqual('(Required)');
      });

      it('should have disabled styles and attributes', () => {
        component.disabled = true;
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

      it('should have invalid styles and attributes', () => {
        component.invalid = true;
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
        component.checked = true;
        fixture.detectChanges();

        const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
        const checked = input.getAttribute('checked');

        expect(checked).toBeTruthy();

        const icon = fixture.nativeElement.querySelector(
          'fudis-icon',
        );

        expect(icon).not.toBeNull();
      });
    });

  describe('Checkbox interaction', () => {
    it('should emit change event', () => {
      const spy = jest.spyOn(component.checkedChange, 'emit');

      const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith(true);
    });

    it('should have proper CSS classes before, during and after when input focused', () => {
      const input: HTMLInputElement = fixture.nativeElement.querySelector('input');

      const checkboxElement: HTMLSpanElement = fixture.nativeElement.querySelector(
        '.fudis-checkbox__content__box',
      );

      expect(checkboxElement.className).toEqual('fudis-checkbox__content__box');

      input.dispatchEvent(new Event('focus'));
      fixture.detectChanges();

      expect(checkboxElement.className).toEqual('fudis-checkbox__content__box fudis-checkbox__content__box--focused');

      input.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      expect(checkboxElement.className).toEqual('fudis-checkbox__content__box');
    });
  });

    describe('With FormControl provided', () => {
      let mockComponent: MockComponent;
      let mockFixture: ComponentFixture<MockComponent> | ComponentFixture<CheckboxComponent>;

      beforeEach(()=> {
        mockFixture = TestBed.createComponent(MockComponent);
        mockComponent = mockFixture.componentInstance;
        
        mockFixture.detectChanges();
      });

      it('should bind FormControl value to checkbox', () => {
          const input = mockFixture.nativeElement.querySelector('input[type="checkbox"]');
          
          expect(input.checked).toBe(false);

          mockComponent.myFormGroup.get('accept')?.setValue(true);
          mockFixture.detectChanges();

          expect(input.checked).toBe(true);
      });

      it('should update FormControl value on user click', () => {
        const input: HTMLInputElement = mockFixture.nativeElement.querySelector('input[type="checkbox"]');

        input.click();
        mockFixture.detectChanges();

        expect(mockComponent.myFormGroup.get('accept')?.value).toBe(true);
      });

      it('should show error when required checkbox is not checked', () => {
        const control = mockComponent.myFormGroup.get('accept');
        control?.markAsTouched();
        control?.updateValueAndValidity();
        mockFixture.detectChanges();

        expect(control?.valid).toBe(false);
      });
  });
});