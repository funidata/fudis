import { Component, Input, Output, EventEmitter } from '@angular/core';

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
	@Input() label: string = 'Meidän nappi';

	@Input() ariaLabel: string;

	/**
	 * Button modifiers
	 */
	@Input() disabled = false;

	/**
	 * Optional click handler
	 */
	@Output()
	handleClick = new EventEmitter<Event>();

	public get classes(): string[] {
		return ['fudis fudis-button', `fudis-button__${this.size}`, `fudis-button__${this.variant}`];
	}
}
