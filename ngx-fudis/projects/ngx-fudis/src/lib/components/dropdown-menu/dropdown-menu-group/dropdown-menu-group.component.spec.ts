import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownMenuGroupComponent } from './dropdown-menu-group.component';
import { FudisIdService } from '../../../services/id/id.service';
import { getElement } from '../../../utilities/tests/utilities';
import { DropdownMenuComponent } from '../dropdown-menu.component';

describe('DropdownMenuGroupComponent', () => {
  let component: DropdownMenuGroupComponent;
  let fixture: ComponentFixture<DropdownMenuGroupComponent>;
  let service: FudisIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownMenuGroupComponent, DropdownMenuComponent],
    })
      .overrideComponent(DropdownMenuGroupComponent, {
        add: {
          providers: [
            { provide: DropdownMenuComponent, useValue: { id: 'fudis-dropdown-menu-1' } },
          ],
        },
      })
      .compileComponents();

    service = TestBed.inject(FudisIdService);
    service.getNewGrandParentId('dropdown-menu');

    fixture = TestBed.createComponent(DropdownMenuGroupComponent);
    component = fixture.componentInstance;
    component.label = 'Group under Dropdown Menu';
    fixture.detectChanges();
  });

  describe('should create', () => {
    it('truthy component', () => {
      expect(component).toBeTruthy();
    });

    it('with correct id', () => {
      expect(component.id).toEqual('fudis-dropdown-menu-1-group-1');
    });

    it('with correct label', () => {
      const labelText = getElement(fixture, '.fudis-dropdown-menu-group__label').textContent;

      expect(labelText).toEqual('Group under Dropdown Menu');
    });
  });
});
