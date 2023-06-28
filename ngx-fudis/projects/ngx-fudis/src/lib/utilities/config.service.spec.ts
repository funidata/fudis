import { TestBed } from '@angular/core/testing';

import { FudisTranslationConfigService } from './config.service';

describe('ConfigService', () => {
	let service: FudisTranslationConfigService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(FudisTranslationConfigService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
