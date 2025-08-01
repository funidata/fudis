import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectComponent } from './select.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GuidanceComponent } from '../../guidance/guidance.component';
import { IconComponent } from '../../../icon/icon.component';
import { LabelComponent } from '../../label/label.component';
import { TestAnimalSound, defaultOptions } from '../common/mock_data';
import { SelectBaseDirective } from '../common/select-base/select-base.directive';
import { SelectDropdownComponent } from '../common/select-dropdown/select-dropdown.component';
import { BodyTextComponent } from '../../../typography/body-text/body-text.component';
import { By } from '@angular/platform-browser';
import { Component, ViewChild } from '@angular/core';
import { FudisSelectOption } from '../../../../types/forms';
import { ButtonComponent } from '../../../button/button.component';
import { getElement } from '../../../../utilities/tests/utilities';
import { SelectIconsComponent } from '../common/select-icons/select-icons.component';
import { FudisInternalErrorSummaryService } from '../../../../services/form/error-summary/internal-error-summary.service';
import { SelectAutocompleteDirective } from '../common/autocomplete/autocomplete.directive';
import { SelectControlValueAccessorDirective } from '../common/select-control-value-accessor/select-control-value-accessor.directive';
import { SelectOptionComponent } from './select-option/select-option.component';
import { SelectOptionsDirective } from '../common/select-options-directive/select-options.directive';

@Component({
  standalone: false,
  selector: 'fudis-mock-container',
  template: `<fudis-select
    #testSelect
    [variant]="'autocompleteDropdown'"
    [label]="'Test Label'"
    [placeholder]="'Autocomplete test placeholder'"
    [control]="control"
    [size]="'md'"
  >
    <ng-template fudisSelectOptions>
      <fudis-select-option *ngFor="let option of testOptions" [data]="option"></fudis-select-option>
    </ng-template>
  </fudis-select>`,
})
class MockAutocompleteComponent {
  testOptions: TestAnimalSound[] = defaultOptions;
  control: FormControl<FudisSelectOption<TestAnimalSound> | null> =
    new FormControl<TestAnimalSound | null>(null);

  @ViewChild('testSelect') testSelect: SelectComponent;
}

describe('SelectComponent', () => {
  let component: SelectComponent;
  let mockComponent: MockAutocompleteComponent;
  let fixture: ComponentFixture<SelectComponent>;
  let mockFixture: ComponentFixture<MockAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SelectOptionsDirective,
        SelectComponent,
        SelectAutocompleteDirective,
        SelectControlValueAccessorDirective,
        SelectOptionComponent,
        ButtonComponent,
        GuidanceComponent,
        IconComponent,
        LabelComponent,
        MockAutocompleteComponent,
        SelectDropdownComponent,
        SelectIconsComponent,
        BodyTextComponent,
      ],
      providers: [FudisInternalErrorSummaryService, SelectBaseDirective],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  function initWithControlValue() {
    component.control = new FormControl(defaultOptions[3]);
    component.ngOnChanges({
      control: {
        currentValue: new FormControl(defaultOptions[3]),
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
    component.control = new FormControl(null);

    component.ngOnChanges({
      control: {
        currentValue: new FormControl(null),
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => {
          return true;
        },
      },
    });

    fixture.detectChanges();
  }

  describe('Control', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(SelectComponent);
      component = fixture.componentInstance;

      fixture.componentRef.setInput('control', new FormControl(defaultOptions[3]));

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

  describe('Dropdown', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(SelectComponent);
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
      mockComponent.control = new FormControl<FudisSelectOption<TestAnimalSound> | null>(null);
      mockFixture.detectChanges();
      const selectElement = getElement(mockFixture, '.fudis-select');

      const placeholder = selectElement
        .querySelector('.fudis-select-autocomplete')
        ?.getAttribute('placeholder');

      expect(placeholder).toContain('Autocomplete test placeholder');
    });

    it('should have input value, when control has value', () => {
      mockComponent.control = new FormControl(defaultOptions[2]);
      mockFixture.detectChanges();

      const selectElement = getElement(mockFixture, '.fudis-select');

      const value = selectElement
        .querySelector('.fudis-select-autocomplete')
        ?.getAttribute('value');

      expect(value).toContain('Platypus');
    });

    it('should update input value, when control value updates', () => {
      mockComponent.control = new FormControl(defaultOptions[2]); // Platypus
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
      mockComponent.control = new FormControl(null);
      mockFixture.detectChanges();

      const selectElement = getElement(mockFixture, '.fudis-select');

      const value = selectElement
        .querySelector('.fudis-select-autocomplete')
        ?.getAttribute('value');

      expect(value).toBeNull();
    });

    it('should not have input value, when control value is updated to null', () => {
      mockComponent.control = new FormControl(defaultOptions[2]);
      mockFixture.detectChanges();
      mockComponent.control.patchValue(null);
      mockFixture.detectChanges();

      const selectElement = getElement(mockFixture, '.fudis-select');

      const value = selectElement
        .querySelector('.fudis-select-autocomplete')
        ?.getAttribute('value');

      expect(value).toEqual(null);
    });

    it('should have aria-activedescendant value matching with active select option id', () => {
      mockComponent.control = new FormControl(defaultOptions[2]);
      mockFixture.detectChanges();

      const selectElement = getElement(mockFixture, '.fudis-select');

      const activeDescendant = selectElement
        .querySelector('.fudis-select-autocomplete')
        ?.getAttribute('aria-activedescendant');

      const options = mockFixture.debugElement.queryAll(By.css('.fudis-select-option'));
      const activeOptionId = options[2].attributes['id'];

      expect(activeDescendant).toEqual(activeOptionId);
    });
  });
});
