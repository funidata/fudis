import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorSummaryComponent } from './error-summary.component';
import { FudisErrorSummaryService } from '../../../services/form/error-summary/error-summary.service';
import { FormComponent } from '../form/form.component';
import { FudisValidators } from '../../../utilities/form/validators';
import { BodyTextComponent } from '../../typography/body-text/body-text.component';
import { ButtonComponent } from '../../button/button.component';
import { FieldSetComponent } from '../fieldset/fieldset.component';
import { GridDirective } from '../../../directives/grid/grid/grid.directive';
import { FudisBreakpointService } from '../../../services/breakpoint/breakpoint.service';
import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';
import { GridComponent } from '../../grid/grid/grid.component';
import { IconComponent } from '../../icon/icon.component';
import { NotificationComponent } from '../../notification/notification.component';
import { HeadingComponent } from '../../typography/heading/heading.component';
import { ValidatorErrorMessageComponent } from '../error-message/validator-error-message/validator-error-message.component';
import { GuidanceComponent } from '../guidance/guidance.component';
import { LabelComponent } from '../label/label.component';
import { TextInputComponent } from '../text-input/text-input.component';
import { SectionComponent } from '../../section/section.component';
import { ExpandableComponent } from '../../expandable/expandable.component';
import { LinkDirective } from '../../../directives/link/link.directive';
import { getElement } from '../../../utilities/tests/utilities';
import { FieldsetContentDirective } from '../fieldset/fieldset-content.directive';
import { SectionContentDirective } from '../../section/section-content.directive';
import { FormContentDirective } from '../form/form-content.directive';
import { ExpandableContentDirective } from '../../expandable/expandable-content.directive';

@Component({
  selector: 'fudis-mock-form-component',
  template: ` <fudis-form
    #formRef
    [level]="1"
    [title]="'Example Form with Error Summary'"
    [id]="'unique-form-example-1'"
    [errorSummaryVisible]="errorSummaryVisible"
    [errorSummaryTitle]="errorSummaryTitle"
  >
    <fudis-form-content>
      <fudis-fieldset [label]="'Form information'">
        <fudis-fieldset-content>
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
        </fudis-fieldset-content>
      </fudis-fieldset>
      <fudis-section [errorSummaryBreadcrumb]="true" [title]="'Section title'" [level]="2">
        <fudis-section-content>
          <fudis-text-input [control]="formGroup.controls.section" [label]="'Section input'" />
        </fudis-section-content>
      </fudis-section>
      <fudis-expandable
        [closed]="false"
        [errorSummaryBreadcrumb]="true"
        [title]="'Expandable title'"
      >
        <ng-template fudisExpandableContent>
          <fudis-text-input
            [control]="formGroup.controls.expandable"
            [label]="'Expandable input'"
          />
        </ng-template>
      </fudis-expandable>
    </fudis-form-content>
  </fudis-form>`,
})
class MockFormComponent {
  constructor(public errorSummaryService: FudisErrorSummaryService) {}

  @ViewChild('formRef') formRef: FormComponent;

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

const errorList3 = [
  'Expandable title / Expandable input: Not an email',
  'Form information / Contact email: Missing email contact',
  'Section title / Section input: Too short input',
];

const errorList4 = [
  'Expandable title / Expandable input: Not an email',
  'Form information / Contact email: Missing email contact',
  'Form information / Name: Missing your name',
  'Section title / Section input: Too short input',
];

describe('ErrorSummaryComponent', () => {
  let wrapperComponent: MockFormComponent;
  let wrapperFixture: ComponentFixture<MockFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BodyTextComponent,
        ButtonComponent,
        ExpandableComponent,
        ExpandableContentDirective,
        ErrorSummaryComponent,
        FieldSetComponent,
        FieldsetContentDirective,
        FormComponent,
        GridDirective,
        GridComponent,
        GuidanceComponent,
        FormContentDirective,
        HeadingComponent,
        IconComponent,
        LabelComponent,
        LinkDirective,
        MockFormComponent,
        NotificationComponent,
        SectionComponent,
        SectionContentDirective,
        TextInputComponent,
        ValidatorErrorMessageComponent,
      ],
      providers: [
        FudisInternalErrorSummaryService,
        FudisBreakpointService,
        FudisErrorSummaryService,
      ],
      imports: [ReactiveFormsModule, RouterModule.forRoot([])],
    }).compileComponents();

    TestBed.runInInjectionContext(() => {
      wrapperFixture = TestBed.createComponent(MockFormComponent);
      wrapperComponent = wrapperFixture.componentInstance;
      wrapperComponent.errorSummaryService.setUpdateStrategy('reloadOnly');
      wrapperComponent.reloadErrors();
      wrapperFixture.detectChanges();
    });
  });

  const getErrorListPromise = (): Promise<string[] | null> => {
    return new Promise((resolve) => {
      let tempErrorsArray: string[] = [];

      let tryCounter = 0;

      const interval = setInterval(() => {
        wrapperFixture.detectChanges();

        const errorsArray: string[] = [];

        const errors: NodeList = wrapperFixture.nativeElement.querySelectorAll(
          'ul.fudis-error-summary__error-list li.fudis-error-summary__error-list__item',
        );

        errors.forEach((item) => {
          if (item.textContent) {
            errorsArray.push(item.textContent);
          }
        });

        if (tempErrorsArray.sort().toString() == errorsArray.sort().toString()) {
          clearInterval(interval);

          resolve(errorsArray.sort());
        } else {
          tempErrorsArray = errorsArray;
          tryCounter = tryCounter + 1;
        }

        if (tryCounter === 5) {
          resolve(null);
        }
      }, 100);
    });
  };

  describe('Contents', () => {
    it('default title is displayed properly', async () => {
      await wrapperFixture.whenStable().then(() => {
        wrapperFixture.detectChanges();
        const renderedTitle = getElement(wrapperFixture, '.fudis-error-summary__title');

        expect(renderedTitle.textContent).toBe(
          'The information is incomplete or incorrect. Please correct the following items:',
        );
      });
    });

    it('app provided title is displayed properly', async () => {
      const appTitle = 'Something is definetely wrong!';

      wrapperComponent.formRef.errorSummaryTitle = appTitle;

      await wrapperFixture.whenStable().then(() => {
        wrapperFixture.detectChanges();
        const renderedTitle = getElement(wrapperFixture, '.fudis-error-summary__title');

        expect(renderedTitle.textContent).toBe(appTitle);
      });
    });

    it('should remove errors dynamically without reload', async () => {
      wrapperComponent.errorSummaryService.setUpdateStrategy('onRemove');
      wrapperComponent.formGroup.controls.name.patchValue('Chewbacca');

      await wrapperFixture.whenStable().then(async () => {
        wrapperFixture.detectChanges();
        await expect(getErrorListPromise()).resolves.toEqual(errorList3);
      });
    });

    it('should add & remove errors dynamically without reload', async () => {
      wrapperComponent.errorSummaryService.setUpdateStrategy('all');
      wrapperComponent.formGroup.controls.name.patchValue('Chewbacca');

      await wrapperFixture.whenStable().then(async () => {
        wrapperFixture.detectChanges();
        await expect(getErrorListPromise())
          .resolves.toEqual(errorList3)
          .finally(async () => {
            wrapperComponent.formGroup.controls.name.patchValue(null);
            wrapperFixture.detectChanges();
            await wrapperFixture.whenStable().then(async () => {
              await expect(getErrorListPromise()).resolves.toEqual(errorList4);
            });
          });
      });
    });

    it('error list have right messages', async () => {
      await wrapperFixture.whenStable().then(async () => {
        await expect(getErrorListPromise()).resolves.toEqual(errorList4);
      });
    });

    it('should not update error messages without reload', async () => {
      wrapperComponent.errorSummaryService.setUpdateStrategy('reloadOnly');
      wrapperComponent.formGroup.controls.name.patchValue('Chewbacca');

      await wrapperFixture.whenStable().then(async () => {
        await expect(getErrorListPromise())
          .resolves.toEqual(errorList4)
          .then(async () => {
            wrapperComponent.reloadErrors();

            await wrapperFixture.whenStable().then(async () => {
              await expect(getErrorListPromise()).resolves.toEqual(errorList3);
            });
          });
      });
    });
  });
});
