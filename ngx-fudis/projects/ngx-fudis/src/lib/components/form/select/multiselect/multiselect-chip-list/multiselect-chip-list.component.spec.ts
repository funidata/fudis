import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { MultiselectChipListComponent } from './multiselect-chip-list.component';
import { FudisSelectOption } from '../../../../../types/forms';
import { multiselectChipListMockData } from '../../common/mock_data';
import { IconComponent } from '../../../../icon/icon.component';
import { getElement } from '../../../../../utilities/tests/utilities';

@Component({
  selector: 'fudis-mock-with-parent',
  template: `<div [id]="id">
    <fudis-multiselect-chip-list
      [parentId]="id"
      [selectedItems]="items"
    ></fudis-multiselect-chip-list>
  </div>`,
})
class MockWithParentComponent {
  items: FudisSelectOption<object>[] = multiselectChipListMockData;
  id = 'parent-of-chip-list';
}

describe('MultiselectChipListComponent', () => {
  let component: MultiselectChipListComponent;
  let fixture: ComponentFixture<MultiselectChipListComponent>;
  let fixtureMock: ComponentFixture<MockWithParentComponent>;
  let chipList: NodeList;
  let buttonElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultiselectChipListComponent, MockWithParentComponent, IconComponent],
    });
    fixture = TestBed.createComponent(MultiselectChipListComponent);
    component = fixture.componentInstance;
    component.selectedItems = multiselectChipListMockData;
    fixture.detectChanges();

    fixtureMock = TestBed.createComponent(MockWithParentComponent);
    fixtureMock.detectChanges();

    chipList = fixture.nativeElement.querySelectorAll('button');
    buttonElement = getElement(fixture, 'button');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Unordered list', () => {
    it('should have CSS class', () => {
      const ulElement = getElement(fixture, 'ul');

      expect(ulElement.classList).toContain('fudis-multiselect-chip-list');
    });

    it('should have id constructed with parent component id', () => {
      const ulElement = getElement(fixtureMock, 'ul');

      expect(ulElement.id).toEqual('parent-of-chip-list-selected-items');
    });
  });

  describe('Chip element', () => {
    it('should have CSS class', () => {
      expect(buttonElement.classList).toContain('fudis-multiselect-chip-list__button');
    });

    it('should have aria-describedby constructed with parent component id', () => {
      const buttonElement = getElement(fixtureMock, 'button');

      expect(buttonElement.getAttribute('aria-describedby')).toEqual(
        'parent-of-chip-list-remove-items',
      );
    });

    it('should have fudis-icon present', () => {
      const iconElement = buttonElement.querySelector('fudis-icon');

      expect(iconElement).toBeTruthy();
    });

    it('should have selected items rendered', () => {
      expect(chipList.length).toEqual(4);
    });

    it('should emit click event', () => {
      const itemToRemove = chipList[2];
      jest.spyOn(component.handleClick, 'emit');

      itemToRemove.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      itemToRemove.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      expect(component.handleClick.emit).toHaveBeenCalledWith(multiselectChipListMockData[2]);
    });

    it('should not emit click event if chip is not first focused', () => {
      const itemToRemove = chipList[1];
      jest.spyOn(component.handleClick, 'emit');

      itemToRemove.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      expect(component.handleClick.emit).not.toHaveBeenCalled();

      itemToRemove.dispatchEvent(new FocusEvent('focus'));
      itemToRemove.dispatchEvent(new FocusEvent('blur'));
      itemToRemove.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      expect(component.handleClick.emit).not.toHaveBeenCalled();

      itemToRemove.dispatchEvent(new FocusEvent('focus'));
      itemToRemove.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();
      expect(component.handleClick.emit).toHaveBeenCalledWith(multiselectChipListMockData[1]);
    });
  });
});
