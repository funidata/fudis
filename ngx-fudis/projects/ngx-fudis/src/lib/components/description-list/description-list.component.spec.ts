import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';

import { GridComponent } from '../grid/grid/grid.component';
import { GridDirective } from '../../directives/grid/grid/grid.directive';

import { DescriptionListComponent } from './description-list.component';
import { FudisGridService } from '../../services/grid/grid.service';
import { DescriptionListItemComponent } from './description-list-item/description-list-item.component';
import { DescriptionListItemTermComponent } from './description-list-item/description-list-item-term/description-list-item-term.component';
import { DescriptionListItemDetailsComponent } from './description-list-item/description-list-item-details/description-list-item-details.component';

import { LanguageBadgeGroupComponent } from '../language-badge-group/language-badge-group.component';
import { FudisBreakpointService } from '../../services/breakpoint/breakpoint.service';

describe('DescriptionListComponent', () => {
  let component: DescriptionListComponent;
  let fixture: ComponentFixture<DescriptionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DescriptionListComponent,
        GridDirective,
        GridComponent,
        DescriptionListItemComponent,
        DescriptionListItemTermComponent,
        DescriptionListItemDetailsComponent,
        MockComponent(LanguageBadgeGroupComponent),
      ],
      providers: [FudisGridService, FudisBreakpointService],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(DescriptionListComponent);
    component = fixture.componentInstance;
    component.data = [
      {
        key: 'Kieli',
        value: 'Tagalog',
      },
    ];

    fixture.detectChanges();
  });

  function getDescriptionList(): HTMLElement {
    const descriptionListElement = fixture.nativeElement.querySelector('dl') as HTMLElement;
    return descriptionListElement;
  }

  function getDescriptionListDt(classes: string): HTMLElement {
    const descriptionListItemTermElement = fixture.debugElement.query(
      By.css(`fudis-dt .${classes}`),
    );
    return descriptionListItemTermElement.nativeElement;
  }

  function getDescriptionListDd(classes: string): HTMLElement {
    const descriptionListItemDetailsElement = fixture.debugElement.query(
      By.css(`fudis-dd .${classes}`),
    );
    return descriptionListItemDetailsElement.nativeElement;
  }

  function assertDescriptionListHasClasses(classes: string[]): void {
    const descriptionListClassName = getDescriptionList()?.className ?? '';

    expect(descriptionListClassName.split(' ').sort()).toEqual(classes.sort());
  }

  function assertDtHasClasses(classes: string): void {
    const descriptionListItemTermClassName = getDescriptionListDt(classes).className ?? '';

    expect(descriptionListItemTermClassName).toContain(classes);
  }

  function assertDdHasClasses(classes: string, display: string) {
    const descriptionListItemDetailsElement = getDescriptionListDd(classes);
    const descriptionListItemDetilsClassName = descriptionListItemDetailsElement.className ?? '';
    const descriptionListItemValueDisplayStyle = getComputedStyle(
      descriptionListItemDetailsElement,
    ).display;

    expect(descriptionListItemValueDisplayStyle).toEqual(display);
    expect(descriptionListItemDetilsClassName).toContain(classes);
  }

  describe('Parent CSS class', () => {
    it('should have fudis-dl and fudis-grid classes if regular list', () => {
      const classList = [
        'fudis-dl',
        'fudis-grid',
        'fudis-grid__margin__sides__none',
        'fudis-grid__align__center',
        'fudis-grid__row-gap__none',
        'fudis-grid__margin__bottom__none',
        'fudis-grid__margin__top__none',
        'fudis-grid__xxl',
      ];
      assertDescriptionListHasClasses(classList);
    });

    it('should have fudis-dl-compact and fudis-grid classes if compact list', () => {
      component.variant = 'compact';
      component.ngOnChanges();
      fixture.detectChanges();
      const classList = [
        'fudis-dl-compact',
        'fudis-grid',
        'fudis-grid__align__center',
        'fudis-grid__margin__sides__none',
        'fudis-grid__margin__bottom__none',
        'fudis-grid__margin__top__none',
        'fudis-grid__row-gap__none',
        'fudis-grid__xxl',
      ];
      assertDescriptionListHasClasses(classList);
    });

    it('should not have fudis-grid classes if grid directive is disabled if regular list', () => {
      component.disableGrid = true;
      component.ngOnChanges();
      fixture.detectChanges();
      const classList = ['fudis-dl', 'fudis-dl__disabled-grid'];
      assertDescriptionListHasClasses(classList);
    });

    it('should not have fudis-grid classes if grid directive is disabled if compact list', () => {
      component.variant = 'compact';
      component.disableGrid = true;
      component.ngOnChanges();
      fixture.detectChanges();
      const classList = ['fudis-dl-compact', 'fudis-dl-compact__disabled-grid'];
      assertDescriptionListHasClasses(classList);
    });
  });

  describe('description list item, term and detail components', () => {
    it('should be present', () => {
      const descriptionListItem = fixture.debugElement.query(By.css('fudis-dl-item'));
      const descriptionListItemTerm = descriptionListItem.nativeElement.querySelector('fudis-dt');
      const descriptionListItemDetails =
        descriptionListItem.nativeElement.querySelector('fudis-dd');

      expect(descriptionListItemTerm).toBeTruthy();
      expect(descriptionListItemDetails).toBeTruthy();
    });

    it('should have respective CSS classes and display style in regular list', () => {
      assertDtHasClasses('fudis-dl__item__term');
      assertDdHasClasses('fudis-dl__item__details', 'block');
    });

    it('should have respective CSS classes and display style in compact list', () => {
      component.variant = 'compact';
      component.ngOnChanges();
      fixture.detectChanges();
      assertDtHasClasses('fudis-dl-compact__item__term');
      assertDdHasClasses('fudis-dl-compact__item__details', 'block');
    });
  });

  // TODO: missing tests for item, item-details, item-term, langauge features
});
