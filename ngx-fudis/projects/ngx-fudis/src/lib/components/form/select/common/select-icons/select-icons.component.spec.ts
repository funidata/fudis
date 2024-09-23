import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectIconsComponent } from './select-icons.component';
import { ButtonComponent } from '../../../../button/button.component';
import { IconComponent } from '../../../../icon/icon.component';
import { FudisSelectOption, FudisSelectVariant } from '../../../../../types/forms';
import { FormControl } from '@angular/forms';
import { getElement } from '../../../../../utilities/tests/utilities';
import { ChangeDetectionStrategy } from '@angular/core';

describe('SelectIconsComponent', () => {
  let component: SelectIconsComponent;
  let fixture: ComponentFixture<SelectIconsComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [SelectIconsComponent, ButtonComponent, IconComponent],
    }).overrideComponent(SelectIconsComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
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
      component.dropdownOpen = false;
      fixture.autoDetectChanges();
      let chevronElement = getElement(fixture, '.fudis-icon__chevron.fudis-icon__rotate__cw-90');

      await fixture.whenStable().then(() => {
        expect(chevronElement).toBeTruthy();
        expectOnlyVisibleIcon('chevron');
      });

      component.dropdownOpen = true;
      fixture.detectChanges();

      await fixture.whenStable().then(() => {
        fixture.detectChanges();
        chevronElement = getElement(fixture, '.fudis-icon__chevron.fudis-icon__rotate__ccw-90');
        expect(chevronElement).toBeTruthy();
        expectOnlyVisibleIcon('chevron');
      });
    });

    describe('should switch between search and clear with autocomplete type', () => {
      beforeEach(async () => {
        component.parentVariant = 'autocompleteType';
        fixture.detectChanges();
      });

      it('should show search by default', () => {
        fixture.detectChanges();
        expectOnlyVisibleIcon('search');
      });

      it('should show clear with filter text and/or control value', () => {
        iterableVariants.forEach(async (variant) => {
          component.parentVariant = variant;
          component.clearButton = true;
          component.filterText = true;
          component.parentControl.patchValue({ value: 'test-value', label: 'Test Label' });
          fixture.detectChanges();

          await fixture.whenStable().then(() => {
            expectOnlyVisibleIcon('close');
          });

          component.parentControl.patchValue(null);
          fixture.detectChanges();
          await fixture.whenStable().then(() => {
            expectOnlyVisibleIcon('close');
          });
        });
      });

      it('should not show clear button', () => {
        component.clearButton = false;
        component.filterText = true;
        component.parentControl.patchValue({ value: 'test-value', label: 'Test Label' });
        fixture.detectChanges();
        expectOnlyVisibleIcon('search');
      });

      it('should show seach with disabled', () => {
        component.disabled = true;
        fixture.detectChanges();
        expectOnlyVisibleIcon('search');
      });
    });

    describe('should switch between chevron and clear with autocomplete dropdown', () => {
      beforeEach(async () => {
        component.parentVariant = 'autocompleteDropdown';
        fixture.detectChanges();
      });

      it('should show chevron with disabled', () => {
        component.disabled = true;
        fixture.detectChanges();
        expectOnlyVisibleIcon('chevron');
      });

      it('should not show clear button', () => {
        component.clearButton = false;
        component.filterText = true;
        component.parentControl.patchValue({ value: 'test-value', label: 'Test Label' });
        fixture.detectChanges();
        expectOnlyVisibleIcon('chevron');
      });

      it('should show clear button when filter text and control value are true', () => {
        component.clearButton = true;
        component.filterText = true;
        component.parentControl.patchValue({ value: 'test-value', label: 'Test Label' });
        fixture.detectChanges();
        expectOnlyVisibleIcon('close');
      });

      it('should show clear button when filter text is true', () => {
        component.clearButton = true;
        component.filterText = true;
        component.parentControl.patchValue(null);
        fixture.detectChanges();

        expectOnlyVisibleIcon('close');
      });

      it('should show chevron button when filter and control value are null', () => {
        component.clearButton = true;
        component.filterText = false;
        component.parentControl.patchValue(null);
        fixture.detectChanges();

        expectOnlyVisibleIcon('chevron');
      });
    });

    describe('clear button should emit', () => {
      beforeEach(async () => {
        component.parentVariant = 'autocompleteDropdown';
        component.clearButton = true;
        component.filterText = true;
        component.parentControl.patchValue({ value: 'test-value', label: 'Test Label' });
        fixture.detectChanges();
        expectOnlyVisibleIcon('close');
      });

      it('focus event', async () => {
        const focusEvent = new FocusEvent('focus');

        jest.spyOn(component.handleClearButtonFocus, 'emit');

        await fixture.whenStable().then(() => {
          fixture.detectChanges();
          getElement(fixture, '.fudis-button').dispatchEvent(focusEvent);

          expect(component.handleClearButtonFocus.emit).toHaveBeenCalledWith(focusEvent);
        });
      });

      it('blur event', async () => {
        const blurEvent = new FocusEvent('blur');

        jest.spyOn(component.handleClearButtonBlur, 'emit');

        await fixture.whenStable().then(() => {
          getElement(fixture, '.fudis-button').dispatchEvent(blurEvent);

          expect(component.handleClearButtonBlur.emit).toHaveBeenCalledWith(blurEvent);
        });
      });

      it('click event', async () => {
        const clickEvent = new MouseEvent('click');

        jest.spyOn(component.handleClearButtonClick, 'emit');

        await fixture.whenStable().then(() => {
          getElement(fixture, '.fudis-button').dispatchEvent(clickEvent);

          expect(component.handleClearButtonClick.emit).toHaveBeenCalledWith(clickEvent);
        });
      });

      it('destroy event', async () => {
        jest.spyOn(component.handleClearButtonDestroy, 'emit');

        component.clearButton = false;

        await fixture.whenStable().then(() => {
          fixture.detectChanges();

          expect(component.handleClearButtonDestroy.emit).toHaveBeenCalled();
        });
      });
    });
  });
});
