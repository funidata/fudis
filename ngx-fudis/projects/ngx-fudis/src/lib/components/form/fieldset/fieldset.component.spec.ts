import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { FieldSetComponent } from './fieldset.component';
import { GridComponent } from '../../grid/grid/grid.component';
import { GridApiDirective } from '../../../directives/grid/grid-api/grid-api.directive';
import { GridDirective } from '../../../directives/grid/grid/grid.directive';
import { FudisGridService } from '../../../services/grid/grid.service';
import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';
import { FudisBreakpointService } from '../../../services/breakpoint/breakpoint.service';

describe('FieldSetComponent', () => {
  let component: FieldSetComponent;
  let fixture: ComponentFixture<FieldSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FieldSetComponent,
        MockComponent(GridComponent),
        GridApiDirective,
        GridDirective,
      ],
      providers: [FudisGridService, FudisInternalErrorSummaryService, FudisBreakpointService],
    }).compileComponents();

    fixture = TestBed.createComponent(FieldSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
