import { Directive, HostListener, OnInit, ElementRef } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { TooltipApiDirective } from './tooltip-api.directive';

@Directive({
	selector: '[fudisTooltip]',
	exportAs: 'tooltip',
	providers: [MatTooltip],
})
export class TooltipDirective extends TooltipApiDirective implements OnInit {
	constructor(public ngMaterialTooltip: MatTooltip, public tooltipElement: ElementRef) {
		super();
	}

	ngOnInit() {
		this.ngMaterialTooltip.message = this.tooltip;
		if (this.tooltipPosition) {
			this.ngMaterialTooltip.position = this.tooltipPosition;
		}
	}

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
}
