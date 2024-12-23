import { TestBed } from '@angular/core/testing';

import { FudisDOMUtilitiesService } from './dom-utilities.service';
import { ElementRef } from '@angular/core';

class MockElementRef implements ElementRef {
  nativeElement = {};
}

describe('FudisDOMUtilitiesService', () => {
  let service: FudisDOMUtilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        FudisDOMUtilitiesService,
        { provide: ElementRef, useClass: MockElementRef },
        { provide: 'componentType', useValue: 'label' },
      ],
    });

    service = TestBed.inject(FudisDOMUtilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Testing setLabelPairHeight() functionality in unit test is not the most meaningful. This is tested with Playwright visual regression tests in each component using this method.
});
