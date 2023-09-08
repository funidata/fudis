import { Injectable } from '@angular/core';

import { FudisBreakpointService } from '../breakpoint/breakpoint.service';

@Injectable()
export class FudisSpacingService {
	constructor(private _breakpointService: FudisBreakpointService) {}

	/**
	 * Function which applies CSS attributes of margins
	 */
	// setSpacingAttributes(
	// 	element: HTMLElement,
	// 	marginTop?: string | FudisBreakpointStyleResponsive[],
	// 	marginBottom?: string | FudisBreakpointStyleResponsive[],
	// 	marginRight?: string | FudisBreakpointStyleResponsive[],
	// 	marginLeft?: string | FudisBreakpointStyleResponsive[]
	// ): void {
	// 	const elementToModify = element;

	// 	if (typeof marginTop === 'string') {
	// 		elementToModify.style.marginTop = marginTop;
	// 	} else {
	// 		marginTop?.forEach((item) => {
	// 			if (this._breakpointService._screenSize()?.breakpoints[item.breakpoint]) {
	// 				elementToModify.style.marginTop = item.value;
	// 			}
	// 		});
	// 	}

	// 	if (typeof marginBottom === 'string') {
	// 		elementToModify.style.marginBottom = marginBottom;
	// 	} else {
	// 		marginBottom?.forEach((item) => {
	// 			if (this._breakpointService._screenSize()?.breakpoints[item.breakpoint]) {
	// 				elementToModify.style.marginBottom = item.value;
	// 			}
	// 		});
	// 	}

	// 	if (typeof marginRight === 'string') {
	// 		elementToModify.style.marginRight = marginRight;
	// 	} else {
	// 		marginRight?.forEach((item) => {
	// 			if (this._breakpointService._screenSize()?.breakpoints[item.breakpoint]) {
	// 				elementToModify.style.marginRight = item.value;
	// 			}
	// 		});
	// 	}

	// 	if (typeof marginLeft === 'string') {
	// 		elementToModify.style.marginLeft = marginLeft;
	// 	} else {
	// 		marginLeft?.forEach((item) => {
	// 			if (this._breakpointService._screenSize()?.breakpoints[item.breakpoint]) {
	// 				elementToModify.style.marginLeft = item.value;
	// 			}
	// 		});
	// 	}
	// }
}
