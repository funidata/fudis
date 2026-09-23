import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectComponent } from './select.component';
import { FormControl } from '@angular/forms';
import { TestCourseAvailability, TestCourseValue, defaultOptions } from '../common/mock_data';
import { By } from '@angular/platform-browser';
import { Component, ViewChild } from '@angular/core';
import { FudisInputSize, FudisSelectOption } from '../../../../types/forms';
import { getElement } from '../../../../utilities/tests/utilities';
import { FudisInternalErrorSummaryService } from '../../../../services/form/error-summary/internal-error-summary.service';
import { SelectOptionComponent } from './select-option/select-option.component';
import { SelectOptionsDirective } from '../common/select-options-directive/select-options.directive';
import { FudisDialogService } from '../../../../services/dialog/dialog.service';

@Component({
  selector: 'fudis-mock-container',
  imports: [SelectComponent, SelectOptionsDirective, SelectOptionComponent],
  template: `<fudis-select
    #testSelect
    [variant]="'autocompleteDropdown'"
    [label]="'Test Label'"
    [placeholder]="'Autocomplete test placeholder'"
    [control]="control"
    [size]="'md'"
  >
    <ng-template fudisSelectOptions>
      @for (option of testOptions; track option.value) {
        <fudis-select-option [data]="option"></fudis-select-option>
      }
    </ng-template>
  </fudis-select>`,
})
class MockAutocompleteComponent {
  @ViewChild('testSelect') testSelect: SelectComponent<TestCourseValue>;

  testOptions: FudisSelectOption<TestCourseValue>[] = defaultOptions;
  control: FormControl<FudisSelectOption<TestCourseValue> | null> = new FormControl(null);
}

describe('SelectComponent', () => {
  let component: SelectComponent<TestCourseValue>;
  let mockComponent: MockAutocompleteComponent;
  let fixture: ComponentFixture<SelectComponent<TestCourseValue>>;
  let mockFixture: ComponentFixture<MockAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent, MockAutocompleteComponent],
      providers: [FudisDialogService, FudisInternalErrorSummaryService],
    }).compileComponents();
  });

  function initWithControlValue() {
    component.control = new FormControl<FudisSelectOption<TestCourseValue> | null>(
      defaultOptions[3],
    );
    component.ngOnChanges({
      control: {
        currentValue: new FormControl<FudisSelectOption<TestCourseValue> | null>(defaultOptions[3]),
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => {
          return true;
        },
      },
    });
    fixture.detectChanges();
  }

  function initWithControlNull() {
    component.control = new FormControl<FudisSelectOption<TestCourseValue> | null>(null);

    component.ngOnChanges({
      control: {
        currentValue: new FormControl<FudisSelectOption<TestCourseValue> | null>(null),
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => {
          return true;
        },
      },
    });

    fixture.detectChanges();
  }

  function assertSelectHasClasses(classes: string): void {
    const childSpan = fixture.nativeElement.childNodes;
    const componentClasses = childSpan[0].className.split(' ').sort();

    expect(componentClasses).toEqual(classes.split(' ').sort());
  }

  function selectSizeCheck(size: FudisInputSize): void {
    fixture.componentRef.setInput('size', size);
    fixture.detectChanges();
    assertSelectHasClasses(`fudis-select fudis-input-size__${size}`);
  }

  describe('Control', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(SelectComponent<TestCourseValue>);
      component = fixture.componentInstance;

      fixture.componentRef.setInput(
        'control',
        new FormControl<FudisSelectOption<TestCourseValue> | null>(defaultOptions[3]),
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jest.spyOn(component as any, '_setParentId');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jest.spyOn(component as any, '_updateComponentStateFromControlValue');
    });

    it('should init the component successfully', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { _updateValueAndValidityTrigger } = component as any;
      jest.spyOn(_updateValueAndValidityTrigger, 'next');

      fixture.detectChanges();

      expect(_updateValueAndValidityTrigger.next).toHaveBeenCalledTimes(1);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((component as any)._updateComponentStateFromControlValue).toHaveBeenCalledTimes(1);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((component as any)._setParentId).toHaveBeenCalledTimes(1);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((component as any)._setParentId).toHaveBeenCalledWith('select');
    });

    it('should resync when the control emits an event', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { _updateValueAndValidityTrigger } = component as any;
      jest.spyOn(_updateValueAndValidityTrigger, 'next');

      fixture.detectChanges();

      _updateValueAndValidityTrigger.next.mockClear();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (component as any)._updateComponentStateFromControlValue.mockClear();

      component.control.setValue(defaultOptions[2]);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((component as any)._selectedLabel()).toBe(defaultOptions[2].label);

      expect(_updateValueAndValidityTrigger.next).toHaveBeenCalled();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((component as any)._updateComponentStateFromControlValue).toHaveBeenCalled();
    });

    it('sshould mirror touched and disabled states from control events', () => {
      fixture.detectChanges();

      component.control.markAsTouched();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((component as any)._touched()).toBe(true);

      component.control.disable();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((component as any)._disabled()).toBe(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((component as any)._enabled()).toBe(false);
    });

    it('should close subscription on destroy', () => {
      fixture.detectChanges();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((component as any)._subscription.closed).toBeFalsy();

      fixture.destroy();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((component as any)._subscription.closed).toBeTruthy();
    });
  });

  describe('CSS classes', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(SelectComponent<TestCourseValue>);
      component = fixture.componentInstance;
      initWithControlValue();
    });

    it('should have respective classes according to given size Input', () => {
      fixture.detectChanges();
      selectSizeCheck('sm');
      selectSizeCheck('md');
      selectSizeCheck('lg');
      selectSizeCheck('full-width');
    });
  });

  describe('Dropdown', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(SelectComponent<TestCourseValue>);
      component = fixture.componentInstance;
      component.label = 'Test Select Label';
      component.placeholder = 'Test placeholder';
      component.size = 'md';
      component.helpText = 'Select a course from the course catalogue.';
    });

    it('should have respective classes according to given size Input', () => {
      initWithControlValue();
      const expectedValue = 'fudis-select fudis-input-size__md';
      const classes = fixture.nativeElement.childNodes;
      const componentClasses = classes[0].className.split(' ').sort();

      expect(componentClasses).toEqual(expectedValue.split(' ').sort());
    });

    it('should have default form control option set on init', () => {
      initWithControlValue();

      const inputElement = fixture.debugElement.query(By.css('.fudis-select__input'));

      expect(inputElement.nativeElement.value).toEqual('Advanced Research Methods');
    });

    it('should have placeholder text present', () => {
      initWithControlValue();

      fixture.detectChanges();

      const inputElement = fixture.debugElement.query(By.css('.fudis-select__input'));

      expect(inputElement.nativeElement.getAttribute('placeholder')).toBe('Test placeholder');
    });

    it('should update component state when handleSelectionChange is called', () => {
      initWithControlNull();
      component.handleSelectionChange(defaultOptions[7]);
      fixture.detectChanges();

      const value = (getElement(fixture, '.fudis-select__input') as HTMLInputElement).value;

      expect(value).toEqual('Digital Learning Environments');
      expect(component.control.value).toEqual(defaultOptions[7]);
    });
  });

  /**
   * These tests somewhat overlap with SelectAutocomplete component's tests, but as some logic is
   * handled in parent Select component these tests aim to check that those are working and passing
   * them properly to child SelectAutocomplete
   */
  describe('Autocomplete', () => {
    beforeEach(() => {
      mockFixture = TestBed.createComponent(MockAutocompleteComponent);
      mockComponent = mockFixture.componentInstance;
    });

    it('should have placeholder on init, when control value is null', () => {
      mockComponent.control = new FormControl<TestCourseAvailability | null>(null);
      mockFixture.detectChanges();
      const selectElement = getElement(mockFixture, '.fudis-select');

      const placeholder = selectElement
        .querySelector('.fudis-select-autocomplete')
        ?.getAttribute('placeholder');

      expect(placeholder).toContain('Autocomplete test placeholder');
    });

    it('should have input value, when control has value', () => {
      mockComponent.control = new FormControl<TestCourseAvailability | null>(defaultOptions[2]);
      mockFixture.detectChanges();

      const selectElement = getElement(mockFixture, '.fudis-select');

      const value = selectElement
        .querySelector('.fudis-select-autocomplete')
        ?.getAttribute('value');

      expect(value).toContain('Data Analysis');
    });

    it('should update input value, when control value updates', () => {
      mockComponent.control = new FormControl<TestCourseAvailability | null>(defaultOptions[2]);
      mockFixture.detectChanges();
      mockComponent.control.patchValue(defaultOptions[1]);
      mockFixture.detectChanges();

      const selectElement = getElement(mockFixture, '.fudis-select');

      const value = selectElement
        .querySelector('.fudis-select-autocomplete')
        ?.getAttribute('value');

      expect(value).toContain('Academic Writing');
    });

    it('should not have input value, when control value is null', () => {
      mockComponent.control = new FormControl<TestCourseAvailability | null>(null);
      mockFixture.detectChanges();

      const selectElement = getElement(mockFixture, '.fudis-select');

      const value = selectElement
        .querySelector('.fudis-select-autocomplete')
        ?.getAttribute('value');

      expect(value).toBeNull();
    });

    it('should not have input value, when control value is updated to null', () => {
      mockComponent.control = new FormControl<TestCourseAvailability | null>(defaultOptions[2]);
      mockFixture.detectChanges();
      mockComponent.control.patchValue(null);
      mockFixture.detectChanges();

      const selectElement = getElement(mockFixture, '.fudis-select');

      const value = selectElement
        .querySelector('.fudis-select-autocomplete')
        ?.getAttribute('value');

      expect(value).toEqual(null);
    });
  });
});
