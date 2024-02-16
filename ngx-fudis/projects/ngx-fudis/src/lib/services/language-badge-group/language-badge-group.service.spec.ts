import { TestBed } from '@angular/core/testing';
import { FudisLanguageBadgeGroupService } from './language-badge-group.service';

// TODO: Write tests
describe('LanguageBadgeGroupService', () => {
  let service: FudisLanguageBadgeGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FudisLanguageBadgeGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
