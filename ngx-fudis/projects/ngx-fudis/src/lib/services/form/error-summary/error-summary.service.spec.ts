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

    jest.spyOn(service, 'reloadAllErrors').mockImplementation(() => {});
    jest.spyOn(service, 'reloadFormErrors').mockImplementation(() => {});
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call reloadAllErrors', () => {
    service.reloadAllErrors();

    expect(service.reloadAllErrors).toHaveBeenCalledWith();
  });

  it('should call reloadFormErrors', () => {
    service.reloadFormErrors('my-test-id', false);

    expect(service.reloadFormErrors).toHaveBeenCalledWith('my-test-id', false);
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
