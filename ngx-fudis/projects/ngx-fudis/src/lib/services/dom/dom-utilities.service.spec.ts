import { TestBed } from '@angular/core/testing';

import { FudisDOMUtilitiesService } from './dom-utilities.service';

describe('FudisDOMUtilitiesService', () => {
  let service: FudisDOMUtilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FudisDOMUtilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
