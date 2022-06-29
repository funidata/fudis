import { TestBed } from '@angular/core/testing';

import { NgxFudisService } from './ngx-fudis.service';

describe('NgxFudisService', () => {
  let service: NgxFudisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxFudisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
