// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { AfterViewInit, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import readme from '../readme.mdx';
import { AlertGroupComponent } from './alert-group.component';
import { FudisAlertService } from '../alert-service/alert.service';
import { FudisAlert } from '../../../types/miscellaneous';
import { FudisIdService } from '../../../utilities/id-service.service';

@Component({
	selector: 'example-add-alerts',
	template: `<div [style]="'margin-top:' + _marginCounter + 'rem'">
		<fudis-grid [columns]="4" [width]="'sm'">
			<fudis-button [label]="'Add danger'" (handleClick)="addDanger()" />
			<fudis-button [label]="'Add warning'" (handleClick)="addWarning()" />
			<fudis-button [label]="'Add success'" (handleClick)="addSuccess()" />
			<fudis-button [label]="'Add info'" (handleClick)="addInfo()" />

			<fudis-button [label]="'Dismiss one random'" (handleClick)="dismissRandom()" />
			<fudis-button [label]="'Dismiss all'" (handleClick)="dismissAll()" />
		</fudis-grid>
	</div>`,
})
class AddAlertsComponent implements AfterViewInit {
	constructor(
		private _alertService: FudisAlertService,
		private _idService: FudisIdService
	) {}

	protected _marginCounter = 2;

	protected _alerts = this._alertService.getAlerts();

	addDanger(): void {
		const newAlert: FudisAlert = {
			message: 'Something dangerous happened',
			type: 'danger',
			id: this._idService.getNewId('alert'),
		};

		this._marginCounter += 2;

		this._alertService.addAlert(newAlert);
	}

	addWarning(): void {
		const newAlert: FudisAlert = {
			message: 'Something dangerous MIGHT happen',
			type: 'warning',
			id: this._idService.getNewId('alert'),
		};

		this._marginCounter += 2;

		this._alertService.addAlert(newAlert);
	}

	addSuccess(): void {
		const newAlert: FudisAlert = {
			message: 'Yippee Ki-Yay! You were successful!',
			type: 'success',
			id: this._idService.getNewId('alert'),
		};

		this._marginCounter += 2;

		this._alertService.addAlert(newAlert);
	}

	addInfo(): void {
		const newAlert: FudisAlert = {
			message: 'Nothing special here.',
			type: 'info',
			id: this._idService.getNewId('alert'),
		};

		this._marginCounter += 2;

		this._alertService.addAlert(newAlert);
	}

	dismissRandom(): void {
		const alerts = this._alertService.getAlerts();
		const alertsLength = alerts().length;

		if (alertsLength > 0) {
			const random = Math.floor(Math.random() * alertsLength);
			this._alertService.dismissAlert(alerts()[random].id);
			this._marginCounter -= 2;
		}
	}

	dismissAll(): void {
		this._alertService.dismissAll();

		this._marginCounter = 2;
	}

	// eslint-disable-next-line class-methods-use-this
	ngAfterViewInit(): void {
		document.querySelector('.sb-show-main.sb-main-padded')?.setAttribute('style', 'padding: 0');
	}
}

export default {
	title: 'Components/Alert Group',
	component: AlertGroupComponent,
	decorators: [
		moduleMetadata({
			declarations: [AddAlertsComponent],
			imports: [RouterModule],
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
