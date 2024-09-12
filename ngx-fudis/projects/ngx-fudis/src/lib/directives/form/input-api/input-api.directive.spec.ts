import { TestBed } from '@angular/core/testing';
import { FudisDOMUtilitiesService } from '../../../services/dom/dom-utilities.service';
import { InputApiDirective } from './input-api.directive';
import { DestroyRef, ElementRef } from '@angular/core';

const defaultValues: Partial<InputApiDirective> = {
  ariaLabel: undefined,
  disabled: false,
  errorSummaryReloadOnInit: true,
  disableGuidance: false,
  helpText: undefined,
  id: undefined,
  initialFocus: false,
  invalidState: false,
  label: undefined,
  tooltip: undefined,
  tooltipPosition: 'below',
  tooltipToggle: false,
};

const nonTestedValues = ['handleBlur', 'handleKeyUp', 'handleViewInit', 'handleFocus'];

class MockElementRef implements ElementRef {
  nativeElement = {};
}

describe('InputApiDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        FudisDOMUtilitiesService,
        { provide: ElementRef, useClass: MockElementRef },
        DestroyRef,
      ],
    });

    TestBed.inject(DestroyRef);
    TestBed.inject(FudisDOMUtilitiesService);
  });

  it('should create an instance', () => {
    TestBed.runInInjectionContext(() => {
      const directive = new InputApiDirective();
      expect(directive).toBeTruthy();
    });
  });

  it('should have default input values', () => {
    TestBed.runInInjectionContext(() => {
      const directive = new InputApiDirective();
      Object.keys(directive).forEach((inputKey) => {
        const typedKey = inputKey as keyof InputApiDirective;

        if (Array.from(typedKey)[0] !== '_' && !nonTestedValues.includes(inputKey)) {
          expect(directive[typedKey]).toEqual(defaultValues[typedKey]);
        }
      });
    });
  });
});
