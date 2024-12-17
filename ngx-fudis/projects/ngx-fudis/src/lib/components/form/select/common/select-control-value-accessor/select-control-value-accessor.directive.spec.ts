import { TestBed } from '@angular/core/testing';
import { SelectControlValueAccessorDirective } from './select-control-value-accessor.directive';
import { ElementRef, Renderer2 } from '@angular/core';

class MockElementRef implements ElementRef {
  nativeElement = {};
}

describe('SelectControlValueAccessorDirective', () => {
  let elementRef: ElementRef;
  let renderer: Renderer2;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [{ provide: ElementRef, useClass: MockElementRef }, Renderer2],
    });

    elementRef = TestBed.inject(ElementRef);
    renderer = TestBed.inject(Renderer2);
  });
  it('should create an instance', () => {
    const directive = new SelectControlValueAccessorDirective(elementRef, renderer);
    expect(directive).toBeTruthy();
  });
});
