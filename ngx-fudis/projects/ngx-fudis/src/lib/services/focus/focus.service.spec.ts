import { TestBed } from '@angular/core/testing';
import { FudisFocusService } from './focus.service';

// TODO: Write tests
describe('FudisFocusService', () => {
  let service: FudisFocusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FudisFocusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
