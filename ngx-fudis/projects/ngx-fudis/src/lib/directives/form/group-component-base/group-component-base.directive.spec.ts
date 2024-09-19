import { ChangeDetectorRef } from '@angular/core';
import { FudisIdService } from '../../../services/id/id.service';
import { GroupComponentBaseDirective } from './group-component-base.directive';
import { TestBed } from '@angular/core/testing';

describe('GroupComponentBaseDirective', () => {
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
      const directive = new GroupComponentBaseDirective(idService, cdr);
      expect(directive).toBeTruthy();
    });
  });
});
