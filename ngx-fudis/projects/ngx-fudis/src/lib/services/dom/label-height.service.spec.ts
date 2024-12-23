import { TestBed } from '@angular/core/testing';

import { FudisLabelHeightService } from './label-height.service';

describe('LabelHeightService', () => {
  let service: FudisLabelHeightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FudisLabelHeightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
