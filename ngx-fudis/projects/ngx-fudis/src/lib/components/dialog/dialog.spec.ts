import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { FudisDialog } from './dialog';

describe('FudisDialogService', () => {
	let service: FudisDialog;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [MatDialogModule],
			providers: [FudisDialog],
		});
		service = TestBed.inject(FudisDialog);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
