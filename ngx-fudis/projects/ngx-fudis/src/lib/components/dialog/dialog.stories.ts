/* eslint-disable max-classes-per-file */
import { Component } from '@angular/core';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { DialogComponent } from './dialog.component';
import {
	FudisDialogTitleDirective,
	FudisDialogContentDirective,
	FudisDialogActionsDirective,
	FudisDialogCloseDirective,
} from './dialog-directives';

// @Component({
// 	selector: 'fudis-dialog-example-content',
// 	template: `
// 		<h2>Otsikko jee</h2>
// 		<!-- <fudis-dialog-content>
// 			<p>dialog-test-content works!</p>
// 		</fudis-dialog-content>
// 		<fudis-dialog-actions>
// 			<button mat-button fudis-dialog-close>Cancel</button>
// 			<button mat-button cdkFocusInitial>OK</button>
// 		</fudis-dialog-actions> -->
// 	`,
// 	styles: [],
// })
// class DialogExampleContentComponent {}

@Component({
	selector: 'fudis-dialog-example-laucher',
	template: ` <button (click)="openDialog()">Open test dialog</button> `,
})
class DialogExampleLauncherComponent {
	constructor(public dialog: DialogComponent) {}

	openDialog() {
		const ref = this.dialog.open(DialogComponent);
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
			declarations: [
				FudisDialogTitleDirective,
				FudisDialogContentDirective,
				FudisDialogActionsDirective,
				FudisDialogCloseDirective,
			],
		}),
	],
	argTypes: {},
	parameters: {
		controls: {
			exclude: [],
		},
	},
} as Meta;

const Template: Story<DialogComponent> = (args: DialogComponent) => ({
	props: args,
	template: `
	<fudis-dialog-example-laucher></fudis-dialog-example-laucher>
	<fudis-dialog>
		<fudis-dialog-title>Moikkelis</fudis-dialog-title>
		<fudis-dialog-content>
			Tässä on kontenttia
		</fudis-dialog-content>
		<fudis-dialog-actions>
			<fudis-button>EIKU</fudis-button>
			<fudis-button>TALLENNA</fudis-button>
		</fudis-dialog-actions>
	</fudis-dialog>
	`,
});

export const Dialog = Template.bind({});
Dialog.args = {};
