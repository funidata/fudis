import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Icon } from '../../types/icons';

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
	 * Text displayed inside the button
	 */
	@Input() label: string;

	/**
	 * Additional aria-label for describing context
	 */
	@Input() ariaLabel: string;

	/**
	 * Button modifiers
	 */
	@Input() disabled = false;

	/**
	 * Icon for button if needed
	 */
	@Input() icon: Icon | undefined = undefined;

	/**
	 * Optional click handler
	 */
	@Output()
	handleClick = new EventEmitter<Event>();

	public get classes(): string[] {
		return ['fudis-button', `fudis-button__${this.size}`, `fudis-button__${this.variant}`];
	}
}
