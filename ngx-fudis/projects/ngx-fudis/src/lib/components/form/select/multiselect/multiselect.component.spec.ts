import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MultiselectComponent } from './multiselect.component';
import { GuidanceComponent } from '../../guidance/guidance.component';
import { IconComponent } from '../../../icon/icon.component';
import { LabelComponent } from '../../label/label.component';
import { SelectDropdownComponent } from '../common/select-dropdown/select-dropdown.component';
import { BodyTextComponent } from '../../../typography/body-text/body-text.component';
import { MultiselectChipListComponent } from './multiselect-chip-list/multiselect-chip-list.component';
import { MultiselectOptionComponent } from './multiselect-option/multiselect-option.component';
import { SelectGroupComponent } from '../common/select-group/select-group.component';
import { SelectBaseDirective } from '../common/select-base/select-base.directive';
import { TooltipDirective } from '../../../../directives/tooltip/tooltip.directive';
import { FudisSelectOption } from '../../../../types/forms';
import { getAllElements, getElement } from '../../../../utilities/tests/utilities';
import { TestAnimalSound, defaultOptions } from '../common/mock_data';
import { SelectOptionsDirective } from '../common/select-options-directive/select-options.directive';
import { SelectIconsComponent } from '../common/select-icons/select-icons.component';
import { ButtonComponent } from '../../../button/button.component';
import { FudisInternalErrorSummaryService } from '../../../../services/form/error-summary/internal-error-summary.service';
import { MultiselectAutocompleteDirective } from '../common/autocomplete/autocomplete.directive';
import { MultiselectControlValueAccessorDirective } from '../common/select-control-value-accessor/select-control-value-accessor.directive';

@Component({
  selector: 'fudis-multiselect-mock',
  template: ` <fudis-multiselect
    #multiselectEl
    [placeholder]="'Multiselect placeholder'"
    [control]="control"
    [size]="'md'"
    [label]="'Multiselect label'"
    [helpText]="'Multiselect help text'"
  >
    <ng-template fudisSelectOptions>
      <fudis-multiselect-option
        *ngFor="let option of options"
        [data]="option"
      ></fudis-multiselect-option>
    </ng-template>
  </fudis-multiselect>`,
})
class MultiselectMockComponent {
  @ViewChild('multiselectEl') multiselectEl: MultiselectComponent;

  options: FudisSelectOption<object>[] = defaultOptions;
  control: FormControl<FudisSelectOption<TestAnimalSound>[] | null>;
}

// TODO: add test for disabled states

describe('MultiselectComponent', () => {
  let component: MultiselectMockComponent;
  let fixture: ComponentFixture<MultiselectMockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MultiselectComponent,
        MultiselectOptionComponent,
        MultiselectMockComponent,
        MultiselectChipListComponent,
        MultiselectAutocompleteDirective,
        MultiselectControlValueAccessorDirective,
        SelectDropdownComponent,
        SelectGroupComponent,
        SelectIconsComponent,
        ButtonComponent,
        BodyTextComponent,
        GuidanceComponent,
        IconComponent,
        LabelComponent,
        SelectOptionsDirective,
      ],
      providers: [FudisInternalErrorSummaryService, TooltipDirective, SelectBaseDirective],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  function initWithControlValue() {
    const control = new FormControl<FudisSelectOption<TestAnimalSound>[]>([
      defaultOptions[0],
      defaultOptions[2],
    ]);

    component.control = control;

    fixture.detectChanges();
  }

  function initWithControlNull() {
    const control = new FormControl<FudisSelectOption<TestAnimalSound>[] | null>(null);
    component.control = control;

    fixture.detectChanges();
  }

  describe('Input', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(MultiselectMockComponent);
      component = fixture.componentInstance;
    });

    it('should create', () => {
      initWithControlNull();
      expect(component).toBeTruthy();
    });

    it('should have respective CSS classes according to given size Input', () => {
      initWithControlNull();
      const expectedValue = 'fudis-select fudis-input-size__md';
      const classes = getElement(fixture, '.fudis-select').className;
      const componentClasses = classes.split(' ').sort();

      expect(componentClasses).toEqual(expectedValue.split(' ').sort());
    });

    it('should have help text paragraph if helpText Input is given', () => {
      initWithControlNull();
      const helpText = getElement(fixture, '.fudis-guidance .fudis-guidance__help-text');

      expect(helpText).toBeTruthy();
      expect(helpText.outerHTML).toContain('Multiselect help text');
    });

    it('should have placeholder text present when control value is null on init', () => {
      initWithControlNull();
      const inputElement = getElement(fixture, '.fudis-select__input') as HTMLInputElement;

      expect(inputElement.getAttribute('value')).toBeFalsy();
      expect(inputElement.getAttribute('placeholder')).toBe('Multiselect placeholder');
    });

    it('should have HTML input value from control value if control value is set on init', () => {
      initWithControlValue();

      const expectedValue = 'Dog, Platypus';

      const inputElement = getElement(fixture, '.fudis-select__input') as HTMLInputElement;

      expect(inputElement.getAttribute('value')).toEqual(expectedValue);
    });
  });

  describe('Multiselection change', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(MultiselectMockComponent);
      component = fixture.componentInstance;
    });

    it('should update component and control state when handleMultiSelectionChange is called with type "add" and control value is null', async () => {
      initWithControlNull();

      component.multiselectEl.openDropdown();
      fixture.detectChanges();

      await fixture.whenStable().then(() => {
        component.multiselectEl.handleMultiSelectionChange(defaultOptions[5], 'add');

        const element = getElement(fixture, '.fudis-select__input');

        expect(component.control.value).toEqual([defaultOptions[5]]);
        expect(element.getAttribute('value')).toEqual('Southern Titiwangsa Bent-Toed Gecko');
      });
    });

    it('should update component state when handleMultiSelectionChange is called with "add"', () => {
      initWithControlValue();

      component.multiselectEl.handleMultiSelectionChange(defaultOptions[5], 'add');
      fixture.detectChanges();

      const value = getElement(fixture, '.fudis-select__input').getAttribute('value');

      expect(value).toEqual('Dog, Platypus, Southern Titiwangsa Bent-Toed Gecko');
      expect(component.control.value).toEqual([
        defaultOptions[0],
        defaultOptions[2],
        defaultOptions[5],
      ]);
    });

    it('should update component state when handleMultiSelectionChange is called with "remove"', () => {
      initWithControlValue();
      component.multiselectEl.handleMultiSelectionChange(defaultOptions[0], 'remove');
      fixture.detectChanges();

      const value = getElement(fixture, '.fudis-select__input').getAttribute('value');

      expect(value).toEqual('Platypus');
      expect(component.control.value).toEqual([defaultOptions[2]]);
    });
  });

  describe('Chip list', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(MultiselectMockComponent);
      component = fixture.componentInstance;
    });

    it('should be visible by default', async () => {
      initWithControlNull();
      component.control.patchValue([defaultOptions[0], defaultOptions[2]]);

      fixture.detectChanges();

      await fixture.whenStable().then(() => {
        const chipList = getElement(fixture, '.fudis-multiselect-chip-list');

        expect(chipList).toBeTruthy();
      });
    });

    it('should not be visible if showSelectionChips is set to false', () => {
      initWithControlValue();
      component.multiselectEl.showSelectionChips = false;
      fixture.detectChanges();

      const chipList = getElement(fixture, '.fudis-multiselect-chip-list');

      expect(chipList).toBeFalsy();
    });

    it('should have correct length of buttons', () => {
      initWithControlNull();

      component.control.patchValue([defaultOptions[2], defaultOptions[4], defaultOptions[0]]);
      fixture.detectChanges();

      const chipListButtons = getAllElements(fixture, '.fudis-multiselect-chip-list__button');

      expect(chipListButtons).toHaveLength(3);
    });

    it('should update control value when clicking', () => {
      initWithControlNull();

      component.control.patchValue([defaultOptions[1], defaultOptions[4]]);
      fixture.detectChanges();

      const chipListButtons = getAllElements(fixture, '.fudis-multiselect-chip-list__button');

      // Should not trigger update if component isn't first focused. In real UI clicking the item will also trigger focus, but programmatically click() do not trigger focus
      (chipListButtons[1] as HTMLButtonElement).click();

      expect(component.control.value).toEqual([defaultOptions[1], defaultOptions[4]]);

      (chipListButtons[1] as HTMLButtonElement).focus();
      (chipListButtons[1] as HTMLButtonElement).click();

      expect(component.control.value).toEqual([defaultOptions[1]]);
    });
  });
});
