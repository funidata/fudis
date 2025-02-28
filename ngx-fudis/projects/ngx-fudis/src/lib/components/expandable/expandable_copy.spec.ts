import { Component, EventEmitter, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { ExpandableComponent } from './expandable.component';
import { GridDirective } from '../../directives/grid/grid/grid.directive';
import { FudisInternalErrorSummaryService } from '../../services/form/error-summary/internal-error-summary.service';
import { 
  FormActionsDirective,
  FormContentDirective,
  FormHeaderDirective,
 } from '../form/form/form-content.directive';
import {
  ExpandableActionsDirective,
  ExpandableContentDirective,
} from './expandable-content.directive';
import { FudisBreakpointService } from '../../services/breakpoint/breakpoint.service';
import { BadgeComponent } from '../badge/badge.component';
import { FudisErrorSummaryService } from '../../services/form/error-summary/error-summary.service';
import { FormComponent } from '../form/form/form.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FudisValidators } from '../../utilities/form/validators';
import { RouterModule } from '@angular/router';
import { TextInputComponent } from '../form/text-input/text-input.component';
import { FormSubmitDirective } from '../../directives/form/form-actions/form-actions.directive';
import { GuidanceComponent } from '../form/guidance/guidance.component';
import { ValidatorErrorMessageComponent } from '../form/error-message/validator-error-message/validator-error-message.component';
import { LabelComponent } from '../form/label/label.component';
import { HeadingComponent } from '../typography/heading/heading.component';
import { getElement } from '../../utilities/tests/utilities';
import { ErrorSummaryComponent } from '../form/error-summary/error-summary.component';
import { NotificationComponent } from '../notification/notification.component';
import { LinkDirective } from '../../directives/link/link.directive';
import { phl } from '@angular-extensions/pretty-html-log';
import { SectionComponent } from '../section/section.component';
import { SectionContentDirective } from '../section/section-content.directive';
import { FieldSetComponent } from '../form/fieldset/fieldset.component';
import { FieldsetContentDirective } from '../form/fieldset/fieldset-content.directive';
import { BodyTextComponent } from '../typography/body-text/body-text.component';

@Component({
  selector: 'fudis-mock-form-component',
  template: `<fudis-form
  [id]="'my-own-id'"
  [level]="1"
  [title]="'Form title'"
  (handleUpdatedErrorList)="handleUpdatedErrorList.emit($event)"
  [errorSummaryTitle]="'There were errors you need to fix'"
  [errorSummaryVisible]="errorSummaryVisible"
>
  <fudis-form-content>
    <fudis-expandable
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
</fudis-form>`
})
class MockFormComponent {
  constructor(public errorSummaryService: FudisErrorSummaryService) {}
  
  @Output() handleUpdatedErrorList = new EventEmitter<{ id: string; message: string }[] | null>();

  title: string = 'Expandable test title';

  formGroup = new FormGroup({
    name: new FormControl<string | null>(null, FudisValidators.required('Missing your name')),
  });

  errorSummaryVisible: boolean = false;
  errorSummaryBreadcrumb: boolean = true;

  public reloadErrorsMock(): void {
    this.formGroup.markAllAsTouched();
    this.errorSummaryVisible = true;
    this.errorSummaryService.reloadFormErrors('my-own-id');
  }
}

describe('ExpandableComponent', () => {
  let component: MockFormComponent;
  let fixture: ComponentFixture<MockFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BodyTextComponent,
        ExpandableActionsDirective,
        ExpandableContentDirective,
        FieldSetComponent,
        FieldsetContentDirective,
        FormActionsDirective,
        FormContentDirective,
        FormHeaderDirective,
        FormSubmitDirective,
        LinkDirective,
        BadgeComponent,
        ButtonComponent,
        ExpandableComponent,
        ErrorSummaryComponent,
        FormComponent,
        GridDirective,
        GuidanceComponent,
        HeadingComponent,
        IconComponent,
        LabelComponent,
        MockFormComponent,
        NotificationComponent,
        SectionComponent,
        SectionContentDirective,
        TextInputComponent,
        ValidatorErrorMessageComponent
      ],
      providers: [
        FudisBreakpointService,
        FudisInternalErrorSummaryService, 
        FudisErrorSummaryService
      ],
      imports: [ReactiveFormsModule, RouterModule.forRoot([])],
    }).compileComponents();

    TestBed.runInInjectionContext(async () => {
      fixture = TestBed.createComponent(MockFormComponent);
      component = fixture.componentInstance;
      jest.spyOn(component.handleUpdatedErrorList, 'emit');
      component.errorSummaryService.setUpdateStrategy('reloadOnly');
      component.reloadErrorsMock();
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

  describe('error summary', () => {
    // TODO: create example with Form as parent
    it('onInit, should add section to error summary if errorSummaryBreadcrumb is true', async () => {
      await delay();
      component.reloadErrorsMock();
      fixture.detectChanges();

      const errorListTitle = getElement(
        fixture,
        '.fudis-error-summary__error-list__item',
      );

      await fixture.whenStable();

      expect(errorListTitle.textContent).toEqual('Expandable test title / Name: Missing your name');
    });

    it('onChanges, should add section to error summary if errorSummaryBreadcrumb is true and title is updated', async () => {
      component.title = 'New test title';

      await delay();
      component.reloadErrorsMock();
      fixture.detectChanges();

      const errorListTitle = getElement(
        fixture,
        '.fudis-error-summary__error-list__item',
      );

      await fixture.whenStable();

      expect(errorListTitle.textContent).toEqual('New test title / Name: Missing your name');
    });
  });
});
