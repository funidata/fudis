import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectOptionComponent } from './select-option.component';
import { SelectGroupComponent } from '../../common/select-group/select-group.component';
import { SelectComponent } from '../select.component';
import { defaultOptions } from '../../common/mock_data';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { GuidanceComponent } from '../../../guidance/guidance.component';
import { IconComponent } from '../../../../icon/icon.component';
import { LabelComponent } from '../../../label/label.component';
import { BodyTextComponent } from '../../../../typography/body-text/body-text.component';
import { SelectDropdownComponent } from '../../common/select-dropdown/select-dropdown.component';
import { FudisSelectOption } from '../../../../../types/forms';
import { SelectOptionsDirective } from '../../common/select-options-directive/select-options.directive';
import { By } from '@angular/platform-browser';
import { SelectIconsComponent } from '../../common/select-icons/select-icons.component';
import { ButtonComponent } from '../../../../button/button.component';
import { getElement } from '../../../../../utilities/tests/utilities';
import { FudisInternalErrorSummaryService } from '../../../../../services/form/error-summary/internal-error-summary.service';
import { SelectControlValueAccessorDirective } from '../../common/select-control-value-accessor/select-control-value-accessor.directive';
import { SelectAutocompleteDirective } from '../../common/autocomplete/autocomplete.directive';

@Component({
  selector: 'fudis-mock-container',
  template: `<fudis-select
    #testSelect
    [label]="'Test Label'"
    [variant]="variant"
    [placeholder]="'Test placeholder'"
    [control]="control"
    [size]="'md'"
  >
    <ng-template fudisSelectOptions>
      <fudis-select-option *ngFor="let option of testOptions" [data]="option"></fudis-select-option>
    </ng-template>
  </fudis-select>`,
})
class MockContainerComponent {
  testOptions: FudisSelectOption<object>[] = defaultOptions;
  control: FormControl = new FormControl(null);

  variant = 'dropdown';

  @ViewChild('testSelect') testSelect: SelectComponent;
}

describe('SelectOptionComponent', () => {
  let component: MockContainerComponent;
  let fixture: ComponentFixture<MockContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SelectOptionsDirective,
        SelectComponent,
        SelectControlValueAccessorDirective,
        SelectAutocompleteDirective,
        SelectOptionComponent,
        SelectGroupComponent,
        SelectDropdownComponent,
        MockContainerComponent,
        GuidanceComponent,
        SelectIconsComponent,
        ButtonComponent,
        IconComponent,
        LabelComponent,
        BodyTextComponent,
      ],
      providers: [FudisInternalErrorSummaryService],
      imports: [ReactiveFormsModule],
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
    component.control = new FormControl(defaultOptions[4]);
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

      const iconNotToBeFound = fixture.nativeElement.querySelector('[ng-reflect-icon="check"]');
      expect(iconNotToBeFound).toBeFalsy();

      updateControlValue();

      const checkIcon = fixture.nativeElement.querySelector('[ng-reflect-icon="check"]');

      expect(checkIcon).toBeTruthy();
    });

    it('should have selected value if form control value is updated from application', () => {
      setSelectDropdownOpen();

      updateControlValue();

      const checkIcon = fixture.nativeElement.querySelector(
        '.fudis-select-option--selected [ng-reflect-icon="check"]',
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
        '.fudis-select-option--selected [ng-reflect-icon="check"]',
      );

      const selectedValue = fixture.debugElement.query(
        By.css('.fudis-select-option--selected'),
      ).nativeElement;

      expect(selectedValue.textContent).toEqual('Screaming hairy armadillo');

      expect(checkIcon).toBeTruthy();
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

      const disabledOption = getElement(fixture, '#fudis-select-1-option-value-4-cat');
      const enabledOption = getElement(fixture, '#fudis-select-1-option-value-5-armadillo');

      disabledOption.click();

      expect(component.testSelect.selectionUpdate.emit).not.toHaveBeenCalled();

      enabledOption.click();

      expect(component.testSelect.selectionUpdate.emit).toHaveBeenCalledWith({
        label: 'Screaming hairy armadillo',
        sound: "Rollin' rollin' rollin'!",
        value: 'value-5-armadillo',
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
