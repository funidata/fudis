import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form.component';
import { HeadingComponent } from '../../typography/heading/heading.component';
import { BodyTextComponent } from '../../typography/body-text/body-text.component';
import { GridDirective } from '../../../directives/grid/grid/grid.directive';
import {
  FormActionsDirective,
  FormContentDirective,
  FormHeaderDirective,
} from './form-content.directive';
import { FudisBreakpointService } from '../../../services/breakpoint/breakpoint.service';
import { FudisValidators } from '../../../utilities/form/validators';
import { FudisErrorSummaryService } from '../../../services/form/error-summary/error-summary.service';
import { IconComponent } from '../../icon/icon.component';
import { ValidatorErrorMessageComponent } from '../error-message/validator-error-message/validator-error-message.component';
import { ErrorSummaryComponent } from '../error-summary/error-summary.component';
import { GuidanceComponent } from '../guidance/guidance.component';
import { LabelComponent } from '../label/label.component';
import { TextInputComponent } from '../text-input/text-input.component';
import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';
import { getElement } from '../../../utilities/tests/utilities';
import { BadgeComponent } from '../../badge/badge.component';
import { FudisBadgeVariant } from '../../../types/miscellaneous';
import { LinkDirective } from '../../../directives/link/link.directive';
import { NotificationComponent } from '../../notification/notification.component';
import { FudisDialogService } from '../../../services/dialog/dialog.service';
import { DialogComponent } from '../../dialog/dialog.component';
import { DialogContentDirective, DialogTitleDirective } from '../../dialog/dialog-directives';
import { AlertGroupComponent } from '../../alert/alert-group/alert-group.component';
import { FudisAlertService } from '../../../services/alert/alert.service';
import { ButtonComponent } from '../../button/button.component';
import { FormSubmitDirective } from '../../../directives/form/form-actions/form-actions.directive';

/**
 * Basic Form example
 */
@Component({
  standalone: false,
  selector: 'fudis-mock-form-component',
  template: `<fudis-form
    [id]="'my-own-id'"
    [titleVariant]="'md'"
    [level]="1"
    [title]="'Example Form'"
    [helpText]="'Some help for the form'"
    [badge]="badge"
    [badgeText]="badgeText"
    [errorSummaryTitle]="'There were errors you need to fix'"
    [errorSummaryVisible]="errorSummaryVisible"
  >
    <fudis-form-header>
      <p class="test-header-content">This is header content</p>
    </fudis-form-header>
    <fudis-form-content>
      <p class="test-form-content">This is form content</p>
      <fudis-text-input [control]="formGroup.controls.name" [label]="'Name'" />
    </fudis-form-content>
    <fudis-form-actions>
      <p class="test-actions-content">This is actions content</p>
    </fudis-form-actions>
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

/**
 * Form inside Dialog example
 */
@Component({
  standalone: false,
  selector: 'mock-dialog-with-form',
  template: `
    <fudis-dialog>
      <fudis-dialog-content>
        <fudis-form
          [title]="'Dialog with Form'"
          [level]="1"
          [errorSummaryVisible]="errorSummaryVisible"
        >
          <fudis-form-content>
            <fudis-text-input
              [label]="'What is your name?'"
              [control]="exampleFormGroup.controls.name"
            />
          </fudis-form-content>
          <fudis-form-actions>
            <p class="test-actions-content">This is actions content</p>
          </fudis-form-actions>
        </fudis-form>
      </fudis-dialog-content>
    </fudis-dialog>
  `,
})
class ExampleDialogWithFormComponent {
  errorSummaryVisible: boolean = false;
  exampleFormGroup = new FormGroup({
    name: new FormControl<string | null>(null, FudisValidators.required('State your name')),
  });
}

describe('FormComponent', () => {
  let componentMock: MockFormComponent;
  let fixtureMock: ComponentFixture<MockFormComponent>;
  let formInsideDialogComponent: ExampleDialogWithFormComponent;
  let formInsideDialogFixture: ComponentFixture<ExampleDialogWithFormComponent>;
  let formElement: HTMLFormElement;
  let errorSummaryElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlertGroupComponent,
        BadgeComponent,
        BodyTextComponent,
        ButtonComponent,
        DialogComponent,
        DialogContentDirective,
        DialogTitleDirective,
        ErrorSummaryComponent,
        ExampleDialogWithFormComponent,
        FormComponent,
        FormActionsDirective,
        FormContentDirective,
        FormHeaderDirective,
        FormSubmitDirective,
        GridDirective,
        GuidanceComponent,
        HeadingComponent,
        IconComponent,
        LabelComponent,
        LinkDirective,
        MockFormComponent,
        NotificationComponent,
        TextInputComponent,
        ValidatorErrorMessageComponent,
      ],
      providers: [
        FudisAlertService,
        FudisBreakpointService,
        FudisDialogService,
        FudisInternalErrorSummaryService,
        FudisErrorSummaryService,
      ],
      imports: [ReactiveFormsModule],
    });
    TestBed.runInInjectionContext(() => {
      fixtureMock = TestBed.createComponent(MockFormComponent);
      componentMock = fixtureMock.componentInstance;
      fixtureMock.detectChanges();

      formInsideDialogFixture = TestBed.createComponent(ExampleDialogWithFormComponent);
      formInsideDialogComponent = formInsideDialogFixture.componentInstance;
      formInsideDialogFixture.detectChanges();
    });
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
      expect(formElement.className).toContain('fudis-form fudis-form__default');
    });

    it('should have default CSS classes coming from fudisGrid directive', () => {
      const classesFromGrid =
        'fudis-grid fudis-grid__xxl fudis-grid__align__start fudis-grid__row-gap__none';

      expect(formElement.className).toContain(classesFromGrid);
    });
  });

  describe('Component inputs', () => {
    it('should have helpText visible if given', () => {
      const titleElement = getElement(fixtureMock, '.fudis-form__header__title');
      const helpTextElement = titleElement.querySelector('fudis-body-text');

      expect(helpTextElement?.textContent).toEqual('Some help for the form');
    });

    it('should have respective heading attributes as given', () => {
      const headingElement = formElement.querySelector('fudis-heading');
      const headingContent = headingElement?.querySelector('h1');

      expect(headingElement).toBeTruthy();
      expect(headingContent).toBeTruthy();
      expect(headingContent?.textContent).toEqual('Example Form');
      expect(headingContent?.className).toContain('fudis-heading__variant__md');
    });

    it('should have badge and badgeText visible if given', () => {
      componentMock.badge = 'secondary';
      componentMock.badgeText = 'Form badge';
      fixtureMock.detectChanges();

      const badgeElement = getElement(fixtureMock, 'fudis-badge');
      const badgeContent = getElement(
        fixtureMock,
        '.fudis-form__header__title__badge .fudis-badge',
      );

      expect(badgeElement).toBeTruthy();
      expect(badgeContent.textContent).toEqual('Form badge');
    });
  });

  describe('Error Summary', () => {
    beforeEach(() => {
      errorSummaryElement = getElement(
        fixtureMock,
        '.fudis-form__header__main fudis-error-summary',
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
        '.fudis-form__header__main fudis-error-summary',
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
      const headerSelector = getElement(fixtureMock, 'fudis-form-header');
      const headerContent = getElement(fixtureMock, '.test-header-content');

      expect(headerSelector).toBeTruthy();
      expect(headerContent.textContent).toEqual('This is header content');
    });

    it('should have form actions content', () => {
      const actionsSelector = getElement(fixtureMock, 'fudis-form-actions');
      const actionsContent = getElement(fixtureMock, '.test-actions-content');

      expect(actionsSelector).toBeTruthy();
      expect(actionsContent.textContent).toEqual('This is actions content');
    });

    it('should have form content', () => {
      const contentSelector = getElement(fixtureMock, 'fudis-form-content');
      const formContent = getElement(fixtureMock, '.test-form-content');

      expect(contentSelector).toBeTruthy();
      expect(formContent.textContent).toEqual('This is form content');
    });

    it('should not find elements without proper content selector', () => {
      const incorrectElement = getElement(fixtureMock, '.test-do-not-find');

      expect(incorrectElement).toBeNull();
    });
  });

  describe('Inside Dialog', () => {
    beforeEach(() => {
      const dialogContent = getElement(formInsideDialogFixture, 'fudis-dialog-content');
      formElement = dialogContent.querySelector('form') as HTMLFormElement;
    });

    it('should have native form element inside dialog content', () => {
      expect(formElement).toBeTruthy();
    });

    it('should have default CSS class for form inside dialog', () => {
      expect(formElement.className).toContain('fudis-form fudis-form__dialog');
    });

    it('should have id constructed through Fudis id service', () => {
      expect(formElement.id).toEqual('fudis-form-2');
    });

    it('should have aria-describedby constructed with form id', () => {
      expect(formElement.getAttribute('aria-describedby')).toEqual('fudis-form-2_header');
    });

    it('should have dialog title directive in form header', () => {
      const dialogHeading = formElement.querySelector('fudis-heading');
      const dialogTitleDirective = formInsideDialogFixture.debugElement.query(
        By.directive(DialogTitleDirective),
      );

      expect(dialogHeading?.className).toContain('fudis-form__header__title__dialog');
      expect(dialogTitleDirective).toBeTruthy();
    });

    it('should show error summary inside form content wrapper instead of form header', () => {
      formInsideDialogComponent.errorSummaryVisible = true;
      formInsideDialogFixture.detectChanges();

      const errorSummaryElement = getElement(
        formInsideDialogFixture,
        '.fudis-form__content-wrapper fudis-error-summary',
      );

      expect(errorSummaryElement).toBeTruthy();
    });
  });
});
