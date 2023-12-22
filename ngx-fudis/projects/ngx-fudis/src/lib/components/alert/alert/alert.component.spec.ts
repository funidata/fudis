/* eslint-disable max-classes-per-file */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { Component } from '@angular/core';
import { getElement, sortClasses } from '../../../../../utilities/tests/utilities';
import { AlertComponent } from './alert.component';
import { FudisDialogService } from '../../../services/dialog/dialog.service';
import { BodyTextComponent } from '../../typography/body-text/body-text.component';
import { IconComponent } from '../../icon/icon.component';
import { LinkComponent } from '../../link/link.component';
import { FudisAlertService } from '../../../services/alert/alert.service';
import { FudisFocusService } from '../../../services/focus/focus.service';
import { FudisAlert } from '../../../types/miscellaneous';
import { AlertGroupComponent } from '../alert-group/alert-group.component';
import { ButtonComponent } from '../../button/button.component';

const testMessage = 'Test message for alert';
const testHtmlId = 'test-html-id';
const testButtonId = 'test-button-id';
const testLinkTitle = 'Test link title';
const testRouterLinkUrl = '/test/alert/url';

@Component({
	selector: 'fudis-mock-component',
	template: `<div class="mock-container">
		<fudis-alert-group />
		<fudis-button [label]="'Test button'" />
	</div>`,
})
class MockAlertComponent {
	constructor(private _alertService: FudisAlertService) {
		const firstAlert: FudisAlert = {
			message: 'Test message',
			id: 'my-test-id-1',
			type: 'info',
		};

		_alertService.addAlert(firstAlert);

		const secondAlert: FudisAlert = {
			message: 'Second test message',
			id: 'my-test-id-2',
			type: 'warning',
			linkTitle: 'Test link',
			routerLinkUrl: '/test/url',
		};
		this._alertService.addAlert(secondAlert);
	}
}

describe('AlertComponent', () => {
	let component: AlertComponent;
	let fixture: ComponentFixture<AlertComponent> | ComponentFixture<MockAlertComponent>;
	let alertService: FudisAlertService;
	let focusService: FudisFocusService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				AlertComponent,
				AlertGroupComponent,
				ButtonComponent,
				MockAlertComponent,
				BodyTextComponent,
				MockComponent(IconComponent),
				LinkComponent,
			],
			imports: [MatDialogModule, RouterTestingModule],
			providers: [FudisDialogService, FudisAlertService],
		});
		fixture = TestBed.createComponent(AlertComponent);
		component = fixture.componentInstance;
		component.buttonId = testButtonId;
		component.htmlId = testHtmlId;
		component.message = testMessage;

		fixture.detectChanges();
	});

	describe('basic inputs', () => {
		it('should create alert with basic inputs', () => {
			fixture.detectChanges();

			const element = getElement(fixture, '.fudis-alert');

			// Test @Input() htmlId
			expect(element.getAttribute('id')).toEqual(testHtmlId);

			// Test @Input() buttonId
			expect(element.querySelector('button')?.getAttribute('id')).toEqual(testButtonId);

			// Test @Input() message
			expect(element.querySelector('button')?.getAttribute('aria-label')).toEqual(`${testMessage}, Close`);

			// Test @Input() message
			expect(element.querySelector('p')?.innerText).toEqual(testMessage);

			// Test that link does not exist by default
			expect(element.querySelector('fudis-link')).toBeFalsy();
		});

		it('should create alert with a link', () => {
			component.linkTitle = testLinkTitle;
			component.routerLinkUrl = testRouterLinkUrl;
			component.initialFocus = true;

			fixture.detectChanges();

			const linkElement = getElement(fixture, '.fudis-alert p fudis-link');

			// Test that inputs forwarded to Fudis Link are correct
			expect(linkElement).toBeTruthy();

			expect(sortClasses(linkElement.className)).toEqual(['fudis-alert__link']);

			expect(linkElement?.getAttribute('aria-label')).toEqual(testMessage);

			expect(linkElement?.getAttribute('ng-reflect-initial-focus')).toEqual('true');

			expect(linkElement?.getAttribute('ng-reflect-router-link-url')).toEqual(testRouterLinkUrl);

			expect(linkElement?.getAttribute('ng-reflect-link-title')).toEqual(testLinkTitle);
		});
	});

	describe('CSS classes', () => {
		it('should create alert variations with proper CSS classes', () => {
			const element = getElement(fixture, '.fudis-alert');

			expect(sortClasses(element.className)).toEqual(sortClasses('fudis-alert fudis-alert__info'));

			component.variant = 'danger';

			fixture.detectChanges();

			expect(sortClasses(element.className)).toEqual(sortClasses('fudis-alert fudis-alert__danger'));

			component.variant = 'success';

			fixture.detectChanges();

			expect(sortClasses(element.className)).toEqual(sortClasses('fudis-alert fudis-alert__success'));

			component.variant = 'warning';

			fixture.detectChanges();

			expect(sortClasses(element.className)).toEqual(sortClasses('fudis-alert fudis-alert__warning'));

			component.variant = 'info';

			fixture.detectChanges();

			expect(sortClasses(element.className)).toEqual(sortClasses('fudis-alert fudis-alert__info'));
		});
	});

	describe('close button interaction', () => {
		beforeEach(() => {
			alertService = TestBed.inject(FudisAlertService) as jasmine.SpyObj<FudisAlertService>;
			spyOn(alertService, 'dismissAlertFromButton');
			fixture.detectChanges();
		});

		it('should emit events when the close button is clicked', () => {
			let clicked = false;

			component.handleClose.subscribe(() => {
				clicked = true;
			});

			fixture.detectChanges();

			const closeButton = getElement(fixture, '.fudis-alert .fudis-alert__close');

			closeButton.click();

			expect(clicked).withContext('Click event received').toEqual(true);

			fixture.detectChanges();

			expect(alertService.dismissAlertFromButton).toHaveBeenCalledWith(testButtonId);
		});
	});

	describe('Focus and blur events', () => {
		beforeEach(() => {
			fixture = TestBed.createComponent(MockAlertComponent);
			focusService = TestBed.inject(FudisFocusService) as jasmine.SpyObj<FudisFocusService>;
			spyOn(focusService, 'setFocusTarget');
			spyOn(focusService, 'getFocusTarget');
			alertService = TestBed.inject(FudisAlertService) as jasmine.SpyObj<FudisAlertService>;
			spyOn(alertService, 'addAlert');
			spyOn(alertService, 'updateAlertLinkFocusState');
			fixture.detectChanges();
		});

		// it('should emit info to focusService when focusing on closeButton', () => {
		// 	const button = getElement(fixture, '.fudis-button');

		// 	button.focus();

		// 	const closeButton = getElement(fixture, '.fudis-alert .fudis-alert__close');

		// 	closeButton.focus();

		// 	expect(focusService.setFocusTarget).toHaveBeenCalledWith(button);
		// });

		// it('should emit info to focusService when focusing on link in alert', () => {
		// 	const button = getElement(fixture, '.fudis-button');

		// 	button.focus();

		// 	const linkInAlert = getElement(fixture, '.fudis-link__anchor');

		// 	linkInAlert.focus();

		// 	expect(focusService.setFocusTarget).toHaveBeenCalledWith(button);
		// });

		it('should not emit info to focusService when focusing from link to alert close and vice versa', () => {
			const linkInAlert = getElement(fixture, '.fudis-link__anchor');

			linkInAlert.focus();

			const closeButton = getElement(fixture, '.fudis-alert__close');

			closeButton.focus();

			linkInAlert.focus();

			expect(focusService.setFocusTarget).not.toHaveBeenCalledWith(closeButton);

			expect(focusService.setFocusTarget).not.toHaveBeenCalledWith(linkInAlert);
		});

		it('should set focus to close button, if another close is clicked', () => {
			const firstClose = getElement(fixture, '#fudis-alert-1 .fudis-alert__close');
			const secondClose = getElement(fixture, '#fudis-alert-2 .fudis-alert__close');

			spyOn(secondClose, 'focus');

			firstClose.focus();
			firstClose.click();

			expect(secondClose.focus).toHaveBeenCalledWith();
		});

		it('should call getFocusTarget, when all alerts are closed', () => {
			const uiButton = getElement(fixture, '.fudis-button');

			uiButton.focus();

			const firstClose = getElement(fixture, '#fudis-alert-1 .fudis-alert__close');

			const secondClose = getElement(fixture, '#fudis-alert-2 .fudis-alert__close');

			firstClose.click();
			secondClose.click();

			expect(focusService.getFocusTarget).toHaveBeenCalledWith();
		});

		it('should not call getFocusTarget, if only one is closed', () => {
			const uiButton = getElement(fixture, '.fudis-button');

			uiButton.focus();

			const firstClose = getElement(fixture, '#fudis-alert-1 .fudis-alert__close');

			firstClose.click();

			expect(focusService.getFocusTarget).not.toHaveBeenCalledWith();
		});

		// it('should update initialFocus, when blurring from link', () => {
		// 	const alertLink = getElement(fixture, '#fudis-alert-2 .fudis-link__anchor');

		// 	const secondClose = getElement(fixture, '#fudis-alert-2 .fudis-alert__close');

		// 	alertLink.focus();

		// 	secondClose.focus();

		// 	expect(alertService.updateAlertLinkFocusState).toHaveBeenCalledWith('fudis-alert-2');
		// });
	});
});
