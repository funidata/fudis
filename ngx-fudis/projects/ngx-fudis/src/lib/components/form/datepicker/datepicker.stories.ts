import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UntypedFormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { DatepickerComponent } from './datepicker.component';

export default {
	title: 'Components/Form/Datepicker',
	component: DatepickerComponent,
	decorators: [
		moduleMetadata({
			imports: [
				BrowserAnimationsModule,
				MatFormFieldModule,
				MatDatepickerModule,
				MatInputModule,
				ReactiveFormsModule,
				FormsModule,
			],
		}),
	],
	argTypes: {},
} as Meta;

const Template: Story<DatepickerComponent> = (args: DatepickerComponent) => ({
	props: args,
	template: `
	<fudis-datepicker [errorMsg]="errorMsg" [control]="control" [requiredText]="requiredText" [label]="label" [id]="id" [helpText]="helpText"></fudis-datepicker>

	`,
});

export const Datepicker = Template.bind({});
Datepicker.args = {
	errorMsg: { required: 'It is required to choose a date' },
	requiredText: 'Required',
	label: 'Select a date',
	control: new UntypedFormControl('', Validators.required),
	id: 'example-id-for-datepicker',
	helpText: 'We recommend to choose your favourite date.',
};
