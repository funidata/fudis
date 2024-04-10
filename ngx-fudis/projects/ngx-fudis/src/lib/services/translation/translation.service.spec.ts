import { TestBed } from '@angular/core/testing';
import { FudisTranslationService } from './translation.service';

// TODO: Write tests
describe('TranslationService', () => {
  let service: FudisTranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FudisTranslationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // describe('default values', () => {
  //   it('should ', () => {});

  //   it('should ', () => {});
  // });
});
