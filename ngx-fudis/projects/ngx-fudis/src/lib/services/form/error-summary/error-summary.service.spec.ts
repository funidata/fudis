import { TestBed } from '@angular/core/testing';
import { FudisErrorSummaryService } from './error-summary.service';
import { FudisInternalErrorSummaryService } from './internal-error-summary.service';

describe('ErrorSummaryService', () => {
	let service: FudisErrorSummaryService;
	let internalService: FudisInternalErrorSummaryService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(FudisErrorSummaryService);
		internalService = TestBed.inject(FudisInternalErrorSummaryService);

		spyOn(service, 'reloadErrors');
		spyOn(internalService, 'reloadErrors');
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	// TODO: Do this correctly
	it('should call reloadErrors from InternalErrorSummaryService', () => {
		service.reloadErrors();
		internalService.reloadErrors();

		expect(service.reloadErrors).toHaveBeenCalledWith();
		expect(internalService.reloadErrors).toHaveBeenCalledWith();
	});
});
