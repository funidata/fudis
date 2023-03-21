import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';

describe('FudisDialogService', () => {
	let service: DialogComponent;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [MatDialogModule],
			providers: [DialogComponent],
		});
		service = TestBed.inject(DialogComponent);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
