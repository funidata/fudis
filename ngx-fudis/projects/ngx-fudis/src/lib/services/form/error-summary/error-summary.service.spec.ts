import { TestBed } from '@angular/core/testing';
import { FudisErrorSummaryService } from './error-summary.service';
import { FudisInternalErrorSummaryService } from './internal-error-summary.service';

describe('ErrorSummaryService', () => {
  let service: FudisErrorSummaryService;

  beforeEach(() => {
    const spy = {
      reloadErrors: jest.fn(),
      updateStrategy: 'reloadOnly',
    };

    TestBed.configureTestingModule({
      providers: [
        FudisErrorSummaryService,
        { provide: FudisInternalErrorSummaryService, useValue: spy },
      ],
    });
    service = TestBed.inject(FudisErrorSummaryService);
    // internalService = TestBed.inject(FudisInternalErrorSummaryService);

    jest.spyOn(service, 'reloadErrors').mockImplementation(() => {});
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call reloadErrors', () => {
    service.reloadErrors();

    expect(service.reloadErrors).toHaveBeenCalledWith();
  });

  it('should set and return update strategy', () => {
    expect(service.updateStrategy).toEqual('reloadOnly');
    service.setUpdateStrategy('all');
    expect(service.updateStrategy).toEqual('all');
    service.setUpdateStrategy('onRemove');
    expect(service.updateStrategy).toEqual('onRemove');
    service.setUpdateStrategy('reloadOnly');
    expect(service.updateStrategy).toEqual('reloadOnly');
  });
});
