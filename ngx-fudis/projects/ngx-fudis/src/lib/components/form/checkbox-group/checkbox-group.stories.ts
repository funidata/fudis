import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CheckboxGroupComponent } from './checkbox-group.component';
import { FudisCheckboxGroupFormGroup } from '../../../types/forms';
import readme from './readme.mdx';
import { FudisFormGroupValidators } from '../../../utilities/form/validators';

export default {
	title: 'Components/Form/Checkbox Group',
	component: CheckboxGroupComponent,
	decorators: [
		moduleMetadata({
			declarations: [],
			imports: [ReactiveFormsModule, FormsModule],
		}),
	],
	parameters: {
		docs: {
			page: readme,
		},
		controls: {
			exclude: /.*/g,
		},
	},
	argTypes: {},
} as Meta;

const html = String.raw;

const options = [
	{ controlName: 'apple', viewValue: 'Apple' },
	{ controlName: 'fairTradeBanana', viewValue: 'Fair trade banana' },
	{ controlName: 'pear', viewValue: 'Pear' },
	{ controlName: 'pineapple', viewValue: 'Pineapple' },
	{ controlName: 'orange', viewValue: 'Orange' },
];

const basicFormGroup = new FormGroup<FudisCheckboxGroupFormGroup>(
	{
		apple: new FormControl<boolean | null | undefined>(null),
		fairTradeBanana: new FormControl<boolean | null | undefined>(null),
		pear: new FormControl<boolean | null | undefined>(null),
		pineapple: new FormControl<boolean | null | undefined>(null),
		orange: new FormControl<boolean | null | undefined>(null),
	},
	[FudisFormGroupValidators.atLeastOneRequired()]
);

const withDisabledFormGroupOptions = new FormGroup<FudisCheckboxGroupFormGroup>(
	{
		apple: new FormControl<boolean | null | undefined>({ value: true, disabled: true }),
		fairTradeBanana: new FormControl<boolean | null | undefined | null>(null),
		pear: new FormControl<boolean | null | undefined | null>({ value: false, disabled: true }),
		pineapple: new FormControl<boolean | null | undefined | null>(null),
		orange: new FormControl<boolean | null | undefined | null>({ value: null, disabled: true }),
	},
	[FudisFormGroupValidators.atLeastOneRequired()]
);
const withMinMaxFormGroupOptions = new FormGroup<FudisCheckboxGroupFormGroup>(
	{
		apple: new FormControl<boolean | null | undefined>(null),
		fairTradeBanana: new FormControl<boolean | null | undefined | null>(null),
		pear: new FormControl<boolean | null | undefined | null>(null),
		pineapple: new FormControl<boolean | null | undefined | null>(null),
		orange: new FormControl<boolean | null | undefined | null>(null),
	},
	[FudisFormGroupValidators.outOfRequiredRange(2, 3)]
);

const ExampleTemplate: StoryFn<CheckboxGroupComponent> = (args: CheckboxGroupComponent) => ({
	props: {
		...args,
		formGroup: basicFormGroup,
		options,
	},
	template: html`<fudis-checkbox-group
		[formGroup]="formGroup"
		[required]="true"
		[title]="'Choose your preferred fruits'"
		[helpText]="'Pick at least one fruit.'"
		[tooltip]="'Fruit sugar is great in small doces!'"
		[groupErrorMsg]="{
					atLeastOneRequired: 'No fruit picked!'
				}">
		<fudis-checkbox *ngFor="let option of options" [controlName]="option.controlName" [viewValue]="option.viewValue" />
	</fudis-checkbox-group>`,
});

export const Example = ExampleTemplate.bind({});
Example.args = {};

const ExampleWithDisabledTemplate: StoryFn<CheckboxGroupComponent> = (args: CheckboxGroupComponent) => ({
	props: {
		...args,
		formGroup: withDisabledFormGroupOptions,
		options,
	},
	template: html`<fudis-checkbox-group
		[formGroup]="formGroup"
		[required]="true"
		[title]="'Choose your preferred fruits'"
		[helpText]="'Pick at least one fruit.'"
		[groupErrorMsg]="{
					atLeastOneRequired: 'No fruit picked!'
				}">
		<fudis-checkbox *ngFor="let option of options" [controlName]="option.controlName" [viewValue]="option.viewValue" />
	</fudis-checkbox-group>`,
});

export const ExampleWithDisabledOption = ExampleWithDisabledTemplate.bind({});
ExampleWithDisabledOption.args = {};

const ExampleWithMinMaxTemplate: StoryFn<CheckboxGroupComponent> = (args: CheckboxGroupComponent) => ({
	props: {
		...args,
		formGroup: withMinMaxFormGroupOptions,
		options,
	},
	template: html`<fudis-checkbox-group
		[formGroup]="formGroup"
		[required]="true"
		[title]="'Choose your preferred fruits'"
		[helpText]="'Pick from two to three fruits.'"
		[groupErrorMsg]="{
			lessThanRequiredRange: 'Not enough fruits picked',
			moreThanRequiredRange: 'Too many fruits selected.'
		}">
		<fudis-checkbox *ngFor="let option of options" [controlName]="option.controlName" [viewValue]="option.viewValue" />
	</fudis-checkbox-group>`,
});

export const ExampleWithMinMax = ExampleWithMinMaxTemplate.bind({});
ExampleWithMinMax.args = {};
