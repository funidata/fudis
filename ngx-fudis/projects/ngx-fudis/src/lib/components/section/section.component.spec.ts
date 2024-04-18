import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SectionComponent } from './section.component';
import { HeadingComponent } from '../typography/heading/heading.component';
import { ButtonComponent } from '../button/button.component';
import { BodyTextComponent } from '../typography/body-text/body-text.component';
import { NotificationComponent } from '../notification/notification.component';
import { IconComponent } from '../icon/icon.component';
import { FudisGridService } from '../../services/grid/grid.service';
import { FudisIdService } from '../../services/id/id.service';
import { GridDirective } from '../../directives/grid/grid/grid.directive';
import { FudisInternalErrorSummaryService } from '../../services/form/error-summary/internal-error-summary.service';
import { FudisBreakpointService } from '../../services/breakpoint/breakpoint.service';
import { ActionsDirective } from '../../directives/content-projection/actions/actions.directive';
import { NotificationsDirective } from '../../directives/content-projection/notifications/notifications.directive';
import { ContentDirective } from '../../directives/content-projection/content/content.directive';
import { TooltipDirective } from '../../directives/tooltip/tooltip.directive';
import { FudisTooltipPosition } from '../../types/miscellaneous';
import { FudisHeadingLevel, FudisHeadingSize } from '../../types/typography';
import { getElement, sortClasses } from '../../utilities/tests/utilities';

@Component({
  selector: 'mock-fudis-section',
  template: `<fudis-section
    [title]="title"
    [titleSize]="titleSize"
    [titleLevel]="titleLevel"
    [classes]="classes"
    [tooltip]="tooltip"
    [tooltipToggle]="tooltipToggle"
    [tooltipPosition]="tooltipPosition"
  >
    <ng-template fudisActions type="section">
      <fudis-button [label]="'Some action'"></fudis-button>
    </ng-template>
    <ng-template fudisNotifications type="section">
      <fudis-notification>This is notification</fudis-notification>
    </ng-template>
    <ng-template fudisContent type="section">
      <fudis-body-text>Some text content inside section</fudis-body-text>
    </ng-template>
  </fudis-section>`,
})
class MockFudisSectionComponent {
  title: string = 'This is section title';
  titleSize: FudisHeadingSize = 'lg';
  titleLevel: FudisHeadingLevel = 2;
  classes: string[];
  tooltip: string = 'This is tooltip in section';
  tooltipToggle: boolean = false;
  tooltipPosition: FudisTooltipPosition = 'below';
}

describe('SectionComponent', () => {
  let mockComponent: MockFudisSectionComponent;
  let mockFixture: ComponentFixture<MockFudisSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ActionsDirective,
        BodyTextComponent,
        ButtonComponent,
        ContentDirective,
        GridDirective,
        HeadingComponent,
        IconComponent,
        MockFudisSectionComponent,
        NotificationComponent,
        NotificationsDirective,
        SectionComponent,
        TooltipDirective,
      ],
      providers: [
        FudisGridService,
        FudisIdService,
        FudisInternalErrorSummaryService,
        FudisBreakpointService,
      ],
      imports: [MatTooltipModule],
    });

    mockFixture = TestBed.createComponent(MockFudisSectionComponent);
    mockComponent = mockFixture.componentInstance;
    mockFixture.detectChanges();
  });

  function getSectionElement() {
    const sectionEl = getElement(mockFixture, 'section') as HTMLElement;
    return sectionEl;
  }

  function sectionTitleSizeCheck(size: FudisHeadingSize): void {
    mockComponent.titleSize = size;
    mockFixture.detectChanges();

    const sectionHeadingEl = getElement(mockFixture, '.fudis-heading') as HTMLElement;

    expect(sectionHeadingEl.className).toContain(`fudis-heading__size__${size}`);
  }

  function sectionTitleLevelCheck(level: FudisHeadingLevel): void {
    mockComponent.titleLevel = level;
    mockFixture.detectChanges();

    const headingElement = mockFixture.nativeElement.querySelector('fudis-heading');

    expect(headingElement.querySelector(`h${level}`)).toBeTruthy();
  }

  it('should create', () => {
    expect(mockComponent).toBeTruthy();
  });

  describe('CSS classes', () => {
    it('should have Grid related classes', () => {
      expect(sortClasses(getSectionElement().className)).toEqual(
        sortClasses(
          'fudis-section fudis-grid fudis-grid__align__start fudis-grid__initial fudis-grid__margin__top__none fudis-grid__margin__bottom__none fudis-grid__row-gap__none',
        ),
      );
    });

    it('should add custom CSS classes if given', () => {
      mockComponent.classes = ['my-custom-class other-custom-class'];
      mockFixture.detectChanges();

      expect(sortClasses(getSectionElement().className)).toEqual(
        sortClasses(
          'fudis-section my-custom-class other-custom-class fudis-grid fudis-grid__align__start fudis-grid__initial fudis-grid__margin__top__none fudis-grid__margin__bottom__none fudis-grid__row-gap__none',
        ),
      );
    });
  });

  describe('HTML elements and properties', () => {
    it('should have id related props', () => {
      expect(getSectionElement().getAttribute('aria-describedby')).toEqual(
        'fudis-section-1-heading',
      );
      expect(getSectionElement().getAttribute('id')).toEqual('fudis-section-1');
    });

    it('should have heading present and title as given', () => {
      const headingWrapper = getElement(mockFixture, '#fudis-section-1-heading');
      const headingComponent = mockFixture.debugElement.query(By.directive(HeadingComponent));
      const headingElement = headingWrapper.querySelector('.fudis-heading');

      expect(headingWrapper).toBeTruthy();
      expect(headingComponent).toBeTruthy();
      expect(headingElement?.textContent).toEqual('This is section title');
    });

    it('should return correct title size', () => {
      sectionTitleSizeCheck('xxs');
      sectionTitleSizeCheck('xs');
      sectionTitleSizeCheck('sm');
      sectionTitleSizeCheck('md');
      sectionTitleSizeCheck('lg');
      sectionTitleSizeCheck('xl');
      sectionTitleSizeCheck('xxl');
    });

    it('should return correct title level', () => {
      sectionTitleLevelCheck(1);
      sectionTitleLevelCheck(2);
      sectionTitleLevelCheck(3);
      sectionTitleLevelCheck(4);
      sectionTitleLevelCheck(5);
      sectionTitleLevelCheck(6);
    });
  });

  describe('Content projection', () => {
    it('should render notification inside header if given', () => {
      const notifications = mockFixture.nativeElement.querySelector(
        '.fudis-section__notifications',
      );
      const notificationComponent = mockFixture.debugElement.query(
        By.directive(NotificationComponent),
      );

      expect(notifications).toBeTruthy();
      expect(notificationComponent).toBeTruthy();
    });

    it('should render action button(s) inside header if given', () => {
      const actions = mockFixture.nativeElement.querySelector('.fudis-section__header__actions');
      const actionComponent = mockFixture.debugElement.query(By.directive(ButtonComponent));

      expect(actions).toBeTruthy();
      expect(actionComponent).toBeTruthy();
    });

    it('should render content', () => {
      const content = mockFixture.nativeElement.querySelector('.fudis-section__content');
      const contentComponent = mockFixture.debugElement.query(By.directive(BodyTextComponent));

      expect(content).toBeTruthy();
      expect(contentComponent).toBeTruthy();
    });
  });
});
