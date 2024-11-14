import { FudisIdService } from '../../../services/id/id.service';
import { GroupComponentBaseDirective } from './group-component-base.directive';
import { TestBed } from '@angular/core/testing';
import { FudisFocusService } from '../../../services/focus/focus.service';

describe('GroupComponentBaseDirective', () => {
  let idService: FudisIdService;
  let focusService: FudisFocusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [FudisIdService, FudisFocusService],
      imports: [],
    });

    idService = TestBed.inject(FudisIdService);
    focusService = TestBed.inject(FudisFocusService);
  });

  it('should create an instance', () => {
    TestBed.runInInjectionContext(() => {
      const directive = new GroupComponentBaseDirective(idService, focusService);
      expect(directive).toBeTruthy();
    });
  });
});
