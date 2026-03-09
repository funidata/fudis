import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectGroupComponent } from './select-group.component';
import { SelectComponent } from '../../select/select.component';
import { FudisIdService } from '../../../../../services/id/id.service';
import { MultiselectComponent } from '../../multiselect/multiselect.component';
import { getElement } from '../../../../../utilities/tests/utilities';

describe('SelectGroupComponent', () => {
  let component: SelectGroupComponent;
  let fixture: ComponentFixture<SelectGroupComponent>;
  let service: FudisIdService;

  describe('with Select parent', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [SelectGroupComponent, SelectComponent],
      })
        .overrideComponent(SelectGroupComponent, {
          add: {
            providers: [{ provide: SelectComponent, useValue: { id: 'fudis-select-1' } }],
          },
        })
        .compileComponents();
      service = TestBed.inject(FudisIdService);
      service.getNewGrandParentId('select');

      fixture = TestBed.createComponent(SelectGroupComponent);
      component = fixture.componentInstance;
      component.label = 'Group under Select';
      fixture.detectChanges();
    });

    describe('it should create', () => {
      it('truthy component', () => {
        expect(component).toBeTruthy();
      });
      it('with correct id', () => {
        expect(component.id).toEqual('fudis-select-1-group-1');
      });

      it('with correct label', () => {
        const labelText = getElement(fixture, '.fudis-select-group__label').textContent;

        expect(labelText).toEqual('Group under Select');
      });

      it('to change CSS properly when options are registered or removed', () => {
        let hiddenGroup = getElement(fixture, '.fudis-select-group--hidden');

        fixture.detectChanges();

        expect(hiddenGroup).toBeTruthy();

        component.setOptionVisibility('option-1', true);

        fixture.detectChanges();

        hiddenGroup = getElement(fixture, '.fudis-select-group--hidden');

        expect(hiddenGroup).toBeFalsy();

        component.setOptionVisibility('option-1', false);

        fixture.detectChanges();

        hiddenGroup = getElement(fixture, '.fudis-select-group--hidden');

        expect(hiddenGroup).toBeTruthy();
      });
    });
  });

  describe('with Multiselect parent', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [SelectGroupComponent, SelectComponent],
      })
        .overrideComponent(SelectGroupComponent, {
          add: {
            providers: [{ provide: MultiselectComponent, useValue: { id: 'fudis-multiselect-1' } }],
          },
        })
        .compileComponents();
      service = TestBed.inject(FudisIdService);
      service.getNewGrandParentId('multiselect');

      fixture = TestBed.createComponent(SelectGroupComponent);
      component = fixture.componentInstance;
      component.label = 'Group under Multiselect';
      fixture.detectChanges();
    });

    describe('it should create', () => {
      it('truthy component', () => {
        expect(component).toBeTruthy();
      });
      it('with correct id', () => {
        expect(component.id).toEqual('fudis-multiselect-1-group-1');
      });
      it('with correct label', () => {
        const labelText = getElement(fixture, '.fudis-select-group__label').textContent;

        expect(labelText).toEqual('Group under Multiselect');
      });
    });
  });
});
