import { Component, QueryList, ContentChildren, AfterContentInit } from '@angular/core';
import { GuidanceComponent } from '../guidance/guidance.component';
import { TextInputComponent } from '../text-input/text-input.component';

type ErrorSummary = {
	id: string;
	messages: Array<string>;
};

@Component({
	selector: 'fudis-error-summary',
	templateUrl: './error-summary.component.html',
	styleUrls: ['./error-summary.component.scss'],
})
export class ErrorSummaryComponent implements AfterContentInit {
	// Access text-input and its @Output for getting errors emitted
	@ContentChildren(TextInputComponent, { descendants: true }) inputsToFocus: QueryList<TextInputComponent>;

	@ContentChildren(GuidanceComponent, { descendants: true }) templates: QueryList<GuidanceComponent>;

	errors: Array<ErrorSummary> = [];

	onErrorAdded(eventData: { id: string; message: string }) {
		this.errors.forEach((error, index) => {
			if (error.id === eventData.id && !error.messages.includes(eventData.message)) {
				this.errors[index].messages.push(eventData.message);
			}
		});

		const existingId = this.errors.some((error) => error.id === eventData.id);
		if (!existingId) this.errors.push({ id: eventData.id, messages: [eventData.message] });
	}

	ngAfterContentInit() {
		this.templates.forEach((template) => {
			template.errorOutput.subscribe((error: any) => this.onErrorAdded(error));
		});
	}

	focusOnError(target: string) {
		this.inputsToFocus.forEach((inputItem) => {
			if (inputItem.id === target) {
				inputItem.input.nativeElement.focus();
			}
		});
	}
}
