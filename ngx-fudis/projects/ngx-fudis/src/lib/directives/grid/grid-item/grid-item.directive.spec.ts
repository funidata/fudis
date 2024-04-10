import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { MockComponent } from 'ng-mocks';
import { getDirective } from '../../../utilities/tests/utilities';
import { GridItemDirective } from './grid-item.directive';
import { FudisGridService } from '../../../services/grid/grid.service';
import { FudisBreakpointService } from '../../../services/breakpoint/breakpoint.service';
import { GridComponent } from '../../../components/grid/grid/grid.component';
import { HeadingComponent } from '../../../components/typography/heading/heading.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { FudisGridItemAlignment } from '../../../types/grid';
import { FudisBreakpointStyleResponsive } from '../../../types/breakpoints';
import { BodyTextComponent } from '../../../components/typography/body-text/body-text.component';

@Component({
  selector: 'fudis-mock-grid-item-directive',
  template: `<fudis-grid [columns]="4">
    <fudis-heading [level]="3">I am test heading</fudis-heading>
    <fudis-body-text fudisGridItem [columns]="columns">
      Paragraph text for testing grid item functionalities. This is so much fun!
    </fudis-body-text>
    <fudis-button
      fudisGridItem
      [alignSelfX]="alignSelfX"
      [alignSelfY]="alignSelfY"
      [label]="'Test button'"
    />
  </fudis-grid>`,
})
class HostComponent {
  columns: string | FudisBreakpointStyleResponsive = '2';

  alignSelfX: FudisGridItemAlignment = 'stretch';

  alignSelfY: FudisGridItemAlignment = 'stretch';
}

describe('GridItemDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HostComponent,
        GridItemDirective,
        GridComponent,
        MockComponent(HeadingComponent),
        MockComponent(BodyTextComponent),
        MockComponent(ButtonComponent),
      ],
      providers: [FudisGridService, FudisBreakpointService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
  });

  function getGridItemDirective() {
    return getDirective(fixture, GridItemDirective);
  }

  function getDefaultCSSClass(index: number) {
    return getGridItemDirective()[index].nativeElement.classList;
  }

  describe('Component creation', () => {
    it('should create mock component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('GridItem Directive', () => {
    it('should find elements with fudisGridItem directive', () => {
      expect(getGridItemDirective().length).toEqual(2);
    });

    it('should have respective grid-item CSS class present', () => {
      fixture.detectChanges();

      expect(getDefaultCSSClass(0)).toContain('fudis-grid-item');
      expect(getDefaultCSSClass(1)).toContain('fudis-grid-item');
    });
  });
});
