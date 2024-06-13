import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectDropdownComponent } from './select-dropdown.component';
import { Component, ViewChild } from '@angular/core';
import { getElement } from '../../../../../utilities/tests/utilities';
import { BodyTextComponent } from '../../../../typography/body-text/body-text.component';

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
  let htmlElement: HTMLElement;
  let htmlWithParentElement: HTMLElement;
  let parentFixture: ComponentFixture<MockWithParentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectDropdownComponent, MockWithParentComponent, BodyTextComponent],
    });
    fixture = TestBed.createComponent(SelectDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    parentFixture = TestBed.createComponent(MockWithParentComponent);
    parentComponent = parentFixture.componentInstance;
    parentFixture.detectChanges();
    htmlWithParentElement = getElement(parentFixture, '.fudis-select-dropdown');
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
      expect(component.multiselect).toEqual(false);
      expect(htmlElement.classList).not.toContain('fudis-select-dropdown__multiselect');
    });

    it('should be closed', () => {
      expect(component.open).toEqual(false);
      expect(htmlElement.classList).not.toContain('fudis-select-dropdown--open');
    });

    it('should have CSS host class', () => {
      expect(component.classes).toEqual('fudis-dropdown-menu-host');
    });
  });

  describe('Passed property values', () => {
    it('should have parent id', () => {
      expect(htmlWithParentElement.id).toEqual('parent-element-id-dropdown');
    });

    it('should have respective size value', () => {
      expect(parentComponent.dropdown.size).toEqual('md');
      expect(htmlWithParentElement.className).toContain('fudis-input-size__md');
    });

    it('should have respective multiselect value', () => {
      expect(parentComponent.dropdown.multiselect).toEqual(true);
      expect(htmlWithParentElement.className).toContain('fudis-select-dropdown__multiselect');
    });

    it('should have respective open value', () => {
      expect(parentComponent.dropdown.open).toEqual(true);
      expect(htmlWithParentElement.className).toContain('fudis-select-dropdown--open');
    });
  });
});
