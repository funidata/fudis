import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TooltipDirective } from './tooltip.directive';

@Component({
  standalone: false,
  selector: 'fudis-mock-tooltip',
  template: ` <button fudisTooltip [tooltip]="'You should see me!'" [tooltipToggle]="false">
      On focus and hover tooltip should appear
    </button>
    <button
      fudisTooltip
      [tooltip]="'I am toggle button!'"
      [tooltipToggle]="true"
      [tooltipPosition]="'left'"
    >
      Tooltip should appear on toggle
    </button>
    <button fudisTooltip [tooltip]="'I am tooltip on top!'" [tooltipPosition]="'top'">
      Tooltip should appear on top
    </button>
    <button fudisTooltip [tooltip]="'I am tooltip on right!'" [tooltipPosition]="'right'">
      Tooltip should appear on right
    </button>`,
})
class HostComponent {}

describe('TooltipDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TooltipDirective, HostComponent],
      imports: [MatTooltipModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  function getTooltipDirective() {
    return fixture.debugElement.queryAll(By.directive(TooltipDirective));
  }

  it('tooltipToggle should be set correctly', () => {
    const all = getTooltipDirective();

    const tooltipToggles = [false, true, false, false];
    let count = 0;

    all.forEach((directive) => {
      const button = directive.injector.get<TooltipDirective>(TooltipDirective);
      expect(button.tooltipToggle).toEqual(tooltipToggles[count++]);
    });
  });

  it('should find 4 directives with correct tooltip text', () => {
    const all = getTooltipDirective();

    expect(all.length).toEqual(4);

    const tooltipTexts = [
      'You should see me!',
      'I am toggle button!',
      'I am tooltip on top!',
      'I am tooltip on right!',
    ];
    let count = 0;

    all.forEach((directive) => {
      const button = directive.injector.get<TooltipDirective>(TooltipDirective);
      expect(button.tooltip).toEqual(tooltipTexts[count++]);
    });
  });

  it('buttons should return correct tooltipPositions', () => {
    const all = getTooltipDirective();

    const positions = ['below', 'left', 'top', 'right'];
    let count = 0;

    all.forEach((directive) => {
      const button = directive.injector.get<TooltipDirective>(TooltipDirective);
      expect(button.tooltipPosition).toEqual(positions[count++]);
    });
  });
});
