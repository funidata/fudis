import { TestBed } from '@angular/core/testing';
import { FormCommonApiDirective } from './form-common-api.directive';
import { FudisIdService } from '../../../services/id/id.service';
import { ChangeDetectorRef } from '@angular/core';
import { FudisFocusService } from '../../../services/focus/focus.service';

// TODO: check tests so all components inheriting this directive are getting and applying these properties correctly, emit correctly and other common logic works consistently

const defaultValues: Partial<FormCommonApiDirective> = {
  ariaLabel: undefined,
  disableGuidance: false,
  errorSummaryReloadOnInit: true,
  helpText: undefined,
  id: undefined,
  initialFocus: false,
  label: undefined,
  tooltip: undefined,
  tooltipPosition: 'below',
  tooltipToggle: false,
};

const nonTestedValues = ['handleBlur', 'handleKeyUp', 'handleViewInit', 'handleFocus'];

describe('FormCommonApiDirective', () => {
  let idService: FudisIdService;
  let focusService: FudisFocusService;
  let cdr: ChangeDetectorRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [FudisIdService, FudisFocusService, ChangeDetectorRef],
      imports: [],
    });

    idService = TestBed.inject(FudisIdService);
    focusService = TestBed.inject(FudisFocusService);
    cdr = TestBed.inject(ChangeDetectorRef);
  });

  it('should create an instance', () => {
    TestBed.runInInjectionContext(() => {
      const directive = new FormCommonApiDirective(idService, focusService, cdr);
      expect(directive).toBeTruthy();
    });
  });

  it('should have default input values', () => {
    TestBed.runInInjectionContext(() => {
      const directive = new FormCommonApiDirective(idService, focusService, cdr);
      Object.keys(directive).forEach((inputKey) => {
        const typedKey = inputKey as keyof FormCommonApiDirective;

        if (Array.from(typedKey)[0] !== '_' && !nonTestedValues.includes(inputKey)) {
          expect(directive[typedKey]).toEqual(defaultValues[typedKey]);
        }
      });
    });
  });

  it('should emit handleFocus when onFocus is called', () => {
    TestBed.runInInjectionContext(() => {
      const directive = new FormCommonApiDirective(idService, focusService, cdr);
      jest.spyOn(directive.handleFocus, 'emit');

      const focusEvent = new FocusEvent('focus');

      directive.onFocus(focusEvent);

      expect(directive.handleFocus.emit).toHaveBeenCalledWith(focusEvent);
    });
  });
});
