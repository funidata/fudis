import { StoryFn, Meta, moduleMetadata, applicationConfig } from '@storybook/angular';

import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IFudisDropdownOption, TFudisFormErrorMessages } from '../../../types/forms';
import { FieldsetWithLanguageOptionsComponent } from './fieldset-with-language-options.component';

@Component({
	selector: 'example-fieldset-with-language-options',
	template: `
		<form>
			<fudis-fieldset-with-language-options
				[id]="id"
				[options]="languageOptions"
				[formGroup]="mainFormGroup"
				[legend]="legend"
				[helpText]="helpText"
				[inputLabel]="inputLabel"
				[inputHelpText]="inputHelpText"
				[errorMsg]="errorMsg"
				[requiredText]="requiredText"></fudis-fieldset-with-language-options>
		</form>
	`,
})
class FieldsetWithLanguageOptionsExampleComponent {
	errorMsg: TFudisFormErrorMessages = {
		required: 'This is required field.',
	};

	id = 'unique-language-select';

	languageOptions: IFudisDropdownOption[] = [
		{ value: 'finnish', viewValue: 'Fi' },
		{ value: 'swedish', viewValue: 'Sv' },
		{ value: 'english', viewValue: 'En' },
	];

	legend = 'Fill in all languages';

	helpText = 'This help text is for all inputs';

	inputLabel = 'Input label text';

	inputHelpText = 'Help text for an individual input';

	requiredText = 'Required';

	mainFormGroup: FormGroup = this.formBuilder.group({
		finnish: new FormControl('', Validators.required),
		swedish: new FormControl(''),
		english: new FormControl('', Validators.required),
	});

	constructor(private formBuilder: FormBuilder) {}
}

export default {
	title: 'Components/Form/FieldsetWithLanguageOptions',
	component: FieldsetWithLanguageOptionsComponent,

	argTypes: {},
	decorators: [
		moduleMetadata({
			declarations: [FieldsetWithLanguageOptionsExampleComponent],
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
	<example-fieldset-with-language-options></example-fieldset-with-language-options>
	`,
});

export const Example = Template.bind({});
