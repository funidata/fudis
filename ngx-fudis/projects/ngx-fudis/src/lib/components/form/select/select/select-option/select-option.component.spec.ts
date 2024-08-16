import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOptionComponent } from './select-option.component';
import { SelectGroupComponent } from '../../common/select-group/select-group.component';
import { SelectComponent } from '../select.component';
import { FudisTranslationService } from '../../../../../services/translation/translation.service';
import { FudisIdService } from '../../../../../services/id/id.service';
import { defaultOptions } from '../../common/mock_data';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { GuidanceComponent } from '../../../guidance/guidance.component';
import { IconComponent } from '../../../../icon/icon.component';
import { LabelComponent } from '../../../label/label.component';
import { BodyTextComponent } from '../../../../typography/body-text/body-text.component';
import { SelectDropdownComponent } from '../../common/select-dropdown/select-dropdown.component';
import { FudisSelectOption } from '../../../../../types/forms';
import { SelectAutocompleteComponent } from '../../common/autocomplete/autocomplete.component';
import { ContentDirective } from '../../../../../directives/content-projection/content/content.directive';
import { By } from '@angular/platform-browser';
import { SelectIconsComponent } from '../../common/select-icons/select-icons.component';
import { ButtonComponent } from '../../../../button/button.component';
import { getElement } from '../../../../../utilities/tests/utilities';

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
    <ng-template fudisContent type="select-options">
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
        ContentDirective,
        SelectComponent,
        SelectOptionComponent,
        SelectGroupComponent,
        SelectDropdownComponent,
        MockContainerComponent,
        SelectAutocompleteComponent,
        GuidanceComponent,
        SelectIconsComponent,
        ButtonComponent,
        IconComponent,
        LabelComponent,
        BodyTextComponent,
      ],
      providers: [FudisIdService, FudisTranslationService],
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

      const disabledOption = getElement(fixture, '#fudis-select-1-option-4');
      const enabledOption = getElement(fixture, '#fudis-select-1-option-5');

      disabledOption.click();

      expect(component.testSelect.selectionUpdate.emit).not.toHaveBeenCalled();

      enabledOption.click();

      expect(component.testSelect.selectionUpdate.emit).toHaveBeenCalledWith({
        fudisGeneratedHtmlId: 'fudis-select-1-option-5',
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

    component.testSelect.autocompleteRef.updateInputValue('Platypus');

    fixture.detectChanges();

    expect(component.testSelect.selectionUpdate.emit).toHaveBeenCalledWith({
      fudisGeneratedHtmlId: 'fudis-select-1-option-3',
      label: 'Platypus',
      sound: 'Plat plat!',
      value: 'value-3-platypys',
    });

    component.testSelect.autocompleteRef.updateInputValue('Platypu');

    expect(component.testSelect.selectionUpdate.emit).toHaveBeenCalledWith(null);
  });
});
