import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
} from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FudisComponentChanges } from '../../types/miscellaneous';

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
})
export class DialogContentDirective extends MatDialogContent implements OnChanges {
  constructor(
    private _elRef: ElementRef,
    private _renderer: Renderer2,
  ) {
    super();
  }

  /**
   * Binding fudis-dialog-content CSS class to directive
   */
  @HostBinding('class') public hostClass = 'fudis-dialog-content';

  /**
   * Dialog contentFocus sets a visual focus to dialog content. Preferred to be used with read-only
   * content.
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
export class DialogCloseDirective extends MatDialogClose {
  private hostButtonElement: HTMLElement;
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _dialogRef: MatDialogRef<any>,
    _elementRef: ElementRef<HTMLElement>,
    _dialog: MatDialog,
  ) {
    super(_dialogRef, _elementRef, _dialog);
    this.hostButtonElement = _elementRef?.nativeElement;
  }

  override _onButtonClick() {
    /**
     * Here we check if the button element is disabled. If it is, close action is not triggered. In
     * case of a _elementRef, it takes the exact element that is attached to, so if it is a
     * fudis-button, we have to check the underlying button element with firstElementChild, that has
     * the aria-disabled attribute. If it is just a button, the hostButtonElement check is enough.
     */
    if (!this.isButtonDisabled()) this.dialogRef.close();
  }

  private isButtonDisabled = () => {
    return (
      (this.hostButtonElement?.ariaDisabled && this.hostButtonElement?.ariaDisabled === 'true') ||
      (this.hostButtonElement?.firstElementChild?.ariaDisabled &&
        this.hostButtonElement?.firstElementChild?.ariaDisabled === 'true')
    );
  };
}
