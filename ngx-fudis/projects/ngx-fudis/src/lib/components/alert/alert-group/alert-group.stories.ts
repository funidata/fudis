// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { AfterViewInit, Component, Signal, TemplateRef, ViewChild, effect } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import readme from '../readme.mdx';
import { AlertGroupComponent } from './alert-group.component';
import { FudisAlertService } from '../alert-service/alert.service';
import { FudisAlert, FudisAlertElement } from '../../../types/miscellaneous';
import { FudisIdService } from '../../../utilities/id-service.service';
import { FudisDialogService } from '../../dialog/dialog.service';

@Component({
	selector: 'example-add-alerts',
	template: `<div [style]="'margin-top:' + _marginCounter + 'rem'">
			<fudis-grid [columns]="'repeat(4,auto)'" [width]="'sm'">
				<fudis-button [label]="'Add danger'" (handleClick)="addDanger()" />
				<fudis-button [label]="'Add warning'" (handleClick)="addWarning()" />
				<fudis-button [label]="'Add success'" (handleClick)="addSuccess()" />
				<fudis-button [label]="'Add info'" (handleClick)="addInfo()" />
				<fudis-button [label]="'Add info with link'" (handleClick)="addInfoWithLink()" />
				<fudis-button [label]="'Add warning with link'" (handleClick)="addWarningWithLink()" />
				<fudis-button [label]="'Dismiss random id'" (handleClick)="dismissRandom()" />
				<fudis-button [label]="'Dismiss all'" (handleClick)="dismissAll()" />
				<fudis-button [label]="'Open dialog'" (handleClick)="openDialog()" />
			</fudis-grid>
		</div>
		<ng-template #exampleDialogTemplate>
			<fudis-dialog [closeButtonLabel]="'Close'" [size]="'sm'">
				<fudis-heading fudisDialogTitle [level]="2">Small test dialog</fudis-heading>
				<fudis-dialog-content>
					<fudis-body-text>Some content</fudis-body-text>
				</fudis-dialog-content>
				<fudis-dialog-actions>
					<fudis-button fudisDialogClose [label]="'Ok'"></fudis-button>
				</fudis-dialog-actions>
			</fudis-dialog>
		</ng-template>`,
})
class AddAlertsComponent implements AfterViewInit {
	constructor(
		private _dialog: FudisDialogService,
		private _alertService: FudisAlertService,
		private _idService: FudisIdService
	) {
		effect(() => {
			this._alerts = this._alertService.getAlertsSignal();
			this._marginCounter = 2 + this._alerts().length * 2;
		});
	}

	@ViewChild('exampleDialogTemplate', { static: true }) templateRef: TemplateRef<unknown>;

	protected _marginCounter = 2;

	protected _alerts: Signal<FudisAlertElement[]>;

	openDialog(): void {
		this._dialog.open(this.templateRef);
	}

	addDanger(): void {
		const newAlert: FudisAlert = {
			message: 'Something dangerous happened',
			type: 'danger',
			id: 'my-own-id-1',
		};

		this._alertService.addAlert(newAlert);
	}

	addWarning(): void {
		const newAlert: FudisAlert = {
			message: 'Something dangerous MIGHT happen',
			type: 'warning',
			id: 'my-own-id-2',
		};

		this._alertService.addAlert(newAlert);
	}

	addWarningWithLink(): void {
		const newAlert: FudisAlert = {
			message: 'Something dangerous MIGHT happen.',
			type: 'warning',
			id: 'my-own-id-3',
			routerLinkUrl: '/',
			linkTitle: 'More info about this warning.',
		};

		this._alertService.addAlert(newAlert);
	}

	addSuccess(): void {
		const newAlert: FudisAlert = {
			message: 'Yippee Ki-Yay! You were successful!',
			type: 'success',
			id: 'my-own-id-4',
		};

		this._alertService.addAlert(newAlert);
	}

	addInfo(): void {
		const newAlert: FudisAlert = {
			message: 'Nothing special here.',
			type: 'info',
			id: 'my-own-id-5',
		};

		this._alertService.addAlert(newAlert);
	}

	addInfoWithLink(): void {
		const newAlert: FudisAlert = {
			message: 'Mostly neutral information here.',
			type: 'info',
			id: 'my-own-id-6',
			routerLinkUrl: '/',
			linkTitle: 'Additional information about this situation.',
		};

		this._alertService.addAlert(newAlert);
	}

	dismissRandom(): void {
		const alerts = this._alertService.getAlertsSignal();
		const alertsLength = alerts().length;

		if (alertsLength > 0) {
			const random = Math.floor(Math.random() * alertsLength);
			this._alertService.dismissAlert(alerts()[random].id);
		}
	}

	dismissAll(): void {
		this._alertService.dismissAll();
	}

	// eslint-disable-next-line class-methods-use-this
	ngAfterViewInit(): void {
		document.querySelector('.sb-show-main.sb-main-padded')?.setAttribute('style', 'padding: 0');

		this.addDanger();
		this.addInfo();
		this.addWarning();
		this.addSuccess();
	}
}

export default {
	title: 'Components/Alert Group',
	component: AlertGroupComponent,
	decorators: [
		moduleMetadata({
			imports: [RouterTestingModule],
			declarations: [AddAlertsComponent],
		}),
	],
	parameters: {
		docs: {
			page: readme,
		},
		controls: {
			exclude: [],
		},
	},
	argTypes: {
		icon: {
			control: { type: 'text' },
		},
	},
} as Meta;

const html = String.raw;

export const Example: StoryFn = () => ({
	template: html`<fudis-alert-group /><example-add-alerts /> `,
});
