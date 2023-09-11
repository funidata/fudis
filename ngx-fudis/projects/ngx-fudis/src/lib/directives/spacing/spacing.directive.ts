import { Directive, ElementRef, OnChanges, OnInit, effect } from '@angular/core';
import { SpacingApiDirective } from './spacing-api/spacing-api.directive';
import { defaultSpacingValue, fudisSpacingValues } from '../../types/spacing';
import { FudisBreakpointService } from '../../services/breakpoint/breakpoint.service';
import { FudisBreakpointStyleResponsive } from '../../types/breakpoints';
import { getBreakpointDataArray } from '../../utilities/breakpoint/breakpoint-utils';

@Directive({
	selector: '[fudisSpacing]',
})
export class SpacingDirective extends SpacingApiDirective implements OnInit, OnChanges {
	constructor(
		private _breakpointService: FudisBreakpointService,
		private _spacingElement: ElementRef
	) {
		super();
		this._element = _spacingElement.nativeElement;

		/**
		 * When screen is resized check and apply new rules for spacings
		 */
		effect(() => {
			this._breakpointService.getBreakpointState();

			if (
				typeof this._marginTop !== 'string' ||
				typeof this._marginBottom !== 'string' ||
				typeof this._marginRight !== 'string' ||
				typeof this._marginLeft !== 'string'
			) {
				this._setSpacings();
			}
		});
	}

	/**
	 * Apply marginTop value
	 */
	protected _marginTop: string | FudisBreakpointStyleResponsive[] = defaultSpacingValue;

	/**
	 * Apply marginBottom value
	 */
	protected _marginBottom: string | FudisBreakpointStyleResponsive[] = defaultSpacingValue;

	/**
	 * Apply marginRight value
	 */
	protected _marginRight: string | FudisBreakpointStyleResponsive[] = defaultSpacingValue;

	/**
	 * Apply marginLeft value
	 */
	protected _marginLeft: string | FudisBreakpointStyleResponsive[] = defaultSpacingValue;

	/**
	 * Internal reference for the respective element
	 */
	private _element: HTMLElement;

	ngOnInit(): void {
		if (this.marginTop || this.marginBottom || this.marginRight || this.marginLeft) {
			this._defineSpacings();
		}
		this._setSpacings();
	}

	ngOnChanges(): void {
		if (this.marginTop || this.marginBottom || this.marginRight || this.marginLeft) {
			this._defineSpacings();
		}
		this._setSpacings();
	}

	/**
	 * Define and convert spacings
	 */
	private _defineSpacings(): void {
		if (typeof this.marginTop === 'string') {
			this._marginTop = fudisSpacingValues[this.marginTop];
		} else if (this.marginTop) {
			this._marginTop = getBreakpointDataArray(this.marginTop, defaultSpacingValue);
		}

		if (typeof this.marginBottom === 'string') {
			this._marginBottom = fudisSpacingValues[this.marginBottom];
		} else if (this.marginBottom) {
			this._marginBottom = getBreakpointDataArray(this.marginBottom, defaultSpacingValue);
		}

		if (typeof this.marginRight === 'string') {
			this._marginRight = fudisSpacingValues[this.marginRight];
		} else if (this.marginRight) {
			this._marginRight = getBreakpointDataArray(this.marginRight, defaultSpacingValue);
		}

		if (typeof this.marginLeft === 'string') {
			this._marginLeft = fudisSpacingValues[this.marginLeft];
		} else if (this.marginLeft) {
			this._marginLeft = getBreakpointDataArray(this.marginLeft, defaultSpacingValue);
		}
	}

	private _setSpacings(): void {
		this._breakpointService.setStyleAttributes(this._element, 'margin-top', this._marginTop);
		this._breakpointService.setStyleAttributes(this._element, 'margin-bottom', this._marginBottom);
		this._breakpointService.setStyleAttributes(this._element, 'margin-left', this._marginLeft);
		this._breakpointService.setStyleAttributes(this._element, 'margin-right', this._marginRight);
	}
}
