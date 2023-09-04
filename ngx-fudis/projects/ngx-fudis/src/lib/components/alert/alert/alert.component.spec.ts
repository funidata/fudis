import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AlertComponent } from './alert.component';
import { FudisDialogService } from '../../../services/dialog/dialog.service';
import { BodyTextComponent } from '../../typography/body-text/body-text.component';
import { IconComponent } from '../../icon/icon.component';

describe('AlertComponent', () => {
	let component: AlertComponent;
	let fixture: ComponentFixture<AlertComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AlertComponent, BodyTextComponent, IconComponent],
			imports: [MatDialogModule],
			providers: [FudisDialogService],
		});
		fixture = TestBed.createComponent(AlertComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
