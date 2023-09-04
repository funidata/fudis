import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogModule } from '@angular/material/dialog';
import { AlertGroupComponent } from './alert-group.component';
import { FudisDialogService } from '../../../services/dialog/dialog.service';
import { BodyTextComponent } from '../../typography/body-text/body-text.component';

describe('AlertGroupComponent', () => {
	let component: AlertGroupComponent;
	let fixture: ComponentFixture<AlertGroupComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [MatDialogModule],
			declarations: [AlertGroupComponent, BodyTextComponent],
			providers: [FudisDialogService],
		});
		fixture = TestBed.createComponent(AlertGroupComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
