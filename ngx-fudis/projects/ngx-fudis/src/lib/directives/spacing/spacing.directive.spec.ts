import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SpacingDirective } from './spacing.directive';
import { FudisBreakpointService } from '../../services/breakpoint/breakpoint.service';
import { ButtonComponent } from '../../components/button/button.component';
import { LabelComponent } from '../../components/form/label/label.component';

@Component({
  selector: 'fudis-mock-component',
  template: `
    <fudis-button [label]="'Test1'" fudisSpacing [marginTop]="'xxl'" />
    <fudis-button [label]="'Test2'" fudisSpacing [marginBottom]="'xxs'" />
    <fudis-button [label]="'Test3'" fudisSpacing [marginLeft]="'xs'" [marginRight]="'lg'" />
    <fudis-button [label]="'Test4'" />
  `,
})
class HostComponent {}

describe('SpacingDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpacingDirective, HostComponent, ButtonComponent, LabelComponent],
      providers: [FudisBreakpointService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  function getSpacingDirective() {
    return fixture.debugElement.queryAll(By.directive(SpacingDirective));
  }

  it('should find elements with spacing directive', () => {
    const elems = getSpacingDirective();
    const elemsWithNoDirective = fixture.debugElement.queryAll(
      By.css('fudis-button:not([fudisSpacing])'),
    );

    expect(elems.length).toBe(3);
    expect(elemsWithNoDirective.length).toBe(1);
  });
});
