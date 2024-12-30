import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorSummaryComponent } from './error-summary.component';
import { FudisErrorSummaryService } from '../../../services/form/error-summary/error-summary.service';
import { FormComponent } from '../form/form.component';
import { FudisValidators } from '../../../utilities/form/validators';
import { BodyTextComponent } from '../../typography/body-text/body-text.component';
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
import { getAllElements, getElement } from '../../../utilities/tests/utilities';
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
    (handleUpdatedErrorList)="handleUpdatedErrorList.emit($event)"
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

  @Output() handleUpdatedErrorList = new EventEmitter<{ id: string; message: string }[] | null>();

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

const fourErrors = [
  { id: 'fudis-text-input-1', message: 'Form information / Name: Missing your name' },
  { id: 'fudis-text-input-2', message: 'Form information / Contact email: Missing email contact' },
  {
    id: 'fudis-text-input-3',
    message: 'Section title / Section input: Too short input',
  },
  {
    id: 'fudis-text-input-4',
    message: 'Expandable title / Expandable input: Not an email',
  },
];
const threeErrors = [
  { id: 'fudis-text-input-2', message: 'Form information / Contact email: Missing email contact' },
  {
    id: 'fudis-text-input-3',
    message: 'Section title / Section input: Too short input',
  },
  {
    id: 'fudis-text-input-4',
    message: 'Expandable title / Expandable input: Not an email',
  },
];

describe('ErrorSummaryComponent', () => {
  let component: MockFormComponent;
  let fixture: ComponentFixture<MockFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BodyTextComponent,
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

    TestBed.runInInjectionContext(async () => {
      fixture = TestBed.createComponent(MockFormComponent);
      component = fixture.componentInstance;
      jest.spyOn(component.handleUpdatedErrorList, 'emit');
      component.errorSummaryService.setUpdateStrategy('reloadOnly');
      component.reloadErrors();
      fixture.detectChanges();

      fixture.autoDetectChanges(true);
      fixture.detectChanges();
    });
  });

  const delay = (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });
  };

  describe('Contents', () => {
    it('default title is displayed properly', async () => {
      await fixture.whenStable();
      const renderedTitle = getElement(fixture, '.fudis-error-summary__title');

      expect(renderedTitle.textContent).toBe(
        'The information is incomplete or incorrect. Please correct the following items:',
      );
    });

    it('app provided title is displayed properly', async () => {
      const appTitle = 'Something is definetely wrong!';

      component.formRef.errorSummaryTitle = appTitle;

      await fixture.whenStable();
      const renderedTitle = getElement(fixture, '.fudis-error-summary__title');

      expect(renderedTitle.textContent).toBe(appTitle);
    });

    it('should remove errors dynamically without reload', async () => {
      await delay();
      component.errorSummaryService.setUpdateStrategy('onRemove');
      expect(component.handleUpdatedErrorList.emit).not.toHaveBeenCalledWith(threeErrors);
      component.formGroup.controls.name.patchValue('Chewbacca');

      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.handleUpdatedErrorList.emit).toHaveBeenCalledWith(threeErrors);
    });

    it('should add & remove errors dynamically without reload', async () => {
      await delay();
      component.errorSummaryService.setUpdateStrategy('all');
      component.formGroup.controls.name.patchValue('Chewbacca');

      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.handleUpdatedErrorList.emit).toHaveBeenCalledWith(threeErrors);
      expect(getAllElements(fixture, '.fudis-error-summary__error-list__item').length).toEqual(3);
      component.formGroup.controls.name.patchValue(null);
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.handleUpdatedErrorList.emit).toHaveBeenCalledWith(fourErrors);
      expect(getAllElements(fixture, '.fudis-error-summary__error-list__item').length).toEqual(4);
    });

    it('error list have right messages', async () => {
      await fixture.whenStable();

      expect(component.handleUpdatedErrorList.emit).toHaveBeenCalledWith(fourErrors);
    });

    it('should not update error messages without reload', async () => {
      await delay();
      component.formGroup.controls.name.patchValue('Chewbacca');
      fixture.detectChanges();
      await fixture.whenStable();
      expect(component.handleUpdatedErrorList.emit).toHaveBeenCalledWith(fourErrors);
      expect(component.handleUpdatedErrorList.emit).not.toHaveBeenCalledWith(threeErrors);

      component.reloadErrors();
      await delay();
      fixture.detectChanges();
      await fixture.whenStable().then(() => {
        expect(component.handleUpdatedErrorList.emit).toHaveBeenCalledWith(threeErrors);
      });
    });
  });
});
