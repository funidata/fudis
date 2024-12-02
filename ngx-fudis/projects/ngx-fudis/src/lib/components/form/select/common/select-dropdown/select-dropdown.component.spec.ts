import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectDropdownComponent } from './select-dropdown.component';

import { getElement } from '../../../../../utilities/tests/utilities';
import { BodyTextComponent } from '../../../../typography/body-text/body-text.component';
import { FudisSelectVariant } from '../../../../../types/forms';

const autocompleteVariants: FudisSelectVariant[] = ['autocompleteDropdown', 'autocompleteType'];

describe('SelectDropdownComponent', () => {
  let component: SelectDropdownComponent;
  let fixture: ComponentFixture<SelectDropdownComponent>;
  let htmlElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectDropdownComponent, BodyTextComponent],
    });
    fixture = TestBed.createComponent(SelectDropdownComponent);
    component = fixture.componentInstance;
    component.parentId = 'parent-element-id';
    component.selectVariant = 'dropdown';
    fixture.detectChanges();
    htmlElement = getElement(fixture, '.fudis-select-dropdown');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Default property values', () => {
    it('should have size lg', () => {
      expect(component.size).toEqual('lg');
      expect(htmlElement.classList).toContain('fudis-input-size__lg');
    });

    it('should be single-select', () => {
      expect(htmlElement.classList).not.toContain('fudis-select-dropdown__multiselect');
    });

    it('should be closed', () => {
      expect(htmlElement.classList).not.toContain('fudis-select-dropdown--open');
    });

    it('should have CSS host class', () => {
      expect(component.hostClass).toEqual('fudis-dropdown-menu-host');
    });

    it('should not show help text with dropdown', () => {
      component.open = true;
      component.filterText = 'hello';
      component.results = 42;
      fixture.detectChanges();

      const filterText = getElement(fixture, '.fudis-select-dropdown__help-text__first');

      expect(filterText).toBeNull();
    });

    it('should not show no results with dropdown', () => {
      component.open = true;
      component.filterText = 'hello';
      component.results = 0;
      fixture.detectChanges();

      const filterText = getElement(fixture, '.fudis-select-dropdown__help-text__last');

      expect(filterText).toBeNull();
    });

    it('should display default help text', () => {
      component.open = true;
      component.filterText = 'hello';
      component.results = 42;
      autocompleteVariants.forEach((variant) => {
        component.selectVariant = variant;
        fixture.detectChanges();

        const filterText = getElement(
          fixture,
          '.fudis-select-dropdown__help-text__first',
        ).textContent;

        const noResults = getElement(fixture, '.fudis-select-dropdown__help-text__last');

        expect(noResults.classList).toContain('fudis-select-dropdown__help-text--hidden');
        expect(filterText).toEqual('Showing 42 results');
      });
    });

    it('should show no results help text with autocompletes', () => {
      component.open = true;
      component.filterText = 'hello';
      component.results = 0;
      autocompleteVariants.forEach((variant) => {
        component.selectVariant = variant;

        fixture.detectChanges();

        const noResults = getElement(
          fixture,
          '.fudis-select-dropdown__help-text__last',
        ).textContent;

        const filterText = getElement(fixture, '.fudis-select-dropdown__help-text__first');

        expect(filterText.classList).toContain('fudis-select-dropdown__help-text--hidden');
        expect(noResults).toEqual('No results found');
      });
    });
  });

  describe('Passed property values', () => {
    it('should have parent id', () => {
      expect(htmlElement.getAttribute('id')).toEqual('parent-element-id-dropdown');
    });

    it('should have respective size value', () => {
      component.size = 'md';
      fixture.detectChanges();
      expect(htmlElement.className).toContain('fudis-input-size__md');
    });

    it('should have respective multiselect value', () => {
      component.multiselect = true;
      fixture.detectChanges();
      expect(htmlElement.className).toContain('fudis-select-dropdown__multiselect');
    });

    it('should have respective open value', () => {
      component.open = true;
      fixture.detectChanges();
      expect(htmlElement.className).toContain('fudis-select-dropdown--open');
    });

    it('should display given help text with autocompletes', () => {
      component.results = 42;
      component.open = true;
      component.filterText = 'hello';
      component.autocompleteHelpText = 'Hello from help text';
      autocompleteVariants.forEach((variant) => {
        component.selectVariant = variant;
        fixture.detectChanges();

        const helpText = getElement(
          fixture,
          '.fudis-select-dropdown__help-text__first',
        ).textContent;

        const noResults = getElement(fixture, '.fudis-select-dropdown__help-text__last');

        expect(noResults.classList).toContain('fudis-select-dropdown__help-text--hidden');
        expect(helpText).toEqual('Hello from help text');
      });
    });

    it('should have help text status for screen readers if filter text updates', () => {
      component.results = 42;
      component.open = true;
      component.filterText = 'hello';
      component.autocompleteHelpText = 'Hello from help text';
      autocompleteVariants.forEach((variant) => {
        component.selectVariant = variant;
        fixture.detectChanges();

        const helpText = getElement(fixture, '.fudis-visually-hidden');

        expect(helpText).toBeNull();

        setTimeout(() => {
          fixture.detectChanges();

          const helpTextAfterDelay = getElement(fixture, '.fudis-visually-hidden');

          expect(helpTextAfterDelay.getAttribute('role')).toEqual('alert');

          expect(helpTextAfterDelay.textContent).toEqual('Hello from help text');
        }, 500);
      });
    });

    it('should have no results status for screen readers if filter text updates', () => {
      component.results = 0;
      component.open = true;
      component.filterText = 'hello';
      component.autocompleteHelpText = 'Hello from help text';
      autocompleteVariants.forEach((variant) => {
        component.selectVariant = variant;
        fixture.detectChanges();

        const helpText = getElement(fixture, '.fudis-visually-hidden');

        expect(helpText).toBeNull();

        setTimeout(() => {
          fixture.detectChanges();

          const helpTextAfterDelay = getElement(fixture, '.fudis-visually-hidden');

          expect(helpTextAfterDelay.getAttribute('role')).toEqual('alert');

          expect(helpTextAfterDelay.textContent).toEqual('No results found');
        }, 500);
      });
    });
  });
});
