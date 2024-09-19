import { TestBed } from '@angular/core/testing';
import { ControlComponentBaseDirective } from './control-component-base.directive';
import { FudisIdService } from '../../../services/id/id.service';
import { ChangeDetectorRef } from '@angular/core';

describe('ControlComponentBaseDirective', () => {
  let idService: FudisIdService;
  let cdr: ChangeDetectorRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [FudisIdService, ChangeDetectorRef],
      imports: [],
    });

    idService = TestBed.inject(FudisIdService);
    cdr = TestBed.inject(ChangeDetectorRef);
  });

  it('should create an instance', () => {
    TestBed.runInInjectionContext(() => {
      const directive = new ControlComponentBaseDirective(idService, cdr);
      expect(directive).toBeTruthy();
    });
  });
});
