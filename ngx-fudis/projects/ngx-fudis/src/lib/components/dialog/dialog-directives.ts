// eslint-disable-next-line max-classes-per-file
import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import {
	MatDialog,
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogRef,
	MatDialogTitle,
} from '@angular/material/dialog';

@Directive({
	selector: '[fudisDialogTitle]',
})
export class DialogTitleDirective extends MatDialogTitle implements OnInit {
	constructor(
		// For MatDialogTitle
		_dialogRef: MatDialogRef<any>,
		_elementRef: ElementRef<HTMLElement>,
		_dialog: MatDialog,

		// For Fudis DialogTitleDirective
		private headingElementRef: ElementRef,
		private renderer: Renderer2
	) {
		super(_dialogRef, _elementRef, _dialog);
	}

	override ngOnInit() {
		this.renderer.setAttribute(this.headingElementRef.nativeElement, 'tabindex', '-1');
		this.headingElementRef.nativeElement.focus();
	}
}

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'fudis-dialog-content',
})
export class DialogContentDirective extends MatDialogContent implements OnInit {
	constructor(private elRef: ElementRef, private renderer: Renderer2) {
		super();
	}

	ngOnInit() {
		/*
		 * Workaround to enable keyboard browsing on scrollable dialog content
		 * https://adrianroselli.com/2022/06/keyboard-only-scrolling-areas.html
		 * These can be removed, when browser support gets better.
		 */
		this.renderer.setAttribute(this.elRef.nativeElement, 'tabindex', '0');
		this.renderer.setAttribute(this.elRef.nativeElement, 'role', 'region');
	}
}

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'fudis-dialog-actions',
})
export class DialogActionsDirective extends MatDialogActions {
	override align?: 'start' | 'center' | 'end' | undefined = 'end';
}

@Directive({
	selector: '[fudisDialogClose]',
})
export class DialogCloseDirective extends MatDialogClose {}
