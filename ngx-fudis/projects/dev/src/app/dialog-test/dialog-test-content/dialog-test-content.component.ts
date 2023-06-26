import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-dialog-test-content',
	template: `
		<fudis-dialog [closeButtonLabel]="'Close'" [size]="'lg'">
			<fudis-heading fudisDialogTitle tag="h2">Dialog with fudis-grid and scrollable content</fudis-heading>
			<fudis-dialog-content>
				<fudis-grid [marginTop]="'md'" [marginBottom]="'md'">
					<fudis-heading [tag]="'h3'" [size]="'sm'">
						I am fudis-heading inside the grid taking the whole width
					</fudis-heading>
					<fudis-body-text>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis porttitor nunc. Nunc vehicula ut massa non
						facilisis. Aliquam vehicula risus vitae ex condimentum, sed efficitur neque scelerisque. Mauris facilisis
						vel orci sit amet tincidunt. Praesent ante leo, tempus eu blandit vel, tempus nec augue. Nam dui est,
						scelerisque quis mauris sit amet, sagittis pharetra lectus. Donec nec ligula et dolor venenatis bibendum.
						Vestibulum metus tortor, fermentum eu dignissim id, ultrices vitae metus. Donec eget vulputate risus. Proin
						eros augue, volutpat mollis varius non, posuere ac turpis. Aliquam et convallis tortor, non semper mi.
						Praesent nec eleifend mauris, at laoreet urna. Quisque dignissim nibh sollicitudin, finibus justo non,
						efficitur est.
					</fudis-body-text>
					<fudis-body-text>
						Proin pellentesque at felis vel imperdiet. Vivamus eros lorem, condimentum non rutrum quis, aliquam vitae
						dolor. Morbi dictum leo non porttitor egestas. Sed sed aliquet purus. Sed nec metus dictum, porta justo ut,
						cursus lorem. Nam libero dolor, pulvinar eu enim et, porttitor sodales ipsum. Nullam tristique ante sed
						massa porta, in accumsan nibh pretium. Integer vel facilisis neque, a lacinia dui. Donec cursus eget mi a
						aliquam. Vestibulum commodo, elit a mattis porttitor, eros neque euismod sem, eu hendrerit ante nisl sed
						quam. Vestibulum euismod leo ac magna pretium.
					</fudis-body-text>
				</fudis-grid>
				<fudis-description-list
					[columns]="'1fr 1fr 1fr'"
					[data]="[
						{ key: 'Name', value: 'Mary Rhubarb', subHeading: 'The lady boss' },
						{ key: 'Occupation', value: 'Pie maker' },
						{ key: 'Special skill', value: 'Spicing it up' },
						{ key: 'Awards', value: 'Pie maker 2023, Mix it up master 2008, Place setting champion 1987' }
					]"></fudis-description-list>
				<hr />
				<fudis-grid [columns]="3" [marginTop]="'sm'" [marginBottom]="'sm'">
					<div style="border: 2px solid lightblue"><fudis-body-text>Showcase of grid items</fudis-body-text></div>
					<div style="border: 2px solid lightblue"><fudis-body-text>Showcase of grid items</fudis-body-text></div>
					<div style="border: 2px solid lightblue"><fudis-body-text>Showcase of grid items</fudis-body-text></div>
					<div style="border: 2px solid lightblue"><fudis-body-text>Showcase of grid items</fudis-body-text></div>
					<div style="border: 2px solid lightblue"><fudis-body-text>Showcase of grid items</fudis-body-text></div>
					<div style="border: 2px solid lightblue"><fudis-body-text>Showcase of grid items</fudis-body-text></div>
					<div style="border: 2px solid lightblue"><fudis-body-text>Showcase of grid items</fudis-body-text></div>
					<div style="border: 2px solid lightblue"><fudis-body-text>Showcase of grid items</fudis-body-text></div>
					<div style="border: 2px solid lightblue"><fudis-body-text>Showcase of grid items</fudis-body-text></div>
					<div style="border: 2px solid lightblue"><fudis-body-text>Showcase of grid items</fudis-body-text></div>
					<div style="border: 2px solid lightblue"><fudis-body-text>Showcase of grid items</fudis-body-text></div>
					<div style="border: 2px solid lightblue"><fudis-body-text>Showcase of grid items</fudis-body-text></div>
				</fudis-grid>
			</fudis-dialog-content>
			<fudis-dialog-actions>
				<fudis-button fudisDialogClose [label]="'Ok'"></fudis-button>
			</fudis-dialog-actions>
		</fudis-dialog>
	`,
	styles: [],
})
export class DialogTestContentComponent {
	chosenPowerAnimal: string;

	constructor(private formBuilder: FormBuilder) {}

	dialogFormGroup = this.formBuilder.group({
		powerAnimal: new FormControl('', Validators.required),
	});
}
