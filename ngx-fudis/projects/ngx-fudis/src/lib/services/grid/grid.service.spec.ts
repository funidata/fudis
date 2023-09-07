import { TestBed } from '@angular/core/testing';

import { FudisGridService } from './grid.service';
import { FudisBreakpointService } from '../breakpoint/breakpoint.service';

describe('FudisGridService', () => {
	let service: FudisGridService;

	beforeEach(() => {
		TestBed.configureTestingModule({ providers: [FudisGridService, FudisBreakpointService] });
		service = TestBed.inject(FudisGridService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
