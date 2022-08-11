import { TestBed } from '@angular/core/testing';

import { FudisDialogService } from './fudis-dialog.service';

describe('FudisDialogService', () => {
  let service: FudisDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FudisDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
