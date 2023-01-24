import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextAreaComponent } from './text-area.component';

export default {
	title: 'Components/Form/Text Area',
	component: TextAreaComponent,
	decorators: [
		moduleMetadata({
			imports: [BrowserAnimationsModule, ReactiveFormsModule, FormsModule],
		}),
	],
	argTypes: {},
} as Meta;

const Template: Story<TextAreaComponent> = (args: TextAreaComponent) => ({
	props: args,
});

export const TextArea = Template.bind({});
TextArea.args = {
	label: 'This is the label',
};

export const WithMultipleTextArea: Story = () => ({
	template: `
		<form lang="fi" id="form1" ngNativeValidate style="display:flex; width: 30rem; max-width: 90vw;flex-direction:column; border: 2px solid orangered; align-items: flex-start;"> 
			<fudis-text-area [required]="true" label="Pakollinen textarea kenttä, size S" helpText="Pakollisen kentän helpperiteksti" size="s"></fudis-text-area>	
			<fudis-text-area [required]="true" label="Pakollinen kenttä, size M" size="m"></fudis-text-area>	
			<fudis-text-area label="Ei-pakollinen tekstikenttä merkkirajauksella, size L" [maxLength]="20"></fudis-text-area>				
			<button type="submit" form="form1" value="Submit">Submit</button>
		</form>
	`,
});
