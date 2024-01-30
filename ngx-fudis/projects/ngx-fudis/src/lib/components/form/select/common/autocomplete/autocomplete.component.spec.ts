import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAutocompleteComponent } from './autocomplete.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../button/button.component';
import { IconComponent } from '../../../../icon/icon.component';
import { ContentDirective } from '../../../../../directives/content-projection/content/content.directive';
import { getElement } from '../../../../../utilities/tests/utilities';
import { FudisSelectOption } from '../../../../../types/forms';
import { FudisIdService } from '../../../../../services/id/id.service';
import { FudisTranslationService } from '../../../../../services/translation/translation.service';
import { Component, ViewChild } from '@angular/core';
import { SelectComponent } from '../../select/select.component';
import { SelectOptionComponent } from '../../select/select-option/select-option.component';
import { SelectDropdownComponent } from '../select-dropdown/select-dropdown.component';
import { FudisFocusService } from '../../../../../services/focus/focus.service';
import { GuidanceComponent } from '../../../guidance/guidance.component';
import { LabelComponent } from '../../../label/label.component';
import { By } from '@angular/platform-browser';
import { ValidatorErrorMessageComponent } from '../../../error-message/validator-error-message/validator-error-message.component';

@Component({
  selector: 'fudis-mock-with-parent',
  template: `<div [id]="id">
    <fudis-select-autocomplete
      #autoSelect
      [placeholder]="placeholder"
      [control]="control"
      [id]="id"
      [dropdownOpen]="dropdownOpen"
      [required]="true"
    />
  </div>`,
})
class MockWithParentComponent {
  @ViewChild('autoSelect') autoSelect: SelectAutocompleteComponent;

  id: string = 'parent-select-id';
  placeholder: string = 'Test placeholder';
  dropdownOpen: boolean = false;
  control: FormControl = new FormControl<FudisSelectOption[] | null>(null);
}

describe('AutocompleteComponent', () => {
  let component: SelectAutocompleteComponent;
  let fixture: ComponentFixture<SelectAutocompleteComponent>;
  let parentComponent: MockWithParentComponent;
  let parentFixture: ComponentFixture<MockWithParentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContentDirective,
        SelectComponent,
        SelectDropdownComponent,
        SelectAutocompleteComponent,
        SelectOptionComponent,
        LabelComponent,
        ButtonComponent,
        GuidanceComponent,
        IconComponent,
        ValidatorErrorMessageComponent,
        MockWithParentComponent,
      ],
      providers: [FudisFocusService, FudisIdService, FudisTranslationService],
      imports: [ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(SelectAutocompleteComponent);
    component = fixture.componentInstance;

    parentFixture = TestBed.createComponent(MockWithParentComponent);
    parentComponent = parentFixture.componentInstance;
    parentFixture.detectChanges();
  });

  function getInputElement() {
    const inputElement = getElement(fixture, 'input');
    return inputElement;
  }

  function getComponentWrapper() {
    const inputElement = getElement(parentFixture, 'fudis-select-autocomplete');
    return inputElement;
  }

  describe('Select Autocomplete default values', () => {
    it('should have respective classes', () => {
      expect(getComponentWrapper().className).toEqual('fudis-select-autocomplete-host');
    });

    it('should have required attribute', () => {
      expect(getComponentWrapper().getAttribute('ng-reflect-required')).toEqual('true');
    });

    it('should have given id', () => {
      expect(getComponentWrapper().getAttribute('ng-reflect-id')).toEqual('parent-select-id');
    });

    it('should have dropdown open', () => {
      parentComponent.dropdownOpen = true;
      parentFixture.detectChanges();
      expect(getComponentWrapper().getAttribute('ng-reflect-dropdown-open')).toEqual('true');
    });
  });

  describe('Select Autocomplete functionality', () => {
    beforeEach(() => {
      component.id = 'parent-id';
      component.placeholder = 'Test placeholder';
      component.dropdownOpen = false;
      component.control = new FormControl<FudisSelectOption | FudisSelectOption[] | null>(null);
      fixture.detectChanges();
    });

    it('should trigger focus event', () => {
      jest.spyOn(component.triggerFocus, 'emit');
      getInputElement().dispatchEvent(new FocusEvent('focus'));

      expect(component.triggerFocus.emit).toHaveBeenCalled();
    });

    it('should trigger blur event', () => {
      jest.spyOn(component.triggerBlur, 'emit');
      getInputElement().dispatchEvent(new FocusEvent('blur'));

      expect(component.triggerBlur.emit).toHaveBeenCalled();
    });

    it('should trigger dropdown toggle event', () => {
      jest.spyOn(component.triggerDropdownToggle, 'emit');

      getInputElement().dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));

      expect(component.triggerDropdownToggle.emit).toHaveBeenCalled();
    });

    it('should trigger dropdown close event', () => {
      jest.spyOn(component.triggerDropdownClose, 'emit');

      getInputElement().dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }));

      expect(component.triggerDropdownClose.emit).toHaveBeenCalled();
    });

    it('should trigger dropdown open event', () => {
      jest.spyOn(component.triggerDropdownOpen, 'emit');

      getInputElement().dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowDown' }));

      expect(component.triggerDropdownOpen.emit).toHaveBeenCalled();
    });

    it('should trigger filter text update event', () => {
      jest.spyOn(component.triggerFilterTextUpdate, 'emit');

      const input = fixture.debugElement.query(By.css('.fudis-select-autocomplete__input'));
      const el = input.nativeElement;

      el.value = '';
      el.dispatchEvent(new KeyboardEvent('keyup'));

      expect(component.triggerFilterTextUpdate.emit).toHaveBeenCalled();
    });

    it('should trigger filter text update event', () => {
      jest.spyOn(component.triggerFilterTextUpdate, 'emit');

      const input = fixture.debugElement.query(By.css('.fudis-select-autocomplete__input'));
      const el = input.nativeElement;

      el.value = '';
      el.dispatchEvent(new KeyboardEvent('keyup'));

      expect(component.triggerFilterTextUpdate.emit).toHaveBeenCalled();
    });

    it('should trigger clear filter button click event', () => {
      jest.spyOn(component.triggerClearFilterButtonClick, 'emit');

      const clearButton = getElement(fixture, 'fudis-button');
      clearButton.click();

      expect(component.triggerClearFilterButtonClick.emit).toHaveBeenCalled();
    });
  });
});
