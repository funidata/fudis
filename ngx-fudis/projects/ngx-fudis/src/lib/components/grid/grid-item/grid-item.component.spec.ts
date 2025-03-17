import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { GridItemComponent } from './grid-item.component';
import { GridComponent } from '../grid/grid.component';
import { BodyTextComponent } from '../../typography/body-text/body-text.component';
import { FudisBreakpointService } from '../../../services/breakpoint/breakpoint.service';

// NOTE: As most of this component's functionality is visual and it adds inline style properties, testing these with Jest is not feasible.
// Visual Regression tests (grid-item.spec.ts) should be sufficient to cover testing these.

@Component({
  selector: 'fudis-mock-grid-item-component',
  template: `<fudis-grid [columns]="6">
    <fudis-grid-item [columns]="1">
      <fudis-body-text> Paragraph text for testing grid item existance. </fudis-body-text>
    </fudis-grid-item>
    <fudis-grid-item [alignSelfY]="'stretch'" [alignSelfX]="'stretch'">
      <fudis-body-text> Paragraph text for testing grid item existance. </fudis-body-text>
    </fudis-grid-item>
  </fudis-grid>`,
})
class HostComponent {}

describe('GridItemComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HostComponent,
        GridItemComponent,
        GridComponent,
        BodyTextComponent,
      ],
      providers: [FudisBreakpointService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
  });

  function getGridItemComponent() {
    return fixture.debugElement.queryAll(By.css('fudis-grid-item'));
  }

  describe('Component creation', () => {
    it('should create mock component', () => {
      expect(component).toBeTruthy();
    });

    it('should find fudis-grid-item elements', () => {
      expect(getGridItemComponent().length).toBe(2);
    });
  });
});
