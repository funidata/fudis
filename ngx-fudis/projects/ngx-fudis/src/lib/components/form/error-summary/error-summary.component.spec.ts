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

		fixture = TestBed.createComponent(ErrorSummaryComponent);
		component = fixture.componentInstance;
		wrapperFixture = TestBed.createComponent(MockFormComponent);
		wrapperComponent = wrapperFixture.componentInstance;
		wrapperFixture.detectChanges();
		wrapperComponent.reloadErrors();
	});

	describe('Contents', () => {
		// TODO: Test error summary ul list and its contents
		it('input attributes', () => {
			const helpText = 'Errors belong in a museum';

			component.helpText = helpText;
			component.parentComponent = wrapperComponent.formRef.formElement as HTMLFormElement;

			fixture.detectChanges();

			// console.log(fixture.nativeElement);
		});
	});
});
