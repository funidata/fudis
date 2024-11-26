import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectIconsComponent } from './select-icons.component';
import { ButtonComponent } from '../../../../button/button.component';
import { IconComponent } from '../../../../icon/icon.component';
import { FudisSelectOption, FudisSelectVariant } from '../../../../../types/forms';
import { FormControl } from '@angular/forms';
import { getElement } from '../../../../../utilities/tests/utilities';

describe('SelectIconsComponent', () => {
  let component: SelectIconsComponent;
  let fixture: ComponentFixture<SelectIconsComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [SelectIconsComponent, ButtonComponent, IconComponent],
    });
    fixture = TestBed.createComponent(SelectIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const iterableVariants: Partial<FudisSelectVariant>[] = [
    'autocompleteDropdown',
    'autocompleteType',
  ];

  const expectOnlyVisibleIcon = async (icon: 'chevron' | 'search' | 'close') => {
    fixture.detectChanges();
    await fixture.whenStable().then(() => {
      const chevronIcon = getElement(fixture, '.fudis-icon__chevron');
      const searchIcon = getElement(fixture, '.fudis-icon__search');
      const clearIcon = getElement(
        fixture,
        'fudis-button:not(.fudis-select-icons__icon--hidden) .fudis-icon__close',
      );

      if (icon === 'chevron') {
        expect(chevronIcon).toBeTruthy();
        expect(searchIcon).toBeNull();
        expect(clearIcon).toBeNull();
      } else if (icon === 'search') {
        expect(chevronIcon).toBeNull();
        expect(searchIcon).toBeTruthy();
        expect(clearIcon).toBeNull();
      } else {
        expect(chevronIcon).toBeNull();
        expect(searchIcon).toBeNull();
        expect(clearIcon).toBeTruthy();
      }
    });
  };

  describe('With Dropdown parent variant', () => {
    beforeEach(async () => {
      component.parentVariant = 'dropdown';
      component.parentControl = new FormControl<FudisSelectOption<object> | null>(null);

      component.filterText = false;
      component.disabled = false;
      component.clearButton = false;
      component.dropdownOpen = false;
      component.parentControl.patchValue(null);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should change chevron rotate', async () => {
      fixture.componentRef.setInput('dropdownOpen', false);

      await fixture.whenStable().then(() => {
        const chevronElement = getElement(
          fixture,
          '.fudis-icon__chevron.fudis-icon__rotate__cw-90',
        );
        expect(chevronElement).toBeTruthy();
        expectOnlyVisibleIcon('chevron');
      });

      fixture.componentRef.setInput('dropdownOpen', true);
      fixture.detectChanges();

      await fixture.whenStable().then(() => {
        const chevronElement = getElement(
          fixture,
          '.fudis-icon__chevron.fudis-icon__rotate__ccw-90',
        );
        expect(chevronElement).toBeTruthy();
        expectOnlyVisibleIcon('chevron');
      });
    });

    describe('should switch between search and clear with autocomplete type', () => {
      beforeEach(async () => {
        fixture.componentRef.setInput('parentVariant', 'autocompleteType');
      });

      it('should show search by default', () => {
        expectOnlyVisibleIcon('search');
      });

      it('should show clear with filter text and/or control value', () => {
        iterableVariants.forEach(async (variant) => {
          fixture.componentRef.setInput('parentVariant', variant);
          fixture.componentRef.setInput('clearButton', true);
          fixture.componentRef.setInput('filterText', true);
          component.parentControl.patchValue({ value: 'test-value', label: 'Test Label' });

          expectOnlyVisibleIcon('close');

          component.parentControl.patchValue(null);

          expectOnlyVisibleIcon('close');
        });
      });

      it('should not show clear button', () => {
        fixture.componentRef.setInput('clearButton', false);
        fixture.componentRef.setInput('filterText', true);
        component.parentControl.patchValue({ value: 'test-value', label: 'Test Label' });
        expectOnlyVisibleIcon('search');
      });

      it('should show search with disabled', () => {
        fixture.componentRef.setInput('disabled', true);
        expectOnlyVisibleIcon('search');
      });
    });

    describe('should switch between chevron and clear with autocomplete dropdown', () => {
      beforeEach(async () => {
        fixture.componentRef.setInput('parentVariant', 'autocompleteDropdown');
      });

      it('should show chevron with disabled', () => {
        fixture.componentRef.setInput('disabled', true);
        expectOnlyVisibleIcon('chevron');
      });

      it('should not show clear button', () => {
        fixture.componentRef.setInput('clearButton', false);
        fixture.componentRef.setInput('filterText', true);
        component.parentControl.patchValue({ value: 'test-value', label: 'Test Label' });
        expectOnlyVisibleIcon('chevron');
      });

      it('should show clear button when filter text and control value are true', () => {
        fixture.componentRef.setInput('clearButton', true);
        fixture.componentRef.setInput('filterText', true);
        component.parentControl.patchValue({ value: 'test-value', label: 'Test Label' });
        expectOnlyVisibleIcon('close');
      });

      it('should show clear button when filter text is true', () => {
        fixture.componentRef.setInput('clearButton', true);
        fixture.componentRef.setInput('filterText', true);
        component.parentControl.patchValue(null);
        expectOnlyVisibleIcon('close');
      });

      it('should show chevron button when filter and control value are null', () => {
        fixture.componentRef.setInput('clearButton', true);
        fixture.componentRef.setInput('filterText', false);
        component.parentControl.patchValue(null);
        expectOnlyVisibleIcon('chevron');
      });
    });

    describe('clear button should emit', () => {
      beforeEach(async () => {
        fixture.componentRef.setInput('parentVariant', 'autocompleteDropdown');
        fixture.componentRef.setInput('clearButton', true);
        fixture.componentRef.setInput('filterText', true);
        component.parentControl.patchValue({ value: 'test-value', label: 'Test Label' });
        expectOnlyVisibleIcon('close');
      });

      it('focus event', async () => {
        const focusEvent = new FocusEvent('focus');
        jest.spyOn(component.handleClearButtonFocus, 'emit');
        getElement(fixture, '.fudis-button').dispatchEvent(focusEvent);
        expect(component.handleClearButtonFocus.emit).toHaveBeenCalledWith(focusEvent);
      });

      it('blur event', async () => {
        const blurEvent = new FocusEvent('blur');
        jest.spyOn(component.handleClearButtonBlur, 'emit');
        getElement(fixture, '.fudis-button').dispatchEvent(blurEvent);
        expect(component.handleClearButtonBlur.emit).toHaveBeenCalledWith(blurEvent);
      });

      it('click event', async () => {
        const clickEvent = new MouseEvent('click');
        jest.spyOn(component.handleClearButtonClick, 'emit');
        getElement(fixture, '.fudis-button').dispatchEvent(clickEvent);
        expect(component.handleClearButtonClick.emit).toHaveBeenCalledWith(clickEvent);
      });

      it('destroy event', async () => {
        jest.spyOn(component.handleClearButtonDestroy, 'emit');
        fixture.componentRef.setInput('clearButton', false);
        fixture.detectChanges();
        expect(component.handleClearButtonDestroy.emit).toHaveBeenCalled();
      });
    });
  });
});
