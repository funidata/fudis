import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormLayoutComponent } from './form-layout.component';
import { VanillaTextInputComponent } from '../vanilla-text-input/vanilla-text-input.component';
import { HeadingComponent } from '../../heading/heading.component';
import { ButtonComponent } from '../../button/button.component';

export default {
	title: 'Components/Form/Form',
	component: FormLayoutComponent,
	decorators: [
		moduleMetadata({
			imports: [BrowserAnimationsModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, FormsModule],
			declarations: [VanillaTextInputComponent, HeadingComponent, ButtonComponent],
		}),
	],
	argTypes: {},
	parameters: {
		controls: {
			exclude: ['control'],
		},
	},
} as Meta;

export const WithMultipleVanillaTextInput: Story = () => ({
	template: `
	<fudis-heading tag="h2" size="l" text="Regular layout with 2 columns"></fudis-heading>
		<fudis-form-layout>
		<fudis-vanilla-text-input [required]="true" labelHeight="double" label="Password, min length 4, max 6" minLength=4 maxLength=6 type="password" helpText="Help text Nipperkin yardarm list splice the main brace draft swing the lead Privateer tack pillage bounty. Shrouds quarter gangplank belaying pin skysail fathom rope's end boom pirate spike. Topgallant line barque sloop quarter cog Jack Tar gabion pillage fire ship."></fudis-vanilla-text-input>	
		<fudis-vanilla-text-input [required]="true" labelHeight="double" label="Label Email, pakollinen, Nipperkin yardarm list splice the main brace draft.
		" type="email" helpText="Lorem ipsum"></fudis-vanilla-text-input>	
		<fudis-vanilla-text-input  label="Email, ei-pakollinen, mutta olen pitkä kuin suomen talvi ja valoisaa aikaa on noin 13 sekuntia" type="email" helpText="Lorem ipsum"></fudis-vanilla-text-input>	
		<fudis-vanilla-text-input  label="Tavallinen teksti, min length 4" type="text" minLength=5 helpText="Lorem ipsum"></fudis-vanilla-text-input>	
		</fudis-form-layout>
		<fudis-heading tag="h2" size="l" text="Regular layout with 4 columns"></fudis-heading>
		<fudis-form-layout columns=4>
		<fudis-vanilla-text-input [required]="true" labelHeight="double" label="Password, min length 4, max 6" minLength=4 maxLength=6 type="password" helpText="Help text Nipperkin yardarm list splice the main brace draft swing the lead Privateer tack pillage bounty. Shrouds quarter gangplank belaying pin skysail fathom rope's end boom pirate spike. Topgallant line barque sloop quarter cog Jack Tar gabion pillage fire ship."></fudis-vanilla-text-input>	
		<fudis-vanilla-text-input [required]="true" labelHeight="double" label="Label Email, pakollinen, Nipperkin yardarm list splice the main brace draft.
		" type="email" helpText="Lorem ipsum"></fudis-vanilla-text-input>	
		<fudis-vanilla-text-input  label="Email, ei-pakollinen, mutta olen pitkä kuin suomen talvi ja valoisaa aikaa on noin 13 sekuntia" type="email" helpText="Lorem ipsum"></fudis-vanilla-text-input>	
		<fudis-vanilla-text-input  label="Tavallinen teksti, min length 4" type="text" minLength=5 helpText="Lorem ipsum"></fudis-vanilla-text-input>	
		</fudis-form-layout>
		<fudis-heading tag="h2" size="l" text="Wide layout with 2 columns, probably used with text-areas and not inputs"></fudis-heading>
		<fudis-form-layout variant="wide">
		<fudis-vanilla-text-input [required]="true" labelHeight="double" label="Password, min length 4, max 6" minLength=4 maxLength=6 type="password" helpText="Help text Nipperkin yardarm list splice the main brace draft swing the lead Privateer tack pillage bounty. Shrouds quarter gangplank belaying pin skysail fathom rope's end boom pirate spike. Topgallant line barque sloop quarter cog Jack Tar gabion pillage fire ship."></fudis-vanilla-text-input>	
		<fudis-vanilla-text-input [required]="true" labelHeight="double" label="Label Email, pakollinen, Nipperkin yardarm list splice the main brace draft.
		" type="email" helpText="Lorem ipsum"></fudis-vanilla-text-input>	
		<fudis-vanilla-text-input  label="Email, ei-pakollinen, mutta olen pitkä kuin suomen talvi ja valoisaa aikaa on noin 13 sekuntia" type="email" helpText="Lorem ipsum"></fudis-vanilla-text-input>	
		<fudis-vanilla-text-input  label="Tavallinen teksti, min length 4" type="text" minLength=5 helpText="Lorem ipsum"></fudis-vanilla-text-input>	
		</fudis-form-layout>
		<fudis-heading tag="h2" size="l" text="Wide layout with 4 columns"></fudis-heading>
		<fudis-form-layout variant="wide" columns=4>
		<fudis-vanilla-text-input [required]="true" labelHeight="double" label="Password, min length 4, max 6" minLength=4 maxLength=6 type="password" helpText="Help text Nipperkin yardarm list splice the main brace draft swing the lead Privateer tack pillage bounty. Shrouds quarter gangplank belaying pin skysail fathom rope's end boom pirate spike. Topgallant line barque sloop quarter cog Jack Tar gabion pillage fire ship."></fudis-vanilla-text-input>	
		<fudis-vanilla-text-input [required]="true" labelHeight="double" label="Label Email, pakollinen, Nipperkin yardarm list splice the main brace draft.
		" type="email" helpText="Lorem ipsum"></fudis-vanilla-text-input>	
		<fudis-vanilla-text-input  label="Email, ei-pakollinen, mutta olen pitkä kuin suomen talvi ja valoisaa aikaa on noin 13 sekuntia" type="email" helpText="Lorem ipsum"></fudis-vanilla-text-input>	
		<fudis-vanilla-text-input  label="Tavallinen teksti, min length 4" type="text" minLength=5 helpText="Lorem ipsum"></fudis-vanilla-text-input>	
		</fudis-form-layout>
	`,
});
