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
      providers: [FudisDOMUtilitiesService, { provide: ElementRef, useClass: MockElementRef }],
    });

    service = TestBed.inject(FudisDOMUtilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
