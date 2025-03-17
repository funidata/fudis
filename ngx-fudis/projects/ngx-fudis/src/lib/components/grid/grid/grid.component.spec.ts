import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridComponent } from './grid.component';
import { FudisBreakpointService } from '../../../services/breakpoint/breakpoint.service';

// NOTE: As most of this component's functionality is visual and it adds inline style properties, testing these with Jest is not feasible.
// Visual Regression tests (grid.spec.ts) should be sufficient to cover testing these.

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridComponent],
      providers: [FudisBreakpointService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
