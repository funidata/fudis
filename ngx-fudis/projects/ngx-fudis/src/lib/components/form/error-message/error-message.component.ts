import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'fudis-error-message',
	templateUrl: './error-message.component.html',
	styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit {
	/*
	 * Error message to display
	 */
	@Input() message: string;

	/*
	 * Used to link form element's attribute of 'aria-describedby' with error message
	 */
	@Input() id: string;

	/*
	 * Delay in milliseconds for error to appear.
	 */
	@Input() delay: number = 100;

	isVisible: boolean = false;

	ngOnInit(): void {
		if (this.delay > 0) {
			setTimeout(() => {
				this.isVisible = true;
			}, this.delay);
		}
	}
}
