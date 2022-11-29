import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextInputComponent } from './text-input.component';

export default {
	title: 'Components/Form/TextInput',
	component: TextInputComponent,
	decorators: [
		moduleMetadata({
			imports: [BrowserAnimationsModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, FormsModule],
		}),
	],
	argTypes: {},
	parameters: {
		controls: {
			exclude: ['control'],
		},
	},
} as Meta;

const Template: Story<TextInputComponent> = (args: TextInputComponent) => ({
	props: args,
});

export const TextInput = Template.bind({});
TextInput.args = {
	label: 'This is the label',
};

export const WithMultipleTextInput: Story = () => ({
	template: `
		<form id="form1" ngNativeValidate> 
			<fudis-text-input required style="display:flex; flex-direction:column; width:80%" label="Password, min length 4, max 6" minLength=4 maxLength=6 type="password"></fudis-text-input>	
			<fudis-text-input required style="display:flex; flex-direction:column; width:80%" label="Email, pakollinen" type="email"></fudis-text-input>	
			<fudis-text-input style="display:flex; flex-direction:column; width:80%" label="Email, ei-pakollinen" type="email"></fudis-text-input>	
			<fudis-text-input style="display:flex; flex-direction:column; width:80%" label="Tavallinen teksti, min length 4" type="text" minLength=5></fudis-text-input>	
			
			<button type="submit" form="form1" value="Submit">Submit</button>
		</form>
	`,
});

// <fudis-text-input [errorMessages]="{ required: 'pakollinen hei' }" required style="display:flex; flex-direction:column; width:80%" label="oon pakollinen"></fudis-text-input>
// 			<fudis-text-input [errorMessages]="{required:'mäkin oon pakollinen', message:'vähän parempi maili hei nyt'}" required style="display:flex; flex-direction:column; width:80%" required label="pakollinen email" type="email"></fudis-text-input>
// 			<fudis-text-input style="display:flex; flex-direction:column; width:80%" label="vapaa ehtoinen email!" type="email"></fudis-text-input>
// 			<fudis-text-input [errorMessages]="{required:'pakollinen!!!!', message:'numero hei kiitos'}" required style="display:flex; flex-direction:column; width:80%" label="numeroa!!" type="number"></fudis-text-input>
