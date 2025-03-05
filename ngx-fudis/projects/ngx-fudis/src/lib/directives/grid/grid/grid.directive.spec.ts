import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { getDirective } from '../../../utilities/tests/utilities';
import {
  FudisGridAlign,
  FudisGridAlignItems,
  FudisGridColumnsResponsive,
  FudisGridGap,
  FudisGridWidth,
} from '../../../types/grid';
import { HeadingComponent } from '../../../components/typography/heading/heading.component';
import { BodyTextComponent } from '../../../components/typography/body-text/body-text.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { FudisBreakpointService } from '../../../services/breakpoint/breakpoint.service';
import { GridApiDirective } from '../grid-api/grid-api.directive';
import { GridDirective } from './grid.directive';

@Component({
  selector: 'fudis-mock-grid-directive',
  template: `<div
      fudisGrid
      [align]="align"
      [alignItemsX]="alignItemsX"
      [alignItemsY]="alignItemsY"
      [columns]="3"
    >
      <fudis-heading [level]="3">I am test heading</fudis-heading>
      <fudis-body-text>Paragraph text for testing grid directive.</fudis-body-text>
      <fudis-button [label]="'Test button'" />
    </div>
    <div fudisGrid [columns]="2">
      <fudis-heading [level]="4">I am test heading number two</fudis-heading>
      <fudis-body-text>Paragraph text for testing grid directive.</fudis-body-text>
      <fudis-button [label]="'Test button number two'" />
    </div>`,
})
class HostComponent {
  align: FudisGridAlign = 'center';

  alignItemsX: FudisGridAlignItems = 'stretch';

  alignItemsY: FudisGridAlignItems = 'stretch';

  columns: string | number | FudisGridColumnsResponsive = 1;

  columnGap: FudisGridGap = 'responsive';

  classes: string[] = [];

  serviceDefaults: boolean = true;

  rowGap: FudisGridGap = 'responsive';

  width: FudisGridWidth = 'xxl';
}

describe('GridDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HostComponent,
        GridApiDirective,
        GridDirective,
        HeadingComponent,
        BodyTextComponent,
        ButtonComponent,
      ],
      providers: [FudisBreakpointService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
  });

  function getGridDirective() {
    return getDirective(fixture, GridDirective);
  }

  function getAttribute(index: number, attr: string) {
    switch (attr) {
      case 'justify-items':
        return getGridDirective()[index].nativeElement.style.justifyItems;
      case 'align-items':
        return getGridDirective()[index].nativeElement.style.alignItems;
      case 'classList':
        return getGridDirective()[index].nativeElement.classList;
      default:
        break;
    }
  }

  describe('Component creation', () => {
    it('should create mock component', () => {
      expect(component).toBeTruthy();
    });

    it('should find element with fudisGrid directive', () => {
      expect(getGridDirective().length).toEqual(2);
    });
  });

  describe('Attributes', () => {
    // TODO: Use visual regression tests instead of testing style attribute values directly.
    it('should convert align attributes to respective style properties', () => {
      fixture.detectChanges();

      expect(getAttribute(0, 'align-items')).toBe('stretch');
      expect(getAttribute(0, 'justify-items')).toBe('stretch');

      component.alignItemsX = 'start';
      component.alignItemsY = 'start';
      fixture.detectChanges();

      expect(getAttribute(0, 'align-items')).toBe('start');
      expect(getAttribute(0, 'justify-items')).toBe('start');

      component.alignItemsX = 'center';
      component.alignItemsY = 'center';
      fixture.detectChanges();

      expect(getAttribute(0, 'align-items')).toBe('center');
      expect(getAttribute(0, 'justify-items')).toBe('center');

      component.alignItemsX = 'end';
      component.alignItemsY = 'end';
      fixture.detectChanges();

      expect(getAttribute(0, 'align-items')).toBe('end');
      expect(getAttribute(0, 'justify-items')).toBe('end');
    });
  });

  // TODO: How to mock ngOnInit in the HostComponent to get the utility function calls tested?

  // describe('Grid utility function calls', () => {
  // it('should call replaceFormInputWidthsToRem() when defining columns from string input e.g "inputXs"', () => {
  // component.columns = 'inputXs';
  // const replaceFormInputWidthsToRemSpy = spyOn(utilityFunctions, 'replaceFormInputWidthsToRem');
  // const replaceFormInputWidthsToRemSpy = jasmine.createSpy('replaceFormInputWidthsToRem');
  // component.ngOnInit();

  // expect(replaceFormInputWidthsToRemSpy).toHaveBeenCalledWith(component.columns);
  // expect(utilityFunctions.replaceFormInputWidthsToRem(component.columns)).toBe('4rem');
  // expect(utilityFunctions.replaceFormInputWidthsToRem).toHaveBeenCalledTimes(1);
  // });
  // });
});
