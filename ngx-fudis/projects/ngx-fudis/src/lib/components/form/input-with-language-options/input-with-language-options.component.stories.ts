import { StoryFn, Meta, moduleMetadata, applicationConfig } from '@storybook/angular';

import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IFudisDropdownOption, TFudisFieldsetErrorMessages } from '../../../types/forms';
import { InputWithLanguageOptionsComponent } from './input-with-language-options.component';

@Component({
	selector: 'example-input-with-language-options',
	template: `
		<form>
			<fudis-fieldset [legend]="legend" [id]="fieldsetId">
				<ng-template fudisFieldsetGuidance>
					<fudis-guidance [helpText]="helpText" [id]="fieldsetId + '__guidance'"></fudis-guidance>
				</ng-template>
				<ng-template fudisFieldsetContent>
					<fudis-input-with-language-options
						[id]="inputIdOne"
						[options]="languageOptions"
						[formGroup]="mainFormGroup"
						[helpText]="inputHelpText"
						[label]="labelOne"
						[helpText]="inputHelpText"
						[groupErrorMsg]="groupErrorMsg"
						[requiredText]="requiredText"></fudis-input-with-language-options>
					<fudis-input-with-language-options
						[id]="inputIdTwo"
						[options]="languageOptions"
						[formGroup]="secondFormGroup"
						[helpText]="inputHelpText"
						[label]="labelTwo"
						[helpText]="inputHelpText"
						[groupErrorMsg]="groupErrorMsg"
						[requiredText]="requiredText"></fudis-input-with-language-options>
				</ng-template>
			</fudis-fieldset>
		</form>
	`,
})
class InputWithLanguageOptionsExampleComponent {
	groupErrorMsg: TFudisFieldsetErrorMessages = {
		english: {
			required: 'Missing course name on English.',
		},
		finnish: {
			required: 'Missing course name on Finnish.',
		},
	};

	id = 'unique-language-select';

	inputIdOne = 'unique-input-one';

	inputIdTwo = 'unique-input-two';

	fieldsetId = 'unique-fieldset-id';

	languageOptions: IFudisDropdownOption[] = [
		{ value: 'finnish', viewValue: 'Fi' },
		{ value: 'swedish', viewValue: 'Sv' },
		{ value: 'english', viewValue: 'En' },
	];

	legend = 'Fill in course information';

	helpText = 'This help text is for all inputs containing general information for all of them';

	labelOne = 'Course name';

	labelTwo = 'Course description';

	inputHelpText = 'Help text for an individual input';

	requiredText = 'Required';

	mainFormGroup: FormGroup = this.formBuilder.group({
		finnish: new FormControl('', Validators.required),
		swedish: new FormControl(''),
		english: new FormControl('', Validators.required),
	});

	secondFormGroup: FormGroup = this.formBuilder.group({
		finnish: new FormControl('', Validators.required),
		swedish: new FormControl(''),
		english: new FormControl('', Validators.required),
	});

	constructor(private formBuilder: FormBuilder) {}
}

export default {
	title: 'Components/Form/Input With Language Options',
	component: InputWithLanguageOptionsComponent,

	argTypes: {},
	decorators: [
		moduleMetadata({
			declarations: [InputWithLanguageOptionsExampleComponent],
			imports: [ReactiveFormsModule, FormsModule],
		}),
		applicationConfig({
			providers: [importProvidersFrom(BrowserAnimationsModule)],
		}),
	],
	parameters: {
		controls: {
			exclude: ['control'],
		},
	},
} as Meta;

const Template: StoryFn = () => ({
	template: `
	<example-input-with-language-options></example-input-with-language-options>
	`,
});

export const Example = Template.bind({});
