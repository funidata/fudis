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
	 * Button size and type options
	 */
	@Input() size: 'small' | 'medium' = 'medium';

	@Input() type: 'button' | 'submit' = 'button';

	/**
	 * Button contents
	 */
	@Input() label: string;

	@Input() ariaLabel: string;

	/*
	 * Button modifiers
	 */
	@Input() disabled = false;

	/*
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
