import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MultiselectComponent } from './multiselect.component';
import { GuidanceComponent } from '../../guidance/guidance.component';
import { IconComponent } from '../../../icon/icon.component';
import { LabelComponent } from '../../label/label.component';
import { SelectAutocompleteComponent } from '../common/autocomplete/autocomplete.component';
import { SelectDropdownComponent } from '../common/select-dropdown/select-dropdown.component';
import { BodyTextComponent } from '../../../typography/body-text/body-text.component';
import { MultiselectChipListComponent } from './multiselect-chip-list/multiselect-chip-list.component';
import { MultiselectOptionComponent } from './multiselect-option/multiselect-option.component';
import { SelectGroupComponent } from '../common/select-group/select-group.component';
import { SelectBaseDirective } from '../common/select-base/select-base.directive';
import { InputBaseDirective } from '../../../../directives/form/input-base/input-base.directive';
import { TooltipDirective } from '../../../../directives/tooltip/tooltip.directive';
import { FudisTranslationService } from '../../../../services/translation/translation.service';
import { FudisFocusService } from '../../../../services/focus/focus.service';
import { FudisIdService } from '../../../../services/id/id.service';
import { FudisSelectOption } from '../../../../types/forms';
import { getAllElements, getElement } from '../../../../utilities/tests/utilities';
import { TestAnimalSound, defaultOptions } from '../common/mock_data';
import { ContentDirective } from '../../../../directives/content-projection/content/content.directive';

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
    <ng-template fudisContent type="select-options">
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
  let componentMock: MultiselectMockComponent;
  let fixtureMock: ComponentFixture<MultiselectMockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MultiselectComponent,
        MultiselectOptionComponent,
        MultiselectMockComponent,
        MultiselectChipListComponent,
        SelectAutocompleteComponent,
        SelectDropdownComponent,
        SelectGroupComponent,
        BodyTextComponent,
        GuidanceComponent,
        IconComponent,
        LabelComponent,
        ContentDirective,
      ],
      providers: [
        FudisIdService,
        FudisTranslationService,
        FudisFocusService,
        TooltipDirective,
        SelectBaseDirective,
        InputBaseDirective,
      ],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  function initWithControlValue() {
    const control = new FormControl<FudisSelectOption<TestAnimalSound>[]>([
      defaultOptions[0],
      defaultOptions[2],
    ]);

    componentMock.control = control;

    fixtureMock.detectChanges();
  }

  function initWithControlNull() {
    const control = new FormControl<FudisSelectOption<TestAnimalSound>[] | null>(null);
    componentMock.control = control;

    fixtureMock.detectChanges();
  }

  describe('Input', () => {
    beforeEach(() => {
      fixtureMock = TestBed.createComponent(MultiselectMockComponent);
      componentMock = fixtureMock.componentInstance;
    });

    it('should create', () => {
      initWithControlNull();
      expect(componentMock).toBeTruthy();
    });

    it('should have respective CSS classes according to given size Input', () => {
      initWithControlNull();
      const expectedValue = 'fudis-select fudis-input-size__md';
      const classes = getElement(fixtureMock, '.fudis-select').className;
      const componentClasses = classes.split(' ').sort();

      expect(componentClasses).toEqual(expectedValue.split(' ').sort());
    });

    it('should have help text paragraph if helpText Input is given', () => {
      initWithControlNull();
      const helpText = getElement(fixtureMock, '.fudis-guidance .fudis-guidance__help-text');

      expect(helpText).toBeTruthy();
      expect(helpText.outerHTML).toContain('Multiselect help text');
    });

    it('should have placeholder text present when control value is null on init', () => {
      initWithControlNull();
      const placeholder = getElement(fixtureMock, '.fudis-select__input__placeholder');

      const labelText = getElement(fixtureMock, '.fudis-select__input__label');

      expect(labelText).toBeFalsy();
      expect(placeholder.outerHTML).toContain('Multiselect placeholder');
    });

    it('should have HTML input value from control value if control value is set on init', () => {
      initWithControlValue();

      const expectedValue = 'Dog, Platypus';

      const labelText = getElement(fixtureMock, '.fudis-select__input__label');
      const placeholderItems = getAllElements(fixtureMock, '.fudis-select__input__label');
      const placeholerItemsArray: (string | null)[] = [];

      placeholderItems.forEach((item) => {
        placeholerItemsArray.push(item.textContent);
      });

      const placeholder = getElement(fixtureMock, '.fudis-select__input__placeholder');

      expect(labelText.textContent).toEqual(expectedValue);
      expect(placeholder).toBeFalsy();
    });

    it('should have placehorder text present when control value is updated to null', () => {
      initWithControlValue();
      componentMock.control.patchValue(null);
      fixtureMock.detectChanges();

      const placeholder = getElement(fixtureMock, '.fudis-select__input__placeholder');

      const labelText = getElement(fixtureMock, '.fudis-select__input__label');

      expect(placeholder.outerHTML).toContain('Multiselect placeholder');
      expect(labelText).toBeFalsy();
    });
  });

  describe('Multiselection change', () => {
    beforeEach(() => {
      fixtureMock = TestBed.createComponent(MultiselectMockComponent);
      componentMock = fixtureMock.componentInstance;
    });

    it('should update component and control state when handleMultiSelectionChange is called with type "add" and control value is null', () => {
      initWithControlNull();

      componentMock.multiselectEl.openDropdown();

      componentMock.multiselectEl.handleMultiSelectionChange(defaultOptions[5], 'add');
      fixtureMock.detectChanges();

      const value = getElement(fixtureMock, '.fudis-select__input__label').textContent;

      expect(value).toEqual('Southern Titiwangsa Bent-Toed Gecko');
      expect(componentMock.control.value).toEqual([defaultOptions[5]]);
    });

    it('should update component state when handleMultiSelectionChange is called with "add"', () => {
      initWithControlValue();

      componentMock.multiselectEl.handleMultiSelectionChange(defaultOptions[5], 'add');
      fixtureMock.detectChanges();

      const value = getElement(fixtureMock, '.fudis-select__input__label').textContent;

      expect(value).toEqual('Dog, Platypus, Southern Titiwangsa Bent-Toed Gecko');
      expect(componentMock.control.value).toEqual([
        defaultOptions[0],
        defaultOptions[2],
        defaultOptions[5],
      ]);
    });

    it('should update component state when handleMultiSelectionChange is called with "remove"', () => {
      initWithControlValue();
      componentMock.multiselectEl.handleMultiSelectionChange(defaultOptions[0], 'remove');
      fixtureMock.detectChanges();

      const value = getElement(fixtureMock, '.fudis-select__input__label').textContent;

      expect(value).toEqual('Platypus');
      expect(componentMock.control.value).toEqual([defaultOptions[2]]);
    });
  });

  describe('Chip list', () => {
    beforeEach(() => {
      fixtureMock = TestBed.createComponent(MultiselectMockComponent);
      componentMock = fixtureMock.componentInstance;
    });

    it('should be visible by default', () => {
      initWithControlNull();
      componentMock.control.patchValue([defaultOptions[0], defaultOptions[2]]);
      fixtureMock.detectChanges();

      const chipList = getElement(fixtureMock, '.fudis-multiselect-chip-list');

      expect(chipList).toBeTruthy();
    });

    it('should not be visible if showSelectionChips is set to false', () => {
      initWithControlValue();
      componentMock.multiselectEl.showSelectionChips = false;
      fixtureMock.detectChanges();

      const chipList = getElement(fixtureMock, '.fudis-multiselect-chip-list');

      expect(chipList).toBeFalsy();
    });

    it('should have correct length of buttons', () => {
      initWithControlNull();

      componentMock.control.patchValue([defaultOptions[2], defaultOptions[4], defaultOptions[0]]);
      fixtureMock.detectChanges();

      const chipListButtons = getAllElements(fixtureMock, '.fudis-multiselect-chip-list__button');

      expect(chipListButtons).toHaveLength(3);
    });
  });
});
