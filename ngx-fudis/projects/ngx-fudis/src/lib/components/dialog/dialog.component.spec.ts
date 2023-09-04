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

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DialogComponent, AlertGroupComponent, MockComponent(ButtonComponent)],
			imports: [MatDialogModule],
			providers: [FudisDialogService],
		}).compileComponents();

		fixture = TestBed.createComponent(DialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
