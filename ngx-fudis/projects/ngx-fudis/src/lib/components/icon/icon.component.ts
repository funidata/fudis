import { Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { FudisIcon, FudisIconColor } from '../../types/icons';
import { TooltipDirective } from '../../directives/tooltip/tooltip.directive';

/**
 * Example: `<fudis-icon icon="info" color="primary"></fudis-icon>`
 *
 * Icons have default size of 32x32px. Icons with suffix _-small_ are scaled to 16x16px.
 *
 * Icons with suffix _-fill_ (e.g. "alert-fill", "info-circle-fill") have their default style with white background. These icons cannot be colored with css fill.
 *
 * Icons can be rotated 180degrees, 90 degrees clockwise and counterclockwise with rotate class.
 */

@Component({
	selector: 'fudis-icon',
	templateUrl: './icon.component.html',
	styleUrls: ['./icon.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class IconComponent extends TooltipDirective implements OnInit {
	/**
	 * Binding fudis-icon class to component wrapper
	 */
	@HostBinding('class') classes = 'fudis-icon-host';

	/**
	 * Choose icon
	 */
	@Input() icon: FudisIcon;

	/**
	 * Set color for icon
	 */
	@Input() color: FudisIconColor = 'default';

	/**
	 * Use rotate to flip and rotate icon
	 */
	@Input() rotate?: 'flip-180' | 'cw-90' | 'ccw-90' | 'none' = 'none';

	getClasses(): string[] {
		const cssClasses = [
			'fudis-icon',
			`fudis-icon-color__${this.color}`,
			`fudis-icon-rotate__${this.rotate}`,
			this.icon.includes('-small') ? 'fudis-icon__sm' : 'fudis-icon__lg',
		];

		return cssClasses;
	}
}
