import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownMenuComponent } from './dropdown-menu.component';
import { DropdownMenuItemComponent } from './dropdown-menu-item/dropdown-menu-item.component';
import { IconComponent } from '../icon/icon.component';
import { getElement, sortClasses } from '../../utilities/tests/utilities';
import { fudisInputSizeArray } from '../../types/forms';
import { fudisDropdownMenuAlignArray } from '../../types/miscellaneous';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { FudisDialogService } from '../../services/dialog/dialog.service';

describe('DropdownMenuComponent', () => {
  let component: DropdownMenuComponent;
  let fixture: ComponentFixture<DropdownMenuComponent>;
  let menuElement: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IconButtonComponent,
        DropdownMenuItemComponent,
        DropdownMenuComponent,
        IconComponent,
      ],
      providers: [FudisDialogService],
    })
      .overrideComponent(DropdownMenuComponent, {
        add: {
          providers: [{ provide: IconButtonComponent, useValue: { id: 'fudis-button-1' } }],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(DropdownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('HTML attributes', () => {
    beforeEach(() => {
      menuElement = getElement(fixture, '.fudis-dropdown-menu') as HTMLDivElement;
    });

    it('should have generated id', () => {
      expect(menuElement.getAttribute('id')).toEqual('fudis-dropdown-menu-1');
    });

    it('should have proper role', () => {
      expect(menuElement.getAttribute('role')).toEqual('menu');
    });

    it('should have aria-expanded', () => {
      expect(!!menuElement.getAttribute('aria-expanded')).toEqual(true);
    });

    it('should change CSS classes according to the given size and align Inputs', () => {
      fudisInputSizeArray.forEach((size) => {
        fixture.componentRef.setInput('size', size);

        fudisDropdownMenuAlignArray.forEach((align) => {
          fixture.componentRef.setInput('align', align);
          fixture.detectChanges();

          expect(sortClasses(menuElement.className)).toEqual(
            sortClasses(
              `fudis-dropdown-menu fudis-dropdown-menu__${align} fudis-dropdown-menu__${size}`,
            ),
          );
        });
      });
    });
  });
});
