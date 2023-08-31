import { TestBed } from '@angular/core/testing';

import { FudisAlertService } from './alert.service';

describe('FudisAlertService', () => {
	let service: FudisAlertService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(FudisAlertService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
