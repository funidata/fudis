import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LegendComponent } from './legend.component';

export default {
	title: 'Components/Form/Legend',
	component: LegendComponent,
	decorators: [
		moduleMetadata({
			imports: [BrowserAnimationsModule, ReactiveFormsModule, FormsModule],
		}),
	],
	argTypes: {},
	parameters: {
		controls: {
			exclude: ['control'],
		},
	},
} as Meta;

export const Legend: Story = () => ({
	template: `
	<form>
	<fieldset>
	
	<fudis-legend>Olen legendaarinen lomake</fudis-legend>
	<fudis-text-input [required]="true"  label="Password, min length 4, max 6" minLength=4 maxLength=6 type="password" helpText="Help text Nipperkin"></fudis-text-input>	
	<fudis-text-input [required]="true"  label="Password, min length 4, max 6" minLength=4 maxLength=6 type="password" helpText="Help text Nipperkin"></fudis-text-input>	
	<fudis-text-input [required]="true"  label="Password, min length 4, max 6" minLength=4 maxLength=6 type="password" helpText="Help text Nipperkin"></fudis-text-input>	
	<fudis-text-input [required]="true"  label="Password, min length 4, max 6" minLength=4 maxLength=6 type="password" helpText="Help text Nipperkin"></fudis-text-input>	
	</fieldset>
	
	</form>

	`,
});
