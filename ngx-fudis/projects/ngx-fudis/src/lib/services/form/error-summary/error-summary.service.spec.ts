import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FudisErrorSummaryService } from './error-summary.service';
import { FudisInternalErrorSummaryService } from './internal-error-summary.service';

describe('ErrorSummaryService', () => {
	let service: FudisErrorSummaryService;
	let internalServiceSpy: jasmine.SpyObj<FudisInternalErrorSummaryService>;

	beforeEach(() => {
		const spy = jasmine.createSpyObj('FudisInternalErrorSummaryService', ['reloadErrors']);

		TestBed.configureTestingModule({
			providers: [FudisErrorSummaryService, { provide: FudisInternalErrorSummaryService, useValue: spy }],
		});
		service = TestBed.inject(FudisErrorSummaryService);
		internalServiceSpy = TestBed.inject(
			FudisInternalErrorSummaryService
		) as jasmine.SpyObj<FudisInternalErrorSummaryService>;

		spyOn(service, 'reloadErrors');
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should call reloadErrors', () => {
		service.reloadErrors();

		expect(service.reloadErrors).toHaveBeenCalledWith();
	});

	it('should return mocked value from a spy', () => {
		const mockValue = jasmine.createSpyObj('FudisInternalErrorSummaryService', { reloadErrors: of() });
		internalServiceSpy.reloadErrors.and.returnValue(mockValue);

		// eslint-disable-next-line @typescript-eslint/dot-notation
		expect(service['_errorSummaryService'].reloadErrors())
			.withContext('service returned mock value')
			.toEqual(mockValue);

		expect(internalServiceSpy.reloadErrors.calls.count()).withContext('spy method was called once').toEqual(1);

		expect(internalServiceSpy.reloadErrors.calls.mostRecent().returnValue).toEqual(mockValue);
	});
});
