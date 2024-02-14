import { AfterViewInit, Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

// TODO: Write tests for all Dialog Directives in this file

@Directive({
  selector: '[fudisDialogTitle]',
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
})
export class DialogTitleDirective extends MatDialogTitle implements OnInit {
  constructor(
    // For MatDialogTitle
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _dialogRef: MatDialogRef<any>,
    _elementRef: ElementRef<HTMLElement>,
    _dialog: MatDialog,

    // For Fudis DialogTitleDirective
    private _headingElementRef: ElementRef,
    private _renderer: Renderer2,
  ) {
    super(_dialogRef, _elementRef, _dialog);
  }

  override ngOnInit() {
    this._renderer.setAttribute(this._headingElementRef.nativeElement, 'tabindex', '-1');
    this._headingElementRef.nativeElement.focus();
  }
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'fudis-dialog-content',
})
export class DialogContentDirective extends MatDialogContent implements AfterViewInit {
  constructor(
    private _elRef: ElementRef,
    private _renderer: Renderer2,
  ) {
    super();
  }

  ngAfterViewInit() {
    /*
     * Workaround to enable keyboard browsing on scrollable dialog content
     * https://adrianroselli.com/2022/06/keyboard-only-scrolling-areas.html
     * These can be removed, when browser support gets better.
     */

    if (this.isDialogScrollable()) {
      this._renderer.setAttribute(this._elRef.nativeElement, 'tabindex', '0');
      this._renderer.setAttribute(this._elRef.nativeElement, 'role', 'region');
    }
  }

  /**
   * From: https://phuoc.ng/collection/html-dom/check-if-an-element-is-scrollable/
   */
  isDialogScrollable(): boolean {
    // Compare the height to see if the element has scrollable content
    const hasScrollableContent =
      this._elRef.nativeElement.scrollHeight > this._elRef.nativeElement.clientHeight;

    // It's not enough because the element's `overflow-y` style can be set as
    // * `hidden`
    // * `hidden !important`
    // In those cases, the scrollbar isn't shown
    const overflowYStyle = window.getComputedStyle(this._elRef.nativeElement).overflowY;
    const isOverflowHidden = overflowYStyle.indexOf('hidden') !== -1;

    return hasScrollableContent && !isOverflowHidden;
  }
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'fudis-dialog-actions',
})
export class DialogActionsDirective extends MatDialogActions {
  override align: 'start' | 'center' | 'end' = 'end';
}

@Directive({
  selector: '[fudisDialogClose]',
})
export class DialogCloseDirective extends MatDialogClose {}
