// eslint-disable-next-line max-classes-per-file
import { Component, OnInit, TemplateRef } from '@angular/core';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentType } from '@angular/cdk/portal';
import { DialogService } from './dialog.service';
import readme from './readme.mdx';

@Component({
	selector: 'example-dialog-content',
	template: `<fudis-dialog [closeButtonLabel]="'Close'" [size]="'l'">
		<fudis-heading fudisDialogTitle tag="h2">Dialog with fudis-grid and scrollable content</fudis-heading>
		<fudis-dialog-content>
			<fudis-grid [marginTop]="'md'" [marginBottom]="'md'" [marginSides]="'none'">
				<fudis-heading [tag]="'h3'" [size]="'s'">
					I am fudis-heading inside the grid taking the whole width
				</fudis-heading>
				<fudis-body-text>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis porttitor nunc. Nunc vehicula ut massa non
					facilisis. Aliquam vehicula risus vitae ex condimentum, sed efficitur neque scelerisque. Mauris facilisis vel
					orci sit amet tincidunt. Praesent ante leo, tempus eu blandit vel, tempus nec augue. Nam dui est, scelerisque
					quis mauris sit amet, sagittis pharetra lectus. Donec nec ligula et dolor venenatis bibendum. Vestibulum metus
					tortor, fermentum eu dignissim id, ultrices vitae metus. Donec eget vulputate risus. Proin eros augue,
					volutpat mollis varius non, posuere ac turpis. Aliquam et convallis tortor, non semper mi. Praesent nec
					eleifend mauris, at laoreet urna. Quisque dignissim nibh sollicitudin, finibus justo non, efficitur est.
				</fudis-body-text>
				<fudis-body-text>
					Proin pellentesque at felis vel imperdiet. Vivamus eros lorem, condimentum non rutrum quis, aliquam vitae
					dolor. Morbi dictum leo non porttitor egestas. Sed sed aliquet purus. Sed nec metus dictum, porta justo ut,
					cursus lorem. Nam libero dolor, pulvinar eu enim et, porttitor sodales ipsum. Nullam tristique ante sed massa
					porta, in accumsan nibh pretium. Integer vel facilisis neque, a lacinia dui. Donec cursus eget mi a aliquam.
					Vestibulum commodo, elit a mattis porttitor, eros neque euismod sem, eu hendrerit ante nisl sed quam.
					Vestibulum euismod leo ac magna pretium.
				</fudis-body-text>
			</fudis-grid>
			<fudis-description-list
				[columns]="'1fr 1fr 1fr'"
				[marginSides]="'none'"
				[data]="[
					{ key: 'Name', value: 'Mary Rhubarb', subHeading: 'The lady boss' },
					{ key: 'Occupation', value: 'Pie maker' },
					{ key: 'Special skill', value: 'Spicing it up' },
					{ key: 'Awards', value: 'Pie maker 2023, Mix it up master 2008, Place setting champion 1987' }
				]"></fudis-description-list>
			<hr />
			<fudis-grid [columns]="'1fr 1fr 1fr'" [marginSides]="'none'" [marginTop]="'s'" [marginBottom]="'s'">
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
	</fudis-dialog>`,
})
class DialogExampleContentComponent {}

@Component({
	selector: 'fudis-dialog-example-laucher',
	template: `
		<fudis-grid [columns]="'1fr 1fr'" [width]="'xs'" [align]="'left'">
			<fudis-button (handleClick)="openDialog(dialogWithForm)" [label]="'Open dialog with form'"></fudis-button>
			<fudis-button (handleClick)="openDialog(dialogContentComponent)" [label]="'Open dialog with grid'"></fudis-button>
		</fudis-grid>

		<ng-container *ngIf="this.chosenPowerAnimal">
			<fudis-body-text>Great choise, your power animal is {{ this.chosenPowerAnimal }}.</fudis-body-text>
		</ng-container>
		<ng-template #dialogWithForm>
			<fudis-dialog [closeButtonLabel]="'Close dialog'" [size]="'s'">
				<fudis-heading fudisDialogTitle [tag]="'h2'">Power animal dialog</fudis-heading>
				<fudis-dialog-content>
					<ng-container *ngIf="exampleDialogFormGroup">
						<form>
							<fudis-text-input
								[id]="'example-input-power-animal'"
								[label]="'What is your power animal?'"
								[control]="exampleDialogFormGroup.controls['powerAnimal']"
								[requiredText]="'Required'"
								[helpText]="'Please add some values'"
								[errorMsg]="{ required: 'This is required field.' }"></fudis-text-input>
						</form>
					</ng-container>
				</fudis-dialog-content>
				<fudis-dialog-actions>
					<fudis-button fudisDialogClose [label]="'Cancel'"></fudis-button>
					<fudis-button
						(handleClick)="closeDialogWithForm()"
						[disabled]="!exampleDialogFormGroup.valid"
						[label]="'Save'"></fudis-button>
				</fudis-dialog-actions>
			</fudis-dialog>
		</ng-template>
		<ng-template #dialogWithGrid> </ng-template>
	`,
})
class DialogExampleLauncherComponent implements OnInit {
	chosenPowerAnimal: string;

	dialogContentComponent: DialogExampleContentComponent;

	constructor(public dialog: DialogService, private formBuilder: FormBuilder) {}

	openDialog<T = any>(dialogToOpen: ComponentType<T> | TemplateRef<T>) {
		const ref = this.dialog.open(dialogToOpen);
		ref.afterClosed().subscribe((res: any) => {
			// eslint-disable-next-line no-console
			console.log(res);
		});
	}

	closeDialogWithForm() {
		if (this.exampleDialogFormGroup.valid) {
			this.chosenPowerAnimal = this.exampleDialogFormGroup.controls['powerAnimal'].value;
			this.dialog.close();
		}
	}

	exampleDialogFormGroup: FormGroup;

	ngOnInit(): void {
		this.dialogContentComponent = DialogExampleContentComponent;
		this.exampleDialogFormGroup = this.formBuilder.group({
			powerAnimal: new FormControl('', Validators.required),
		});
	}
}

export default {
	title: 'Components/Dialog',
	component: DialogExampleLauncherComponent,
	decorators: [
		moduleMetadata({
			imports: [ReactiveFormsModule, FormsModule],
			providers: [DialogService],
			declarations: [DialogExampleContentComponent],
		}),
	],
	parameters: {
		docs: {
			page: readme,
		},
		controls: {
			exclude: ['chosenPowerAnimal', 'exampleDialogFormGroup', 'closeDialogWithForm'],
		},
	},
} as Meta;

const Template: StoryFn<DialogExampleLauncherComponent> = (args: DialogExampleLauncherComponent) => ({
	props: args,
});

export const Dialog = Template.bind({});
Dialog.args = {};
