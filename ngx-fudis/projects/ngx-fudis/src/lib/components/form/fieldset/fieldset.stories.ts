import { StoryFn, Meta, moduleMetadata, applicationConfig } from '@storybook/angular';

import { ReactiveFormsModule, FormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FieldsetComponent } from './fieldset.component';

export default {
	title: 'Components/Form/Fieldset',
	component: FieldsetComponent,

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

const props = {
	legend: 'Fill all languages',
	languages: ['en', 'fi', 'sv'],
	langFi: 'fi',
	langSv: 'sv',
	langEn: 'en',
	controlGroup: new FormGroup({
		finnish: new FormControl('', Validators.required),
		swedish: new FormControl('', Validators.required),
		english: new FormControl('', Validators.required),
	}),
	idFi: 'fi-input',
	idSv: 'sv-input',
	idEn: 'en-input',
	labelFi: 'Finnish stuff',
	labelSv: 'Swedish stuff',
	labelEn: 'English stuff',
	requiredText: 'Pakollinen',
	id: 'fieldset-unique-id',
	errorMsg: { required: 'This is required' },
};

const Template: StoryFn = () => ({
	props: { ...props },
	template: `
	<form>
	<fudis-fieldset [legend]="legend" [languages]="languages" [id]="id">
	<ng-template fudisFieldsetContent>
	<fudis-text-input [errorMsg]="errorMsg" [inputLanguage]="langFi" [label]="labelFi" [id]="idFi" [requiredText]="requiredText" [control]="controlGroup.controls['finnish']"></fudis-text-input>
	<fudis-text-input [errorMsg]="errorMsg" [requiredText]="requiredText" [inputLanguage]="langSv" [label]="labelSv" [id]="idSv" [control]="controlGroup.controls['swedish']"></fudis-text-input>
	<fudis-text-input [errorMsg]="errorMsg" [requiredText]="requiredText" [inputLanguage]="langEn" [label]="labelEn" [id]="idEn" [control]="controlGroup.controls['english']"></fudis-text-input>
	</ng-template>
	</fudis-fieldset>
	</form>

	`,
});

export const Example = Template.bind({});
