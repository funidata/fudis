import { TestBed } from '@angular/core/testing';
import {
  FudisFormErrorSummaryFormsAndErrors,
  FudisFormErrorSummaryItem,
  FudisFormErrorSummaryObject,
  FudisFormErrorSummaryRemoveItem,
  FudisFormErrorSummarySection,
} from '../../../types/forms';
import { FudisInternalErrorSummaryService } from './internal-error-summary.service';
import { FudisTranslationService } from '../../translation/translation.service';

describe('InternalErrorSummaryService', () => {
  let service: FudisInternalErrorSummaryService;
  let currentErrors: FudisFormErrorSummaryFormsAndErrors;

  const firstError: FudisFormErrorSummaryItem = {
    id: 'first-error',
    formId: 'test-form-id-1',
    label: 'Test label',
    error: 'There is something wrong',
    type: 'required',
    controlName: undefined,
  };

  const firstErrorAnotherErrorType: FudisFormErrorSummaryItem = {
    ...firstError,
    error: 'Email is not valid',
    type: 'email',
  };

  const secondError: FudisFormErrorSummaryItem = {
    id: 'second-error',
    formId: 'test-form-id-2',
    label: 'Test label',
    error: 'You need to fix also this',
    type: 'required',
    controlName: undefined,
  };

  const firstErrorFromService: FudisFormErrorSummaryObject = {
    'first-error': {
      id: 'first-error',
      errors: { required: 'There is something wrong', email: 'Email is not valid' },
      label: 'Test label',
    },
  };

  const secondErrorFromService: FudisFormErrorSummaryObject = {
    'second-error': {
      id: 'second-error',
      errors: { required: 'You need to fix also this' },
      label: 'Test label',
    },
  };

  const firstErrorRemoveItem: FudisFormErrorSummaryRemoveItem = {
    id: 'first-error',
    formId: 'test-form-id-1',
    controlName: undefined,
    type: 'required',
  };

  const fieldSetForErrorSummary: FudisFormErrorSummarySection = {
    id: 'unique-fieldset-id',
    formId: 'test-form-id-1',
    title: 'Fill all the information',
  };

  const sectionForErrorSummary: FudisFormErrorSummarySection = {
    id: 'unique-section-id',
    formId: 'test-form-id-1',
    title: 'Main section',
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

  it('should initially return an empty object', () => {
    const errors = service.allFormErrorsObservable.value;

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

    const errors = service.getErrors();

    expect(errors).toEqual(currentErrors);
  });

  it('should remove object error for respective type', () => {
    // Add object with 'required' error message
    service.addNewError(firstError);

    // Add 'email' error message to the same object
    service.addNewError(firstErrorAnotherErrorType);

    // Remove only 'required' error message
    service.removeError(firstErrorRemoveItem, 'test-form-id-1');

    expect(service.getErrors()['test-form-id-1']['first-error'].errors).toEqual({
      email: 'Email is not valid',
    });
  });

  it('should reload errors when Error Summary Item content is changed', () => {
    const firstErrorWithContentUpdate: FudisFormErrorSummaryItem = {
      ...firstError,
      error: 'Something new',
    };

    service.addNewError(firstError);

    expect(service.getErrors()['test-form-id-1']['first-error'].errors['required']).toEqual(
      'There is something wrong',
    );
    service.addNewError(firstErrorWithContentUpdate);
    expect(service.getErrors()['test-form-id-1']['first-error'].errors['required']).toEqual(
      'Something new',
    );

    expect(service.reloadErrorsByFormId).toHaveBeenCalledWith('test-form-id-1', false, false, true);
  });

  it('should add fieldset information to currentFieldsets array', () => {
    service.addFieldset(fieldSetForErrorSummary);

    const fieldset = { 'test-form-id-1': [fieldSetForErrorSummary], 'test-form-id-2': [] };

    expect(service.fieldsets).toEqual(fieldset);
  });

  it('should remove fieldset information from currentFieldsets array', () => {
    service.addFieldset(fieldSetForErrorSummary);
    service.removeFieldset(fieldSetForErrorSummary);

    expect(service.fieldsets).toEqual({ 'test-form-id-1': [], 'test-form-id-2': [] });
  });

  it('should add section information to currentSections array', () => {
    service.addSection(sectionForErrorSummary);

    const sections = { 'test-form-id-1': [sectionForErrorSummary], 'test-form-id-2': [] };

    expect(service.sections).toEqual(sections);
  });

  it('should remove section information from currentSections array', () => {
    service.addSection(sectionForErrorSummary);

    service.removeSection(sectionForErrorSummary);

    const sections = { 'test-form-id-1': [], 'test-form-id-2': [] };

    expect(service.sections).toEqual(sections);
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
