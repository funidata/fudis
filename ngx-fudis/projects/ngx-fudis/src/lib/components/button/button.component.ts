import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'storybook-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.css'],
})
export class ButtonComponent {
	/**
	 * Is this the principal call to action on the page?
	 */
	@Input()
	primary = false;

	/**
	 * What background color to use
	 */
	@Input()
	backgroundColor?: string;

	/**
	 * How large should the button be?
	 */
	@Input()
	size: 'small' | 'medium' | 'large' = 'medium';

	/**
	 * Button contents
	 *
	 * @required
	 */
	@Input()
	label = 'Button';

	/**
	 * Optional click handler
	 */
	@Output()
	// eslint-disable-next-line @angular-eslint/no-output-on-prefix
	onClick = new EventEmitter<Event>();

	public get classes(): string[] {
		const mode = this.primary ? 'storybook-button--primary' : 'storybook-button--secondary';

		return ['storybook-button', `storybook-button--${this.size}`, mode];
	}
}
