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
import { Component, DebugElement, SimpleChange } from '@angular/core';
import { FudisDescriptionListVariant } from '../../types/miscellaneous';
import { FudisIdService } from '../../services/id/id.service';

@Component({
  selector: 'fudis-mock-dl',
  template: `
    <fudis-dl [variant]="variant" [disableGrid]="disableGrid">
      <fudis-dl-item>
        <fudis-dt [contentText]="'First DT'"></fudis-dt>
        <fudis-dd [contentText]="'This is my DD'"></fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [contentText]="'Second DT'"></fudis-dt>
        <fudis-dd [contentText]="'This is my DD'"></fudis-dd>
      </fudis-dl-item>
    </fudis-dl>

    <fudis-dl [variant]="variant" [disableGrid]="disableGrid" [tag]="'p'">
      <fudis-dl-item>
        <fudis-dt [contentText]="'Single DT'"></fudis-dt>
        <fudis-dd [contentText]="'This is my DD'"></fudis-dd>
      </fudis-dl-item>
    </fudis-dl>

    <fudis-dl [variant]="variant" [disableGrid]="true">
      <fudis-dl-item>
        <fudis-dt [contentText]="'Disabled Grid DT'"></fudis-dt>
        <fudis-dd [contentText]="'This is my DD'"></fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [contentText]="'Disabled Grid DT'"></fudis-dt>
        <fudis-dd [contentText]="'This is my DD'"></fudis-dd>
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

  function getDlElement(type: string): HTMLElement {
    const dlElement = getElement(mockFixture, `fudis-dl ${type}`);
    return dlElement;
  }

  function getDlFromArrayIndex(index: number): DebugElement {
    const dlElements = mockFixture.debugElement.queryAll(By.css('fudis-dl'));
    const itemArray = [...dlElements];

    return itemArray[index];
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Wrapper element', () => {
    it('should have respective wrapper element depending on description list type, i.e multiple items, single item or disabled grid', () => {
      expect(getDlFromArrayIndex(0).query(By.css('dl'))).toBeTruthy();
      expect(getDlFromArrayIndex(2).query(By.css('dl'))).toBeTruthy();
      expect(getDlFromArrayIndex(1).query(By.css('dl'))).toBeFalsy();

      expect(getDlFromArrayIndex(1).query(By.css('div.fudis-dl'))).toBeTruthy();
      expect(getDlFromArrayIndex(0).query(By.css('div.fudis-dl'))).toBeFalsy();
      expect(getDlFromArrayIndex(2).query(By.css('div.fudis-dl'))).toBeFalsy();
    });
  });

  describe('CSS classes', () => {
    it('should have main CSS class', () => {
      expect(getDlElement('dl').classList).toContain('fudis-dl');
    });

    it('should have grid classes if grid is enabled', () => {
      expect(sortClasses(getDlElement('dl').className)).toEqual(
        sortClasses(
          'fudis-dl fudis-grid fudis-grid__xxl fudis-grid__align__start fudis-grid__margin__top__none fudis-grid__margin__bottom__none fudis-grid__row-gap__sm',
        ),
      );
    });

    it('should not have grid classes if grid is disabled', () => {
      mockComponent.disableGrid = true;
      mockFixture.detectChanges();

      expect(sortClasses(getDlElement('dl').className)).toEqual(
        sortClasses('fudis-dl fudis-dl__disabled-grid'),
      );
    });
  });

  describe('HTML id', () => {
    it('should have generated id from Id Service', () => {
      // Id's start from 2 since the "real" DL component has been rendered first.
      expect(getDlFromArrayIndex(0).query(By.css('dl')).nativeElement.getAttribute('id')).toEqual(
        'fudis-description-list-2',
      );

      expect(
        getDlFromArrayIndex(1).query(By.css('div.fudis-dl')).nativeElement.getAttribute('id'),
      ).toEqual('fudis-description-list-3');

      expect(getDlFromArrayIndex(2).query(By.css('dl')).nativeElement.getAttribute('id')).toEqual(
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
});
