import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form.component';
import { HeadingComponent } from '../../typography/heading/heading.component';
import { BodyTextComponent } from '../../typography/body-text/body-text.component';
import { GridDirective } from '../../../directives/grid/grid/grid.directive';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisGridService } from '../../../services/grid/grid.service';
import { FudisBreakpointService } from '../../../services/breakpoint/breakpoint.service';
import { FudisValidators } from '../../../utilities/form/validators';
import { FudisErrorSummaryService } from '../../../services/form/error-summary/error-summary.service';
import { ActionsDirective } from '../../../directives/content-projection/actions/actions.directive';
import { ContentDirective } from '../../../directives/content-projection/content/content.directive';
import { HeaderDirective } from '../../../directives/content-projection/header/header.directive';
import { SpacingDirective } from '../../../directives/spacing/spacing.directive';
import { IconComponent } from '../../icon/icon.component';
import { ValidatorErrorMessageComponent } from '../error-message/validator-error-message/validator-error-message.component';
import { ErrorSummaryComponent } from '../error-summary/error-summary.component';
import { GuidanceComponent } from '../guidance/guidance.component';
import { LabelComponent } from '../label/label.component';
import { TextInputComponent } from '../text-input/text-input.component';
import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';
import { getElement, getTrimmedTextContent } from '../../../utilities/tests/utilities';
import { BadgeComponent } from '../../badge/badge.component';
import { FudisBadgeVariant } from '../../../types/miscellaneous';
import { LinkDirective } from '../../../directives/link/link.directive';
import { NotificationComponent } from '../../notification/notification.component';
import { LinkComponent } from '../../link/link.component';

@Component({
  selector: 'fudis-mock-form-component',
  template: `<fudis-form
    [id]="'my-own-id'"
    [titleLevel]="1"
    [titleSize]="'md'"
    [title]="'Example Form'"
    [helpText]="'Some help for the form'"
    [badge]="badge"
    [badgeText]="badgeText"
    [errorSummaryLinkType]="'href'"
    [errorSummaryHelpText]="'There were errors you need to fix'"
    [errorSummaryVisible]="errorSummaryVisible"
  >
    <ng-template fudisContent type="form">
      <fudis-text-input
        [control]="formGroup.controls.name"
        [label]="'Name'"
        [helpText]="'We need to know who you are'"
      />
    </ng-template>
    <ng-template fudisHeader>
      <p class="test-header-content">This is header content</p>
    </ng-template>
    <ng-template fudisActions type="form">
      <p class="test-actions-content">This is actions content</p>
    </ng-template>
    <p class="test-do-not-find">You should not find me</p>
  </fudis-form>`,
})
class MockFormComponent {
  constructor(public errorSummaryService: FudisErrorSummaryService) {}

  errorSummaryVisible: boolean = false;
  badge: FudisBadgeVariant | null = null;
  badgeText: string | null = null;

  formGroup = new FormGroup({
    name: new FormControl<string | null>(null, FudisValidators.required('Missing your name')),
  });

  public reloadErrorsMock(): void {
    this.formGroup.markAllAsTouched();
    this.errorSummaryVisible = true;
    this.errorSummaryService.reloadFormErrors('my-own-id');
  }
}

describe('FormComponent', () => {
  let componentMock: MockFormComponent;
  let fixtureMock: ComponentFixture<MockFormComponent>;
  let formElement: HTMLFormElement;
  let errorSummaryElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ActionsDirective,
        BadgeComponent,
        BodyTextComponent,
        ContentDirective,
        ErrorSummaryComponent,
        FormComponent,
        GridDirective,
        GuidanceComponent,
        HeaderDirective,
        HeadingComponent,
        IconComponent,
        LabelComponent,
        LinkComponent,
        LinkDirective,
        MockFormComponent,
        NotificationComponent,
        SpacingDirective,
        TextInputComponent,
        ValidatorErrorMessageComponent,
      ],
      providers: [
        FudisBreakpointService,
        FudisGridService,
        FudisIdService,
        FudisInternalErrorSummaryService,
      ],
      imports: [ReactiveFormsModule],
    });
    fixtureMock = TestBed.createComponent(MockFormComponent);
    componentMock = fixtureMock.componentInstance;
    fixtureMock.detectChanges();
  });

  describe('Wrapper form element HTML attributes', () => {
    beforeEach(() => {
      formElement = getElement(fixtureMock, 'form') as HTMLFormElement;
    });

    it('should have native form element present', () => {
      expect(formElement).toBeTruthy();
    });

    it('should have id constructed through Fudis id service', () => {
      expect(formElement.id).toEqual('my-own-id');
    });

    it('should have aria-describedby constructed with form id', () => {
      expect(formElement.getAttribute('aria-describedby')).toEqual('my-own-id_header');
    });

    it('should have default CSS class for fudis-form', () => {
      expect(formElement.className).toContain('fudis-form');
    });

    it('should have default CSS classes coming from fudisGrid directive', () => {
      const classesFromGrid =
        'fudis-grid fudis-grid__xxl fudis-grid__align__start fudis-grid__margin__top__none fudis-grid__margin__bottom__none fudis-grid__row-gap__none';

      expect(formElement.className).toContain(classesFromGrid);
    });
  });

  describe('Component inputs', () => {
    it('should have helpText visible is given', () => {
      const titleElement = getElement(fixtureMock, '.fudis-form__header__title');
      const helpTextElement = titleElement.querySelector('fudis-body-text');

      expect(helpTextElement?.textContent).toEqual('Some help for the form');
    });

    it('should have respective heading attributes as given', () => {
      const headingElement = formElement.querySelector('fudis-heading');
      const headingContent = headingElement?.querySelector('h1');

      expect(headingElement).toBeTruthy();
      expect(headingContent).toBeTruthy();
      expect(getTrimmedTextContent(headingContent as HTMLElement)).toEqual('Example Form');
      expect(headingContent?.className).toContain('fudis-heading__size__md');
    });

    it('should have badge and badgeText if given', () => {
      componentMock.badge = 'secondary';
      componentMock.badgeText = 'Form badge';
      fixtureMock.detectChanges();

      const badgeElement = getElement(fixtureMock, 'fudis-badge');
      const badgeContent = getElement(
        fixtureMock,
        '.fudis-form__header__title__badge .fudis-badge',
      );

      expect(badgeElement).toBeTruthy();
      expect(getTrimmedTextContent(badgeContent as HTMLSpanElement)).toEqual('Form badge');
    });
  });

  describe('Error Summary', () => {
    beforeEach(() => {
      errorSummaryElement = getElement(
        fixtureMock,
        '.fudis-form__header__main__content fudis-error-summary fudis-notification',
      );
    });

    it('should not be visible when errorSummaryVisible is false', () => {
      expect(errorSummaryElement).toBeFalsy();
    });

    it('should be visible when errorSummaryVisible is true and form has errors', () => {
      componentMock.reloadErrorsMock();
      fixtureMock.detectChanges();

      const errorSummaryElement = getElement(
        fixtureMock,
        '.fudis-form__header__main__content fudis-error-summary',
      );

      expect(errorSummaryElement).toBeTruthy();
    });

    it('should not be visible when errorSummaryVisible is false and form has errors', () => {
      componentMock.reloadErrorsMock();
      componentMock.errorSummaryVisible = false;
      fixtureMock.detectChanges();

      expect(errorSummaryElement).toBeFalsy();
    });
  });

  describe('Content directives', () => {
    it('should have form header content', () => {
      const headerContentDiv = getElement(fixtureMock, '.fudis-form__header__main__content');
      const headerContent = getElement(fixtureMock, '.test-header-content');

      expect(headerContentDiv).toBeTruthy();
      expect(headerContent.textContent).toEqual('This is header content');
    });

    it('should have form actions content', () => {
      const actionsContentDiv = getElement(fixtureMock, '.fudis-form__header__actions');
      const actionsContent = getElement(fixtureMock, '.test-actions-content');

      expect(actionsContentDiv).toBeTruthy();
      expect(actionsContent.textContent).toEqual('This is actions content');
    });

    it('should have form content', () => {
      const contentDiv = getElement(fixtureMock, '.fudis-form__content');

      expect(contentDiv).toBeTruthy();
    });

    it('should not find elements without proper content type', () => {
      const incorrectElement = getElement(fixtureMock, '.test-do-not-find');

      expect(incorrectElement).toBeNull();
    });
  });
});

// TODO: add tests for Form inside dialog
