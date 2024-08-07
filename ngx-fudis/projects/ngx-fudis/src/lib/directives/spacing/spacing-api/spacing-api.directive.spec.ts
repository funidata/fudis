// import { Component, ViewChild } from '@angular/core';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { SpacingDirective } from '../spacing.directive';
import { SpacingApiDirective } from './spacing-api.directive';
// import { FudisBreakpointService } from '../../../services/breakpoint/breakpoint.service';
// import { ButtonComponent } from '../../../components/button/button.component';
// import { LabelComponent } from '../../../components/form/label/label.component';

// @Component({
//   selector: 'fudis-mock-component',
//   template: `
//     <fudis-button #testButton [label]="'Test1'" fudisSpacing [marginTop]="'xxl'" [marginBottom]="'xxs'"/>
//     <fudis-button [label]="'Test2'" fudisSpacing [marginLeft]="'xs'" [marginRight]="'lg'" />
//   `,
// })
// class HostComponent {
//   @ViewChild('testButton') testButton: ButtonComponent;
// }

describe('SpacingApiDirective', () => {
  // let component: HostComponent;
  // let fixture: ComponentFixture<HostComponent>;

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [SpacingDirective, HostComponent, ButtonComponent, LabelComponent],
  //     providers: [FudisBreakpointService],
  //   }).compileComponents();
  // });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(HostComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create an instance', () => {
    const directive = new SpacingApiDirective();

    expect(directive).toBeTruthy();
  });
});
