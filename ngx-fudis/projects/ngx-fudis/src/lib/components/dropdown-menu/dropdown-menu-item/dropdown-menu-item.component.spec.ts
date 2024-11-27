import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DropdownMenuItemComponent } from './dropdown-menu-item.component';
import { DropdownMenuComponent } from '../dropdown-menu.component';
import { ButtonComponent } from '../../button/button.component';
import { IconComponent } from '../../icon/icon.component';
import { defaultMenuItems } from '../mock_data';
import { getElement } from '../../../utilities/tests/utilities';

@Component({
  selector: 'fudis-mock-dropdown-menu',
  template: ` <fudis-button
    #testButton
    [label]="'Random items menu'"
    [labelHidden]="true"
    [size]="'small'"
    [variant]="'secondary'"
    [icon]="'three-dots'"
    [asMenuButton]="true"
  >
    <fudis-dropdown-menu>
      <fudis-dropdown-menu-item
        *ngFor="let item of testItems"
        #testMenuItem
        [label]="item.label"
        [disabled]="item.disabled"
      >
      </fudis-dropdown-menu-item>
    </fudis-dropdown-menu>
  </fudis-button>`,
})
class MockDropdownMenuComponent {
  testItems = defaultMenuItems;

  @ViewChild('testButton') testButton: ButtonComponent;
  @ViewChild('testMenuItem') testMenuItem: DropdownMenuItemComponent;
}

describe('DropdownMenuItemComponent', () => {
  let component: MockDropdownMenuComponent;
  let fixture: ComponentFixture<MockDropdownMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ButtonComponent,
        DropdownMenuItemComponent,
        DropdownMenuComponent,
        IconComponent,
        MockDropdownMenuComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MockDropdownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function setDropdownMenuOpen() {
    component.testButton.toggleMenu();
    fixture.detectChanges();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Focusable or disabled options', () => {
    beforeEach(() => {
      setDropdownMenuOpen();
    });

    it('should have respective CSS class', () => {
      const allItems = fixture.debugElement.queryAll(By.css('fudis-dropdown-menu-item'));
      const focusableItems = [];
      const disabledItems = [];

      allItems.forEach((item) => {
        const focusabledItem = item.nativeElement.querySelector(
          '.fudis-dropdown-menu-item__focusable',
        );

        const disabledItem = item.nativeElement.querySelector(
          '.fudis-dropdown-menu-item--disabled',
        );

        if (focusabledItem && focusabledItem !== null) {
          focusableItems.push(focusabledItem);
        }

        if (disabledItem && disabledItem !== null) {
          disabledItems.push(disabledItem);
        }
      });

      expect(allItems.length).toEqual(4);
      expect(focusableItems.length).toEqual(3);
      expect(disabledItems.length).toEqual(1);
    });

    it('should have proper role attribute', () => {
      const allItems = fixture.debugElement.queryAll(By.css('fudis-dropdown-menu-item'));

      allItems.forEach((item) => {
        const itemRole = item.nativeElement.querySelector('button').getAttribute('role');
        expect(itemRole).toEqual('menuitem');
      });
    });

    it('should have generated id', () => {
      const allItems = fixture.debugElement.queryAll(By.css('fudis-dropdown-menu-item'));

      allItems.forEach((item, index) => {
        const itemId = item.nativeElement.querySelector('button').getAttribute('id');
        expect(itemId).toEqual(`fudis-dropdown-menu-1-option-${index + 1}`);
      });
    });

    it('should have proper disabled attributes if option is disabled', () => {
      const disabledItem = fixture.nativeElement.querySelector(
        '.fudis-dropdown-menu-item--disabled',
      );
      const disabledContent = disabledItem.querySelector('span');

      expect(disabledContent?.classList).toContain(
        'fudis-dropdown-menu-item__label__disabled-text',
      );
      expect(disabledContent?.textContent).toContain('(Disabled)');
      expect(!!disabledItem.getAttribute('aria-disabled')).toEqual(true);
    });
  });

  describe('Event emitter', () => {
    beforeEach(() => {
      jest.spyOn(component.testMenuItem.handleClick, 'emit');
      setDropdownMenuOpen();
    });

    it('should emit when clicking an option', () => {
      const clickableOption = getElement(fixture, '#fudis-dropdown-menu-1-option-1');
      clickableOption.click();

      expect(component.testMenuItem.handleClick.emit).toHaveBeenCalled();
    });

    it('should not emit when clicking a disabled option', () => {
      const disabledOption = getElement(fixture, '#fudis-dropdown-menu-1-option-2');
      disabledOption.click();

      expect(component.testMenuItem.handleClick.emit).not.toHaveBeenCalled();
    });
  });
});
