import { TestBed } from '@angular/core/testing';
import { FudisGridService } from './grid.service';

// TODO: Write tests
describe('FudisGridService', () => {
  let service: FudisGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FudisGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
