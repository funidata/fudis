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

  function getAttribute(index: number, attr: string) {
    switch (attr) {
      case 'justify-self':
        return getGridItemDirective()[index].nativeElement.style.justifySelf;
      case 'align-self':
        return getGridItemDirective()[index].nativeElement.style.alignSelf;
      case 'grid-column':
        return getGridItemDirective()[index].nativeElement.style.gridColumn;
      default:
        break;
    }
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

    // TODO: Use visual regression tests instead of testing style attribute values directly.
    it.skip('should convert alignX and alignY attributes to style properties', () => {
      fixture.detectChanges();

      expect(getAttribute(1, 'justify-self')).toBe('stretch');
      expect(getAttribute(1, 'align-self')).toBe('stretch');

      component.alignSelfY = 'end';
      component.alignSelfX = 'end';
      fixture.detectChanges();

      expect(getAttribute(1, 'justify-self')).toBe('end');
      expect(getAttribute(1, 'align-self')).toBe('end');

      component.alignSelfY = 'start';
      component.alignSelfX = 'start';
      fixture.detectChanges();

      expect(getAttribute(1, 'justify-self')).toBe('start');
      expect(getAttribute(1, 'align-self')).toBe('start');

      component.alignSelfY = 'center';
      component.alignSelfX = 'center';
      fixture.detectChanges();

      expect(getAttribute(1, 'justify-self')).toBe('center');
      expect(getAttribute(1, 'align-self')).toBe('center');
    });

    // TODO: Use visual regression tests instead of testing style attribute values directly.
    it.skip('should convert columns attribute to grid-column properties', () => {
      fixture.detectChanges();

      const columnsBeforeValid =
        (getAttribute(0, 'grid-column') === '2' || getAttribute(0, 'grid-column') === '2 / auto') ??
        true;

      expect(columnsBeforeValid).toEqual(true);

      component.columns = '6';
      fixture.detectChanges();

      const columnsAfterValid =
        (getAttribute(0, 'grid-column') === '6' || getAttribute(0, 'grid-column') === '6 / auto') ??
        true;

      expect(columnsAfterValid).toEqual(true);
    });
  });
});
