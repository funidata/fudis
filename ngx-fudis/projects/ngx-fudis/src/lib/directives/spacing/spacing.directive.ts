import { Directive, ElementRef, OnChanges, OnInit, effect } from '@angular/core';
import { SpacingApiDirective } from './spacing-api/spacing-api.directive';
import { FudisSpacingService } from '../../services/spacing/spacing.service';
import { FudisSpacingResponsiveData, defaultSpacingValue } from '../../types/spacing';
import { convertSpacingTokenToRem, getSpacingBreakpointDataArray } from './spacing-utils';
import { FudisBreakpointService } from '../../services/breakpoint/breakpoint.service';

@Directive({
	selector: '[fudisSpacing]',
})
export class SpacingDirective extends SpacingApiDirective implements OnInit, OnChanges {
	constructor(
		spacingService: FudisSpacingService,
		private _breakpointService: FudisBreakpointService,
		private _spacingElement: ElementRef
	) {
		super();
		this._spacingService = spacingService;
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
	protected _marginTop: string | FudisSpacingResponsiveData[] = defaultSpacingValue;

	/**
	 * Apply marginBottom value
	 */
	protected _marginBottom: string | FudisSpacingResponsiveData[] = defaultSpacingValue;

	/**
	 * Apply marginRight value
	 */
	protected _marginRight: string | FudisSpacingResponsiveData[] = defaultSpacingValue;

	/**
	 * Apply marginLeft value
	 */
	protected _marginLeft: string | FudisSpacingResponsiveData[] = defaultSpacingValue;

	/**
	 * Spacing service to run utilities
	 */
	private _spacingService: FudisSpacingService;

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
			this._marginTop = convertSpacingTokenToRem(this.marginTop);
		} else if (this.marginTop) {
			this._marginTop = getSpacingBreakpointDataArray(this.marginTop, defaultSpacingValue);
		}

		if (typeof this.marginBottom === 'string') {
			this._marginBottom = convertSpacingTokenToRem(this.marginBottom);
		} else if (this.marginBottom) {
			this._marginBottom = getSpacingBreakpointDataArray(this.marginBottom, defaultSpacingValue);
		}

		if (typeof this.marginRight === 'string') {
			this._marginRight = convertSpacingTokenToRem(this.marginRight);
		} else if (this.marginRight) {
			this._marginRight = getSpacingBreakpointDataArray(this.marginRight, defaultSpacingValue);
		}

		if (typeof this.marginLeft === 'string') {
			this._marginLeft = convertSpacingTokenToRem(this.marginLeft);
		} else if (this.marginLeft) {
			this._marginLeft = getSpacingBreakpointDataArray(this.marginLeft, defaultSpacingValue);
		}
	}

	private _setSpacings(): void {
		this._spacingService.setSpacingAttributes(
			this._element,
			this._marginTop,
			this._marginBottom,
			this._marginRight,
			this._marginLeft
		);
	}
}
