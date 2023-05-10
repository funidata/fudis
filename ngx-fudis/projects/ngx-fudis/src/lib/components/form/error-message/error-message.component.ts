import { Component, Input } from '@angular/core';

@Component({
	selector: 'fudis-error-message',
	templateUrl: './error-message.component.html',
	styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent {
	/*
	 * Error message to display
	 */
	@Input() message: string | undefined | null;

	/*
	 * Used to link form element's attribute of 'aria-describedby' with error message
	 */
	@Input() id: string;
}
