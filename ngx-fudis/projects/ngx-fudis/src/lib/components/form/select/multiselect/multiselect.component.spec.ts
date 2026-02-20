import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MultiselectComponent } from './multiselect.component';
import { GuidanceComponent } from '../../guidance/guidance.component';
import { IconButtonComponent } from '../../../icon-button/icon-button.component';
import { IconComponent } from '../../../icon/icon.component';
import { LabelComponent } from '../../label/label.component';
import { SelectDropdownComponent } from '../common/select-dropdown/select-dropdown.component';
import { BodyTextComponent } from '../../../typography/body-text/body-text.component';
import { MultiselectChipListComponent } from './multiselect-chip-list/multiselect-chip-list.component';
import { MultiselectOptionComponent } from './multiselect-option/multiselect-option.component';
import { SelectGroupComponent } from '../common/select-group/select-group.component';
import { SelectBaseDirective } from '../common/select-base/select-base.directive';
import { FudisSelectOption } from '../../../../types/forms';
import { getAllElements, getElement } from '../../../../utilities/tests/utilities';
import { TestAnimalSound, defaultOptions, TestAnimalValue } from '../common/mock_data';
import { SelectOptionsDirective } from '../common/select-options-directive/select-options.directive';
import { SelectIconsComponent } from '../common/select-icons/select-icons.component';
import { FudisInternalErrorSummaryService } from '../../../../services/form/error-summary/internal-error-summary.service';
import { MultiselectAutocompleteDirective } from '../common/autocomplete/autocomplete.directive';
import { MultiselectControlValueAccessorDirective } from '../common/select-control-value-accessor/select-control-value-accessor.directive';
import { FudisDialogService } from '../../../../services/dialog/dialog.service';

@Component({
  standalone: false,
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
class MultiselectMockComponent<T = string> {
  @ViewChild('multiselectEl') multiselectEl: MultiselectComponent<T>;

  options: TestAnimalSound[] = defaultOptions;
  control: FormControl<FudisSelectOption<TestAnimalValue>[] | null> = new FormControl(null);
}

// TODO: add test for disabled states

describe('MultiselectComponent', () => {
  let component: MultiselectMockComponent<TestAnimalValue>;
  let fixture: ComponentFixture<MultiselectMockComponent<TestAnimalValue>>;

  let multiselectComponent: MultiselectComponent<TestAnimalValue>;
  let multiselectComponentFixture: ComponentFixture<MultiselectComponent<TestAnimalValue>>;

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
        BodyTextComponent,
        GuidanceComponent,
        LabelComponent,
        SelectOptionsDirective,
      ],
      imports: [IconButtonComponent, IconComponent, ReactiveFormsModule],
      providers: [FudisDialogService, FudisInternalErrorSummaryService, SelectBaseDirective],
    }).compileComponents();
  });

  function initWithControlValue() {
    const control = new FormControl<FudisSelectOption<TestAnimalValue>[]>([
      defaultOptions[0],
      defaultOptions[2],
    ]);

    component.control = control;

    fixture.detectChanges();
  }

  function initWithControlNull() {
    const control = new FormControl<FudisSelectOption<TestAnimalValue>[] | null>(null);
    component.control = control;

    fixture.detectChanges();
  }

  describe('Control', () => {
    beforeEach(() => {
      multiselectComponentFixture = TestBed.createComponent(MultiselectComponent<TestAnimalValue>);
      multiselectComponent = multiselectComponentFixture.componentInstance;
      multiselectComponentFixture.componentRef.setInput(
        'control',
        new FormControl<FudisSelectOption<TestAnimalValue>[]>([
          defaultOptions[0],
          defaultOptions[2],
        ]),
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jest.spyOn(multiselectComponent as any, '_setParentId');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jest.spyOn(multiselectComponent as any, '_updateComponentStateFromControlValue');
    });

    it('should init the component successfully', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { _updateValueAndValidityTrigger } = multiselectComponent as any;
      jest.spyOn(_updateValueAndValidityTrigger, 'next');

      multiselectComponentFixture.detectChanges();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((multiselectComponent as any)._setParentId).toHaveBeenCalledTimes(1);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((multiselectComponent as any)._setParentId).toHaveBeenCalledWith('multiselect');
      expect(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (multiselectComponent as any)._updateComponentStateFromControlValue,
      ).toHaveBeenCalledTimes(1);
      expect(_updateValueAndValidityTrigger.next).toHaveBeenCalledTimes(1);
    });

    it('should not trigger valueChanges', () => {
      let didEmit = false;
      multiselectComponent.control.valueChanges.subscribe(() => (didEmit = true));
      multiselectComponentFixture.detectChanges();
      expect(didEmit).toBeFalsy();
    });

    it('should trigger valueChanges', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { _updateValueAndValidityTrigger } = multiselectComponent as any;
      jest.spyOn(_updateValueAndValidityTrigger, 'next');

      let didEmit = false;
      multiselectComponent.control.valueChanges.subscribe(() => (didEmit = true));

      multiselectComponentFixture.detectChanges();

      expect(didEmit).toBeFalsy();

      multiselectComponent.control.setValue([defaultOptions[2]]);

      expect(didEmit).toBeTruthy();
      expect(_updateValueAndValidityTrigger.next).toHaveBeenCalledTimes(2);
      expect(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (multiselectComponent as any)._updateComponentStateFromControlValue,
      ).toHaveBeenCalledTimes(2);
    });

    it('should close subscription on destroy', () => {
      multiselectComponentFixture.detectChanges();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((multiselectComponent as any)._subscription.closed).toBeFalsy();

      multiselectComponentFixture.destroy();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((multiselectComponent as any)._subscription.closed).toBeTruthy();
    });
  });

  describe('Input', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(MultiselectMockComponent<TestAnimalValue>);
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
      fixture = TestBed.createComponent(MultiselectMockComponent<TestAnimalValue>);
      component = fixture.componentInstance;
    });

    it('should update component and control state when handleMultiSelectionChange is called with type "add" and control value is null', async () => {
      initWithControlNull();

      component.multiselectEl.openDropdown();
      fixture.detectChanges();

      await fixture.whenStable().then(() => {
        component.multiselectEl.handleMultiSelectionChange(defaultOptions[7], 'add');

        const element = getElement(fixture, '.fudis-select__input');

        expect(component.control.value).toEqual([defaultOptions[7]]);
        expect(element.getAttribute('value')).toEqual('Southern Titiwangsa Bent-Toed Gecko');
      });
    });

    it('should update component state when handleMultiSelectionChange is called with "add"', () => {
      initWithControlValue();

      component.multiselectEl.handleMultiSelectionChange(defaultOptions[7], 'add');
      fixture.detectChanges();

      const value = getElement(fixture, '.fudis-select__input').getAttribute('value');

      expect(value).toEqual('Dog, Platypus, Southern Titiwangsa Bent-Toed Gecko');
      expect(component.control.value).toEqual([
        defaultOptions[0],
        defaultOptions[2],
        defaultOptions[7],
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
      fixture = TestBed.createComponent(MultiselectMockComponent<TestAnimalValue>);
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

      const chipListButtons = getAllElements(fixture, '.fudis-multiselect-chip-list__item__button');

      expect(chipListButtons).toHaveLength(3);
    });

    it('should update control value when clicking', () => {
      initWithControlNull();

      component.control.patchValue([defaultOptions[1], defaultOptions[4]]);
      fixture.detectChanges();

      const chipListButtons = getAllElements(fixture, '.fudis-multiselect-chip-list__item__button');
      (chipListButtons[1] as HTMLButtonElement).click();

      expect(component.control.value).toEqual([defaultOptions[1]]);
    });
  });
});
