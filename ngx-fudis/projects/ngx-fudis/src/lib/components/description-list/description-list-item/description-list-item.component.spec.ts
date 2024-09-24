import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GridComponent } from '../../grid/grid/grid.component';
import { GridDirective } from '../../../directives/grid/grid/grid.directive';
import { DescriptionListComponent } from '../description-list.component';
import { FudisGridService } from '../../../services/grid/grid.service';
import { DescriptionListItemComponent } from './description-list-item.component';
import { DescriptionListItemTermComponent } from './description-list-item-term/description-list-item-term.component';
import { DescriptionListItemDetailsComponent } from './description-list-item-details/description-list-item-details.component';
import { LanguageBadgeGroupComponent } from '../../language-badge-group/language-badge-group.component';
import { FudisBreakpointService } from '../../../services/breakpoint/breakpoint.service';
import { getElement } from '../../../utilities/tests/utilities';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FudisDescriptionListVariant } from '../../../types/miscellaneous';
import { FudisIdService } from '../../../services/id/id.service';
import { LanguageBadgeComponent } from '../../language-badge-group/language-badge/language-badge.component';
import { TooltipApiDirective } from '../../../directives/tooltip/tooltip-api.directive';
import { TooltipDirective } from '../../../directives/tooltip/tooltip.directive';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'fudis-mock-dl',
  template: `
    <fudis-dl [variant]="variant" [disableGrid]="disableGrid">
      <fudis-dl-item>
        <fudis-dt [contentText]="'First DT'">First DT</fudis-dt>
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

    <fudis-dl>
      <fudis-dl-item #langDlItem>
        <fudis-dt [contentText]="'Single DT'"></fudis-dt>
        <fudis-dd *ngIf="firstLang" [lang]="'en'" [contentText]="'First English DD'"></fudis-dd>
        <fudis-dd *ngIf="secondLang" [lang]="'en'" [contentText]="'Another English DD'"></fudis-dd>
        <fudis-dd *ngIf="thirdLang" [lang]="'fi'" [contentText]="'Finnish DD'"></fudis-dd>
      </fudis-dl-item>
    </fudis-dl>
  `,
})
class MockDlComponent {
  variant: FudisDescriptionListVariant = 'regular';
  disableGrid: boolean = false;

  firstLang = true;
  secondLang = true;
  thirdLang = true;

  @ViewChild('langDlItem') langDlItem: DescriptionListItemComponent;
}

describe('DescriptionListItemComponent', () => {
  let mockComponent: MockDlComponent;
  let mockFixture: ComponentFixture<MockDlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GridDirective,
        GridComponent,
        DescriptionListComponent,
        DescriptionListItemComponent,
        DescriptionListItemTermComponent,
        DescriptionListItemDetailsComponent,
        LanguageBadgeGroupComponent,
        LanguageBadgeComponent,
        TooltipApiDirective,
        TooltipDirective,
        MockDlComponent,
      ],
      imports: [MatTooltipModule],
      providers: [FudisGridService, FudisIdService, FudisBreakpointService],
    }).compileComponents();
  });

  beforeEach(() => {
    mockFixture = TestBed.createComponent(MockDlComponent);
    mockComponent = mockFixture.componentInstance;
    mockFixture.detectChanges();
  });

  function getDlItemElement(type: string): HTMLElement {
    const dlItemElement = getElement(mockFixture, `fudis-dl-item ${type}`);
    return dlItemElement;
  }

  function getDlItemFromArrayIndex(index: number): DebugElement {
    const dlItemElements = mockFixture.debugElement.queryAll(By.css('fudis-dl-item'));
    const itemArray = [...dlItemElements];

    return itemArray[index];
  }

  it('should create', () => {
    expect(mockComponent).toBeTruthy();
  });

  describe('Wrapper element', () => {
    it('should render respective wrapper element for multiple and single item templates', () => {
      expect(getDlItemFromArrayIndex(0).query(By.css('div.fudis-dl-item'))).toBeTruthy();
      expect(getDlItemFromArrayIndex(2).query(By.css('div.fudis-dl-item'))).toBeFalsy();

      expect(getDlItemFromArrayIndex(2).query(By.css('p.fudis-dl-item'))).toBeTruthy();
      expect(getDlItemFromArrayIndex(0).query(By.css('p.fudis-dl-item'))).toBeFalsy();
    });
  });

  describe('CSS classes', () => {
    it('should have main CSS class', () => {
      expect(getDlItemElement('div').className).toEqual('fudis-dl-item');
      expect(getDlItemElement('p').className).toEqual('fudis-dl-item');
    });

    it('should have respective class if grid is disabled from parent DL', () => {
      mockComponent.disableGrid = true;
      mockFixture.detectChanges();
      mockFixture.whenRenderingDone().then(() => {
        expect(getDlItemElement('p').className).toEqual('fudis-dl-item__disabled-grid');
        expect(getDlItemElement('div').className).toEqual('fudis-dl-item__disabled-grid');
      });
    });
  });

  describe('HTML id', () => {
    it('should have generated id from Id Service', () => {
      expect(
        getDlItemFromArrayIndex(0)
          .query(By.css('div.fudis-dl-item'))
          .nativeElement.getAttribute('id'),
      ).toEqual('fudis-description-list-1-item-1');

      expect(
        getDlItemFromArrayIndex(1)
          .query(By.css('div.fudis-dl-item'))
          .nativeElement.getAttribute('id'),
      ).toEqual('fudis-description-list-1-item-2');

      expect(
        getDlItemFromArrayIndex(2)
          .query(By.css('p.fudis-dl-item'))
          .nativeElement.getAttribute('id'),
      ).toEqual('fudis-description-list-2-item-1');
    });
  });

  describe('With Language children', () => {
    it('should have correct initial selectable languages object', () => {
      const initialState = {
        en: {
          'fudis-description-list-3-item-1-details-1': 'First English DD',
          'fudis-description-list-3-item-1-details-2': 'Another English DD',
        },
        fi: {
          'fudis-description-list-3-item-1-details-3': 'Finnish DD',
        },
      };

      mockFixture.detectChanges();

      expect(mockComponent.langDlItem.getDetailsLanguageOptions()()).toEqual(initialState);
    });

    it('should update selectable languages when childs are destroyed', () => {
      const firstRemoved = {
        en: {
          'fudis-description-list-3-item-1-details-2': 'Another English DD',
        },
        fi: {
          'fudis-description-list-3-item-1-details-3': 'Finnish DD',
        },
      };

      mockComponent.firstLang = false;

      mockFixture.detectChanges();

      expect(mockComponent.langDlItem.getDetailsLanguageOptions()()).toEqual(firstRemoved);

      const secondRemoved = {
        fi: {
          'fudis-description-list-3-item-1-details-3': 'Finnish DD',
        },
      };

      mockComponent.secondLang = false;

      mockFixture.detectChanges();

      expect(mockComponent.langDlItem.getDetailsLanguageOptions()()).toEqual(secondRemoved);

      mockComponent.thirdLang = false;

      mockFixture.detectChanges();

      expect(mockComponent.langDlItem.getDetailsLanguageOptions()()).toBeNull();
    });
  });
});
