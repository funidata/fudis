import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonComponent } from '../button/button.component';
import { DialogComponent } from './dialog.component';
import { FudisDialogService } from '../../services/dialog/dialog.service';
import { AlertGroupComponent } from '../alert/alert-group/alert-group.component';

describe('DialogComponent', () => {
	let component: DialogComponent;
	let fixture: ComponentFixture<DialogComponent>;
	let dialogService: FudisDialogService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DialogComponent, AlertGroupComponent, MockComponent(ButtonComponent)],
			imports: [MatDialogModule],
			providers: [FudisDialogService],
		}).compileComponents();

		dialogService = TestBed.inject(FudisDialogService);

		fixture = TestBed.createComponent(DialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});

	it('should have correct size attribute', () => {
		expect(component.size).toBe('md');

		component.size = 'sm';
		fixture.detectChanges();
		component.ngOnInit();

		expect(component.size).toBe('sm');

		component.size = 'lg';
		fixture.detectChanges();
		component.ngOnInit();

		expect(component.size).toBe('lg');

		component.size = 'initial';
		fixture.detectChanges();
		component.ngOnInit();

		expect(component.size).toBe('initial');
	});

	it('should call open signal on initialisation', () => {
		const dialogSpy = spyOn(dialogService, 'setDialogOpenSignal').and.callThrough();
		component.ngOnInit();

		expect(dialogSpy).toHaveBeenCalledWith(true);
	});

	it('should call open signal on destroy', () => {
		const dialogSpy = spyOn(dialogService, 'setDialogOpenSignal').and.callThrough();
		component.ngOnDestroy();

		expect(dialogSpy).toHaveBeenCalledWith(false);
	});
});
