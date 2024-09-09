import { TestBed } from '@angular/core/testing';
import { FudisDOMUtilitiesService } from '../../../services/dom/dom-utilities.service';
import { InputApiDirective } from './input-api.directive';
import { DestroyRef, ElementRef } from '@angular/core';

class MockElementRef implements ElementRef {
  nativeElement = {};
}

describe('InputApiDirective', () => {
  let domService: FudisDOMUtilitiesService;
  let destroyRef: DestroyRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        FudisDOMUtilitiesService,
        { provide: ElementRef, useClass: MockElementRef },
        DestroyRef,
      ],
    });

    destroyRef = TestBed.inject(DestroyRef);
    domService = TestBed.inject(FudisDOMUtilitiesService);
  });

  it('should create an instance', () => {
    TestBed.runInInjectionContext(() => {
      const directive = new InputApiDirective();
      expect(directive).toBeTruthy();
    });
  });
});
