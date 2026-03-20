import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectOptionComponent } from './select-option.component';
import { SelectComponent } from '../select.component';
import {
  defaultOptions,
  defaultOptionsSecondaryLang,
  TestAnimalValue,
} from '../../common/mock_data';
import { FormControl } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { FudisSelectOption } from '../../../../../types/forms';
import { SelectOptionsDirective } from '../../common/select-options-directive/select-options.directive';
import { By } from '@angular/platform-browser';
import { getElement } from '../../../../../utilities/tests/utilities';
import { FudisInternalErrorSummaryService } from '../../../../../services/form/error-summary/internal-error-summary.service';
import { FudisDialogService } from '../../../../../services/dialog/dialog.service';

@Component({
  selector: 'fudis-mock-container',
  imports: [SelectComponent, SelectOptionsDirective, SelectOptionComponent],
  template: `<fudis-select
    #testSelect
    [label]="'Test Label'"
    [variant]="variant"
    [placeholder]="'Test placeholder'"
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
class MockContainerComponent {
  @ViewChild('testSelect') testSelect: SelectComponent;

  testOptions: FudisSelectOption<TestAnimalValue>[] = defaultOptions;
  control: FormControl<FudisSelectOption<TestAnimalValue> | null> = new FormControl(null);
  variant = 'dropdown';
}

describe('SelectOptionComponent', () => {
  let component: MockContainerComponent;
  let fixture: ComponentFixture<MockContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockContainerComponent],
      providers: [FudisDialogService, FudisInternalErrorSummaryService],
    }).compileComponents();

    fixture = TestBed.createComponent(MockContainerComponent);
    component = fixture.componentInstance;
    component.variant = 'dropdown';
    fixture.detectChanges();
  });

  function setSelectDropdownOpen() {
    component.testSelect.openDropdown();
    fixture.detectChanges();
  }

  function initializeFormControlWithValue() {
    component.control = new FormControl<FudisSelectOption<TestAnimalValue> | null>(
      defaultOptions[5],
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  function updateControlValue() {
    component.control.patchValue(defaultOptions[1]);
    fixture.detectChanges();
  }

  describe('Parent control', () => {
    it('should change control value when option is selected', () => {
      setSelectDropdownOpen();

      const options = fixture.debugElement.queryAll(By.css('.fudis-select-option'));

      options[2].nativeElement.click();
      fixture.detectChanges();

      expect(component.testSelect.control.value?.label).toBe('Platypus');
    });

    it('should not have selected default value if form control has no value on init', () => {
      setSelectDropdownOpen();

      const iconNotToBeFound = fixture.nativeElement.querySelector('svg#check');
      expect(iconNotToBeFound).toBeFalsy();

      updateControlValue();

      const checkIcon = fixture.nativeElement.querySelector('svg#check');

      expect(checkIcon).toBeTruthy();
    });

    it('should have selected value if form control value is updated from application', () => {
      setSelectDropdownOpen();

      updateControlValue();

      const checkIcon = fixture.nativeElement.querySelector(
        '.fudis-select-option--selected fudis-icon svg#check',
      );

      const selectedValue = fixture.debugElement.query(
        By.css('.fudis-select-option--selected'),
      ).nativeElement;

      expect(selectedValue.textContent).toEqual('Capybara');

      expect(checkIcon).toBeTruthy();
    });

    it('should have preselected value, if control has value on init', () => {
      initializeFormControlWithValue();
      setSelectDropdownOpen();

      const checkIcon = fixture.nativeElement.querySelector(
        '.fudis-select-option--selected fudis-icon svg#check',
      );

      const selectedValue = fixture.debugElement.query(
        By.css('.fudis-select-option--selected'),
      ).nativeElement;

      expect(selectedValue.textContent).toEqual('Screaming hairy armadillo (partly endangered)');

      expect(checkIcon).toBeTruthy();
    });

    it('should change visible input value when options are changed', () => {
      initializeFormControlWithValue();
      setSelectDropdownOpen();

      const selectElement = getElement(fixture, '.fudis-select');
      let value = selectElement.querySelector('.fudis-select input')?.getAttribute('value');
      expect(value).toEqual('Screaming hairy armadillo (partly endangered)');

      component.testOptions = defaultOptionsSecondaryLang;
      fixture.detectChanges();

      value = selectElement.querySelector('.fudis-select input')?.getAttribute('value');
      expect(value).toContain('Kirkuva karvainen armadillo (osittain uhanalainen)');
    });
  });

  describe('Select option', () => {
    it('should have disabled option', () => {
      setSelectDropdownOpen();

      const options = fixture.debugElement.queryAll(By.css('.fudis-select-option'));

      options[3].nativeElement.click();
      fixture.detectChanges();

      expect(options[3].nativeElement.outerHTML).toContain('fudis-select-option--disabled');
      expect(options[3].attributes['aria-selected']).toEqual('false');
    });

    it('should include correct label text with `Disabled` when option is disabled', () => {
      setSelectDropdownOpen();

      const options = fixture.debugElement.queryAll(By.css('.fudis-select-option'));

      const textContent = options[3].nativeElement.textContent;

      expect(textContent).toEqual('Really dangerous cat (Disabled)');
    });

    it('should trigger emit when clicking', () => {
      jest.spyOn(component.testSelect.selectionUpdate, 'emit');

      component.testSelect.openDropdown();

      fixture.detectChanges();

      const disabledOption = getElement(fixture, '#fudis-select-1-option-13slwtn');
      const enabledOption = getElement(fixture, '#fudis-select-1-option-100zewl');

      disabledOption.click();

      expect(component.testSelect.selectionUpdate.emit).not.toHaveBeenCalled();

      enabledOption.click();

      expect(component.testSelect.selectionUpdate.emit).toHaveBeenCalledWith({
        label: 'Screaming hairy armadillo (partly endangered)',
        sound: "Rollin' rollin' rollin'!",
        value: 'value-5-armadillo_(PARTLY_ENDANGERED)',
      });
    });
  });

  it('should trigger emit when option is typed and nulled after non-typed', () => {
    jest.spyOn(component.testSelect.selectionUpdate, 'emit');

    component.variant = 'autocompleteType';

    component.testSelect.openDropdown();

    fixture.detectChanges();

    component.testSelect.setAutocompleteFilterText('Platypus');

    fixture.detectChanges();

    expect(component.testSelect.selectionUpdate.emit).toHaveBeenCalledWith({
      label: 'Platypus',
      sound: 'Plat plat!',
      value: 'value-3-platypys',
    });

    component.testSelect.setAutocompleteFilterText('Platy');

    fixture.detectChanges();
    expect(component.testSelect.selectionUpdate.emit).toHaveBeenCalledWith(null);
  });
});
