import { Directive, ElementRef, OnChanges, OnInit } from '@angular/core';
import { SpacingApiDirective } from './spacing-api/spacing-api.directive';
import { FudisSpacingService } from '../../services/spacing/spacing.service';
import { FudisSpacingResponsiveData } from '../../types/spacing';
import { convertSpacingTokenToRem } from './spacing-utils';

@Directive({
	selector: '[fudisSpacing]',
})
export class SpacingDirective extends SpacingApiDirective implements OnInit, OnChanges {
	constructor(
		spacingService: FudisSpacingService,
		private _spacingElement: ElementRef
	) {
		super();
		this._spacingService = spacingService;
		this._element = _spacingElement.nativeElement;

		/**
		 * When screen is resized check and apply new rules for spacings
		 */
		// effect(() => {
		// 	this._spacingService.getBreakpointState();
		// });
	}

	/**
	 * Apply marginTop value
	 */
	protected _marginTop: string | FudisSpacingResponsiveData[];

	/**
	 * Apply marginBottom value
	 */
	protected _marginBottom: string | FudisSpacingResponsiveData[];

	/**
	 * Apply marginRight value
	 */
	protected _marginRight: string | FudisSpacingResponsiveData[];

	/**
	 * Apply marginLeft value
	 */
	protected _marginLeft: string | FudisSpacingResponsiveData[];

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
		this._applySpacingCss();
	}

	ngOnChanges(): void {
		this._applySpacingCss();
	}

	private _defineSpacings(): void {
		if (typeof this.marginTop === 'string') {
			this._marginTop = convertSpacingTokenToRem(this.marginTop);
		}
		if (typeof this.marginBottom === 'string') {
			this._marginBottom = convertSpacingTokenToRem(this.marginBottom);
		}
		if (typeof this.marginRight === 'string') {
			this._marginRight = convertSpacingTokenToRem(this.marginRight);
		}
		if (typeof this.marginLeft === 'string') {
			this._marginLeft = convertSpacingTokenToRem(this.marginLeft);
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

	/**
	 * Apply CSS settings from Inputs
	 */
	private _applySpacingCss(): void {
		this._setSpacings();
	}
}
