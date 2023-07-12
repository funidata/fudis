import { TestBed } from '@angular/core/testing';

import { FudisDescriptionListItemDetailsService } from './description-list-item-details.service';

describe('DescriptionListItemDetailsService', () => {
	let service: FudisDescriptionListItemDetailsService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(FudisDescriptionListItemDetailsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
