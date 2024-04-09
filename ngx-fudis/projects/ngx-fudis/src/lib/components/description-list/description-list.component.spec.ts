import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GridComponent } from '../grid/grid/grid.component';
import { GridDirective } from '../../directives/grid/grid/grid.directive';
import { DescriptionListComponent } from './description-list.component';
import { FudisGridService } from '../../services/grid/grid.service';
import { DescriptionListItemComponent } from './description-list-item/description-list-item.component';
import { DescriptionListItemTermComponent } from './description-list-item/description-list-item-term/description-list-item-term.component';
import { DescriptionListItemDetailsComponent } from './description-list-item/description-list-item-details/description-list-item-details.component';
import { LanguageBadgeGroupComponent } from '../language-badge-group/language-badge-group.component';
import { FudisBreakpointService } from '../../services/breakpoint/breakpoint.service';
import { getElement, sortClasses } from '../../utilities/tests/utilities';
import { Component, SimpleChange } from '@angular/core';
import { FudisDescriptionListVariant } from '../../types/miscellaneous';
import { FudisIdService } from '../../services/id/id.service';

@Component({
  selector: 'fudis-mock-dl',
  template: `
    <fudis-dl [variant]="variant" [disableGrid]="disableGrid">
      <fudis-dl-item>
        <fudis-dt>First DT</fudis-dt>
        <fudis-dd>This is my DD</fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt>Second DT</fudis-dt>
        <fudis-dd>This is my DD</fudis-dd>
      </fudis-dl-item>
    </fudis-dl>

    <fudis-dl [variant]="variant" [disableGrid]="disableGrid">
      <fudis-dl-item>
        <fudis-dt>Single DT</fudis-dt>
        <fudis-dd>This is my DD</fudis-dd>
      </fudis-dl-item>
    </fudis-dl>

    <fudis-dl [variant]="variant" [disableGrid]="true">
      <fudis-dl-item>
        <fudis-dt>Disabled Grid DT</fudis-dt>
        <fudis-dd>This is my DD</fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt>Disabled Grid DT</fudis-dt>
        <fudis-dd>This is my DD</fudis-dd>
      </fudis-dl-item>
    </fudis-dl>
  `,
})
class MockDlComponent {
  variant: FudisDescriptionListVariant = 'regular';
  disableGrid: boolean = false;
}

describe('DescriptionListComponent', () => {
  let component: DescriptionListComponent;
  let fixture: ComponentFixture<DescriptionListComponent>;

  let mockComponent: MockDlComponent;
  let mockFixture: ComponentFixture<MockDlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DescriptionListComponent,
        GridDirective,
        GridComponent,
        DescriptionListItemComponent,
        DescriptionListItemTermComponent,
        DescriptionListItemDetailsComponent,
        LanguageBadgeGroupComponent,
        MockDlComponent,
      ],
      providers: [FudisGridService, FudisIdService, FudisBreakpointService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockFixture = TestBed.createComponent(MockDlComponent);
    mockComponent = mockFixture.componentInstance;
    mockFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Wrapper element', () => {
    it('should have respective wrapper element depending on description list type', () => {
      const dlElements = mockFixture.debugElement.queryAll(By.css('fudis-dl'));

      const dlWithMultipleItems = dlElements[0];
      const dlWithSingleItem = dlElements[1];
      const dlWithDisabledGrid = dlElements[2];

      expect(dlWithMultipleItems.query(By.css('dl'))).toBeTruthy();
      expect(dlWithDisabledGrid.query(By.css('dl'))).toBeTruthy();
      expect(dlWithSingleItem.query(By.css('dl'))).toBeFalsy();

      expect(dlWithSingleItem.query(By.css('div.fudis-dl'))).toBeTruthy();
      expect(dlWithMultipleItems.query(By.css('div.fudis-dl'))).toBeFalsy();
      expect(dlWithDisabledGrid.query(By.css('div.fudis-dl'))).toBeFalsy();
    });
  });

  describe('CSS classes', () => {
    it('should have main CSS class', () => {
      const dlElement = getElement(mockFixture, 'fudis-dl dl');

      expect(dlElement.classList).toContain('fudis-dl');
    });

    it('should have grid classes if grid is enabled', () => {
      const dlElement = getElement(mockFixture, 'fudis-dl dl');

      expect(sortClasses(dlElement.className)).toEqual(
        sortClasses(
          'fudis-dl fudis-grid fudis-grid__xxl fudis-grid__align__start fudis-grid__margin__top__none fudis-grid__margin__bottom__none fudis-grid__row-gap__none',
        ),
      );
    });

    it('should not have grid classes if grid is disabled', () => {
      mockComponent.disableGrid = true;
      mockFixture.detectChanges();

      const dlElement = getElement(mockFixture, 'fudis-dl dl');

      expect(sortClasses(dlElement.className)).toEqual(
        sortClasses('fudis-dl fudis-dl__disabled-grid'),
      );
    });
  });

  describe('Component id', () => {
    it('should have generated id from Id Service', () => {
      const dlElements = mockFixture.nativeElement.querySelectorAll('fudis-dl');

      const dlWithMultipleItems = dlElements[0];
      const dlWithSingleItem = dlElements[1];
      const dlWithDisabledGrid = dlElements[2];

      // Id's start from 2 since the "real" component has been rendered with list-1, maybe?
      expect(dlWithMultipleItems.querySelector('dl').getAttribute('id')).toEqual(
        'fudis-description-list-2',
      );
      expect(dlWithSingleItem.querySelector('div.fudis-dl').getAttribute('id')).toEqual(
        'fudis-description-list-3',
      );
      expect(dlWithDisabledGrid.querySelector('dl').getAttribute('id')).toEqual(
        'fudis-description-list-4',
      );
    });
  });

  describe('Signals', () => {
    it('should return correct variant from signal', () => {
      const variantBefore = component.getVariant()();

      expect(variantBefore).toEqual('regular');

      component.variant = 'compact';
      component.ngOnChanges({
        variant: new SimpleChange('regular', component.variant, true),
      });

      const variantAfter = component.getVariant()();

      expect(variantAfter).toEqual('compact');
    });

    it('should return correct disabled grid status from signal', () => {
      const statusBefore = component.getDisabledGridStatus()();

      expect(statusBefore).toEqual(false);

      component.disableGrid = true;
      component.ngOnChanges({
        disableGrid: new SimpleChange(false, component.disableGrid, true),
      });

      const statusAfter = component.getDisabledGridStatus()();

      expect(statusAfter).toEqual(true);
    });
  });

  describe('Child DL item array', () => {
    it('should update when adding or removing items', () => {
      expect(component.childDlItems.length).toEqual(0);

      component.addChildId('description-list-1-item-1');
      component.addChildId('description-list-1-item-2');

      expect(component.childDlItems.length).toEqual(2);

      component.removeChildId('description-list-1-item-1');

      expect(component.childDlItems.length).toEqual(1);
    });
  });
});
