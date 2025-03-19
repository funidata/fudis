import { TestBed } from '@angular/core/testing';
import { FudisBreakpointService } from './breakpoint.service';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import {
  FudisBreakpointStyleProperty,
  FudisBreakpointStyleResponsive,
  breakpointsMinWidthToObserve,
} from '../../types/breakpoints';



describe('FudisBreakpointService', () => {
  let service: FudisBreakpointService;
  let breakpointObserverMock: jest.Mocked<BreakpointObserver>;
  let breakpointSubject: Subject<BreakpointState>;

  beforeEach(() => {

    breakpointSubject = new Subject<BreakpointState>();

    const mock: Partial<jest.Mocked<BreakpointObserver>> = {
      observe : jest.fn().mockReturnValue(breakpointSubject.asObservable())
    };
    breakpointObserverMock = mock as jest.Mocked<BreakpointObserver>;
    
    TestBed.configureTestingModule({
      providers: [FudisBreakpointService, 
      //   { 
      //   provide: BreakpointObserver, useValue: breakpointObserverMock 
      // },
    ],
    });

    service = TestBed.inject(FudisBreakpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return small on mobile breakpoints', () => {
    // breakpointSubject.next({})
  });
});
