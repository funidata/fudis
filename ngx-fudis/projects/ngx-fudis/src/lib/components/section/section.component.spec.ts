import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SectionComponent } from './section.component';
import { SectionActionsDirective, SectionContentDirective } from './section-content.directive';
import { HeadingComponent } from '../typography/heading/heading.component';
import { ButtonComponent } from '../button/button.component';
import { BodyTextComponent } from '../typography/body-text/body-text.component';
import { IconComponent } from '../icon/icon.component';
import { GridDirective } from '../../directives/grid/grid/grid.directive';
import { FudisInternalErrorSummaryService } from '../../services/form/error-summary/internal-error-summary.service';
import { FudisBreakpointService } from '../../services/breakpoint/breakpoint.service';
import { TooltipDirective } from '../../directives/tooltip/tooltip.directive';
import { FudisTooltipPosition } from '../../types/miscellaneous';
import {
  FudisHeadingLevel,
  FudisHeadingVariant,
  fudisHeadingLevelArray,
  fudisHeadingVariantArray,
} from '../../types/typography';
import { getElement, sortClasses } from '../../utilities/tests/utilities';

@Component({
  selector: 'mock-fudis-section',
  template: `<fudis-section
    [title]="title"
    [titleVariant]="titleVariant"
    [level]="level"
    [classes]="classes"
    [tooltip]="tooltip"
    [tooltipToggle]="tooltipToggle"
    [tooltipPosition]="tooltipPosition"
  >
    <fudis-section-actions>
      <fudis-button [label]="'Some action'"></fudis-button>
    </fudis-section-actions>
    <fudis-section-content>
      <fudis-body-text>Some text content inside section</fudis-body-text>
    </fudis-section-content>
  </fudis-section>`,
})
class MockFudisSectionComponent {
  title: string = 'This is section title';
  titleVariant: FudisHeadingVariant = 'lg';
  level: FudisHeadingLevel = 2;
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
        BodyTextComponent,
        ButtonComponent,
        GridDirective,
        HeadingComponent,
        IconComponent,
        MockFudisSectionComponent,
        SectionComponent,
        SectionActionsDirective,
        SectionContentDirective,
        TooltipDirective,
      ],
      providers: [FudisInternalErrorSummaryService, FudisBreakpointService],
      imports: [MatTooltipModule],
    });

    mockFixture = TestBed.createComponent(MockFudisSectionComponent);
    mockComponent = mockFixture.componentInstance;
    mockFixture.autoDetectChanges();
  });

  function getSectionElement() {
    const sectionEl = getElement(mockFixture, 'section') as HTMLDivElement;
    return sectionEl;
  }

  function sectionTitleVariantCheck(variant: FudisHeadingVariant): void {
    mockComponent.titleVariant = variant;
    mockFixture.detectChanges();

    const sectionHeadingEl = getElement(mockFixture, '.fudis-heading') as HTMLHeadingElement;

    expect(sectionHeadingEl.className).toContain(`fudis-heading__variant__${variant}`);
  }

  function sectionTitleLevelCheck(level: FudisHeadingLevel): void {
    mockComponent.level = level;
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
          'fudis-section fudis-grid fudis-grid__align__start fudis-grid__initial fudis-grid__row-gap__none',
        ),
      );
    });

    it('should add custom CSS classes if given', () => {
      mockComponent.classes = ['my-custom-class other-custom-class'];
      mockFixture.autoDetectChanges();

      expect(sortClasses(getSectionElement().className)).toEqual(
        sortClasses(
          'fudis-section my-custom-class other-custom-class fudis-grid fudis-grid__align__start fudis-grid__initial fudis-grid__row-gap__none',
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

    it('should return correct title variant', () => {
      fudisHeadingVariantArray.forEach((variant) => {
        sectionTitleVariantCheck(variant);
      });
    });

    it('should return correct title level', () => {
      fudisHeadingLevelArray.forEach((level) => {
        sectionTitleLevelCheck(level);
      });
    });
  });

  describe('Content projection', () => {
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
