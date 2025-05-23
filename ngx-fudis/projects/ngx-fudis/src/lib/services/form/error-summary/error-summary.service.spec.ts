import { TestBed } from '@angular/core/testing';
import { FudisErrorSummaryService } from './error-summary.service';
import { FudisInternalErrorSummaryService } from './internal-error-summary.service';
import {
  FudisErrorSummaryNewError,
  FudisErrorSummaryRemoveError,
} from '../../../types/errorSummary';
import { BehaviorSubject } from 'rxjs';

describe('ErrorSummaryService', () => {
  let service: FudisErrorSummaryService;
  let internalService: FudisInternalErrorSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FudisErrorSummaryService, FudisInternalErrorSummaryService],
    });
    service = TestBed.inject(FudisErrorSummaryService);
    internalService = TestBed.inject(FudisInternalErrorSummaryService);

    jest.spyOn(service, 'reloadAllErrors');
    jest.spyOn(internalService, 'reloadAllErrors');
    jest.spyOn(service, 'reloadFormErrors');
    jest.spyOn(internalService, 'reloadFormErrors');
    jest.spyOn(service, 'addError');
    jest.spyOn(internalService, 'addError');
    jest.spyOn(service, 'removeError');
    jest.spyOn(internalService, 'removeError');
    jest.spyOn(internalService, 'registerNewForm');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call reloadAllErrors', () => {
    service.reloadAllErrors();

    expect(service.reloadAllErrors).toHaveBeenCalled();
    expect(internalService.reloadAllErrors).toHaveBeenCalled();
  });

  it('should call reloadFormErrors', () => {
    service.reloadFormErrors('my-test-id', false);

    expect(service.reloadFormErrors).toHaveBeenCalledWith('my-test-id', false);
    expect(internalService.reloadFormErrors).toHaveBeenCalledWith('my-test-id', false);
  });

  it('should set and return update strategy', () => {
    expect(service.updateStrategy).toEqual('reloadOnly');
    expect(internalService.updateStrategy).toEqual('reloadOnly');
    service.setUpdateStrategy('all');
    expect(service.updateStrategy).toEqual('all');
    expect(internalService.updateStrategy).toEqual('all');
    service.setUpdateStrategy('onRemove');
    expect(service.updateStrategy).toEqual('onRemove');
    expect(internalService.updateStrategy).toEqual('onRemove');
    service.setUpdateStrategy('reloadOnly');
    expect(service.updateStrategy).toEqual('reloadOnly');
    expect(internalService.updateStrategy).toEqual('reloadOnly');
  });

  it('should send new string error to service, and on update of same error, reload errors after Error Summary is set to true', () => {
    const newError: FudisErrorSummaryNewError = {
      id: 'my-error-id',
      formId: 'my-form-id',
      focusId: 'my-focus-id',
      message: 'My fancy message',
    };

    service.addError(newError.id, newError.formId, newError.focusId, newError.message);

    expect(service.addError).toHaveBeenCalledWith(
      newError.id,
      newError.formId,
      newError.focusId,
      newError.message,
    );
    expect(internalService.addError).toHaveBeenCalledWith(newError);

    expect(internalService.registerNewForm).toHaveBeenCalledWith('my-form-id');

    internalService.setErrorSummaryVisibility('my-form-id', true);

    expect(internalService.reloadFormErrors).not.toHaveBeenCalled();

    service.addError(newError.id, newError.formId, newError.focusId, 'message is updated');

    expect(internalService.reloadFormErrors).toHaveBeenCalledWith('my-form-id', false);
  });

  it('should send new Observable error to service, and on update of same error, reload errors after Error Summary is set to true', () => {
    const observableError = new BehaviorSubject<string>('First value of error');

    const newError: FudisErrorSummaryNewError = {
      id: 'my-error-id',
      formId: 'my-form-id',
      focusId: 'my-focus-id',
      message: 'First value of error',
    };

    service.addError(newError.id, newError.formId, newError.focusId, observableError);

    expect(service.addError).toHaveBeenCalledWith(
      newError.id,
      newError.formId,
      newError.focusId,
      observableError,
    );
    expect(internalService.addError).toHaveBeenCalledWith(newError);

    expect(internalService.registerNewForm).toHaveBeenCalled();

    internalService.setErrorSummaryVisibility('my-form-id', true);

    expect(internalService.reloadFormErrors).not.toHaveBeenCalled();

    observableError.next('Updated observable error value');

    const updatedError = { ...newError, message: 'Updated observable error value' };

    expect(internalService.addError).toHaveBeenCalledWith(updatedError);

    expect(internalService.reloadFormErrors).toHaveBeenCalledWith('my-form-id', false);
  });

  it('should send remove error from service', () => {
    const removeError: FudisErrorSummaryRemoveError = {
      id: 'my-error-id',
      formId: 'my-form-id',
      focusId: 'my-focus-id',
    };

    service.removeError(removeError.id, removeError.formId, removeError.focusId);

    expect(service.removeError).toHaveBeenCalledWith(
      removeError.id,
      removeError.formId,
      removeError.focusId,
    );

    expect(internalService.removeError).toHaveBeenCalledWith(removeError);

    expect(internalService.reloadFormErrors).not.toHaveBeenCalled();
  });

  it('should subscribe to Observable message, and on remove unsubscribe', () => {
    const observableError = new BehaviorSubject<string>('First value of error');

    const newError: FudisErrorSummaryNewError = {
      id: 'my-error-id',
      formId: 'my-form-id',
      focusId: 'my-focus-id',
      message: 'First value of error',
    };

    const removeError: FudisErrorSummaryRemoveError = {
      id: 'my-error-id',
      formId: 'my-form-id',
      focusId: 'my-focus-id',
    };

    service.addError(newError.id, newError.formId, newError.focusId, observableError);

    expect(service.addError).toHaveBeenCalledWith(
      newError.id,
      newError.formId,
      newError.focusId,
      observableError,
    );
    expect(internalService.addError).toHaveBeenCalledWith(newError);

    service.removeError(removeError.id, removeError.formId, removeError.focusId);

    expect(internalService.removeError).toHaveBeenCalledWith(removeError);

    observableError.next('Updated observable error value');

    expect(service.addError).not.toHaveBeenCalledTimes(2);
    expect(internalService.addError).not.toHaveBeenCalledTimes(2);
  });
});
