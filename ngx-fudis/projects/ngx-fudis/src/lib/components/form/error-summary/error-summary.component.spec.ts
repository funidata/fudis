/* eslint-disable @typescript-eslint/dot-notation */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AfterContentInit, Component, ElementRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ErrorSummaryComponent } from './error-summary.component';
import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';
import { NotificationComponent } from '../../notification/notification.component';
import { FormComponent } from '../form/form.component';
import { FudisValidators } from '../../../utilities/form/validators';
import { FudisGridService } from '../../../services/grid/grid.service';
import { FudisBreakpointService } from '../../../services/breakpoint/breakpoint.service';
import { GridDirective } from '../../../directives/grid/grid/grid.directive';
import { GridComponent } from '../../grid/grid/grid.component';
import { HeadingComponent } from '../../typography/heading/heading.component';
import { ButtonComponent } from '../../button/button.component';
import { TextInputComponent } from '../text-input/text-input.component';
import { ContentDirective } from '../../../directives/content-projection/content/content.directive';
import { ActionsDirective } from '../../../directives/content-projection/actions/actions.directive';
import { FieldSetComponent } from '../fieldset/fieldset.component';
import { LabelComponent } from '../label/label.component';
import { IconComponent } from '../../icon/icon.component';
import { BodyTextComponent } from '../../typography/body-text/body-text.component';
import { LinkComponent } from '../../link/link.component';
import { GuidanceComponent } from '../guidance/guidance.component';
import { ValidatorErrorMessageComponent } from '../error-message/validator-error-message/validator-error-message.component';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { HeaderDirective } from '../../../directives/content-projection/header/header.directive';
import { FudisIdService } from '../../../services/id/id.service';

@Component({
	selector: 'fudis-mock-form-component',
	template: ` <fudis-form
		[titleLevel]="1"
		[title]="'Example form for error summary'"
		[id]="'unique-form-example-1'"
		[errorSummaryLinkType]="'href'"
		[errorSummaryHelpText]="'There were errors you need to fix'"
		[errorSummaryLiveRemove]="toggleLive"
		[errorSummaryVisible]="errorSummaryVisible">
		<ng-template fudisActions type="form">
			<fudis-button [label]="'Submit'" (handleClick)="submitForm()" />
		</ng-template>
		<ng-template fudisContent type="form">
			<fudis-fieldset [title]="'Form information'">
				<ng-template fudisContent type="fieldset">
					<fudis-text-input
						[id]="'unique-input-1'"
						[control]="formExample.controls.name"
						[label]="'Name'"
						[helpText]="'We need to know who you are'" />
					<fudis-text-input
						[id]="'unique-input-2'"
						[control]="formExample.controls.email"
						[label]="'Contact email'"
						[helpText]="'So that we can contact you'" />
				</ng-template>
			</fudis-fieldset>
		</ng-template>
	</fudis-form>`,
})
class MockFormComponent implements AfterContentInit {
	constructor(
		private _errorSummaryService: FudisInternalErrorSummaryService,
		private _elementRef: ElementRef
	) {}

	formElement: HTMLFormElement;

	errorSummaryVisible: boolean = false;

	toggleLive: boolean = false;

	formExample = new FormGroup({
		name: new FormControl(null, FudisValidators.required('Missing your name')),
		email: new FormControl(null, FudisValidators.required('Missing email contact')),
	});

	// eslint-disable-next-line class-methods-use-this
	submitForm(): void {
		// This is a mock function
	}

	ngAfterContentInit(): void {
		this.formElement = this._elementRef.nativeElement as HTMLFormElement;
	}
}

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
			imports: [ReactiveFormsModule],
		}).compileComponents();
	});

	beforeEach(() => {
		wrapperFixture = TestBed.createComponent(MockFormComponent);
		wrapperComponent = wrapperFixture.componentInstance;
		wrapperFixture.detectChanges();

		spyOn(wrapperComponent, 'submitForm');
	});

	function submitInvalidForm(errorSummaryVisible: boolean = false): void {
		const submitButton = wrapperFixture.debugElement.nativeElement.querySelector('button');
		submitButton.click();
		wrapperComponent.errorSummaryVisible = errorSummaryVisible;
		wrapperFixture.detectChanges();
	}

	it('should not be visible before form submit', () => {
		const errorSummaryEl = wrapperFixture.debugElement.query(By.css('fudis-error-summary'));

		expect(errorSummaryEl).toBeFalsy();
	});

	it('should be visible when invalid form is submitted', () => {
		submitInvalidForm(true);

		expect(wrapperComponent.submitForm).toHaveBeenCalledTimes(1);

		const errorSummaryEl = wrapperFixture.debugElement.query(By.css('fudis-error-summary'));

		expect(errorSummaryEl).toBeTruthy();
	});

	describe('Wrapper Component', () => {
		it('should be created', () => {
			expect(wrapperComponent).toBeTruthy();
		});

		it('should have control errors when invalid form is submitted', () => {
			submitInvalidForm(true);

			expect(wrapperComponent.submitForm).toHaveBeenCalledTimes(1);
			expect(wrapperComponent.formExample.controls.email.errors).toBeTruthy();
			expect(wrapperComponent.formExample.controls.name.errors).toBeTruthy();
		});
	});

	describe('Contents', () => {
		let component: ErrorSummaryComponent;
		let fixture: ComponentFixture<ErrorSummaryComponent>;

		beforeEach(() => {
			fixture = TestBed.createComponent(ErrorSummaryComponent);
			component = fixture.componentInstance;
			fixture.detectChanges();
		});

		// TODO: Test error summary ul list and its contents
		it('should have list of errors', () => {
			expect(component).toBeTruthy();
		});
	});
});
