import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectComponent } from './select.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GuidanceComponent } from '../../guidance/guidance.component';
import { IconComponent } from '../../../icon/icon.component';
import { TooltipDirective } from '../../../../directives/tooltip/tooltip.directive';
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

@Component({
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
        SelectComponent,
        SelectAutocompleteDirective,
        SelectControlValueAccessorDirective,
        ButtonComponent,
        GuidanceComponent,
        IconComponent,
        LabelComponent,
        MockAutocompleteComponent,
        SelectDropdownComponent,
        SelectIconsComponent,
        BodyTextComponent,
      ],
      providers: [FudisInternalErrorSummaryService, TooltipDirective, SelectBaseDirective],
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

  // TODO: add test for disabled states

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
      component.handleSelectionChange(defaultOptions[5]);
      fixture.detectChanges();

      const value = (getElement(fixture, '.fudis-select__input') as HTMLInputElement).value;

      expect(value).toEqual('Southern Titiwangsa Bent-Toed Gecko');
      expect(component.control.value).toEqual(defaultOptions[5]);
    });
  });

  /**
   * These tests somewhat overlap with SelectAutocomplete component's tests, but as some logic is handled in parent Select component these tests aim to check that those are working and passing them properly to child SelectAutocomplete
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
  });
});
