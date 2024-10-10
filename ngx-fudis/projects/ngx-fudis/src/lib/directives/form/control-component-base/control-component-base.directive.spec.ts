import { TestBed } from '@angular/core/testing';
import { ControlComponentBaseDirective } from './control-component-base.directive';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisFocusService } from '../../../services/focus/focus.service';

describe('ControlComponentBaseDirective', () => {
  let idService: FudisIdService;
  let focusService: FudisFocusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [FudisIdService],
      imports: [],
    });

    idService = TestBed.inject(FudisIdService);
    focusService = TestBed.inject(FudisFocusService);
  });

  it('should create an instance', () => {
    TestBed.runInInjectionContext(() => {
      const directive = new ControlComponentBaseDirective(idService, focusService);
      expect(directive).toBeTruthy();
    });
  });
});
