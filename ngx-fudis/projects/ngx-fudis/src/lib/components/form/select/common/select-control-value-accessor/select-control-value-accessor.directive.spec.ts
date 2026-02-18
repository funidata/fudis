import { Component } from '@angular/core';
import {
  MultiselectControlValueAccessorDirective,
  SelectControlValueAccessorDirective,
} from './select-control-value-accessor.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getElement } from '../../../../../utilities/tests/utilities';
import { FudisSelectOption } from '../../../../../types/forms';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { joinInputValues } from '../utilities/selectUtilities';

@Component({
  standalone: false,
  selector: 'fudis-mock-select-cva-base',
  template: `<input
    fudisSelectControlValueAccessor
    [filterText]="filterText"
    [formControl]="control"
  />`,
})
class MockSelectCVAComponent {
  filterText: null | string;
  control: FormControl<FudisSelectOption<string> | null> = new FormControl(null);
}

describe('SelectAutocompleteDirective', () => {
  let component: MockSelectCVAComponent;
  let fixture: ComponentFixture<MockSelectCVAComponent>;

  let inputElement: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MockSelectCVAComponent, SelectControlValueAccessorDirective],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MockSelectCVAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    inputElement = getElement(fixture, 'input') as HTMLInputElement;
  });
  it('should create an directive instance', () => {
    const directive = fixture.debugElement.query(By.directive(SelectControlValueAccessorDirective));

    expect(directive).toBeTruthy();
  });

  describe('write value', () => {
    it('should write new value', () => {
      const newValue = { value: 'my-value', label: 'My label' };

      component.control.patchValue(newValue);

      expect(inputElement.getAttribute('value')).toEqual(newValue.label);
    });

    it('should remove value', () => {
      const newValue = { value: 'my-value', label: 'My label' };

      component.control.patchValue(newValue);

      component.control.patchValue(null);

      expect(inputElement.getAttribute('value')).toBeNull();
    });

    it('should write value from filter text change', () => {
      component.filterText = 'New value from filter text';
      fixture.detectChanges();

      expect(inputElement.getAttribute('value')).toEqual('New value from filter text');
    });
  });
});

@Component({
  standalone: false,
  selector: 'fudis-mock-multiselect-cva-base',
  template: `<input fudisMultiselectControlValueAccessor [formControl]="control" />`,
})
class MockMultiselectCVAComponent {
  control = new FormControl<FudisSelectOption<string>[] | null>(null);
}

describe('MultiselectAutocompleteDirective', () => {
  let component: MockMultiselectCVAComponent;
  let fixture: ComponentFixture<MockMultiselectCVAComponent>;

  let inputElement: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MockMultiselectCVAComponent, MultiselectControlValueAccessorDirective],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MockMultiselectCVAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    inputElement = getElement(fixture, 'input') as HTMLInputElement;
  });
  it('should create an directive instance', () => {
    const directive = fixture.debugElement.query(
      By.directive(MultiselectControlValueAccessorDirective),
    );

    expect(directive).toBeTruthy();
  });

  describe('write value', () => {
    it('should write new value from FormControl', () => {
      const newValue = [
        { value: 'my-value', label: 'My label' },
        { value: 'another-value', label: "Another, important and 'doublequoted' Label" },
      ];

      component.control.patchValue(newValue);

      expect(inputElement.getAttribute('value')).toEqual(joinInputValues(newValue));
    });

    it('should remove value', () => {
      const newValue = [
        { value: 'my-value', label: 'My label' },
        { value: 'another-value', label: "Another, important and 'doublequoted' Label" },
      ];

      component.control.patchValue(newValue);

      component.control.patchValue(null);

      expect(inputElement.getAttribute('value')).toBeNull();
    });
  });
});
