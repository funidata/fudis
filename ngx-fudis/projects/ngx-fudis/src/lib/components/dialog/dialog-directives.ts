import { Directive, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FudisComponentChanges } from '../../types/miscellaneous';
import { FudisDOMUtilitiesService } from '../../services/dom/dom-utilities.service';

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
  selector: 'fudis-dialog-content',
  providers: [FudisDOMUtilitiesService]
})
export class DialogContentDirective extends MatDialogContent implements OnChanges {
  constructor(
    private _elRef: ElementRef,
    private _renderer: Renderer2,
    private _DOMUtilitiesService: FudisDOMUtilitiesService,
  ) {
    super();
  }

  /**
   * Binding fudis-dialog-content CSS class to directive
   */
    @HostBinding('class') public hostClass = 'fudis-dialog-content';

  /**
   * Dialog contentFocus sets a visual focus to dialog content. Preferred to be used with read-only content.
   */
  @Input() contentFocus: boolean = false;

  ngOnChanges(changes: FudisComponentChanges<DialogContentDirective>): void {
    const contentFocus = changes.contentFocus?.currentValue;

    if (contentFocus !== changes.contentFocus?.previousValue) {
      if (contentFocus) {
        this._renderer.setAttribute(this._elRef.nativeElement, 'tabindex', '0');
        this._renderer.setAttribute(this._elRef.nativeElement, 'role', 'document');
      } else {
        this._renderer.removeAttribute(this._elRef.nativeElement, 'tabindex');
        this._renderer.removeAttribute(this._elRef.nativeElement, 'role');
      }
    }
  }
}

@Directive({
  selector: 'fudis-dialog-actions',
})
export class DialogActionsDirective extends MatDialogActions {
  override align: 'start' | 'center' | 'end' = 'end';
}

@Directive({
  selector: '[fudisDialogClose]',
})
export class DialogCloseDirective extends MatDialogClose {}
