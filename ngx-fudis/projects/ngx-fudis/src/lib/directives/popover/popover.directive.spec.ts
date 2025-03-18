import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopoverDirective } from './popover.directive';
import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FudisPopoverPosition } from '../../types/miscellaneous';
import { OverlayContainer } from '@angular/cdk/overlay';
import { By } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [PopoverDirective],
  selector: 'mock-popover-component',
  animations: [],
  template: `<ng-container #container>
    <button fudisPopover [popoverText]="popoverText" [popoverPosition]="popoverPosition"
      >Open a popover</button
    >
  </ng-container>`,
})
class MockPopoverComponent {
  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;
  @Input() popoverPosition: FudisPopoverPosition = 'below';
  @Input() popoverText: string;
}

describe('PopoverDirective', () => {
  let fixture: ComponentFixture<MockPopoverComponent>;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeAll(() => {});

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockPopoverComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MockPopoverComponent);
    overlayContainer = TestBed.inject(OverlayContainer);
    overlayContainerElement = overlayContainer.getContainerElement();
    fixture.componentRef.setInput('popoverText', 'Popover content here');
    fixture.detectChanges();
  });

  it('should set the required attributes for the triggering element', () => {
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.getAttribute('aria-controls')).toEqual('fudis-popover-1');
    expect(button.nativeElement.getAttribute('aria-expanded')).toEqual('false');
  });

  it('should open and close the popover', () => {
    const button = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();
    fixture.detectChanges();

    expect(overlayContainerElement).toBeTruthy();
    let popoverElement = overlayContainerElement.querySelector('#fudis-popover-1');
    expect(button.nativeElement.getAttribute('aria-expanded')).toEqual('true');
    expect(popoverElement?.textContent).toEqual('Popover content here');

    button.nativeElement.click();
    fixture.detectChanges();

    expect(button.nativeElement.getAttribute('aria-expanded')).toEqual('false');
    popoverElement = overlayContainerElement.querySelector('#fudis-popover-1');
    expect(popoverElement).toBeFalsy();
  });
});
