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

    fixture.componentRef.setInput('id', 'select-id');
    fixture.componentRef.setInput('placeholder', 'Test placeholder');
    fixture.componentRef.setInput('dropdownOpen', false);
    fixture.componentRef.setInput('required', false);
    fixture.componentRef.setInput('selectedLabel', 'Platypus');
    fixture.detectChanges();
  });

  function getInputElement() {
    const inputElement = getElement(fixture, 'input');
    return inputElement;
  }

  describe('Select Autocomplete basic prop values', () => {
    it('should have respective classes', () => {
      expect(getInputElement().className).toContain('fudis-select-autocomplete fudis-form-input');
    });

    it('should not have required attribute', () => {
      expect(getInputElement().getAttribute('required')).toBeNull();
      expect(getInputElement().getAttribute('aria-required')).toBeNull();
    });

    it('should have required attribute', () => {
      fixture.componentRef.setInput('required', true);

      fixture.detectChanges();

      expect(getInputElement().getAttribute('required')).toEqual('true');
      expect(getInputElement().getAttribute('aria-required')).toEqual('true');
    });

    it('should not have disabled attribute', () => {
      expect(getInputElement().getAttribute('disabled')).toBeNull();
      expect(getInputElement().getAttribute('aria-disabled')).toBeNull();
    });

    it('should have aria-disabled but not disabled attribute', () => {
      fixture.componentRef.setInput('disabled', true);

      fixture.detectChanges();

      expect(getInputElement().getAttribute('disabled')).toBeNull();
      expect(getInputElement().getAttribute('aria-disabled')).toEqual('true');
    });

    it('should not have value', () => {
      fixture.componentRef.setInput('selectedLabel', null);
      fixture.detectChanges();
      expect(getInputElement().getAttribute('value')).toBeNull();
    });

    it('should have value', () => {
      expect(getInputElement().getAttribute('value')).toEqual('Platypus');
    });

    it('should not have invalid state', () => {
      expect(getInputElement().getAttribute('aria-invalid')).toBeNull();
    });

    it('should have invalid state', () => {
      fixture.componentRef.setInput('invalidState', true);
      fixture.detectChanges();
      expect(getInputElement().getAttribute('aria-invalid')).toEqual('true');
    });

    it('should have aria-controls', () => {
      expect(getInputElement().getAttribute('aria-controls')).toEqual('select-id-dropdown');
    });

    it('should have aria-labelledby', () => {
      expect(getInputElement().getAttribute('aria-labelledby')).toEqual('select-id-label');
    });

    it('should have aria-describedby', () => {
      expect(getInputElement().getAttribute('aria-describedby')).toEqual('select-id_guidance');
    });

    it('should have given id', () => {
      expect(getInputElement().getAttribute('id')).toEqual('select-id');
    });

    it('should have given placeholder', () => {
      expect(getInputElement().getAttribute('placeholder')).toEqual('Test placeholder');
    });

    it('should have dropdown closed', () => {
      expect(getInputElement().getAttribute('aria-expanded')).toEqual('false');
    });

    it('should have dropdown open', () => {
      fixture.componentRef.setInput('dropdownOpen', true);
      fixture.detectChanges();

      expect(getInputElement().getAttribute('aria-expanded')).toEqual('true');
    });
  });

  describe('Select Autocomplete functionality', () => {
    beforeEach(() => {
      component.id = 'select-autocomplete-id';
      component.placeholder = 'Test placeholder';
      component.dropdownOpen = true;
      component.typeThreshold = 0;
      fixture.detectChanges();
    });

    it('should handle blur event', () => {
      jest.spyOn(component.handleBlur, 'emit');
      getInputElement().dispatchEvent(new FocusEvent('blur'));

      expect(component.handleBlur.emit).toHaveBeenCalled();
    });

    it('should handle input click event', () => {
      jest.spyOn(component.handleInputClick, 'emit');
      getInputElement().dispatchEvent(new FocusEvent('click'));

      expect(component.handleInputClick.emit).toHaveBeenCalled();
    });

    it('should not handle input click event when value is lower than threshold', () => {
      jest.spyOn(component.handleInputClick, 'emit');

      component.updateInputValue('no');

      fixture.componentRef.setInput('typeThreshold', 3);
      fixture.componentRef.setInput('selectedLabel', null);

      fixture.detectChanges();

      getInputElement().dispatchEvent(new FocusEvent('click'));

      expect(component.handleInputClick.emit).not.toHaveBeenCalled();
    });

    it('should handle input click event when threshold', () => {
      jest.spyOn(component.handleInputClick, 'emit');

      component.updateInputValue('yes');

      fixture.componentRef.setInput('typeThreshold', 3);
      fixture.componentRef.setInput('selectedLabel', null);

      fixture.detectChanges();

      getInputElement().dispatchEvent(new FocusEvent('click'));

      expect(component.handleInputClick.emit).toHaveBeenCalled();
    });

    it('should handle filter text update event', () => {
      jest.spyOn(component.handleFilterTextUpdate, 'emit');

      component.updateInputValue('');

      expect(component.handleFilterTextUpdate.emit).toHaveBeenCalledWith('');

      component.updateInputValue('hey');

      expect(component.handleFilterTextUpdate.emit).toHaveBeenCalledWith('hey');
    });

    describe('focus events', () => {
      beforeEach(() => {
        fixture.componentRef.setInput('dropdownOpen', true);
      });

      it('should handle focus event', () => {
        jest.spyOn(component.handleFocus, 'emit');
        getInputElement().dispatchEvent(new FocusEvent('focus'));

        expect(component.handleFocus.emit).toHaveBeenCalled();
      });

      it('should emit handle text updates and dropdown close emit correctly', () => {
        component.inputRef.nativeElement.value = 'hey';
        fixture.detectChanges();
        jest.spyOn(component.handleFilterTextUpdate, 'emit');
        jest.spyOn(component.handleDropdownClose, 'emit');
        getInputElement().dispatchEvent(new FocusEvent('focus'));

        expect(component.handleFilterTextUpdate.emit).toHaveBeenCalledWith('hey');
        expect(component.handleDropdownClose.emit).not.toHaveBeenCalledWith();

        fixture.componentRef.setInput('typeThreshold', 3);
        component.inputRef.nativeElement.value = 'no';
        fixture.detectChanges();

        getInputElement().dispatchEvent(new FocusEvent('focus'));

        expect(component.handleFilterTextUpdate.emit).toHaveBeenCalledWith('');
        expect(component.handleDropdownClose.emit).toHaveBeenCalledWith();
      });
    });

    describe('keyboard events', () => {
      beforeEach(() => {
        component.visibleOptions = ['first', 'second'];
        component.typeThreshold = 3;
        component.inputRef.nativeElement.value = 'no';
        getInputElement().dispatchEvent(new FocusEvent('focus'));

        jest.spyOn(component.handleDropdownToggle, 'emit');
        jest.spyOn(component.handleDropdownOpen, 'emit');
        jest.spyOn(component.handleDropdownClose, 'emit');
        jest.spyOn(component.handleSelectOnlyVisibleOption, 'emit');
        jest.spyOn(component.handleFocusToFirstOption, 'emit');
      });

      it('should not handle dropdown toggle event with Enter', () => {
        getInputElement().dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
        getInputElement().dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
        expect(component.handleDropdownToggle.emit).not.toHaveBeenCalled();
      });

      it('should handle dropdown toggle event with Enter', () => {
        component.inputRef.nativeElement.value = 'yes';
        getInputElement().dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
        getInputElement().dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));

        expect(component.handleDropdownToggle.emit).toHaveBeenCalled();
        expect(component.handleFocusToFirstOption.emit).not.toHaveBeenCalled();
      });

      it('should not handle dropdown open event with ArrowDown', () => {
        getInputElement().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        getInputElement().dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowDown' }));

        expect(component.handleDropdownOpen.emit).not.toHaveBeenCalled();
        expect(component.handleFocusToFirstOption.emit).not.toHaveBeenCalled();
      });

      it('should handle dropdown open event with ArrowDown', () => {
        component.inputRef.nativeElement.value = 'yes';

        getInputElement().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        getInputElement().dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowDown' }));

        expect(component.handleDropdownOpen.emit).toHaveBeenCalled();
        expect(component.handleFocusToFirstOption.emit).toHaveBeenCalled();
      });

      it('should emit handleSelectOnlyVisibleOption', () => {
        component.visibleOptions = ['too', 'many'];
        component.dropdownOpen = true;
        component.inputRef.nativeElement.value = 'yes';
        fixture.detectChanges();

        getInputElement().dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
        getInputElement().dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));

        expect(component.handleSelectOnlyVisibleOption.emit).not.toHaveBeenCalled();

        component.visibleOptions = ['only'];

        getInputElement().dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
        getInputElement().dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
        expect(component.handleSelectOnlyVisibleOption.emit).toHaveBeenCalled();
      });

      it('should emit handleClose on Escape', () => {
        component.dropdownOpen = true;

        getInputElement().dispatchEvent(new KeyboardEvent('keypress', { key: 'Escape' }));
        getInputElement().dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }));

        expect(component.handleDropdownClose.emit).toHaveBeenCalled();
      });
    });
  });
});
