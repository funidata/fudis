import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeComponent } from '../badge/badge.component';
import { BodyTextComponent } from '../typography/body-text/body-text.component';
import { ButtonComponent } from '../button/button.component';
import { By } from '@angular/platform-browser';
import { IconComponent } from '../icon/icon.component';
import { ErrorSummaryComponent } from '../form/error-summary/error-summary.component';
import {
  ExpandableActionsDirective,
  ExpandableContentDirective,
} from './expandable-content.directive';
import { ExpandableComponent } from './expandable.component';
import { FieldSetComponent } from '../form/fieldset/fieldset.component';
import { FieldsetContentDirective } from '../form/fieldset/fieldset-content.directive';
import { FormComponent } from '../form/form/form.component';
import {
  FormActionsDirective,
  FormContentDirective,
  FormHeaderDirective,
} from '../form/form/form-content.directive';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormSubmitDirective } from '../../directives/form/form-actions/form-actions.directive';
import {
  FudisBadgeVariant,
  fudisBadgeVariantArray,
  FudisExpandableType,
} from '../../types/miscellaneous';
import { FudisBreakpointService } from '../../services/breakpoint/breakpoint.service';
import { FudisErrorSummaryService } from '../../services/form/error-summary/error-summary.service';
import { fudisHeadingLevelArray } from '../../types/typography';
import { FudisInternalErrorSummaryService } from '../../services/form/error-summary/internal-error-summary.service';
import { FudisValidators } from '../../utilities/form/validators';
import { getElement } from '../../utilities/tests/utilities';
import { GridDirective } from '../../directives/grid/grid/grid.directive';
import { GuidanceComponent } from '../form/guidance/guidance.component';
import { HeadingComponent } from '../typography/heading/heading.component';
import { LabelComponent } from '../form/label/label.component';
import { LinkDirective } from '../../directives/link/link.directive';
import { NotificationComponent } from '../notification/notification.component';
import { RouterModule } from '@angular/router';
import { SectionComponent } from '../section/section.component';
import { SectionContentDirective } from '../section/section-content.directive';
import { TextInputComponent } from '../form/text-input/text-input.component';
import { ValidatorErrorMessageComponent } from '../form/error-message/validator-error-message/validator-error-message.component';

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

@Component({
  selector: 'fudis-mock-form-component',
  template: `<fudis-form
    [id]="'my-own-id'"
    [level]="1"
    [title]="'Form title'"
    [errorSummaryTitle]="'There were errors you need to fix'"
    [errorSummaryVisible]="errorSummaryVisible"
  >
    <fudis-form-content>
      <fudis-expandable
        #testExpandable
        [closed]="false"
        [errorSummaryBreadcrumb]="errorSummaryBreadcrumb"
        [title]="title"
      >
        <ng-template fudisExpandableContent>
          <fudis-text-input
            [control]="formGroup.controls.name"
            [label]="'Name'"
            [helpText]="'We need to know who you are'"
          />
        </ng-template>
      </fudis-expandable>
    </fudis-form-content>
    <fudis-form-actions>
      <fudis-button fudisFormSubmit [formValid]="formGroup.valid" [label]="'Submit'" />
    </fudis-form-actions>
  </fudis-form>`,
})
class MockFormComponent {
  @ViewChild('testExpandable') testExpandable: ExpandableComponent;

  title: string = 'Expandable test title';

  formGroup = new FormGroup({
    name: new FormControl<string | null>(null, FudisValidators.required('Missing your name')),
  });

  errorSummaryVisible: boolean = false;
  errorSummaryBreadcrumb: boolean;
}

describe('ExpandableComponent', () => {
  let component: ExpandableComponent;
  let containerComponent: MockContainerComponent;
  let fixture: ComponentFixture<MockContainerComponent> | ComponentFixture<ExpandableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BadgeComponent,
        BodyTextComponent,
        ButtonComponent,
        ErrorSummaryComponent,
        ExpandableActionsDirective,
        ExpandableComponent,
        ExpandableContentDirective,
        FieldSetComponent,
        FieldsetContentDirective,
        FormActionsDirective,
        FormComponent,
        FormContentDirective,
        FormHeaderDirective,
        FormSubmitDirective,
        GridDirective,
        GuidanceComponent,
        HeadingComponent,
        IconComponent,
        LabelComponent,
        LinkDirective,
        MockContainerComponent,
        MockContentComponent,
        MockFormComponent,
        NotificationComponent,
        SectionComponent,
        SectionContentDirective,
        TextInputComponent,
        ValidatorErrorMessageComponent,
      ],
      providers: [
        FudisBreakpointService,
        FudisErrorSummaryService,
        FudisInternalErrorSummaryService,
      ],
      imports: [ReactiveFormsModule, RouterModule.forRoot([])],
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

    const svg = fixture.debugElement.query(By.css('fudis-icon svg'));
    const elem = svg.nativeElement as HTMLElement;
    const componentClasses = elem.getAttribute('class');

    if (variant === 'regular') {
      expect(svg.nativeElement.getAttribute('id')).toEqual('chevron-ring-fill');
      expect(componentClasses).toContain('fudis-icon__color__gray-dark');
    }

    if (variant === 'lite') {
      expect(svg.nativeElement.getAttribute('id')).toEqual('chevron');
      expect(componentClasses).toContain('fudis-icon__color__primary');
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

  describe('expandable with error summary', () => {
    let errorService: FudisInternalErrorSummaryService;
    let component: MockFormComponent;
    let fixture: ComponentFixture<MockFormComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(MockFormComponent);
      component = fixture.componentInstance;
      errorService = TestBed.inject(FudisInternalErrorSummaryService);
      jest.spyOn(errorService, 'addSection').mockImplementation(() => {});
      jest.spyOn(errorService, 'removeSection').mockImplementation(() => {});
      fixture.detectChanges();
    });

    it('should add section to error summary if errorSummaryBreadcrumb is true', async () => {
      expect(errorService.addSection).not.toHaveBeenCalled();

      component.errorSummaryBreadcrumb = true;

      fixture.detectChanges();
      await fixture.whenStable();

      expect(errorService.addSection).toHaveBeenCalledWith({
        formId: 'my-own-id',
        id: 'fudis-expandable-2',
        title: 'Expandable test title',
      });
    });

    it('should add section to error summary if errorSummaryBreadcrumb is true and title is updated', async () => {
      expect(errorService.addSection).not.toHaveBeenCalled();

      component.errorSummaryBreadcrumb = true;
      component.title = 'New test title';

      fixture.detectChanges();
      await fixture.whenStable();

      expect(errorService.addSection).toHaveBeenCalledWith({
        formId: 'my-own-id',
        id: 'fudis-expandable-2',
        title: 'New test title',
      });
    });

    it('should remove section to error summary if errorSummaryBreadcrumb is false', async () => {
      expect(errorService.addSection).not.toHaveBeenCalled();

      component.errorSummaryBreadcrumb = true;

      fixture.detectChanges();
      await fixture.whenStable();

      expect(errorService.addSection).toHaveBeenCalledWith({
        formId: 'my-own-id',
        id: 'fudis-expandable-2',
        title: 'Expandable test title',
      });

      component.errorSummaryBreadcrumb = false;

      fixture.detectChanges();
      await fixture.whenStable();

      expect(errorService.removeSection).toHaveBeenCalledWith('my-own-id', 'fudis-expandable-2');
    });

    it('when destroyed, should remove section from error summary if error summary info is sent', async () => {
      component.testExpandable.ngOnDestroy();

      expect(errorService.removeSection).not.toHaveBeenCalled();

      component.errorSummaryBreadcrumb = true;

      fixture.detectChanges();
      await fixture.whenStable();

      component.testExpandable.ngOnDestroy();

      expect(errorService.removeSection).toHaveBeenCalledWith('my-own-id', 'fudis-expandable-2');
    });
  });
});
