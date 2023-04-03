import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentType } from '@angular/cdk/portal';
import { DialogService } from './dialog.service';

@Component({
	selector: 'fudis-dialog-example-laucher',
	template: `<fudis-button (click)="openDialog(dialogWithForm)" label="Open dialog with form"></fudis-button>
		<fudis-button
			(click)="openDialog(dialogWithGrid)"
			size="medium"
			icon="rosette"
			[label]="'Open dialog with grid'"></fudis-button>
		<ng-container *ngIf="this.chosenPowerAnimal">
			<fudis-body-text>Great choise, your power animal is {{ this.chosenPowerAnimal }}</fudis-body-text>
		</ng-container>
		<ng-template #dialogWithForm>
			<fudis-dialog [closeButtonLabel]="'Close'" [size]="'l'">
				<fudis-heading fudisDialogTitle tag="h2">Welcome to a Dialog!</fudis-heading>
				<fudis-dialog-content>
					<ng-container *ngIf="exampleADialogFormGroup">
						<form>
							<fudis-legend>This is an important form</fudis-legend>
							<fudis-text-input
								[id]="'example-input-power-animal'"
								[label]="'What is your power animal?'"
								[control]="exampleADialogFormGroup.controls['powerAnimal']"
								[requiredText]="'Required'"
								[helpText]="'Please add some values here above!'"
								[errorMsg]="{ required: 'This is required field.' }"></fudis-text-input>
						</form>
					</ng-container>
				</fudis-dialog-content>
				<fudis-dialog-actions align="end">
					<fudis-button fudisDialogClose label="Cancel"></fudis-button>
					<fudis-button
						class="inton-custom-button-härveli"
						(click)="closeDialogWithForm()"
						[disabled]="!exampleADialogFormGroup.valid"
						label="Ok"></fudis-button>
				</fudis-dialog-actions>
			</fudis-dialog>
		</ng-template>
		<ng-template #dialogWithGrid>
			<fudis-dialog [closeButtonLabel]="'Close'" [size]="'l'">
				<fudis-heading fudisDialogTitle tag="h2">Welcome to a Dialog with Fudis Grid!</fudis-heading>
				<fudis-dialog-content>
					<fudis-grid
						[columns]="'1fr 1fr 1fr'"
						[columnsS]="'1fr 1fr'"
						[columnsXs]="'1fr'"
						[marginSides]="'none'"
						[marginTop]="'s'"
						[marginBottom]="'s'">
						<fudis-heading tag="h3">I am a heading inside grid taking the whole width</fudis-heading>
						<div style="border: 2px solid lightblue"><fudis-body-text>I am a grid item 1</fudis-body-text></div>
						<div style="border: 2px solid lightblue"><fudis-body-text>I am a grid item 2</fudis-body-text></div>
						<div style="border: 2px solid lightblue"><fudis-body-text>I am a grid item 3</fudis-body-text></div>
						<div style="border: 2px solid lightblue"><fudis-body-text>I am a grid item 4</fudis-body-text></div>
						<div style="border: 2px solid lightblue"><fudis-body-text>I am a grid item 5</fudis-body-text></div>
						<div style="border: 2px solid lightblue"><fudis-body-text>I am a grid item 6</fudis-body-text></div>
					</fudis-grid>
				</fudis-dialog-content>
				<fudis-dialog-actions align="end">
					<fudis-button fudisDialogClose label="Ok"></fudis-button>
				</fudis-dialog-actions>
			</fudis-dialog>
		</ng-template>`,
})
class DialogExampleLauncherComponent implements OnInit {
	@ViewChild('firstDialogTemplate')
	firstDialogTemplate: TemplateRef<any>;

	chosenPowerAnimal: string;

	constructor(public dialog: DialogService, private formBuilder: FormBuilder) {}

	openDialog<T = any>(dialogToOpen: ComponentType<T> | TemplateRef<T>) {
		const ref = this.dialog.open(dialogToOpen);
		ref.afterClosed().subscribe((res: any) => {
			// eslint-disable-next-line no-console
			console.log(res);
		});
	}

	closeDialogWithForm() {
		if (this.exampleADialogFormGroup.valid) {
			this.chosenPowerAnimal = this.exampleADialogFormGroup.controls['powerAnimal'].value;
			this.dialog.close();
		}
	}

	exampleADialogFormGroup: FormGroup;

	ngOnInit(): void {
		this.exampleADialogFormGroup = this.formBuilder.group({
			powerAnimal: new FormControl('', Validators.required),
		});
	}
}

export default {
	title: 'Components/Dialog',
	component: DialogExampleLauncherComponent,
	decorators: [
		moduleMetadata({
			declarations: [],
			imports: [ReactiveFormsModule, FormsModule],
		}),
	],
} as Meta;

const Template: Story<DialogExampleLauncherComponent> = (args: DialogExampleLauncherComponent) => ({
	props: args,
});

export const Dialog = Template.bind({});
Dialog.args = {};
