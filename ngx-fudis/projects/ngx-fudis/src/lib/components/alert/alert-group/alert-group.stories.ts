// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { AfterViewInit, Component, Signal, effect } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import readme from '../readme.mdx';
import { AlertGroupComponent } from './alert-group.component';
import { FudisAlertService } from '../alert-service/alert.service';
import { FudisAlert, FudisAlertElement } from '../../../types/miscellaneous';
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
	) {
		effect(() => {
			this._alerts = this._alertService.getAlertsSignal();
			this._marginCounter = 2 + this._alerts().length * 2;
		});
	}

	protected _marginCounter = 2;

	protected _alerts: Signal<FudisAlertElement[]>;

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
			routerLinkUrl: '/',
			linkTitle: 'More info',
		};

		this._alertService.addAlert(newAlert);
	}

	addSuccess(): void {
		const newAlert: FudisAlert = {
			message: 'Yippee Ki-Yay! You were successful!',
			type: 'success',
			id: 'my-own-id-3',
			routerLinkUrl: '/',
			linkTitle: 'More info',
		};

		this._alertService.addAlert(newAlert);
	}

	addInfo(): void {
		const newAlert: FudisAlert = {
			message: 'Nothing special here.',
			type: 'info',
			id: 'my-own-id-4',
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
