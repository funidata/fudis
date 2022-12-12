import { Component, Input, QueryList, ContentChildren, AfterContentInit } from '@angular/core';
import { VanillaTextInputComponent } from '../vanilla-text-input/vanilla-text-input.component';

type ErrorSummary = {
	id: string;
	messages: Array<string>;
};
@Component({
	selector: 'fudis-form-layout',
	templateUrl: './form-layout.component.html',
	styleUrls: ['./form-layout.component.scss'],
})
export class FormLayoutComponent implements AfterContentInit {
	@ContentChildren(VanillaTextInputComponent) templates: QueryList<VanillaTextInputComponent>;

	@Input() variant: 'regular' | 'wide' = 'regular';

	@Input() columns: 1 | 2 | 4 = 2;

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
}
