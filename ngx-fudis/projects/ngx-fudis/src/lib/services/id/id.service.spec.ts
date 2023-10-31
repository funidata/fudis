import { TestBed } from '@angular/core/testing';

import { FudisIdService } from './id.service';

const testGetNewId = () => {
	const allTypes:  = ['']
}

fdescribe('FudisIdServiceService', () => {
	let idService: FudisIdService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		idService = TestBed.inject(FudisIdService);
	});

	it('should be created', () => {
		expect(idService).toBeTruthy();
	});

	it('should return correct id with getNewId()', () => {
		const firstId = idService.getNewId('alert');
		const secondId = idService.getNewId('alert');
		const thirdId = idService.getNewId('alert');

		expect(firstId).toEqual('fudis-alert-1');
		expect(secondId).toEqual('fudis-alert-2');
		expect(thirdId).toEqual('fudis-alert-3');
	});
});
