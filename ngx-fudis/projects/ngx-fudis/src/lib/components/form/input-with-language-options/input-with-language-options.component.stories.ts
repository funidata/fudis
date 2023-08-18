import { StoryFn, Meta, moduleMetadata, applicationConfig } from '@storybook/angular';

import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InputWithLanguageOptionsComponent } from './input-with-language-options.component';
import { FudisFormGroupValidators } from '../../../utilities/form/validators';
import { FudisInputWithLanguageOptionsFormGroup } from '../../../types/forms';

export default {
	title: 'Components/Form/Input With Language Options',
	component: InputWithLanguageOptionsComponent,

	argTypes: {},
	decorators: [
		moduleMetadata({
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

const html = String.raw;

const TemplateAllRequired: StoryFn = () => ({
	props: {
		id: 'unique-input-id-superhero-name',
		label: 'Your superhero name',
		helpText: 'Please provide superhero name in all languages.',
		groupErrorMsg: {
			english: {
				required: 'Missing superhero name on English.',
				maxlength:
					'English name is too long. Villains cannot yell it without pausing and drawing breath. It breaks the tension.',
			},
			finnish: {
				required: 'Missing superhero name on Finnish.',
				maxlength:
					'Finnish name is too long. Villains cannot yell it without pausing and drawing breath. It breaks the tension.',
			},
			swedish: {
				required: 'Missing superhero name on Swedish.',
				maxlength:
					'Swedish name is too long. Villains cannot yell it without pausing and drawing breath. It breaks the tension.',
			},
		},
		languageOptions: [
			{ value: 'finnish', viewValue: 'FI' },
			{ value: 'swedish', viewValue: 'SV' },
			{ value: 'english', viewValue: 'EN' },
		],
		formGroup: new FormGroup<FudisInputWithLanguageOptionsFormGroup>({
			finnish: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(12)]),
			swedish: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(12)]),
			english: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(12)]),
		}),
	},
	template: html`
		<fudis-input-with-language-options
			[id]="'unique-input-1'"
			[options]="languageOptions"
			[formGroup]="formGroup"
			[label]="label"
			[helpText]="helpText"
			[groupErrorMsg]="groupErrorMsg" />
	`,
});

const TemplateOneRequired: StoryFn = () => ({
	props: {
		id: 'unique-input-id-superhero-name',
		label: 'Your superhero name',
		helpText: 'Please provide superhero name in atleast one language.',
		groupErrorMsg: {
			atLeastOneRequired: 'Missing superhero name! Name in atleast one language is required.',
			english: {
				maxlength:
					'English name is too long. Villains cannot yell it without pausing and drawing breath. It breaks the tension.',
			},
			finnish: {
				maxlength:
					'Finnish name is too long. Villains cannot yell it without pausing and drawing breath. It breaks the tension.',
			},
			swedish: {
				maxlength:
					'Swedish name is too long. Villains cannot yell it without pausing and drawing breath. It breaks the tension.',
			},
		},
		languageOptions: [
			{ value: 'finnish', viewValue: 'FI' },
			{ value: 'swedish', viewValue: 'SV' },
			{ value: 'english', viewValue: 'EN' },
		],
		formGroup: new FormGroup<FudisInputWithLanguageOptionsFormGroup>(
			{
				finnish: new FormControl<string | null>(null, [Validators.maxLength(12)]),
				swedish: new FormControl<string | null>(null, [Validators.maxLength(12)]),
				english: new FormControl<string | null>(null, [Validators.maxLength(12)]),
			},
			[FudisFormGroupValidators.atLeastOneRequired()]
		),
	},
	template: html`
		<fudis-input-with-language-options
			[id]="'unique-input-1'"
			[options]="languageOptions"
			[formGroup]="formGroup"
			[label]="label"
			[helpText]="helpText"
			[groupErrorMsg]="groupErrorMsg" />
	`,
});

export const ExampleWithAllRequired = TemplateAllRequired.bind({});

export const ExampleWithAtleastOneRequired = TemplateOneRequired.bind({});
