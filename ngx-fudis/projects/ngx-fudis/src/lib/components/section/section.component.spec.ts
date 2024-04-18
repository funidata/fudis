import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionComponent } from './section.component';
import { HeadingComponent } from '../typography/heading/heading.component';
import { FudisGridService } from '../../services/grid/grid.service';
import { FudisIdService } from '../../services/id/id.service';
import { GridDirective } from '../../directives/grid/grid/grid.directive';
import { FudisInternalErrorSummaryService } from '../../services/form/error-summary/internal-error-summary.service';
import { FudisBreakpointService } from '../../services/breakpoint/breakpoint.service';
import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { BodyTextComponent } from '../typography/body-text/body-text.component';
import { ActionsDirective } from '../../directives/content-projection/actions/actions.directive';
import { NotificationsDirective } from '../../directives/content-projection/notifications/notifications.directive';
import { ContentDirective } from '../../directives/content-projection/content/content.directive';
import { FudisTooltipPosition } from '../../types/miscellaneous';
import { FudisHeadingLevel, FudisHeadingSize } from '../../types/typography';

// import { phl } from '@angular-extensions/pretty-html-log';
import { NotificationComponent } from '../notification/notification.component';
import { IconComponent } from '../icon/icon.component';
import { TooltipDirective } from '../../directives/tooltip/tooltip.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { getElement, sortClasses } from '../../utilities/tests/utilities';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'mock-fudis-section',
  template: `<fudis-section
    [title]="title"
    [titleSize]="titleSize"
    [titleLevel]="titleLevel"
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
  tooltip: string = 'This is tooltip in section';
  tooltipToggle: boolean = false;
  tooltipPosition: FudisTooltipPosition = 'below';
}

describe('SectionComponent', () => {
  // let component: SectionComponent;
  // let fixture: ComponentFixture<SectionComponent>;

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
    // fixture = TestBed.createComponent(SectionComponent);
    // component = fixture.componentInstance;
    // component.ngOnInit();
    // fixture.detectChanges();

    mockFixture = TestBed.createComponent(MockFudisSectionComponent);
    mockComponent = mockFixture.componentInstance;
    mockFixture.detectChanges();
  });

  function getSectionHeadingWrapper() {
    const headingWrapper = getElement(mockFixture, '#fudis-section-1-heading');

    return headingWrapper;
  }

  // function sectionTitleCheck(size: FudisHeadingSize, level: FudisHeadingLevel): void {
  //   mockComponent.titleSize = size;
  //   mockComponent.titleLevel = level;
  //   mockFixture.detectChanges();

  //   const sectionHeadingEl = getElement(mockFixture, '.fudis-heading') as HTMLElement;

  //   expect(sectionHeadingEl.className).toContain(`fudis-heading__size__${size}`);
  // }

  it('should create', () => {
    expect(mockComponent).toBeTruthy();
  });

  describe('CSS classes', () => {
    it('should have Grid related classes', () => {
      const sectionEl = getElement(mockFixture, 'section');

      expect(sortClasses(sectionEl.className)).toEqual(
        sortClasses(
          'fudis-section fudis-grid fudis-grid__align__start fudis-grid__initial fudis-grid__margin__top__none fudis-grid__margin__bottom__none fudis-grid__row-gap__none',
        ),
      );
    });
  });

  describe('HTML elements and properties', () => {
    it('should have id', () => {
      const sectionEl = getElement(mockFixture, 'section');

      expect(sectionEl.getAttribute('aria-describedby')).toEqual('fudis-section-1-heading');
      expect(sectionEl.getAttribute('id')).toEqual('fudis-section-1');
    });

    it('should have heading and title props as given', () => {
      const headingWrapper = getElement(mockFixture, '#fudis-section-1-heading');
      const headingComponent = mockFixture.debugElement.query(By.directive(HeadingComponent));
      const headingElement = headingWrapper.querySelector('.fudis-heading');

      expect(headingWrapper).toBeTruthy();
      expect(headingComponent).toBeTruthy();
      expect(headingElement?.textContent).toEqual('This is section title');
    });

    it('should return correct title size', () => {
      const headingElemenetClasses =
        getSectionHeadingWrapper()?.querySelector('.fudis-heading')?.className;
      console.log(headingElemenetClasses);
      // phl(mockFixture);
    });
  });
});
