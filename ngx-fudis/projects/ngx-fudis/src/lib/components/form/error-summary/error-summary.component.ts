import { Component, Input } from '@angular/core';

type Error = {
	id: string;
	message: string;
};

@Component({
	selector: 'fudis-error-summary',
	templateUrl: './error-summary.component.html',
	styleUrls: ['./error-summary.component.scss'],
})
export class ErrorSummaryComponent {
	@Input() errorsToShow: Array<Error>;
}
