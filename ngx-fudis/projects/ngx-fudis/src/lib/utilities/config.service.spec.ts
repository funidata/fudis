import { TestBed } from '@angular/core/testing';

import { FudisConfigService } from './config.service';

describe('ConfigService', () => {
	let service: FudisConfigService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(FudisConfigService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
