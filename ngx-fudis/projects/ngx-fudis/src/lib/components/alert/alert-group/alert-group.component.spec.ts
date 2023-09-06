import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogModule } from '@angular/material/dialog';
import { sortClasses } from 'projects/ngx-fudis/utilities/tests/utilities';
import { MockComponent } from 'ng-mocks';
import { AlertGroupComponent } from './alert-group.component';
import { FudisDialogService } from '../../../services/dialog/dialog.service';
import { BodyTextComponent } from '../../typography/body-text/body-text.component';
import { FudisAlertService } from '../../../services/alert/alert.service';
import { FudisAlert } from '../../../types/miscellaneous';
import { AlertComponent } from '../alert/alert.component';
import { IconComponent } from '../../icon/icon.component';

describe('AlertGroupComponent', () => {
	let component: AlertGroupComponent;
	let fixture: ComponentFixture<AlertGroupComponent>;
	let alertService: FudisAlertService;
	let dialogService: FudisDialogService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [MatDialogModule],
			declarations: [AlertGroupComponent, BodyTextComponent, AlertComponent, MockComponent(IconComponent)],
			providers: [FudisDialogService],
		});
		fixture = TestBed.createComponent(AlertGroupComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	function getAlertGroup(): HTMLElement {
		return fixture.nativeElement.querySelector('section') as HTMLElement;
	}

	describe('Basic inputs', () => {
		it('should have default CSS classes', () => {
			const element = getAlertGroup();

			expect(sortClasses(element.className)).toEqual(sortClasses('fudis-alert-group fudis-alert-group__fixed'));
		});

		it('should have absolute position', () => {
			component.position = 'absolute';
			fixture.detectChanges();

			const element = getAlertGroup();

			expect(sortClasses(element.className)).toEqual(sortClasses('fudis-alert-group fudis-alert-group__absolute'));
		});

		it('should have static position', () => {
			component.position = 'static';
			fixture.detectChanges();

			const element = getAlertGroup();

			expect(sortClasses(element.className)).toEqual(sortClasses('fudis-alert-group fudis-alert-group__static'));
		});
	});

	describe('Functionality with services', () => {
		beforeEach(() => {
			alertService = TestBed.inject(FudisAlertService) as jasmine.SpyObj<FudisAlertService>;
			dialogService = TestBed.inject(FudisDialogService) as jasmine.SpyObj<FudisDialogService>;

			spyOn(alertService, 'getAlertsSignal');

			const firstAlert: FudisAlert = {
				message: 'Test message',
				id: 'my-test-id-1',
				type: 'info',
			};

			const secondAlert: FudisAlert = {
				message: 'Second test message',
				id: 'my-test-id-2',
				type: 'warning',
			};
			alertService.addAlert(firstAlert);
			alertService.addAlert(secondAlert);
		});

		it('should have two alerts as children', () => {
			fixture.detectChanges();

			const childAlerts = fixture.nativeElement.querySelectorAll('fudis-alert');

			expect(childAlerts.length).toEqual(2);
		});

		it('should have one alert as children after one is dismissed', () => {
			alertService.dismissAlert('my-test-id-1');
			fixture.detectChanges();

			const childAlerts = fixture.nativeElement.querySelectorAll('fudis-alert');

			expect(childAlerts.length).toEqual(1);

			expect(childAlerts[0].getAttribute('id')).toEqual('my-test-id-2');
		});

		it('should not be visible, if Dialog is open', () => {
			dialogService.setDialogOpenSignal(true);

			fixture.detectChanges();

			expect(fixture.nativeElement.querySelector('section')).toBeNull();
			expect(component.getVisibleStatus()).toBeFalse();
		});

		it('should be visible, if Dialog is closed', () => {
			dialogService.setDialogOpenSignal(false);

			fixture.detectChanges();

			expect(fixture.nativeElement.querySelector('section')).toBeDefined();
			expect(component.getVisibleStatus()).toBeTrue();
		});

		it('should not be visible, if Dialog is not open and Alert Group is inside dialog', () => {
			component.insideDialog = true;

			component.ngAfterViewInit();

			fixture.detectChanges();

			expect(fixture.nativeElement.querySelector('section')).toBeNull();
			expect(component.getVisibleStatus()).toBeFalse();
		});
	});
});
