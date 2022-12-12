import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VanillaTextInputComponent } from './vanilla-text-input.component';

export default {
	title: 'Components/Form/VanillaTextInput',
	component: VanillaTextInputComponent,
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

const Template: Story<VanillaTextInputComponent> = (args: VanillaTextInputComponent) => ({
	props: args,
});

export const VanillaTextInput = Template.bind({});
VanillaTextInput.args = {
	label: 'This is the label',
};

export const WithMultipleVanillaTextInput: Story = () => ({
	template: `
		<form lang="fi" id="form1" ngNativeValidate style="display:flex; width: 30rem; max-width: 90vw;flex-direction:column; border: 2px solid orangered; align-items: flex-start;"> 
			<fudis-vanilla-text-input required  label="Password, min length 4, max 6" minLength=4 maxLength=6 type="password" helpText="Help text Nipperkin"></fudis-vanilla-text-input>	
			<fudis-vanilla-text-input required  label="Label Email, pakollinen" type="email" helpText="Lorem ipsum"></fudis-vanilla-text-input>	
			<fudis-vanilla-text-input  label="Email, ei-pakollinen, mutta olen pitkä kuin suomen talvi ja valoisaa aikaa on noin 13 sekuntia" type="email" helpText="Lorem ipsum"></fudis-vanilla-text-input>	
			<fudis-vanilla-text-input  label="Tavallinen teksti, min length 4" type="text" minLength=5 helpText="Lorem ipsum"></fudis-vanilla-text-input>	
			
			<button type="submit" form="form1" value="Submit">Submit</button>
		</form>
	`,
});

// <fudis-vanilla-text-input [errorMessages]="{ required: 'pakollinen hei' }" required style="display:flex; flex-direction:column; width:80%" label="oon pakollinen"></fudis-vanilla-text-input>
// 			<fudis-vanilla-text-input [errorMessages]="{required:'mäkin oon pakollinen', message:'vähän parempi maili hei nyt'}" required style="display:flex; flex-direction:column; width:80%" required label="pakollinen email" type="email"></fudis-vanilla-text-input>
// 			<fudis-vanilla-text-input style="display:flex; flex-direction:column; width:80%" label="vapaa ehtoinen email!" type="email"></fudis-vanilla-text-input>
// 			<fudis-vanilla-text-input [errorMessages]="{required:'pakollinen!!!!', message:'numero hei kiitos'}" required style="display:flex; flex-direction:column; width:80%" label="numeroa!!" type="number"></fudis-vanilla-text-input>
