import { TestBed } from '@angular/core/testing';
import { FudisErrorSummaryService } from './error-summary.service';
import { FudisInternalErrorSummaryService } from './internal-error-summary.service';

describe('ErrorSummaryService', () => {
  let service: FudisErrorSummaryService;

  beforeEach(() => {
    const spy = {
      reloadErrors: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        FudisErrorSummaryService,
        { provide: FudisInternalErrorSummaryService, useValue: spy },
      ],
    });
    service = TestBed.inject(FudisErrorSummaryService);

    jest.spyOn(service, 'reloadErrors').mockImplementation(() => {});
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call reloadErrors', () => {
    service.reloadErrors();

    expect(service.reloadErrors).toHaveBeenCalledWith();
  });
});
