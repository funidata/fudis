import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { MockComponent } from 'ng-mocks';
import { By } from '@angular/platform-browser';
import { GridItemComponent } from './grid-item.component';
import { FudisBreakpointService } from '../../../services/breakpoint/breakpoint.service';
import { FudisBreakpointStyleResponsive } from '../../../types/breakpoints';
import { FudisGridItemAlignment } from '../../../types/grid';
import { GridComponent } from '../grid/grid.component';
import { HeadingComponent } from '../../typography/heading/heading.component';
import { BodyTextComponent } from '../../typography/body-text/body-text.component';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'fudis-mock-grid-item-component',
  template: `<fudis-grid [columns]="6">
    <fudis-heading [level]="2">I am test heading</fudis-heading>
    <fudis-grid-item [columns]="columns">
      <fudis-body-text>
        Paragraph text for testing grid item functionalities. This is so much fun!
      </fudis-body-text>
    </fudis-grid-item>
    <fudis-grid-item [alignSelfY]="alignSelfY" [alignSelfX]="alignSelfX">
      <fudis-button [label]="'Test button'" />
    </fudis-grid-item>
  </fudis-grid>`,
})
class HostComponent {
  columns: string | FudisBreakpointStyleResponsive = '1';

  alignSelfX: FudisGridItemAlignment = 'stretch';

  alignSelfY: FudisGridItemAlignment = 'stretch';
}

describe('GridItemComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HostComponent,
        GridItemComponent,
        GridComponent,
        MockComponent(HeadingComponent),
        MockComponent(BodyTextComponent),
        MockComponent(ButtonComponent),
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

  // NOTE: as most of components functionality is visual and it adds inline style properties testing these with Jest is not feasible. Visual Regression tests should be sufficient to cover testing these.
});
