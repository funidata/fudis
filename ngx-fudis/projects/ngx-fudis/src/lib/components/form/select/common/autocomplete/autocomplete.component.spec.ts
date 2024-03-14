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
import { FudisValidators } from '../../../../../utilities/form/validators';

@Component({
  selector: 'fudis-mock-select-autocomplete',
  template: ` <fudis-select-autocomplete
    #autoSelect
    [placeholder]="placeholder"
    [control]="control"
    [id]="id"
    [required]="true"
    [dropdownOpen]="dropdownOpen"
  />`,
})
class MockSelecAutocompleteComponent {
  @ViewChild('autoSelect') autoSelect: SelectAutocompleteComponent;

  id: string = 'select-id';
  placeholder: string = 'Test placeholder';
  dropdownOpen: boolean = false;
  control: FormControl = new FormControl<
    FudisSelectOption<object> | FudisSelectOption<object>[] | null
  >(null, FudisValidators.required('This is required input'));
}

describe('AutocompleteComponent', () => {
  let component: SelectAutocompleteComponent;
  let fixture: ComponentFixture<SelectAutocompleteComponent>;
  let mockComponent: MockSelecAutocompleteComponent;
  let mockFixture: ComponentFixture<MockSelecAutocompleteComponent>;

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
        MockSelecAutocompleteComponent,
      ],
      providers: [FudisFocusService, FudisIdService, FudisTranslationService],
      imports: [ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(SelectAutocompleteComponent);
    component = fixture.componentInstance;

    mockFixture = TestBed.createComponent(MockSelecAutocompleteComponent);
    mockComponent = mockFixture.componentInstance;
    mockFixture.detectChanges();
  });

  function getInputElement() {
    const inputElement = getElement(fixture, 'input');
    return inputElement;
  }

  function getMockInputElement() {
    const inputElement = getElement(mockFixture, 'input');
    return inputElement;
  }

  function getComponentWrapper() {
    const wrapperElement = getElement(mockFixture, 'fudis-select-autocomplete');
    return wrapperElement;
  }

  describe('Select Autocomplete default values', () => {
    it('should have respective classes', () => {
      expect(getComponentWrapper().className).toEqual('fudis-select-autocomplete-host');
    });

    it('should have required attribute', () => {
      expect(getMockInputElement().getAttribute('required')).toEqual('true');
    });

    it('should have given id', () => {
      expect(getMockInputElement().getAttribute('id')).toEqual('select-id');
    });

    it('should have dropdown open', () => {
      mockComponent.dropdownOpen = true;
      mockFixture.detectChanges();

      expect(getMockInputElement().getAttribute('aria-expanded')).toEqual('true');
    });
  });

  describe('Select Autocomplete functionality', () => {
    beforeEach(() => {
      component.id = 'select-autocomplete-id';
      component.placeholder = 'Test placeholder';
      component.dropdownOpen = false;
      component.control = new FormControl<
        FudisSelectOption<object> | FudisSelectOption<object>[] | null
      >(null);
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

    it('should trigger clear filter button click event', () => {
      jest.spyOn(component.triggerClearFilterButtonClick, 'emit');

      const clearButton = getElement(fixture, 'fudis-button');
      clearButton.click();

      expect(component.triggerClearFilterButtonClick.emit).toHaveBeenCalled();
    });
  });
});
