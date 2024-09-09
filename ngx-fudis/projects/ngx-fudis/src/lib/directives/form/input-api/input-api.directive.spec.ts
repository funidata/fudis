import { TestBed } from '@angular/core/testing';
import { FudisDOMUtilitiesService } from '../../../services/dom/dom-utilities.service';
import { InputApiDirective } from './input-api.directive';
import { DestroyRef, ElementRef } from '@angular/core';

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
});
