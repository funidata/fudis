import { TestBed } from '@angular/core/testing';
import { FudisBreakpointService } from './breakpoint.service';
import { Subject } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

describe('FudisBreakpointService', () => {
  let service: FudisBreakpointService;
  let breakpointObserverMock: Partial<jest.Mocked<BreakpointObserver>>;
  let breakpointSubject: Subject<BreakpointState>;

  beforeEach(() => {

    breakpointSubject = new Subject<BreakpointState>();

    breakpointObserverMock = {
      observe : jest.fn().mockReturnValue(breakpointSubject.asObservable())
    };
    
    TestBed.configureTestingModule({
      providers: [FudisBreakpointService, 
        { 
        provide: BreakpointObserver, useValue: breakpointObserverMock 
      },
    ],
    });

    service = TestBed.inject(FudisBreakpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return matches', () => {
    breakpointSubject.next(
      {
        matches: true,
        breakpoints: {
          '(min-width: 100em)': false,
          '(min-width: 75em)': false,
          '(min-width: 62em)': true,
          '(min-width: 48em)': false,
          '(min-width: 36em)': false,
          '(min-width: 0)': false
        }
      }
    )
  });
});
