import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpacingDirective } from '../spacing.directive';
import { SpacingApiDirective } from './spacing-api.directive';
import { FudisBreakpointService } from '../../../services/breakpoint/breakpoint.service';
import { ButtonComponent } from '../../../components/button/button.component';
import { LabelComponent } from '../../../components/form/label/label.component';
import { By } from '@angular/platform-browser';
import { FudisSpacing, FudisSpacingResponsive } from '../../../types/spacing';
import { getElement } from '../../../utilities/tests/utilities';

@Component({
  selector: 'fudis-mock-component',
  template: `
    <fudis-button 
      fudisSpacing 
      [label]="'Test1'" 
      [marginTop]="marginTop" 
      [marginBottom]="marginBottom" 
      [marginRight]="marginRight" 
      [marginLeft]="marginLeft"/>
    <fudis-button [label]="'Test2'"></fudis-button>
  `,
})
class HostComponent {
  marginTop: FudisSpacing | FudisSpacingResponsive = 'xxl';
  marginBottom: FudisSpacing | FudisSpacingResponsive = 'xxs';
  marginRight: FudisSpacing | FudisSpacingResponsive = 'none';
  marginLeft: FudisSpacing | FudisSpacingResponsive = 'md';
}

describe('SpacingApiDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpacingDirective, HostComponent, ButtonComponent, LabelComponent],
      providers: [FudisBreakpointService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function getSpacingDirective() {
    return fixture.debugElement.queryAll(By.directive(SpacingDirective));
  }

  it('should create an instance', () => {
    const directive = new SpacingApiDirective();

    expect(directive).toBeTruthy();
  });


  it('should find elements with spacing directive', () => {
    const elems = getSpacingDirective();

    expect(elems.length).toBe(1);
  });

  it('should have margin values', () => {
    const buttonElement = getElement(fixture, 'fudis-button');

    expect(buttonElement.getAttribute('ng-reflect-margin-top')).toEqual('xxl');
    expect(buttonElement.getAttribute('ng-reflect-margin-bottom')).toEqual('xxs');
    expect(buttonElement.getAttribute('ng-reflect-margin-right')).toEqual('none');
    expect(buttonElement.getAttribute('ng-reflect-margin-left')).toEqual('md');
  });

  it('should match with new values', () => {
    component.marginTop = 'lg';
    component.marginBottom = 'sm';
    component.marginRight = 'md';
    component.marginLeft = 'xxs'

    fixture.detectChanges();

    const buttonElement = getElement(fixture, 'fudis-button');

    expect(buttonElement.getAttribute('ng-reflect-margin-top')).toEqual(component.marginTop);
    expect(buttonElement.getAttribute('ng-reflect-margin-bottom')).toEqual(component.marginBottom);
    expect(buttonElement.getAttribute('ng-reflect-margin-right')).toEqual(component.marginRight);
    expect(buttonElement.getAttribute('ng-reflect-margin-left')).toEqual(component.marginLeft);
  });
});
