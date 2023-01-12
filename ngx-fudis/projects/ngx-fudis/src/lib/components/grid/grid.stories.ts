import { moduleMetadata } from '@storybook/angular';
import { GridComponent } from './grid.component';
import { HeadingComponent } from '../typography/heading/heading.component';
import { VanillaTextInputComponent } from '../form/vanilla-text-input/vanilla-text-input.component';

const metadata = moduleMetadata({
	imports: [],
	declarations: [HeadingComponent, VanillaTextInputComponent],
});

export default {
	component: GridComponent,
	title: 'Components/Grid',
	decorators: [metadata],
};

export const Default = () => ({
	template: `
		<fudis-grid columnsS="1fr" columns="1fr 1fr">
		</fudis-grid>
	`,
	props: {},
});

// export const Default = () => ({
// 	template: `
// 		<fudis-grid columns="4fr 4fr">
// 			<fudis-heading tag="h1" size="xl" text="I am main heading taking full witdht!"></fudis-heading>

// 			<fudis-vanilla-text-input [required]="true" label="Password, min length 4, max 6" minLength=4 maxLength=6 type="password" helpText="Help text Nipperkin"></fudis-vanilla-text-input>
// 			<fudis-vanilla-text-input [required]="true" label="Label Email, pakollinen" type="email" helpText="Lorem ipsum"></fudis-vanilla-text-input>
// 			<fudis-vanilla-text-input  label="Email, ei-pakollinen, mutta olen pitkä kuin suomen talvi ja valoisaa aikaa on noin 13 sekuntia" type="email" helpText="Lorem ipsum"></fudis-vanilla-text-input>
// 			<fudis-vanilla-text-input  label="Tavallinen teksti, min length 4" type="text" minLength=5 helpText="Lorem ipsum"></fudis-vanilla-text-input>

// 			<button type="submit" form="form1" value="Submit">Submit</button>

// 		</fudis-grid>
// 		<fudis-grid variant="wide" columns="3fr 3fr 6fr" alignItemsY="end">
// 			<fudis-heading tag="h1" size="xl" text="I am main heading taking full witdht!"></fudis-heading>
// 			<fudis-vanilla-text-input [required]="true" label="Password, min length 4, max 6" minLength=4 maxLength=6 type="password" helpText="Help text Nipperkin"></fudis-vanilla-text-input>
// 			<fudis-vanilla-text-input [required]="true" label="Label Email, pakollinen" type="email" helpText="Lorem ipsum"></fudis-vanilla-text-input>
// 			<fudis-vanilla-text-input label="Email, ei-pakollinen, mutta olen pitkä kuin suomen talvi ja valoisaa aikaa on noin 13 sekuntia" type="email" helpText="Lorem ipsum"></fudis-vanilla-text-input>
// 			<fudis-vanilla-text-input label="Tavallinen teksti, min length 4" type="text" minLength=5 helpText="Lorem ipsum"></fudis-vanilla-text-input>

// 			<button type="submit" form="form1" value="Submit">Submit</button>
// 		</fudis-grid>
// 	`,
// 	props: {},
// });

Default.story = {
	name: 'component',
};
