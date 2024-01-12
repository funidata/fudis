import { TestBed } from '@angular/core/testing';
import {
  FudisErrorSummaryParent,
  FudisFormErrorSummaryItem,
  FudisFormErrorSummaryObject,
  FudisFormErrorSummaryRemoveItem,
  FudisFormErrorSummarySection,
} from '../../../types/forms';
import { FudisInternalErrorSummaryService } from './internal-error-summary.service';

describe('InternalErrorSummaryService', () => {
  let service: FudisInternalErrorSummaryService;
  let currentErrors: FudisFormErrorSummaryObject = {};

  const firstError: FudisFormErrorSummaryItem = {
    id: 'first-error',
    label: 'Test label',
    error: 'There is something wrong',
    type: 'required',
    controlName: undefined,
    language: 'en',
  };

  const firstErrorAnotherErrorType: FudisFormErrorSummaryItem = {
    ...firstError,
    error: 'Email is not valid',
    type: 'email',
  };

  const secondError: FudisFormErrorSummaryItem = {
    id: 'second-error',
    label: 'Test label',
    error: 'You need to fix also this',
    type: 'required',
    controlName: undefined,
    language: 'en',
  };

  const firstErrorFromService: FudisFormErrorSummaryObject = {
    'first-error': {
      id: 'first-error',
      errors: { required: 'There is something wrong', email: 'Email is not valid' },
      label: 'Test label',
      language: 'en',
    },
  };

  const secondErrorFromService: FudisFormErrorSummaryObject = {
    'second-error': {
      id: 'second-error',
      errors: { required: 'You need to fix also this' },
      label: 'Test label',
      language: 'en',
    },
  };

  const firstErrorRemoveItem: FudisFormErrorSummaryRemoveItem = {
    id: 'first-error',
    controlName: undefined,
    type: 'required',
  };

  const fieldSetForErrorSummary: FudisFormErrorSummarySection = {
    id: 'unique-fieldset-id',
    title: 'Fill all the information',
  };

  const sectionForErrorSummary: FudisFormErrorSummarySection = {
    id: 'unique-section-id',
    title: 'Main section',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FudisInternalErrorSummaryService);

    jest.spyOn(service, 'reloadErrors').mockImplementation(() => {});
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initially return an empty object', () => {
    const errors = service.getVisibleErrors()();

    expect(errors).toEqual({});
  });

  it('should return currentErrorList object containing given errors', () => {
    service.addNewError(firstError);
    service.addNewError(secondError);
    service.addNewError(firstErrorAnotherErrorType);

    currentErrors = { ...firstErrorFromService, ...secondErrorFromService };

    expect(service['_currentErrorList']).toEqual(currentErrors);
  });

  it('should remove object error for respective type', () => {
    // Add object with 'required' error message
    service.addNewError(firstError);

    // Add 'email' error message to the same object
    service.addNewError(firstErrorAnotherErrorType);

    // Remove only 'required' error message
    service.removeError(firstErrorRemoveItem);

    expect(service['_currentErrorList']['first-error'].errors).toEqual({
      email: 'Email is not valid',
    });
  });

  it('should reload errors when Error Summary Item language is changed', () => {
    const firstErrorWithLangUpdate: FudisFormErrorSummaryItem = {
      ...firstError,
      language: 'sv',
    };

    service.addNewError(firstError);
    service.addNewError(firstErrorWithLangUpdate);

    expect(service.reloadErrors).toHaveBeenCalledWith();

    expect(service['_currentErrorList']['first-error'].language).toEqual('sv');
  });

  it('should add fieldset information to currentFieldsets array', () => {
    service.addFieldset(fieldSetForErrorSummary);

    expect(service['_currentFieldsets']).toEqual([fieldSetForErrorSummary]);
  });

  it('should remove fieldset information from currentFieldsets array', () => {
    service.addFieldset(fieldSetForErrorSummary);
    service.removeFieldset(fieldSetForErrorSummary);

    expect(service['_currentFieldsets']).toEqual([]);
  });

  it('should add section information to currentSections array', () => {
    service.addSection(sectionForErrorSummary);

    expect(service['_currentSections']).toEqual([sectionForErrorSummary]);
  });

  it('should remove section information from currentSections array', () => {
    service.addSection(sectionForErrorSummary);
    service.removeSection(sectionForErrorSummary);

    expect(service['_currentSections']).toEqual([]);
  });

  it('should add parent element to errorSummaryParentList array', () => {
    const mockForm = document.createElement('form');

    const errorSummaryParent: FudisErrorSummaryParent = {
      formId: 'unique-form-id',
      parentElement: mockForm,
    };

    service.addErrorSummaryParent(errorSummaryParent);

    expect(service['_errorSummaryParentList']()).toEqual([errorSummaryParent]);
  });

  it('should remove parent element from errorSummaryParentList array', () => {
    const mockForm = document.createElement('form');

    const errorSummaryParent: FudisErrorSummaryParent = {
      formId: 'unique-form-id',
      parentElement: mockForm,
    };

    service.addErrorSummaryParent(errorSummaryParent);
    service.removeErrorSummaryParent(errorSummaryParent);

    expect(service['_errorSummaryParentList']()).toEqual([]);
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
