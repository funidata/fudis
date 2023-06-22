import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';
import { checkRequiredAttributes } from '../../../utilities/form/errorsAndWarnings';
import { IdService } from '../../../utilities/id-service.service';

@Component({
	selector: 'fudis-checkbox[id][label]',
	templateUrl: './checkbox.component.html',
	styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent extends InputBaseDirective implements OnInit {
	constructor(private _idService: IdService) {
		super();
	}

	@ViewChild('checkboxRef') input: ElementRef;

	/*
	 * FormControl for Radio Button group
	 */
	@Input({ required: true }) control: FormControl<boolean | null>;

	/*
	 * Name for checkbox
	 */
	@Input() name: string;

	/**
	 * Internal id to generate unique id
	 */
	protected _id: string;

	handleCheckboxClick(): void {
		this.input.nativeElement.focus();
	}

	ngOnInit(): void {
		this._id = this.id ?? this._idService.getNewId('checkbox');
		checkRequiredAttributes(this.id, this.requiredText, this.control, undefined, this.ignoreRequiredCheck);
	}
}
