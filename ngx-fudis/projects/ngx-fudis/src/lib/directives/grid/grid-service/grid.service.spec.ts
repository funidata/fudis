import { TestBed } from '@angular/core/testing';

import { FudisGridService } from './grid.service';

describe('FudisGridService', () => {
	let service: FudisGridService;

	beforeEach(() => {
		TestBed.configureTestingModule({ providers: [FudisGridService] });
		service = TestBed.inject(FudisGridService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
