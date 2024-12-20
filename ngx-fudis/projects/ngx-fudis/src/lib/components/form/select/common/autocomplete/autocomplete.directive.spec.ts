import { TestBed } from '@angular/core/testing';
import { SelectAutocompleteDirective } from './autocomplete.directive';
import { ElementRef } from '@angular/core';

class MockElementRef implements ElementRef {
  nativeElement = {};
}

describe('NewAutocompleteDirective', () => {
  let elementRef: ElementRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [{ provide: ElementRef, useClass: MockElementRef }],
    });

    elementRef = TestBed.inject(ElementRef);
  });
  it('should create an instance', () => {
    const directive = new SelectAutocompleteDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
