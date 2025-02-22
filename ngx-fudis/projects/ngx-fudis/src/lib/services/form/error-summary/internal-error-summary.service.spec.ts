import { TestBed } from '@angular/core/testing';
import {
  FudisErrorSummaryAllErrors,
  FudisErrorSummaryNewError,
  FudisErrorSummaryFormErrors,
  FudisErrorSummaryRemoveError,
} from '../../../types/errorSummary';
import { FudisInternalErrorSummaryService } from './internal-error-summary.service';

describe('InternalErrorSummaryService', () => {
  let service: FudisInternalErrorSummaryService;
  let currentErrors: FudisErrorSummaryAllErrors;

  const firstError: FudisErrorSummaryNewError = {
    focusId: 'first-error',
    formId: 'test-form-id-1',
    message: 'Test label: There is something wrong',
    id: 'required',
  };

  const firstErrorAnotherErrorType: FudisErrorSummaryNewError = {
    ...firstError,
    message: 'Test label: Email is not valid',
    id: 'email',
  };

  const secondError: FudisErrorSummaryNewError = {
    focusId: 'second-error',
    formId: 'test-form-id-2',
    message: 'Test label: You need to fix also this',
    id: 'required',
  };

  const firstErrorFromService: FudisErrorSummaryFormErrors = {
    'first-error': {
      required: 'Test label: There is something wrong',
      email: 'Test label: Email is not valid',
    },
  };

  const secondErrorFromService: FudisErrorSummaryFormErrors = {
    'second-error': {
      required: 'Test label: You need to fix also this',
    },
  };

  const firstErrorRemoveItem: FudisErrorSummaryRemoveError = {
    focusId: 'first-error',
    formId: 'test-form-id-1',
    id: 'required',
  };

  const fieldSetForErrorSummary = {
    id: 'unique-fieldset-id',
    formId: 'test-form-id-1',
    title: 'Fill all the information',
  };

  const sectionForErrorSummary = {
    id: 'unique-section-id',
    formId: 'test-form-id-1',
    title: 'Main section',
  };

  const emptyResult = {
    'test-form-id-1': { sections: {}, fieldsets: {} },
    'test-form-id-2': { sections: {}, fieldsets: {} },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FudisInternalErrorSummaryService],
    });

    service = TestBed.inject(FudisInternalErrorSummaryService);

    service.registerNewForm('test-form-id-1');
    service.registerNewForm('test-form-id-2');

    jest.spyOn(service, 'reloadFormErrors').mockImplementation(() => {});
  });

  const changeAndCheckErrorContent = () => {
    const firstErrorWithContentUpdate: FudisErrorSummaryNewError = {
      ...firstError,
      message: 'Test label: Something new',
    };

    service.addError(firstError);

    expect(service.errors['test-form-id-1']['first-error']['required']).toEqual(
      'Test label: There is something wrong',
    );
    service.addError(firstErrorWithContentUpdate);
    expect(service.errors['test-form-id-1']['first-error']['required']).toEqual(
      'Test label: Something new',
    );
  };

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Structure', () => {
    it('should add fieldset information to currentFieldsets array', () => {
      service.addFieldset(fieldSetForErrorSummary);

      const withFieldset = {
        'test-form-id-1': {
          sections: {},
          fieldsets: {
            'unique-fieldset-id': 'Fill all the information',
          },
        },
        'test-form-id-2': { sections: {}, fieldsets: {} },
      };

      expect(service.formStructure).toEqual(withFieldset);
    });

    it('should remove fieldset information from currentFieldsets array', () => {
      service.addFieldset(fieldSetForErrorSummary);
      service.removeFieldset('test-form-id-1', 'unique-fieldset-id');

      expect(service.formStructure).toEqual(emptyResult);
    });

    it('should add section information to currentSections array', () => {
      service.addSection(sectionForErrorSummary);

      const result = {
        'test-form-id-1': {
          sections: {
            'unique-section-id': 'Main section',
          },
          fieldsets: {},
        },
        'test-form-id-2': { sections: {}, fieldsets: {} },
      };

      expect(service.formStructure).toEqual(result);
    });

    it('should remove section information from currentSections array', () => {
      service.addSection(sectionForErrorSummary);

      service.removeSection('test-form-id-1', 'unique-section-id');

      expect(service.formStructure).toEqual(emptyResult);
    });
  });
  describe('Errors', () => {
    it('should initially return an empty object', () => {
      const errors = service.errorsObservable.value;

      const initial = {};

      expect(errors).toEqual(initial);
    });

    it('should return currentErrorList object containing given errors', () => {
      service.addError(firstError);
      service.addError(secondError);
      service.addError(firstErrorAnotherErrorType);

      currentErrors = {
        'test-form-id-1': firstErrorFromService,
        'test-form-id-2': secondErrorFromService,
      };

      service.reloadFormErrors('test-form-id-1');

      const errors = service.errors;

      expect(errors).toEqual(currentErrors);
    });

    it('should remove object error for respective type', () => {
      // Add object with 'required' error message
      service.addError(firstError);

      // Add 'email' error message to the same object
      service.addError(firstErrorAnotherErrorType);

      // Remove only 'required' error message
      service.removeError(firstErrorRemoveItem);

      expect(service.errors['test-form-id-1']['first-error']).toEqual({
        email: 'Test label: Email is not valid',
      });
    });

    it('should reload errors when Error Summary Item content is changed and Error Summary is visible', () => {
      service.setErrorSummaryVisibility('test-form-id-1', true);

      changeAndCheckErrorContent();

      expect(service.reloadFormErrors).toHaveBeenCalledWith('test-form-id-1', false);
    });

    it('should not reload errors when Error Summary Item content is changed and Error Summary is not set visible', () => {
      changeAndCheckErrorContent();

      expect(service.reloadFormErrors).not.toHaveBeenCalled();
    });

    it('should set and return update strategy', () => {
      expect(service.updateStrategy).toEqual('reloadOnly');
      service.updateStrategy = 'all';
      expect(service.updateStrategy).toEqual('all');
      service.updateStrategy = 'onRemove';
      expect(service.updateStrategy).toEqual('onRemove');
      service.updateStrategy = 'reloadOnly';
      expect(service.updateStrategy).toEqual('reloadOnly');
    });
  });
});
