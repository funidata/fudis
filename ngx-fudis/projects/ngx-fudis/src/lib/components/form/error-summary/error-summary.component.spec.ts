// /* eslint-disable @typescript-eslint/dot-notation */
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { Component, ElementRef, ViewChild } from '@angular/core';
// import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
// import { By } from '@angular/platform-browser';
// import { getElement } from '../../../../../utilities/tests/utilities';
// import { ErrorSummaryComponent } from './error-summary.component';
// import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';
// import { NotificationComponent } from '../../notification/notification.component';
// import { FormComponent } from '../form/form.component';
// import { FudisValidators } from '../../../utilities/form/validators';
// import { FudisGridService } from '../../../services/grid/grid.service';
// import { FudisBreakpointService } from '../../../services/breakpoint/breakpoint.service';
// import { GridDirective } from '../../../directives/grid/grid/grid.directive';
// import { GridComponent } from '../../grid/grid/grid.component';
// import { HeadingComponent } from '../../typography/heading/heading.component';
// import { ButtonComponent } from '../../button/button.component';
// import { TextInputComponent } from '../text-input/text-input.component';
// import { ContentDirective } from '../../../directives/content-projection/content/content.directive';
// import { ActionsDirective } from '../../../directives/content-projection/actions/actions.directive';
// import { FieldSetComponent } from '../fieldset/fieldset.component';
// import { LabelComponent } from '../label/label.component';
// import { IconComponent } from '../../icon/icon.component';
// import { BodyTextComponent } from '../../typography/body-text/body-text.component';
// import { LinkComponent } from '../../link/link.component';
// import { GuidanceComponent } from '../guidance/guidance.component';
// import { ValidatorErrorMessageComponent } from '../error-message/validator-error-message/validator-error-message.component';
// import { FudisTranslationService } from '../../../services/translation/translation.service';
// import { HeaderDirective } from '../../../directives/content-projection/header/header.directive';
// import { FudisIdService } from '../../../services/id/id.service';
// import { FudisErrorSummaryService } from '../../../services/form/error-summary/error-summary.service';

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

@Component({
	selector: 'fudis-mock-form-component',
	template: ` <fudis-form
		#formRef
		[titleLevel]="1"
		[title]="'Example form for error summary'"
		[id]="'unique-form-example-1'"
		[errorSummaryLinkType]="'href'"
		[errorSummaryHelpText]="'There were errors you need to fix'"
		[errorSummaryLiveRemove]="toggleLive"
		[errorSummaryVisible]="errorSummaryVisible">
		<ng-template fudisContent type="form">
			<fudis-fieldset [title]="'Form information'">
				<ng-template fudisContent type="fieldset">
					<fudis-text-input
						[control]="formGroup.controls.name"
						[label]="'Name'"
						[helpText]="'We need to know who you are'" />
					<fudis-text-input
						[control]="formGroup.controls.email"
						[label]="'Contact email'"
						[helpText]="'So that we can contact you'" />
				</ng-template>
			</fudis-fieldset>
		</ng-template>
	</fudis-form>`,
})
class MockFormComponent {
	constructor(private _errorSummaryService: FudisErrorSummaryService) {}

	@ViewChild('formRef') formRef: FormComponent;

	// formElement: HTMLFormElement;

	errorSummaryVisible: boolean = false;

	toggleLive: boolean = false;

	formGroup = new FormGroup({
		name: new FormControl(null, FudisValidators.required('Missing your name')),
		email: new FormControl(null, FudisValidators.required('Missing email contact')),
	});

	reloadErrors(): void {
		this.formGroup.markAllAsTouched();
		this.errorSummaryVisible = true;
		this._errorSummaryService.reloadErrors();
	}
}

describe('ErrorSummaryComponent', () => {
	let component: ErrorSummaryComponent;
	let fixture: ComponentFixture<ErrorSummaryComponent>;

	let wrapperComponent: MockFormComponent;
	let wrapperFixture: ComponentFixture<MockFormComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				ActionsDirective,
				BodyTextComponent,
				ButtonComponent,
				ContentDirective,
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
				MockFormComponent,
				NotificationComponent,
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
	});

	describe('Contents', () => {
		beforeEach(() => {
			fixture = TestBed.createComponent(ErrorSummaryComponent);
			component = fixture.componentInstance;
			wrapperFixture = TestBed.createComponent(MockFormComponent);
			wrapperComponent = wrapperFixture.componentInstance;

			wrapperFixture.detectChanges();

			// component.parentComponent = formElement;

			// console.log(formElement.querySelector('.fudis-form')?.getAttribute('id'));
			// component.helpText = 'There are some test errors. Please look at them!';
			// fixture.detectChanges();
		});

		// TODO: Test error summary ul list and its contents
		fit('should have list of errors', () => {
			wrapperComponent.reloadErrors();
			// const errorSummary = wrapperFixture.nativeElement.querySelector('fudis-error-summary');

			// const errorSummaryComponent = wrapperComponent.formRef.errorSummaryRef;

			component.helpText = 'Yes yes';
			component.parentComponent = wrapperComponent.formRef.formElement as HTMLFormElement;

			// errorSummaryComponent.getErrors();

			// component.getErrors();

			wrapperFixture.detectChanges();
			// fixture.componentRef.instance.getErrors();
			fixture.detectChanges();

			// eslint-disable-next-line @typescript-eslint/dot-notation
			// console.log(component['_errorSummaryService']['_currentErrorList']['fudis-text-input-1'].errors);

			console.log(fixture.nativeElement);

			// component.getErrors();
			// console.log(errorSummary);
			// console.log(wrapperFixture.nativeElement);
		});
	});
});
