import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RadioButtonOption } from '../../../types/forms';

@Component({
	selector: 'fudis-radio-button-group',
	templateUrl: './radio-button-group.component.html',
	styleUrls: ['./radio-button-group.component.scss'],
})
export class RadioButtonGroupComponent implements OnInit, AfterViewInit {
	@ViewChild('uusiRadio') RadioButtonComponent: ElementRef;

	@Input() parentFormGroup: FormGroup;

	selectedId: string | number | undefined = undefined;

	@Input() radioButtonFormControl: FormControl;

	@Input() options: RadioButtonOption[];

	@Input() label: string;

	@Input() required: true | false = false;

	ngOnInit() {
		if (this.options.length < 2) {
			throw new Error('Radio button needs value more than 2');
		}
	}

	BindToInput(id: string): void {
		console.log(id);
		console.log(this.RadioButtonComponent.label);
	}

	ngAfterViewInit() {
		this.options.forEach((option) => {
			if (option.checked) {
				this.BindToInput(option.id);
			}
		});
	}

	setSelected(event: any) {
		this.selectedId = event.target.id;
	}
}
