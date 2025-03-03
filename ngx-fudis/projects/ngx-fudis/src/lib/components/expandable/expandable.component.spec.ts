import { Component, EventEmitter, OnInit, Output, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { ExpandableComponent } from './expandable.component';
import {
  FudisBadgeVariant,
  fudisBadgeVariantArray,
  FudisExpandableType,
} from '../../types/miscellaneous';
import { FudisInternalErrorSummaryService } from '../../services/form/error-summary/internal-error-summary.service';
import { getElement } from '../../utilities/tests/utilities';
import { fudisHeadingLevelArray } from '../../types/typography';
import {
  ExpandableActionsDirective,
  ExpandableContentDirective,
} from './expandable-content.directive';
import { BadgeComponent } from '../badge/badge.component';

@Component({
  selector: 'fudis-mock-container',
  template: `<fudis-expandable
    [closed]="closed"
    [title]="'Test title'"
    [subTitle]="subTitle"
    [level]="3"
    [variant]="variant"
    [padding]="padding"
    [badge]="badge"
    [badgeText]="'This is badge'"
  >
    <fudis-expandable-actions
      ><fudis-button [label]="'Action button'"></fudis-button
    ></fudis-expandable-actions>
    <ng-template fudisExpandableContent>
      <fudis-mock-component
        (initialized)="contentInitializationCount = contentInitializationCount + 1"
      ></fudis-mock-component>
    </ng-template>
  </fudis-expandable>`,
})
class MockContainerComponent {
  closed: boolean;
  variant: FudisExpandableType;
  padding: string;
  subTitle: string;
  contentInitializationCount = 0;
  badge: FudisBadgeVariant;
}

@Component({
  selector: 'fudis-mock-component',
  template: 'Mock!',
})
class MockContentComponent implements OnInit {
  @Output() initialized = new EventEmitter<void>();

  ngOnInit(): void {
    this.initialized.next();
  }
}

describe('ExpandableComponent', () => {
  let errorService: FudisInternalErrorSummaryService;
  let component: ExpandableComponent;
  let containerComponent: MockContainerComponent;
  let fixture: ComponentFixture<MockContainerComponent> | ComponentFixture<ExpandableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ExpandableActionsDirective,
        ExpandableContentDirective,
        BadgeComponent,
        ButtonComponent,
        ExpandableComponent,
        IconComponent,
        MockContainerComponent,
        MockContentComponent,
      ],
      providers: [FudisInternalErrorSummaryService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockContainerComponent);
    containerComponent = fixture.componentInstance;
  });

  function toggleExpandableState(): void {
    fixture.nativeElement
      .querySelector('fudis-expandable button.fudis-expandable__header__heading__button')
      .click();
  }

  function getExpandable(): ExpandableComponent {
    return fixture.debugElement.query(By.directive(ExpandableComponent)).componentInstance;
  }

  function hasSubTitle(): boolean {
    return !!fixture.nativeElement.querySelector(
      'span.fudis-expandable__header__heading__button__title__sub-heading',
    );
  }

  function headerHasButtons(): boolean {
    return !!fixture.nativeElement.querySelector(
      'fudis-expandable .fudis-expandable-actions fudis-button',
    );
  }

  function isContentVisible(): boolean {
    return !!fixture.nativeElement.querySelector(
      'fudis-expandable .fudis-expandable__content:not([hidden])',
    );
  }

  function assertExpandableIsExpanded(): void {
    expect(getExpandable().closed).toEqual(false);
    expect(isContentVisible()).toEqual(true);
  }

  function assertExpandableIsClosed(): void {
    expect(getExpandable().closed).toEqual(true);
    expect(isContentVisible()).toEqual(false);
  }

  function assertExpandableClassHasVariant(variant: FudisExpandableType): void {
    containerComponent.variant = variant;
    fixture.detectChanges();

    expect(
      !!fixture.nativeElement.querySelector(`section.fudis-expandable__${variant}`),
    ).toBeTruthy();
  }

  function assertExpandableIconUpdatesByVariant(variant: FudisExpandableType): void {
    containerComponent.variant = variant;
    fixture.detectChanges();

    const elem = fixture.nativeElement.querySelector(
      'fudis-icon.fudis-expandable__header__heading__button__icon',
    ) as HTMLElement;

    if (variant === 'regular') {
      expect(elem.getAttribute('ng-reflect-icon')).toEqual('chevron-ring-fill');
      expect(elem.getAttribute('ng-reflect-color')).toEqual('gray-dark');
    }

    if (variant === 'lite') {
      expect(elem.getAttribute('ng-reflect-icon')).toEqual('chevron');
      expect(elem.getAttribute('ng-reflect-color')).toEqual('primary');
    }
  }

  function assertExpandableContentHasPadding(padding: string): void {
    fixture.detectChanges();
    containerComponent.padding = padding;

    toggleExpandableState();
    fixture.detectChanges();

    expect(
      !!fixture.nativeElement.querySelector(`div.fudis-expandable__content__padding-${padding}`),
    ).toBeTruthy();
  }

  function assertExpandableBadge(badge: FudisBadgeVariant): void {
    fixture.detectChanges();
    const badgeElement = getElement(
      fixture,
      '.fudis-expandable__header__heading__button__title__badge',
    );
    expect(badgeElement.querySelector(`.fudis-badge__${badge}`)).toBeTruthy();
  }

  describe('expandable variant features', () => {
    it('should change the expandable class according to the given expandable variant', () => {
      assertExpandableClassHasVariant('regular');
      assertExpandableClassHasVariant('lite');
    });

    it('should change the expandable header fudis-icon icon and color inputs according to the given expandable variant', () => {
      assertExpandableIconUpdatesByVariant('regular');
      assertExpandableIconUpdatesByVariant('lite');
    });

    it('should render given subTitle input for regular, but not for lite variant', () => {
      containerComponent.variant = 'regular';
      fixture.detectChanges();

      expect(hasSubTitle()).toBeFalsy();

      containerComponent.subTitle = 'Test sub title';
      fixture.detectChanges();

      expect(hasSubTitle()).toBeTruthy();

      containerComponent.variant = 'lite';
      fixture.detectChanges();

      expect(hasSubTitle()).toBeFalsy();
    });
  });

  describe('CSS classes', () => {
    it('should change the expandable content class according to the given padding', () => {
      assertExpandableContentHasPadding('default');
      assertExpandableContentHasPadding('small');
    });
  });

  describe('header buttons', () => {
    it('should render fudis-button when one is given through fudis-expandable-actions directive', () => {
      fixture.detectChanges();

      expect(headerHasButtons()).toBeTruthy();
    });
  });

  describe('badge', () => {
    it('should render badge with given badge variant', () => {
      fudisBadgeVariantArray.forEach((badge) => {
        containerComponent.badge = badge;
        assertExpandableBadge(badge);
      });
    });
  });

  describe('lazy loading', () => {
    it('should not initialize content when rendering expandable with default settings', () => {
      fixture.detectChanges();

      assertExpandableIsClosed();

      expect(containerComponent.contentInitializationCount).toBe(0);
    });

    it('should initialize the content when rendering expandable as initially expanded', () => {
      containerComponent.closed = false;
      fixture.detectChanges();

      assertExpandableIsExpanded();

      expect(containerComponent.contentInitializationCount).toBe(1);
    });

    it('should initialize content when opening the expandable for the first time', () => {
      fixture.detectChanges();

      toggleExpandableState();
      fixture.detectChanges();

      assertExpandableIsExpanded();

      expect(containerComponent.contentInitializationCount).toBe(1);
    });

    it('should not initialize content more than once when toggling the expandable state', () => {
      fixture.detectChanges();

      toggleExpandableState();
      fixture.detectChanges();
      assertExpandableIsExpanded();

      toggleExpandableState();
      fixture.detectChanges();
      assertExpandableIsClosed();

      toggleExpandableState();
      fixture.detectChanges();
      assertExpandableIsExpanded();

      expect(containerComponent.contentInitializationCount).toBe(1);
    });

    it('should not remove the projected content from the DOM when collapsing the expandable', () => {
      containerComponent.closed = false;
      fixture.detectChanges();
      assertExpandableIsExpanded();

      toggleExpandableState();
      fixture.detectChanges();
      assertExpandableIsClosed();

      expect(
        fixture.nativeElement.querySelector(
          'fudis-expandable .fudis-expandable__content[hidden] fudis-mock-component',
        ),
      ).not.toEqual(null);
    });
  });

  describe('expandable title', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ExpandableComponent);
      component = fixture.componentInstance;
      component.title = 'Test title';
      fixture.detectChanges();
    });

    it('should have visible title', () => {
      const title = getElement(fixture, '.fudis-expandable__header__heading__button');

      expect(title.textContent).toBe('Test title');
    });

    it('should have title level', () => {
      fudisHeadingLevelArray.forEach((level) => {
        component.level = level;
        fixture.detectChanges();

        const heading = getElement(fixture, '.fudis-expandable .fudis-expandable__header__heading');

        expect(heading.getAttribute('aria-level')).toEqual(`${level}`);
      });
    });

    it('should emit event when closedChange is called', () => {
      jest.spyOn(component.closedChange, 'emit');
      expect(component.closedChange.emit).not.toHaveBeenCalled();

      component.closed = false;
      expect(component.closedChange.emit).toHaveBeenCalledTimes(1);

      component.closed = true;
      expect(component.closedChange.emit).toHaveBeenCalledTimes(2);
    });
  });

  describe('error summary', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ExpandableComponent);
      component = fixture.componentInstance;
      component.title = 'Test title';
      errorService = TestBed.inject(FudisInternalErrorSummaryService);
      jest.spyOn(errorService, 'addSection').mockImplementation(() => {});
      jest.spyOn(errorService, 'removeSection').mockImplementation(() => {});
      fixture.detectChanges();
    });

    // TODO: create example with Form as parent
    it.skip('onInit, should add section to error summary if errorSummaryBreadcrumb is true', () => {
      expect(errorService.addSection).not.toHaveBeenCalled();

      component.errorSummaryBreadcrumb = true;

      component.ngOnChanges({
        errorSummaryBreadcrumb: new SimpleChange(null, component.errorSummaryBreadcrumb, true),
      });

      fixture.detectChanges();

      expect(errorService.addSection).toHaveBeenCalledWith({
        id: 'fudis-expandable-2',
        title: 'Test title',
      });
    });

    // TODO: create example with Form as parent
    it.skip('onChanges, should add section to error summary if errorSummaryBreadcrumb is true and title is updated', () => {
      expect(errorService.addSection).not.toHaveBeenCalled();

      component.errorSummaryBreadcrumb = true;
      component.title = 'New test title';

      component.ngOnChanges({
        errorSummaryBreadcrumb: new SimpleChange(null, component.errorSummaryBreadcrumb, true),
      });

      fixture.detectChanges();

      expect(errorService.addSection).toHaveBeenCalledWith({
        id: 'fudis-expandable-2',
        title: 'New test title',
      });
    });

    // TODO: create example with Form as parent
    it.skip('onChanges, should remove section to error summary if errorSummaryBreadcrumb is false', () => {
      expect(errorService.addSection).not.toHaveBeenCalled();

      component.errorSummaryBreadcrumb = true;

      component.ngOnChanges({
        errorSummaryBreadcrumb: new SimpleChange(null, component.errorSummaryBreadcrumb, true),
      });

      fixture.detectChanges();

      expect(errorService.addSection).toHaveBeenCalledWith({
        id: 'fudis-expandable-2',
        title: 'Test title',
      });

      component.errorSummaryBreadcrumb = false;

      component.ngOnChanges({
        errorSummaryBreadcrumb: new SimpleChange(null, component.errorSummaryBreadcrumb, false),
      });

      fixture.detectChanges();

      expect(errorService.removeSection).toHaveBeenCalledWith({
        id: 'fudis-expandable-2',
        title: 'Test title',
      });
    });

    // TODO: create example with Form as parent
    it.skip('onDestroy, should remove section from error summary if error summary info is sent', () => {
      component.ngOnDestroy();

      expect(errorService.removeSection).not.toHaveBeenCalled();

      component.errorSummaryBreadcrumb = true;

      component.ngOnChanges({
        errorSummaryBreadcrumb: new SimpleChange(null, component.errorSummaryBreadcrumb, true),
      });

      fixture.detectChanges();

      component.ngOnDestroy();

      expect(errorService.removeSection).toHaveBeenCalledWith({
        id: 'fudis-expandable-2',
        title: 'Test title',
      });
    });
  });
});
