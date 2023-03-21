import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FudisIcon, FudisIconColor } from '../../types/icons';

@Component({
	selector: 'fudis-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
	/**
	 * Button variant options
	 */
	@Input() variant: 'primary' | 'secondary' | 'tertiary' = 'primary';

	/**
	 * Button size options
	 */
	@Input() size: 'small' | 'medium' = 'medium';

	/**
	 * Button type options
	 */
	@Input() type: 'button' | 'submit' = 'button';

	/**
	 * Text content of the button
	 */
	@Input() label: string;

	/**
	 * Additional aria-label for describing context
	 */
	@Input() ariaLabel: string;

	/**
	 * Disables the button, keeping it focusable
	 */
	@Input() disabled = false;

	/**
	 * Icon for button if needed
	 */
	@Input() icon: FudisIcon | undefined = undefined;

	/**
	 * Optional click handler
	 */
	@Output() handleClick = new EventEmitter<Event>();

	/**
	 * Automatically sets icon color based on button variant
	 */
	iconColor: FudisIconColor = 'white';

	public get classes(): string[] {
		if (this.disabled) {
			this.iconColor = 'default';
		} else if (this.variant === 'primary') {
			this.iconColor = 'white';
		} else if (this.variant === 'secondary' || this.variant === 'tertiary') {
			this.iconColor = 'primary';
		}

		return ['fudis-button', `fudis-button__${this.size}`, `fudis-button__${this.variant}`];
	}
}
