import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectDropdownComponent } from './select-dropdown.component';
import { Component, ViewChild } from '@angular/core';

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

    // Mock component with parent creation
    parentFixture = TestBed.createComponent(MockWithParentComponent);
    parentComponent = parentFixture.componentInstance;
    parentFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Default property values', () => {
    it('should have size lg', () => {
      expect(component.size).toEqual('lg');
    });

    it('should be single-select', () => {
      expect(component.multiselect).toEqual(false);
    });

    it('should be closed', () => {
      expect(component.open).toEqual(false);
    });

    it('should have CSS host class', () => {
      expect(component.classes).toEqual('fudis-dropdown-menu-host');
    });
  });

  describe('Passed property values', () => {
    it('should have parent id', () => {
      const selectDropdownEl = parentFixture.nativeElement.querySelector('fudis-select-dropdown');

      expect(selectDropdownEl.getAttribute('ng-reflect-parent-id')).toEqual('parent-element-id');
    });

    it('should have respective size value', () => {
      expect(parentComponent.dropdown.size).toEqual('md');
    });

    it('should have respective multiselect value', () => {
      expect(parentComponent.dropdown.multiselect).toEqual(true);
    });

    it('should have respective open value', () => {
      expect(parentComponent.dropdown.open).toEqual(true);
    });
  });
});
