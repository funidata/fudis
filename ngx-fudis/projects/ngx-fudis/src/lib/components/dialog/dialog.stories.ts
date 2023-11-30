// eslint-disable-next-line max-classes-per-file
import { Component, OnInit, TemplateRef } from '@angular/core';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentType } from '@angular/cdk/portal';
import { FudisDialogService } from '../../services/dialog/dialog.service';
import readme from './readme.mdx';
import { FudisValidators } from '../../utilities/form/validators';
import { FudisErrorSummaryService } from '../../services/form/error-summary/error-summary.service';

type TestForm = {
	powerAnimal: FormControl<string | null>;
};

@Component({
	selector: 'example-dialog-content',
	template: `<fudis-dialog [size]="'lg'">
		<fudis-heading fudisDialogTitle [level]="2">Dialog with fudis-grid and scrollable content</fudis-heading>
		<fudis-dialog-content>
			<fudis-grid [marginTop]="'md'" [marginBottom]="'md'">
				<fudis-heading [level]="3" [size]="'sm'">
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
				[columns]="{ xs: 1, sm: 2, md: 3 }"
				[data]="[
					{ key: 'Name', value: 'Mary Rhubarb', subHeading: 'The lady boss' },
					{ key: 'Occupation', value: 'Pie maker' },
					{ key: 'Special skill', value: 'Spicing it up' },
					{ key: 'Awards', value: 'Pie maker 2023, Mix it up master 2008, Place setting champion 1987' }
				]"></fudis-description-list>
			<hr />
			<fudis-grid [columns]="{ xs: 1, sm: 2, md: 3 }" [marginTop]="'sm'" [marginBottom]="'sm'">
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
		<fudis-grid [columns]="'1fr 1fr'" [width]="'xs'" [align]="'start'">
			<fudis-button (handleClick)="openDialog(dialogWithForm)" [label]="'Open dialog with form'"></fudis-button>
			<fudis-button (handleClick)="openDialog(dialogContentComponent)" [label]="'Open dialog with grid'"></fudis-button>
		</fudis-grid>

		<ng-container *ngIf="this.chosenPowerAnimal">
			<fudis-body-text>Great choise, your power animal is {{ this.chosenPowerAnimal }}.</fudis-body-text>
		</ng-container>
		<ng-template #dialogWithForm>
			<fudis-dialog [size]="'sm'">
				<fudis-heading fudisDialogTitle [level]="2">Power animal dialog</fudis-heading>
				<fudis-dialog-content>
					<fudis-form
						[errorSummaryVisible]="errorSummaryVisible"
						[title]="'Dialog with fudis-form'"
						[errorSummaryLinkType]="'href'"
						[errorSummaryHelpText]="'You need to fill up the information.'">
						<ng-template fudisContent [type]="'form'">
							<fudis-fieldset [title]="'Answer this'">
								<ng-template fudisContent [type]="'fieldset'">
									<fudis-text-input
										[id]="'example-input-power-animal'"
										[label]="'What is your power animal?'"
										[control]="exampleDialogFormGroup.controls['powerAnimal']"
										[helpText]="'Please add some values'" />
								</ng-template>
							</fudis-fieldset>
						</ng-template>
						<ng-template fudisActions type="form" [bottomButtons]="true">
							<fudis-button (handleClick)="closeDialogWithForm()" [label]="'Save'"></fudis-button>
							<fudis-button fudisDialogClose [label]="'Cancel'"></fudis-button>
						</ng-template>
					</fudis-form>
				</fudis-dialog-content>
			</fudis-dialog>
		</ng-template>
		<ng-template #dialogWithGrid> </ng-template>
	`,
})
class DialogExampleLauncherComponent implements OnInit {
	constructor(
		public dialog: FudisDialogService,
		private _errorSummaryService: FudisErrorSummaryService
	) {}

	chosenPowerAnimal: string | null;

	errorSummaryVisible = false;

	dialogContentComponent: DialogExampleContentComponent;

	exampleDialogFormGroup = new FormGroup<TestForm>({
		powerAnimal: new FormControl(null, FudisValidators.required('You need to choose your power animal')),
	});

	ngOnInit(): void {
		this.dialogContentComponent = DialogExampleContentComponent;
	}

	closeDialogWithForm() {
		this.exampleDialogFormGroup.markAllAsTouched();

		if (this.exampleDialogFormGroup.invalid) {
			this.errorSummaryVisible = true;
			this._errorSummaryService.reloadErrors();
		} else {
			this.errorSummaryVisible = false;
			this.chosenPowerAnimal = this.exampleDialogFormGroup.controls.powerAnimal.value;
			this.dialog.close();
		}
	}

	openDialog<T = any>(dialogToOpen: ComponentType<T> | TemplateRef<T>) {
		const ref = this.dialog.open(dialogToOpen);
		ref.afterClosed().subscribe((res: any) => {
			// eslint-disable-next-line no-console
			console.log(res);
		});
	}
}

export default {
	title: 'Components/Dialog',
	component: DialogExampleLauncherComponent,
	decorators: [
		moduleMetadata({
			imports: [ReactiveFormsModule, FormsModule, RouterTestingModule],
			providers: [FudisDialogService],
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
