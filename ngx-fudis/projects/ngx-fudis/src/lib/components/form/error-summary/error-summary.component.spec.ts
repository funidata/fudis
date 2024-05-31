import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorSummaryComponent } from './error-summary.component';
import { FudisErrorSummaryService } from '../../../services/form/error-summary/error-summary.service';
import { FormComponent } from '../form/form.component';
import { FudisValidators } from '../../../utilities/form/validators';
import { ActionsDirective } from '../../../directives/content-projection/actions/actions.directive';
import { BodyTextComponent } from '../../typography/body-text/body-text.component';
import { ButtonComponent } from '../../button/button.component';
import { ContentDirective } from '../../../directives/content-projection/content/content.directive';
import { FieldSetComponent } from '../fieldset/fieldset.component';
import { HeaderDirective } from '../../../directives/content-projection/header/header.directive';
import { GridDirective } from '../../../directives/grid/grid/grid.directive';
import { FudisBreakpointService } from '../../../services/breakpoint/breakpoint.service';
import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';
import { FudisGridService } from '../../../services/grid/grid.service';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { GridComponent } from '../../grid/grid/grid.component';
import { IconComponent } from '../../icon/icon.component';
import { LinkComponent } from '../../link/link.component';
import { NotificationComponent } from '../../notification/notification.component';
import { HeadingComponent } from '../../typography/heading/heading.component';
import { ValidatorErrorMessageComponent } from '../error-message/validator-error-message/validator-error-message.component';
import { GuidanceComponent } from '../guidance/guidance.component';
import { LabelComponent } from '../label/label.component';
import { TextInputComponent } from '../text-input/text-input.component';
import { SpacingDirective } from '../../../directives/spacing/spacing.directive';
import { SectionComponent } from '../../section/section.component';
import { ExpandableComponent } from '../../expandable/expandable.component';
import { FudisFormErrorSummaryLink } from '../../../types/forms';
import { LinkDirective } from '../../../directives/link/link.directive';

@Component({
  selector: 'fudis-mock-form-component',
  template: ` <fudis-form
    #formRef
    [titleLevel]="1"
    [title]="'Example Form with Error Summary'"
    [id]="'unique-form-example-1'"
    [errorSummaryLinkType]="errorSummaryLinkType"
    [errorSummaryHelpText]="'There were errors you need to fix'"
    [errorSummaryVisible]="errorSummaryVisible"
  >
    <ng-template fudisContent type="form">
      <fudis-fieldset [label]="'Form information'">
        <ng-template fudisContent type="fieldset">
          <fudis-text-input
            [control]="formGroup.controls.name"
            [label]="'Name'"
            [helpText]="'We need to know who you are'"
          />
          <fudis-text-input
            [control]="formGroup.controls.email"
            [label]="'Contact email'"
            [helpText]="'So that we can contact you'"
          />
        </ng-template>
      </fudis-fieldset>
      <fudis-section [errorSummaryBreadcrumb]="true" [title]="'Section title'">
        <ng-template fudisContent type="section">
          <fudis-text-input [control]="formGroup.controls.section" [label]="'Section input'" />
        </ng-template>
      </fudis-section>
      <fudis-expandable
        [closed]="false"
        [errorSummaryBreadcrumb]="true"
        [title]="'Expandable title'"
      >
        <ng-template fudisContent type="expandable">
          <fudis-text-input
            [control]="formGroup.controls.expandable"
            [label]="'Expandable input'"
          />
        </ng-template>
      </fudis-expandable>
    </ng-template>
  </fudis-form>`,
})
class MockFormComponent {
  constructor(public errorSummaryService: FudisErrorSummaryService) {}

  @ViewChild('formRef') formRef: FormComponent;

  errorSummaryLinkType: FudisFormErrorSummaryLink;

  errorSummaryVisible: boolean = false;

  formGroup = new FormGroup({
    name: new FormControl<string | null>(null, FudisValidators.required('Missing your name')),
    email: new FormControl<string | null>(null, FudisValidators.required('Missing email contact')),
    section: new FormControl<string | null>(
      'short',
      FudisValidators.minLength(10, 'Too short input'),
    ),
    expandable: new FormControl<string | null>('test', FudisValidators.email('Not an email')),
  });

  reloadErrors(): void {
    this.formGroup.markAllAsTouched();
    this.errorSummaryVisible = true;
    this.errorSummaryService.reloadFormErrors('unique-form-example-1');
  }
}

const getErrorList = (fixture: ComponentFixture<MockFormComponent>): NodeList | null => {
  const errors: NodeList = fixture.nativeElement.querySelectorAll(
    'ul.fudis-error-summary__error-list li.fudis-error-summary__error-list__item',
  );

  return errors;
};

describe('ErrorSummaryComponent', () => {
  let wrapperComponent: MockFormComponent;
  let wrapperFixture: ComponentFixture<MockFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ActionsDirective,
        BodyTextComponent,
        ButtonComponent,
        ContentDirective,
        ExpandableComponent,
        ErrorSummaryComponent,
        FieldSetComponent,
        FormComponent,
        GridDirective,
        GridComponent,
        GuidanceComponent,
        HeaderDirective,
        HeadingComponent,
        IconComponent,
        LabelComponent,
        LinkComponent,
        LinkDirective,
        MockFormComponent,
        NotificationComponent,
        SectionComponent,
        SpacingDirective,
        TextInputComponent,
        ValidatorErrorMessageComponent,
      ],
      providers: [
        FudisInternalErrorSummaryService,
        FudisGridService,
        FudisIdService,
        FudisBreakpointService,
        FudisTranslationService,
      ],
      imports: [ReactiveFormsModule, RouterModule.forRoot([])],
    }).compileComponents();

    wrapperFixture = TestBed.createComponent(MockFormComponent);
    wrapperComponent = wrapperFixture.componentInstance;
    wrapperComponent.errorSummaryLinkType = 'router';
    wrapperComponent.errorSummaryService.setUpdateStrategy('reloadOnly');
    wrapperFixture.autoDetectChanges();
    wrapperComponent.reloadErrors();
  });

  describe('Contents', () => {
    it('helper texts are displayed properly', () => {
      const renderedHelpText = wrapperFixture.nativeElement.querySelector('fudis-body-text p');

      // Hidden icon text + Help Text
      expect(renderedHelpText.textContent).toBe(
        'Attention:\u00A0There were errors you need to fix',
      );
    });

    it('should have Fudis Link attributes correctly with router link', () => {
      const linkElementFragment = wrapperFixture.nativeElement
        .querySelector('ul li fudis-link a')
        .getAttribute('ng-reflect-fragment');

      const linkElementHref = wrapperFixture.nativeElement
        .querySelector('ul li fudis-link a')
        .getAttribute('href');

      expect(linkElementFragment).toEqual('fudis-text-input-1');
      expect(linkElementHref).toEqual('/#fudis-text-input-1');
    });

    it('should have Fudis Link attributes correctly with href link', () => {
      wrapperComponent.errorSummaryLinkType = 'href';
      wrapperFixture.detectChanges();

      const linkElementFragment = wrapperFixture.nativeElement
        .querySelector('ul li fudis-link a')
        .getAttribute('ng-reflect-fragment');

      const linkElementHref = wrapperFixture.nativeElement
        .querySelector('ul li fudis-link a')
        .getAttribute('href');

      expect(linkElementFragment).toEqual(null);
      expect(linkElementHref).toEqual('#fudis-text-input-1');
    });

    it('should remove errors dynamically without reload', () => {
      wrapperComponent.errorSummaryService.setUpdateStrategy('onRemove');
      wrapperFixture.detectChanges();
      wrapperComponent.formGroup.controls.name.patchValue('Chewbacca');
      wrapperFixture.detectChanges();

      expect(getErrorList(wrapperFixture)?.length).toEqual(3);
    });

    it('should add & remove errors dynamically without reload', () => {
      wrapperComponent.errorSummaryService.setUpdateStrategy('all');
      wrapperFixture.detectChanges();
      wrapperComponent.formGroup.controls.name.patchValue('Chewbacca');
      wrapperFixture.detectChanges();

      expect(getErrorList(wrapperFixture)?.length).toEqual(3);

      wrapperComponent.formGroup.controls.name.patchValue(null);
      wrapperFixture.detectChanges();

      expect(getErrorList(wrapperFixture)?.length).toEqual(4);
    });

    it('error list have right amount of list elements', () => {
      expect(getErrorList(wrapperFixture)?.length).toEqual(4);
    });

    it('error list have right messages', () => {
      const errorList = wrapperFixture.nativeElement.querySelectorAll(
        'ul.fudis-error-summary__error-list li.fudis-error-summary__error-list__item',
      );

      const firstMessage = errorList[0].textContent;
      const secondMessage = errorList[1].textContent;
      const thirdMessage = errorList[2].textContent;
      const forthMessage = errorList[3].textContent;

      expect(firstMessage).toEqual('Form information / Name: Missing your name');
      expect(secondMessage).toEqual('Form information / Contact email: Missing email contact');
      expect(thirdMessage).toEqual('Section title / Section input: Too short input');
      expect(forthMessage).toEqual('Expandable title / Expandable input: Not an email');
    });

    it('should update error messages when control is updated and errors loaded', () => {
      wrapperComponent.formGroup.controls.name.patchValue('Chewbacca!');
      wrapperFixture.detectChanges();
      wrapperComponent.reloadErrors();
      wrapperFixture.detectChanges();

      expect(getErrorList(wrapperFixture)?.length).toEqual(3);
    });

    it('should not update error messages without reload', () => {
      wrapperComponent.formGroup.controls.name.patchValue('Chewbacca');
      wrapperFixture.detectChanges();

      expect(getErrorList(wrapperFixture)?.length).toEqual(4);

      wrapperComponent.reloadErrors();
      wrapperFixture.detectChanges();

      expect(getErrorList(wrapperFixture)?.length).toEqual(3);
    });
  });
});
