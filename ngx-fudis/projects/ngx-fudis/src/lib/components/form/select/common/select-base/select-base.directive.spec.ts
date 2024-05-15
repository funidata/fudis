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
import { FudisIdService } from '../../../../../services/id/id.service';
import { FudisTranslationService } from '../../../../../services/translation/translation.service';
import { ContentDirective } from '../../../../../directives/content-projection/content/content.directive';
import { SelectOptionComponent } from '../../select/select-option/select-option.component';
import { MultiselectComponent } from '../../multiselect/multiselect.component';
import { FudisSelectOption } from '../../../../../types/forms';
import { SelectAutocompleteComponent } from '../autocomplete/autocomplete.component';
import { ButtonComponent } from '../../../../button/button.component';
import { MultiselectOptionComponent } from '../../multiselect/multiselect-option/multiselect-option.component';
import { FudisFocusService } from '../../../../../services/focus/focus.service';
import { getAllElements, getElement } from '../../../../../utilities/tests/utilities';
import { MultiselectChipListComponent } from '../../multiselect/multiselect-chip-list/multiselect-chip-list.component';
import { By } from '@angular/platform-browser';
import { groupedTestData } from '../mock_data';

@Component({
  selector: 'fudis-mock-select',
  template: `<fudis-multiselect
      #multiSelect
      [autocomplete]="false"
      [label]="'MultiSelect Label'"
      [placeholder]="'Test placeholder'"
      [control]="control"
      [size]="'md'"
    >
      <ng-template fudisContent type="select-options">
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
      [autocomplete]="true"
      [label]="'MultiAutoSelect Label'"
      [placeholder]="'Test placeholder for autocomplete'"
      [control]="control"
      [size]="'md'"
      [autocompleteClearButton]="clearButton"
    >
      <ng-template fudisContent type="select-options">
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

  @ViewChild('multiSelect') multiSelect: MultiselectComponent;
  @ViewChild('multiSelectAuto') multiSelectAuto: MultiselectComponent;
}

describe('SelectBaseDirective', () => {
  let component: MockSelectComponent;
  let fixture: ComponentFixture<MockSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContentDirective,
        SelectComponent,
        SelectBaseDirective,
        SelectGroupComponent,
        SelectDropdownComponent,
        SelectOptionComponent,
        GuidanceComponent,
        IconComponent,
        LabelComponent,
        MockSelectComponent,
        MultiselectComponent,
        MultiselectOptionComponent,
        MultiselectChipListComponent,
        SelectAutocompleteComponent,
        BodyTextComponent,
        ButtonComponent,
      ],
      providers: [FudisFocusService, FudisIdService, FudisTranslationService],
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

  function findMultiSelectDropdownElement() {
    const multiSelectDropdown = getElement(
      fixture,
      '.fudis-select-dropdown__multiselect.fudis-select-dropdown--open',
    );
    return multiSelectDropdown;
  }

  function findMultiSelectInputClass() {
    const selectInputElement: HTMLElement = getElement(
      fixture,
      '.fudis-select__input.fudis-select__input__dropdown',
    );
    return selectInputElement;
  }

  function patchControlValue() {
    component.control.patchValue([groupedTestData[0].options[0], groupedTestData[1].options[1]]);
  }

  describe('Multiselect default values', () => {
    it('should have size', () => {
      expect(component.multiSelect.size).toEqual('md');
    });

    // TODO: Fix this test
    // it('should have CSS host class', () => {
    //   expect(component.multiSelect.classes).toEqual('fudis-select-host');
    // });

    it('should show sorted selected options as form input value', () => {
      patchControlValue();
      setMultiSelectDropdownOpen();
      fixture.detectChanges();

      const checkedOption = getAllElements(
        fixture,
        '.fudis-multiselect-option__label--checked .fudis-multiselect-option__label__text',
      );

      const selectedOptionLabelArray: (string | null)[] = [];

      checkedOption.forEach((item) => {
        selectedOptionLabelArray.push(item.textContent);
      });

      expect(selectedOptionLabelArray).toEqual(['Golden jackal', 'Falcon, prairie']);

      const inputText = getElement(fixture, '.fudis-select__input__label');
      const inputValue = inputText.textContent;

      expect(inputValue).toEqual("Golden jackal, 'Falcon, prairie'");
    });

    it('should open dropdown when Multiselect receives focus', () => {
      expect(findMultiSelectDropdownElement()).toBeNull();

      const dropdownInput = findMultiSelectInputClass() as HTMLInputElement;
      dropdownInput.focus();
      fixture.detectChanges();

      expect(findMultiSelectDropdownElement()).toBeTruthy();
    });

    it('should close dropdown', () => {
      setMultiSelectDropdownOpen();
      expect(findMultiSelectDropdownElement()).toBeTruthy();

      setMultiSelectDropdownClosed();
      expect(findMultiSelectDropdownElement()).toBeNull();
    });

    it('should close dropdown when `blur` is triggered', () => {
      const dropdownInput = findMultiSelectInputClass() as HTMLInputElement;
      dropdownInput.focus();
      fixture.detectChanges();

      expect(findMultiSelectDropdownElement()).toBeTruthy();

      dropdownInput.blur();
      fixture.detectChanges();

      expect(findMultiSelectDropdownElement()).toBeNull();
    });
  });

  describe('keyboard interaction', () => {
    it('on key press `down` should focus on first element in table', () => {
      const dropdownInput = findMultiSelectInputClass() as HTMLInputElement;
      dropdownInput.focus();
      fixture.detectChanges();

      dropdownInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
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

  describe('Aucomplete Default values', () => {
    it('should have placeholder text', () => {
      const selectElement = getElement(fixture, 'fudis-select-autocomplete');
      const value = selectElement
        .querySelector('.fudis-select-autocomplete__input')
        ?.getAttribute('placeholder');
      expect(value).toContain('Test placeholder for autocomplete');
    });

    it('should display clear button when set to true', () => {
      const clearIconButton = getElement(
        fixture,
        'fudis-select-autocomplete .fudis-select-autocomplete__icon.fudis-button-host',
      );

      expect(clearIconButton.getAttribute('ng-reflect-icon')).toEqual('close');

      component.clearButton = false;
      fixture.detectChanges();

      const dropdownChervon = getElement(
        fixture,
        'fudis-select-autocomplete .fudis-select-autocomplete__icon',
      );
      expect(dropdownChervon.getAttribute('ng-reflect-icon')).toEqual('chevron');
    });

    it('on key press `down` should open autocomplete dropdown', () => {
      const selectInputElement = fixture.nativeElement.querySelector('input');

      selectInputElement.focus();
      fixture.detectChanges();

      expect(findMultiSelectDropdownElement()).toBeNull();

      selectInputElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowDown' }));
      fixture.detectChanges();

      expect(findMultiSelectDropdownElement()).toBeTruthy();
    });
  });
});
