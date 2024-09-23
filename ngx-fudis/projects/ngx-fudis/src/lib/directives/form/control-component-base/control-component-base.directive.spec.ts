import { TestBed } from '@angular/core/testing';
import { ControlComponentBaseDirective } from './control-component-base.directive';
import { FudisIdService } from '../../../services/id/id.service';
import { ChangeDetectorRef } from '@angular/core';
import { FudisFocusService } from '../../../services/focus/focus.service';

describe('ControlComponentBaseDirective', () => {
  let idService: FudisIdService;
  let focusService: FudisFocusService;
  let cdr: ChangeDetectorRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [FudisIdService, ChangeDetectorRef],
      imports: [],
    });

    idService = TestBed.inject(FudisIdService);
    focusService = TestBed.inject(FudisFocusService);
    cdr = TestBed.inject(ChangeDetectorRef);
  });

  it('should create an instance', () => {
    TestBed.runInInjectionContext(() => {
      const directive = new ControlComponentBaseDirective(idService, focusService, cdr);
      expect(directive).toBeTruthy();
    });
  });
});
