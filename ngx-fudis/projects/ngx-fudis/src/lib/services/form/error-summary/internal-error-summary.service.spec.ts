import { TestBed } from '@angular/core/testing';
import {
  FudisErrorSummaryErrors,
  FudisErrorSummaryNewError,
  FudisErrorSummaryObject,
  FudisErrorSummaryRemoveError,
} from '../../../types/errorSummary';
import { FudisInternalErrorSummaryService } from './internal-error-summary.service';
import { FudisTranslationService } from '../../translation/translation.service';

describe('InternalErrorSummaryService', () => {
  let service: FudisInternalErrorSummaryService;
  let currentErrors: FudisErrorSummaryErrors;

  const firstError: FudisErrorSummaryNewError = {
    id: 'first-error',
    formId: 'test-form-id-1',
    label: 'Test label',
    error: 'There is something wrong',
    type: 'required',
    controlName: undefined,
  };

  const firstErrorAnotherErrorType: FudisErrorSummaryNewError = {
    ...firstError,
    error: 'Email is not valid',
    type: 'email',
  };

  const secondError: FudisErrorSummaryNewError = {
    id: 'second-error',
    formId: 'test-form-id-2',
    label: 'Test label',
    error: 'You need to fix also this',
    type: 'required',
    controlName: undefined,
  };

  const firstErrorFromService: FudisErrorSummaryObject = {
    'first-error': {
      id: 'first-error',
      errors: { required: 'There is something wrong', email: 'Email is not valid' },
      label: 'Test label',
    },
  };

  const secondErrorFromService: FudisErrorSummaryObject = {
    'second-error': {
      id: 'second-error',
      errors: { required: 'You need to fix also this' },
      label: 'Test label',
    },
  };

  const firstErrorRemoveItem: FudisErrorSummaryRemoveError = {
    id: 'first-error',
    formId: 'test-form-id-1',
    controlName: undefined,
    type: 'required',
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
      providers: [FudisInternalErrorSummaryService, FudisTranslationService],
    });

    service = TestBed.inject(FudisInternalErrorSummaryService);

    service.registerNewForm('test-form-id-1');
    service.registerNewForm('test-form-id-2');

    jest.spyOn(service, 'reloadErrorsByFormId').mockImplementation(() => {});
  });

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
      service.addNewError(firstError);
      service.addNewError(secondError);
      service.addNewError(firstErrorAnotherErrorType);

      currentErrors = {
        'test-form-id-1': firstErrorFromService,
        'test-form-id-2': secondErrorFromService,
      };

      service.reloadErrorsByFormId('test-form-id-1');

      const errors = service.errors;

      expect(errors).toEqual(currentErrors);
    });

    it('should remove object error for respective type', () => {
      // Add object with 'required' error message
      service.addNewError(firstError);

      // Add 'email' error message to the same object
      service.addNewError(firstErrorAnotherErrorType);

      // Remove only 'required' error message
      service.removeError(firstErrorRemoveItem, 'test-form-id-1');

      expect(service.errors['test-form-id-1']['first-error'].errors).toEqual({
        email: 'Email is not valid',
      });
    });

    it('should reload errors when Error Summary Item content is changed', () => {
      const firstErrorWithContentUpdate: FudisErrorSummaryNewError = {
        ...firstError,
        error: 'Something new',
      };

      service.addNewError(firstError);

      expect(service.errors['test-form-id-1']['first-error'].errors['required']).toEqual(
        'There is something wrong',
      );
      service.addNewError(firstErrorWithContentUpdate);
      expect(service.errors['test-form-id-1']['first-error'].errors['required']).toEqual(
        'Something new',
      );

      expect(service.reloadErrorsByFormId).toHaveBeenCalledWith(
        'test-form-id-1',
        false,
        false,
        true,
      );
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
