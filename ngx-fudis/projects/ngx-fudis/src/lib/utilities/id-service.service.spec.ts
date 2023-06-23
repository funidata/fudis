import { TestBed } from '@angular/core/testing';

import { FudisIdService } from './id-service.service';

describe('FudisIdServiceService', () => {
	let service: FudisIdService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(FudisIdService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
