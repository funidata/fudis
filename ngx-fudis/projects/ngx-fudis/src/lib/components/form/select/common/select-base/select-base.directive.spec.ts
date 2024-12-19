import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectBaseDirective } from './select-base.directive';
import { SelectGroupComponent } from '../select-group/select-group.component';
import { Component, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '../../select/select.component';
import { IconComponent } from '../../../../icon/icon.component';
import { GuidanceComponent } from '../../../guidance/guidance.component';
import { LabelComponent } from '../../../label/label.component';
import { BodyTextComponent } from '../../../../typography/body-text/body-text.component';
import { SelectDropdownComponent } from '../select-dropdown/select-dropdown.component';
import { SelectOptionComponent } from '../../select/select-option/select-option.component';
import { MultiselectComponent } from '../../multiselect/multiselect.component';
import { FudisInputSize, FudisSelectOption, FudisSelectVariant } from '../../../../../types/forms';
import { ButtonComponent } from '../../../../button/button.component';
import { MultiselectOptionComponent } from '../../multiselect/multiselect-option/multiselect-option.component';
import { getAllElements, getElement } from '../../../../../utilities/tests/utilities';
import { MultiselectChipListComponent } from '../../multiselect/multiselect-chip-list/multiselect-chip-list.component';
import { By } from '@angular/platform-browser';
import { groupedTestData } from '../mock_data';
import { SelectIconsComponent } from '../select-icons/select-icons.component';
import { FudisInternalErrorSummaryService } from '../../../../../services/form/error-summary/internal-error-summary.service';
import { SelectOptionsDirective } from '../select-options-directive/select-options.directive';
import { MultiselectControlValueAccessorDirective } from '../select-control-value-accessor/select-control-value-accessor.directive';
import { MultiselectAutocompleteDirective } from '../autocomplete/new-autocomplete.directive';

@Component({
  selector: 'fudis-mock-select',
  template: `<fudis-multiselect
      #multiSelect
      [variant]="variant"
      [selectionClearButton]="clearButton"
      [label]="'MultiSelect Label'"
      [placeholder]="'Test placeholder'"
      [control]="control"
      [size]="size"
    >
      <ng-template fudisSelectOptions>
        <fudis-multiselect-group *ngFor="let group of groupedData" [label]="group.country">
          <fudis-multiselect-option
            *ngFor="let groupedOption of group.options"
            [data]="groupedOption"
          />
        </fudis-multiselect-group>
      </ng-template>
    </fudis-multiselect>
    <fudis-multiselect
      #multiSelectAuto
      [autocompleteFilter]="autocompleteFilter"
      [variant]="'autocompleteDropdown'"
      [label]="'MultiAutoSelect Label'"
      [autocompleteHelpText]="'This is autocomplete help text'"
      [placeholder]="'Test placeholder for autocomplete'"
      [control]="control"
      [size]="'md'"
      [selectionClearButton]="clearButton"
    >
      <ng-template fudisSelectOptions>
        <fudis-multiselect-group *ngFor="let group of groupedData" [label]="group.country">
          <fudis-multiselect-option
            *ngFor="let groupedOption of group.options"
            [data]="groupedOption"
          />
        </fudis-multiselect-group>
      </ng-template>
    </fudis-multiselect>`,
})
class MockSelectComponent {
  groupedData = groupedTestData;
  control: FormControl = new FormControl<FudisSelectOption<object>[] | null>(null);
  clearButton: boolean = true;
  size = 'md';
  variant: FudisSelectVariant = 'dropdown';
  autocompleteFilter = true;

  @ViewChild('multiSelect') multiSelect: MultiselectComponent;
  @ViewChild('multiSelectAuto') multiSelectAuto: MultiselectComponent;
}

describe('SelectBaseDirective', () => {
  let component: MockSelectComponent;
  let fixture: ComponentFixture<MockSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SelectComponent,
        SelectBaseDirective,
        MultiselectControlValueAccessorDirective,
        MultiselectAutocompleteDirective,
        SelectGroupComponent,
        SelectDropdownComponent,
        SelectOptionComponent,
        SelectIconsComponent,
        SelectOptionsDirective,
        IconComponent,
        GuidanceComponent,
        IconComponent,
        LabelComponent,
        MockSelectComponent,
        MultiselectComponent,
        MultiselectOptionComponent,
        MultiselectChipListComponent,
        BodyTextComponent,
        ButtonComponent,
      ],
      providers: [FudisInternalErrorSummaryService],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function setMultiSelectDropdownOpen() {
    component.multiSelect.openDropdown();
    fixture.detectChanges();
  }

  function setMultiSelectDropdownClosed() {
    component.multiSelect.closeDropdown(true, true);
    fixture.detectChanges();
  }

  function findMultiSelectDropdownElement(index: number) {
    const multiSelectDropdown = getAllElements(
      fixture,
      '.fudis-select-dropdown__multiselect.fudis-select-dropdown--open',
    );
    return multiSelectDropdown[index];
  }

  function findMultiSelectInputClass(index: number) {
    const selectInputElement: NodeList = getAllElements(
      fixture,
      '.fudis-select__input.fudis-select__input__dropdown',
    );
    return selectInputElement[index];
  }

  function patchControlValue() {
    component.control.patchValue([groupedTestData[0].options[0], groupedTestData[1].options[1]]);
  }

  describe('Basic inputs', () => {
    describe('variant', () => {
      it('should be dropdown', () => {
        const dropdownElement = getElement(
          fixture,
          '#fudis-multiselect-1.fudis-select__input__dropdown',
        );

        const autocompleteElement = getElement(
          fixture,
          '#fudis-multiselect-1.fudis-select-autocomplete',
        );

        expect(dropdownElement).toBeTruthy();
        expect(autocompleteElement).toBeNull();
      });
      it('should be autocomplete', () => {
        const variants: FudisSelectVariant[] = ['autocompleteDropdown', 'autocompleteType'];

        variants.forEach((variant) => {
          component.variant = variant;
          fixture.detectChanges();
          const dropdownElement = getElement(
            fixture,
            '#fudis-multiselect-1.fudis-select__input__dropdown',
          );

          const autocompleteElement = getElement(
            fixture,
            '#fudis-multiselect-1.fudis-select-autocomplete',
          );

          expect(dropdownElement).toBeNull();
          expect(autocompleteElement).toBeTruthy();
        });
      });
    });

    it('should have size', () => {
      const sizes: (FudisInputSize | 'xs')[] = ['xs', 'sm', 'md', 'lg'];

      sizes.forEach((size) => {
        component.size = size;
        fixture.detectChanges();

        const element = getElement(fixture, `.fudis-input-size__${size} #fudis-multiselect-1`);

        expect(element).toBeTruthy();
      });
    });

    it('should set autocompleteNoResultsText', () => {
      const customText = 'This is custom no results text';

      component.multiSelectAuto.autocompleteNoResultsText = customText;

      fixture.detectChanges();

      const autocompleteInput = getElement(fixture, '#fudis-multiselect-2') as HTMLInputElement;
      autocompleteInput.focus();

      fixture.detectChanges();

      component.multiSelectAuto.setAutocompleteFilterText('hello');

      fixture.detectChanges();

      const noResultsElement = getElement(fixture, '.fudis-select-dropdown__help-text__last');

      expect(noResultsElement.textContent).toEqual(customText);
    });

    it('autocompleteFilter false should not filter results', () => {
      const autocompleteInput = getElement(fixture, '#fudis-multiselect-2') as HTMLInputElement;
      autocompleteInput.focus();
      fixture.detectChanges();

      component.multiSelectAuto.setAutocompleteFilterText('salmon');

      fixture.detectChanges();

      const allOptionsBefore = getAllElements(
        fixture,
        '#fudis-multiselect-2-main-wrapper .fudis-multiselect-option--visible',
      );

      expect(allOptionsBefore.length).toEqual(1);

      component.autocompleteFilter = false;

      fixture.detectChanges();

      component.multiSelectAuto.setAutocompleteFilterText('salmo');

      fixture.detectChanges();

      const allOptionsAfter = getAllElements(
        fixture,
        '#fudis-multiselect-2-main-wrapper .fudis-multiselect-option--visible',
      );

      expect(allOptionsAfter.length).toEqual(9);
    });

    it('selectionClearButton', () => {
      const buttonsFirst = getAllElements(fixture, 'fudis-button .fudis-icon__close');

      expect(buttonsFirst.length).toEqual(0);

      patchControlValue();
      fixture.detectChanges();

      const buttonsSecond = getAllElements(fixture, 'fudis-button .fudis-icon__close');

      expect(buttonsSecond.length).toEqual(2);

      component.clearButton = false;
      fixture.detectChanges();

      const buttonsThird = getAllElements(fixture, 'fudis-button .fudis-icon__close');

      expect(buttonsThird.length).toEqual(0);
    });

    it('autocompleteHelpText', () => {
      component.multiSelectAuto.openDropdown();

      fixture.detectChanges();

      const dropdownElementAttribute = getElement(
        fixture,
        '#fudis-multiselect-2-main-wrapper fudis-select-dropdown',
      ).getAttribute('ng-reflect-autocomplete-help-text');

      expect(dropdownElementAttribute).toEqual('This is autocomplete help text');
    });

    it('should show sorted selected options as form input value for both input sharing the same control', async () => {
      setMultiSelectDropdownOpen();
      patchControlValue();

      fixture.detectChanges();

      const checkedOption = getAllElements(
        fixture,
        '.fudis-multiselect-option__label--checked .fudis-multiselect-option__label__text__main',
      );

      const selectedOptionLabelArray: (string | null)[] = [];

      checkedOption.forEach((item) => {
        selectedOptionLabelArray.push(item.textContent);
      });

      expect(selectedOptionLabelArray).toEqual([
        'Golden jackal',
        'Falcon, prairie',
        'Golden jackal',
        'Falcon, prairie',
      ]);

      await fixture.whenStable().then(() => {
        const inputText = getElement(fixture, '.fudis-select__input') as HTMLInputElement;

        expect(inputText.getAttribute('value')).toEqual("Golden jackal, 'Falcon, prairie'");
      });
    });

    it('should open and close dropdown', () => {
      expect(findMultiSelectDropdownElement(0)).toBeFalsy();
      setMultiSelectDropdownOpen();
      expect(findMultiSelectDropdownElement(0)).toBeTruthy();

      setMultiSelectDropdownClosed();
      expect(findMultiSelectDropdownElement(0)).toBeFalsy();
    });
  });

  describe('Outputs', () => {
    it('should emit selectionUpdate', () => {
      jest.spyOn(component.multiSelect.selectionUpdate, 'emit');

      component.multiSelect.openDropdown();
      fixture.detectChanges();

      getElement(
        fixture,
        '#fudis-multiselect-1-main-wrapper .fudis-select-option__focusable',
      ).click();

      fixture.detectChanges();

      expect(component.multiSelect.selectionUpdate.emit).toHaveBeenCalledWith([
        {
          label: 'Golden jackal',
          subLabel: 'Canis aureus',
          value: '4257d865-872c-4ea6-80e6-8bd04ce56ad7',
        },
      ]);

      getElement(
        fixture,
        '#fudis-multiselect-1-main-wrapper .fudis-select-option__focusable',
      ).click();

      expect(component.multiSelect.selectionUpdate.emit).toHaveBeenCalledWith(null);
    });

    it('should emit filterTextUpdate', () => {
      jest.spyOn(component.multiSelectAuto.filterTextUpdate, 'emit');

      component.multiSelectAuto.setAutocompleteFilterText('hello');

      expect(component.multiSelectAuto.filterTextUpdate.emit).toHaveBeenCalledWith('hello');
    });
  });

  describe('keyboard interaction', () => {
    it('on key press `down` should focus on first element in table', () => {
      const dropdownInput = findMultiSelectInputClass(0) as HTMLInputElement;
      dropdownInput.focus();
      fixture.detectChanges();

      dropdownInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      dropdownInput.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowDown' }));
      fixture.detectChanges();

      const options = fixture.debugElement.queryAll(By.css('.fudis-multiselect-option__label'));

      const focusedOption = fixture.debugElement.queryAll(
        By.css('.fudis-multiselect-option .fudis-multiselect-option__label--focus'),
      );

      expect(focusedOption.length).toEqual(1);

      expect(options[0]).toEqual(focusedOption[0]);
    });

    it("on 'Escape' keypress should close dropdown", () => {
      setMultiSelectDropdownOpen();

      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

      fixture.detectChanges();

      const openDropdownEl = getElement(fixture, '.fudis-select-dropdown--open');

      expect(openDropdownEl).toBeNull();
    });
  });
});
