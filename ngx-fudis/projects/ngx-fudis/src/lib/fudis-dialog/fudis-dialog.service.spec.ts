import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { FudisDialogService } from './fudis-dialog.service';

describe('FudisDialogService', () => {
  let service: FudisDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [FudisDialogService],
    });
    service = TestBed.inject(FudisDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
