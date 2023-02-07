import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorSummaryComponent } from './error-summary.component';

export default {
	title: 'Components/Form/ErrorSummary',
	component: ErrorSummaryComponent,
	decorators: [
		moduleMetadata({
			imports: [ReactiveFormsModule, FormsModule],
		}),
	],
	argTypes: {},
	parameters: {
		controls: {
			exclude: ['control'],
		},
	},
} as Meta;
const html = String.raw;

export const ErrorSummary: Story = () => ({
	template: html`
		<form id="testform">
			<fudis-error-summary>
				<fudis-text-input
					[required]="true"
					labelHeight="double"
					label="Password, min length 4, max 6"
					minLength="4"
					maxLength="6"
					type="password"
					helpText="Help text Nipperkin yardarm list splice the main brace draft swing the lead Privateer tack pillage bounty. Shrouds quarter gangplank belaying pin skysail fathom rope's end boom pirate spike. Topgallant line barque sloop quarter cog Jack Tar gabion pillage fire ship."></fudis-text-input>
				<fudis-text-input
					[required]="true"
					labelHeight="double"
					label="Label Email, pakollinen, Nipperkin yardarm list splice the main brace draft."
					type="email"
					helpText="Lorem ipsum"></fudis-text-input>
				<fudis-text-input
					label="Email, ei-pakollinen, mutta olen pitkä kuin suomen talvi ja valoisaa aikaa on noin 13 sekuntia"
					type="email"
					helpText="Lorem ipsum"></fudis-text-input>
				<fudis-text-input
					label="Tavallinen teksti, min length 4"
					type="text"
					minLength="5"
					helpText="Lorem ipsum"></fudis-text-input>
			</fudis-error-summary>
		</form>
	`,
});
