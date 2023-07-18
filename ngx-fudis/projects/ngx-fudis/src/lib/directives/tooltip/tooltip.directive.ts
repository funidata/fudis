import { Directive, HostListener, OnInit, ElementRef, Input } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { TooltipApiDirective } from './tooltip-api.directive';

@Directive({
	selector: '[fudisTooltip]',
	exportAs: 'tooltip',
	providers: [MatTooltip],
})
export class TooltipDirective extends TooltipApiDirective implements OnInit {
	constructor(
		private _ngMaterialTooltip: MatTooltip,
		private _tooltipElement: ElementRef
	) {
		super();
	}

	/**
	 * Text placed on tooltip
	 */
	@Input() override tooltip: string;

	ngOnInit() {
		this._ngMaterialTooltip.message = this.tooltip;
		if (this.tooltipPosition) {
			this._ngMaterialTooltip.position = this.tooltipPosition;
		}
	}

	@HostListener('mouseenter') onMouseEnter() {
		if (!this.tooltipToggle && this._tooltipElement.nativeElement.hasAttribute('fudisTooltip')) {
			this._ngMaterialTooltip.show();
		}
	}

	@HostListener('mouseleave') onMouseLeave() {
		if (!this.tooltipToggle) {
			this._ngMaterialTooltip.hide();
		}
	}

	@HostListener('focus') onFocus() {
		if (!this.tooltipToggle) {
			this._ngMaterialTooltip.show();
		}
	}

	@HostListener('blur') onBlur() {
		this._ngMaterialTooltip.hide();
	}

	@HostListener('click') onClick() {
		if (this.tooltipToggle && this._tooltipElement.nativeElement.hasAttribute('fudisTooltip')) {
			this._ngMaterialTooltip.toggle();
		}
	}

	@HostListener('keyup', ['$event']) onKeyUp(event: KeyboardEvent) {
		if (
			this.tooltipToggle &&
			(event.key === 'Enter' || event.key === ' ') &&
			this._tooltipElement.nativeElement.hasAttribute('fudisTooltip')
		) {
			event.preventDefault();
			this._ngMaterialTooltip.toggle();
		}
	}
}
