import { TestBed } from '@angular/core/testing';
import { FudisIdService } from '../../../services/id/id.service';
import { TextFieldComponentBaseDirective } from './text-field-component-base.directive';
import { FudisFocusService } from '../../../services/focus/focus.service';

describe('TextFieldComponentBaseDirective', () => {
  let focusService: FudisFocusService;
  let idService: FudisIdService;

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
      const directive = new TextFieldComponentBaseDirective(idService, focusService);
      expect(directive).toBeTruthy();
    });
  });
});
