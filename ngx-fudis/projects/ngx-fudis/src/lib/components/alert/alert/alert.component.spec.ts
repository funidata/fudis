import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { checkClasses, getElement, sortClasses } from 'projects/ngx-fudis/utilities/tests/utilities';
import { AlertComponent } from './alert.component';
import { FudisDialogService } from '../../../services/dialog/dialog.service';
import { BodyTextComponent } from '../../typography/body-text/body-text.component';
import { IconComponent } from '../../icon/icon.component';
import { LinkComponent } from '../../link/link.component';
import { FudisAlertService } from '../../../services/alert/alert.service';

const testMessage = 'Test message for alert';
const testHtmlId = 'test-html-id';
const testButtonId = 'test-button-id';
const testLinkTitle = 'Test link title';
const testRouterLinkUrl = '/test/alert/url';

describe('AlertComponent', () => {
	let component: AlertComponent;
	let fixture: ComponentFixture<AlertComponent>;
	let alertService: FudisAlertService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AlertComponent, BodyTextComponent, MockComponent(IconComponent), LinkComponent],
			imports: [MatDialogModule, RouterTestingModule],
			providers: [FudisDialogService, FudisAlertService],
		});
		fixture = TestBed.createComponent(AlertComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	describe('basic inputs', () => {
		it('should create alert with basic inputs', () => {
			component.buttonId = testButtonId;
			component.htmlId = testHtmlId;
			component.message = testMessage;

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
			component.buttonId = testButtonId;
			component.htmlId = testHtmlId;
			component.message = testMessage;
			component.linkTitle = testLinkTitle;
			component.routerLinkUrl = testRouterLinkUrl;
			component.initialFocus = true;

			fixture.detectChanges();

			const linkElement = getElement(fixture, '.fudis-alert p fudis-link');

			// Test that inputs forwarded to Fudis Link are correct
			expect(linkElement).toBeTruthy();

			expect(checkClasses(linkElement, 'fudis-alert__link')).toBeTrue();

			expect(linkElement?.getAttribute('aria-label')).toEqual(testMessage);
			expect(linkElement?.getAttribute('ng-reflect-initial-focus')).toEqual('true');
			expect(linkElement?.getAttribute('ng-reflect-router-link-url')).toEqual(testRouterLinkUrl);
			expect(linkElement?.getAttribute('ng-reflect-link-title')).toEqual(testLinkTitle);
		});
	});

	describe('CSS classes', () => {
		it('should create alert variations with proper CSS classes', () => {
			component.buttonId = testButtonId;
			component.htmlId = testHtmlId;
			component.message = testMessage;

			fixture.detectChanges();

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

	describe('close button clicked', () => {
		beforeEach(() => {
			alertService = TestBed.inject(FudisAlertService) as jasmine.SpyObj<FudisAlertService>;
			spyOn(alertService, 'dismissAlertFromButton');
			fixture.detectChanges();
		});

		it('should emit events when the button is enabled', () => {
			let clicked = false;
			component.message = 'Testing clicking';

			component.buttonId = testButtonId;

			component.handleClose.subscribe(() => {
				clicked = true;
			});

			fixture.detectChanges();

			const element = getElement(fixture, '.fudis-alert .fudis-alert__close');

			element.click();

			expect(clicked).withContext('Click event received').toEqual(true);

			fixture.detectChanges();

			expect(alertService.dismissAlertFromButton).toHaveBeenCalledWith(testButtonId);
		});
	});
});
