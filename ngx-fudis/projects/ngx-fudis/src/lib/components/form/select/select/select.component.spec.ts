import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectComponent } from './select.component';
import { FormControl } from '@angular/forms';
import { TestAnimalSound, TestAnimalValue, defaultOptions } from '../common/mock_data';
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
  @ViewChild('testSelect') testSelect: SelectComponent<TestAnimalValue>;

  testOptions: FudisSelectOption<TestAnimalValue>[] = defaultOptions;
  control: FormControl<FudisSelectOption<TestAnimalValue> | null> = new FormControl(null);
}

describe('SelectComponent', () => {
  let component: SelectComponent<TestAnimalValue>;
  let mockComponent: MockAutocompleteComponent;
  let fixture: ComponentFixture<SelectComponent<TestAnimalValue>>;
  let mockFixture: ComponentFixture<MockAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent, MockAutocompleteComponent],
      providers: [FudisDialogService, FudisInternalErrorSummaryService],
    }).compileComponents();
  });

  function initWithControlValue() {
    component.control = new FormControl<FudisSelectOption<TestAnimalValue> | null>(
      defaultOptions[3],
    );
    component.ngOnChanges({
      control: {
        currentValue: new FormControl<FudisSelectOption<TestAnimalValue> | null>(defaultOptions[3]),
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
    component.control = new FormControl<FudisSelectOption<TestAnimalValue> | null>(null);

    component.ngOnChanges({
      control: {
        currentValue: new FormControl<FudisSelectOption<TestAnimalValue> | null>(null),
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
      fixture = TestBed.createComponent(SelectComponent<TestAnimalValue>);
      component = fixture.componentInstance;

      fixture.componentRef.setInput(
        'control',
        new FormControl<FudisSelectOption<TestAnimalValue> | null>(defaultOptions[3]),
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

    it('should not trigger valueChanges', () => {
      let didEmit = false;
      component.control.valueChanges.subscribe(() => (didEmit = true));
      fixture.detectChanges();
      expect(didEmit).toBeFalsy();
    });

    it('should trigger valueChanges', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { _updateValueAndValidityTrigger } = component as any;
      jest.spyOn(_updateValueAndValidityTrigger, 'next');

      let didEmit = false;
      component.control.valueChanges.subscribe(() => (didEmit = true));

      fixture.detectChanges();

      expect(didEmit).toBeFalsy();

      component.control.setValue(defaultOptions[2]);

      expect(didEmit).toBeTruthy();
      expect(_updateValueAndValidityTrigger.next).toHaveBeenCalledTimes(2);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((component as any)._updateComponentStateFromControlValue).toHaveBeenCalledTimes(2);
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
      fixture = TestBed.createComponent(SelectComponent<TestAnimalValue>);
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
      fixture = TestBed.createComponent(SelectComponent<TestAnimalValue>);
      component = fixture.componentInstance;
      component.label = 'Test Select Label';
      component.placeholder = 'Test placeholder';
      component.size = 'md';
      component.helpText = 'This is kind reminder for choosing a pet';
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

      expect(inputElement.nativeElement.value).toEqual('Really dangerous cat');
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

      expect(value).toEqual('Southern Titiwangsa Bent-Toed Gecko');
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
      mockComponent.control = new FormControl<TestAnimalSound | null>(null);
      mockFixture.detectChanges();
      const selectElement = getElement(mockFixture, '.fudis-select');

      const placeholder = selectElement
        .querySelector('.fudis-select-autocomplete')
        ?.getAttribute('placeholder');

      expect(placeholder).toContain('Autocomplete test placeholder');
    });

    it('should have input value, when control has value', () => {
      mockComponent.control = new FormControl<TestAnimalSound | null>(defaultOptions[2]);
      mockFixture.detectChanges();

      const selectElement = getElement(mockFixture, '.fudis-select');

      const value = selectElement
        .querySelector('.fudis-select-autocomplete')
        ?.getAttribute('value');

      expect(value).toContain('Platypus');
    });

    it('should update input value, when control value updates', () => {
      mockComponent.control = new FormControl<TestAnimalSound | null>(defaultOptions[2]); // Platypus
      mockFixture.detectChanges();
      mockComponent.control.patchValue(defaultOptions[1]); // Capybara
      mockFixture.detectChanges();

      const selectElement = getElement(mockFixture, '.fudis-select');

      const value = selectElement
        .querySelector('.fudis-select-autocomplete')
        ?.getAttribute('value');

      expect(value).toContain('Capybara');
    });

    it('should not have input value, when control value is null', () => {
      mockComponent.control = new FormControl<TestAnimalSound | null>(null);
      mockFixture.detectChanges();

      const selectElement = getElement(mockFixture, '.fudis-select');

      const value = selectElement
        .querySelector('.fudis-select-autocomplete')
        ?.getAttribute('value');

      expect(value).toBeNull();
    });

    it('should not have input value, when control value is updated to null', () => {
      mockComponent.control = new FormControl<TestAnimalSound | null>(defaultOptions[2]);
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
