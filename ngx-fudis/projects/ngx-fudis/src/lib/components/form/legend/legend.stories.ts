import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VanillaTextInputComponent } from '../vanilla-text-input/vanilla-text-input.component';
import { LegendComponent } from './legend.component';
import { GridComponent } from '../../grid/grid.component';

export default {
	title: 'Components/Form/Legend',
	component: LegendComponent,
	decorators: [
		moduleMetadata({
			imports: [BrowserAnimationsModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, FormsModule],
			declarations: [VanillaTextInputComponent, GridComponent],
		}),
	],
	argTypes: {},
	parameters: {
		controls: {
			exclude: ['control'],
		},
	},
} as Meta;

export const Example: Story = () => ({
	template: `
	<fudis-heading tag="h2" size="l" text="Regular layout with 2 columns"></fudis-heading>
		
		
	`,
});
