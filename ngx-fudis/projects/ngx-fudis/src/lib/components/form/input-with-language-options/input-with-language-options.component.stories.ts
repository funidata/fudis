import { StoryFn, Meta, moduleMetadata, applicationConfig } from '@storybook/angular';

import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BehaviorSubject } from 'rxjs';
import { InputWithLanguageOptionsComponent } from './input-with-language-options.component';
import { FudisGroupValidator } from '../../../utilities/form/validators';
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
			},
			finnish: {
				required: 'Missing superhero name on Finnish.',
			},
			swedish: {
				required: 'Missing superhero name on Swedish.',
			},
		},
		maxLength: 22,
		languageOptions: [
			{ value: 'finnish', viewValue: 'FI' },
			{ value: 'swedish', viewValue: 'SV' },
			{ value: 'english', viewValue: 'EN' },
		],
		formGroup: new FormGroup<FudisInputWithLanguageOptionsFormGroup>({
			finnish: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(22)]),
			swedish: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(22)]),
			english: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(22)]),
		}),
	},
	template: html`
		<fudis-input-with-language-options
			[id]="'unique-input-1'"
			[options]="languageOptions"
			[formGroup]="formGroup"
			[label]="label"
			[helpText]="helpText"
			[groupErrorMsg]="groupErrorMsg"
			[maxLength]="maxLength" />
	`,
});

const TemplateOneRequired: StoryFn = () => ({
	props: {
		id: 'unique-input-id-superhero-name',
		label: 'Your superhero name',
		helpText: 'Please provide superhero name in atleast one language.',
		maxLength: 30,
		languageOptions: [
			{ value: 'finnish', viewValue: 'FI' },
			{ value: 'swedish', viewValue: 'SV' },
			{ value: 'english', viewValue: 'EN' },
		],
		formGroup: new FormGroup<FudisInputWithLanguageOptionsFormGroup>(
			{
				finnish: new FormControl<string | null>(null, [Validators.maxLength(30)]),
				swedish: new FormControl<string | null>(null, [Validators.maxLength(30)]),
				english: new FormControl<string | null>(null, [Validators.maxLength(30)]),
			},
			[FudisGroupValidator.atLeastOneRequired(new BehaviorSubject('Give name in at least in one language'))]
		),
	},
	template: html`
		<fudis-input-with-language-options
			[id]="'unique-input-1'"
			[options]="languageOptions"
			[formGroup]="formGroup"
			[label]="label"
			[helpText]="helpText"
			[groupErrorMsg]="groupErrorMsg"
			[maxLength]="maxLength" />
	`,
});

export const ExampleWithAllRequired = TemplateAllRequired.bind({});

export const ExampleWithAtleastOneRequired = TemplateOneRequired.bind({});
