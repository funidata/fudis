import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectDropdownComponent } from './select-dropdown.component';
import { Component, ViewChild } from '@angular/core';
import { getElement } from '../../../../../utilities/tests/utilities';

@Component({
  selector: 'fudis-mock-with-parent',
  template: `<div [id]="id">
    <fudis-select-dropdown
      #dropdownEl
      [parentId]="id"
      [size]="size"
      [multiselect]="isMultiselect"
      [open]="isOpen"
    />
  </div>`,
})
class MockWithParentComponent {
  @ViewChild('dropdownEl') dropdown: SelectDropdownComponent;

  id = 'parent-element-id';
  size = 'md';
  isMultiselect = true;
  isOpen = true;
}

describe('SelectDropdownComponent', () => {
  let component: SelectDropdownComponent;
  let fixture: ComponentFixture<SelectDropdownComponent>;
  let parentComponent: MockWithParentComponent;
  let parentFixture: ComponentFixture<MockWithParentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectDropdownComponent, MockWithParentComponent],
    });
    fixture = TestBed.createComponent(SelectDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    parentFixture = TestBed.createComponent(MockWithParentComponent);
    parentComponent = parentFixture.componentInstance;
    parentFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Default property values', () => {
    it('should have size lg', () => {
      const element = getElement(fixture, '.fudis-select-dropdown');

      expect(component.size).toEqual('lg');
      expect(element.classList).toContain('fudis-input-size__lg');
    });

    it('should be single-select', () => {
      const element = getElement(fixture, '.fudis-select-dropdown');

      expect(component.multiselect).toEqual(false);
      expect(element.classList).not.toContain('fudis-select-dropdown__multiselect');
    });

    it('should be closed', () => {
      const element = getElement(fixture, '.fudis-select-dropdown');

      expect(component.open).toEqual(false);
      expect(element.classList).not.toContain('fudis-select-dropdown--open');
    });

    it('should have CSS host class', () => {
      expect(component.classes).toEqual('fudis-dropdown-menu-host');
    });
  });

  describe('Passed property values', () => {
    it('should have parent id', () => {
      const dropdownElement = getElement(parentFixture, '.fudis-select-dropdown');

      expect(dropdownElement.id).toEqual('parent-element-id-dropdown');
    });

    it('should have respective size value', () => {
      const dropdownElement = getElement(parentFixture, '.fudis-select-dropdown');

      expect(parentComponent.dropdown.size).toEqual('md');
      expect(dropdownElement.className).toContain('fudis-input-size__md');
    });

    it('should have respective multiselect value', () => {
      const dropdownElement = getElement(parentFixture, '.fudis-select-dropdown');

      expect(parentComponent.dropdown.multiselect).toEqual(true);
      expect(dropdownElement.className).toContain('fudis-select-dropdown__multiselect');
    });

    it('should have respective open value', () => {
      const dropdownElement = getElement(parentFixture, '.fudis-select-dropdown');

      expect(parentComponent.dropdown.open).toEqual(true);
      expect(dropdownElement.className).toContain('fudis-select-dropdown--open');
    });
  });
});
