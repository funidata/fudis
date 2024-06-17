import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectAutocompleteComponent } from './autocomplete.component';
import { ReactiveFormsModule } from '@angular/forms';
import { getElement } from '../../../../../utilities/tests/utilities';

import { FudisIdService } from '../../../../../services/id/id.service';
import { FudisTranslationService } from '../../../../../services/translation/translation.service';
import { FudisFocusService } from '../../../../../services/focus/focus.service';

describe('AutocompleteComponent', () => {
  let component: SelectAutocompleteComponent;
  let fixture: ComponentFixture<SelectAutocompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectAutocompleteComponent],
      providers: [FudisFocusService, FudisIdService, FudisTranslationService],
      imports: [ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(SelectAutocompleteComponent);
    component = fixture.componentInstance;
    component.id = 'select-id';
    component.placeholder = 'Test placeholder';
    component.dropdownOpen = false;

    fixture.detectChanges();
  });

  function getInputElement() {
    const inputElement = getElement(fixture, 'input');
    return inputElement;
  }

  describe('Select Autocomplete default values', () => {
    it('should have respective classes', () => {
      fixture.whenStable().then(() => {
        expect(getInputElement().className).toContain('fudis-form-input fudis-select-autocomplete');
      });
    });

    it('should have required attribute', () => {
      fixture.whenStable().then(() => {
        expect(getInputElement().getAttribute('required')).toEqual('true');
      });
    });

    it('should have given id', () => {
      fixture.whenStable().then(() => {
        expect(getInputElement().getAttribute('id')).toEqual('select-id');
      });
    });

    it('should have dropdown open', () => {
      component.dropdownOpen = true;
      fixture.whenStable().then(() => {
        expect(getInputElement().getAttribute('aria-expanded')).toEqual('true');
      });
    });
  });

  describe('Select Autocomplete functionality', () => {
    beforeEach(() => {
      component.id = 'select-autocomplete-id';
      component.placeholder = 'Test placeholder';
      component.dropdownOpen = false;
      component.typeThreshold = 0;
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

      getInputElement().dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      getInputElement().dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));

      expect(component.triggerDropdownToggle.emit).toHaveBeenCalled();
    });

    it('should trigger dropdown open event', () => {
      jest.spyOn(component.triggerDropdownOpen, 'emit');

      getInputElement().dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();

      getInputElement().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      getInputElement().dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowDown' }));

      expect(component.triggerDropdownOpen.emit).toHaveBeenCalled();
    });

    it('should trigger filter text update event', () => {
      jest.spyOn(component.triggerFilterTextUpdate, 'emit');

      component.updateInputValue('');

      expect(component.triggerFilterTextUpdate.emit).toHaveBeenCalledWith('');

      component.updateInputValue('hey');

      expect(component.triggerFilterTextUpdate.emit).toHaveBeenCalledWith('hey');
    });
  });
});
