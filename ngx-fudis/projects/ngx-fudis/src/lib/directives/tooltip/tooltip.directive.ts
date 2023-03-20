import { Directive, HostListener, Input, OnInit, ElementRef } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
	selector: '[fudisTooltip]',
	exportAs: 'tooltip',
	providers: [MatTooltip],
})
export class TooltipDirective implements OnInit {
	/**
	 * Text placed on tooltip
	 */
	@Input() tooltip: string;

	/**
	 * tooltipToggle set on true makes tooltip appear when toggled. Default behavior is triggered on focus. TooltipToggle feature is prefered to be used with icons.
	 */
	@Input() tooltipToggle = false;

	constructor(private ngMaterialTooltip: MatTooltip, private tooltipElement: ElementRef) {}

	ngOnInit() {
		// console.log('Status: ', this.tooltipToggle);

		this.ngMaterialTooltip.message = this.tooltip;

		// if (this.tooltip) {
		// }
		// this.ngOnDestroy();
	}

	// ngOnChanges() {
	// 	if (this.tooltipToggle === true) {
	// 		console.log('tooltip toggle is true!');
	// 		this.ngOnDestroy();
	// 	}
	// }

	@HostListener('mouseenter') onMouseEnter() {
		if (!this.tooltipToggle && this.tooltipElement.nativeElement.hasAttribute('fudisTooltip')) {
			this.ngMaterialTooltip.show();
		}
	}

	@HostListener('mouseleave') onMouseLeave() {
		if (!this.tooltipToggle) {
			this.ngMaterialTooltip.hide();
		}
	}

	@HostListener('focus') onFocus() {
		if (!this.tooltipToggle) {
			this.ngMaterialTooltip.show();
		}
	}

	@HostListener('blur') onBlur() {
		this.ngMaterialTooltip.hide();
	}

	@HostListener('click') onClick() {
		if (this.tooltipToggle && this.tooltipElement.nativeElement.hasAttribute('fudisTooltip')) {
			this.ngMaterialTooltip.toggle();
		}
	}

	@HostListener('keyup', ['$event']) onKeyUp(event: KeyboardEvent) {
		if (
			this.tooltipToggle &&
			(event.key === 'Enter' || event.key === ' ') &&
			this.tooltipElement.nativeElement.hasAttribute('fudisTooltip')
		) {
			event.preventDefault();
			this.ngMaterialTooltip.toggle();
		}
	}

	// private removeListeners() {
	// 	window.removeEventListener('mouseenter', this.mouseenter);
	// 	window.removeEventListener('mouseleave', this.onmouseleave);
	// }

	// ngOnDestroy() {
	// 	console.log('destroy me!!');

	// 	this.removeListeners();
	// 	window.removeEventListener('mouseenter', this.mouseenter, true);
	// 	window.removeEventListener('mouseleave', this.onmouseleave, true);
	// }
}
