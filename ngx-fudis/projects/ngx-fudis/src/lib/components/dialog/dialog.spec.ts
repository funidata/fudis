import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { DialogService } from './dialog.service';

describe('DialogServiceService', () => {
	let service: DialogService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [MatDialogModule],
			providers: [DialogService],
		});
		service = TestBed.inject(DialogService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
