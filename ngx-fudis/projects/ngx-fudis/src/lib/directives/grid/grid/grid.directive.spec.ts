import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { getDirective } from '../../../utilities/tests/utilities';
import { HeadingComponent } from '../../../components/typography/heading/heading.component';
import { BodyTextComponent } from '../../../components/typography/body-text/body-text.component';
import { FudisBreakpointService } from '../../../services/breakpoint/breakpoint.service';
import { GridApiDirective } from '../grid-api/grid-api.directive';
import { GridDirective } from './grid.directive';

@Component({
  standalone: false,
  selector: 'fudis-mock-grid-directive',
  template: `<div fudisGrid>
      <fudis-heading [level]="3">I am test heading</fudis-heading>
      <fudis-body-text>Paragraph text for testing grid directive.</fudis-body-text>
    </div>
    <div fudisGrid>
      <fudis-heading [level]="4">I am test heading number two</fudis-heading>
      <fudis-body-text>Paragraph text for testing grid directive.</fudis-body-text>
    </div>`,
})
class HostComponent {}

describe('GridDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponent, GridApiDirective, GridDirective, HeadingComponent],
      imports: [BodyTextComponent],
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

  describe('Component creation', () => {
    it('should create mock component', () => {
      expect(component).toBeTruthy();
    });

    it('should find element with fudisGrid directive', () => {
      expect(getGridDirective().length).toEqual(2);
    });
  });
});
