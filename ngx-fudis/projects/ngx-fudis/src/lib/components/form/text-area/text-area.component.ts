import { Component, Input, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';
import { checkRequiredAttributes } from '../../../utilities/form/errorsAndWarnings';
import { FudisInputWidth } from '../../../types/forms';
import { FudisIdService } from '../../../utilities/id-service.service';

@Component({
	selector: 'fudis-text-area[id][label]',
	templateUrl: './text-area.component.html',
	styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent extends InputBaseDirective implements OnInit {
	constructor(private _idService: FudisIdService) {
		super();
	}

	/**
	 * FormControl for the input.
	 */
	@Input({ required: true }) control: FormControl<string | null | number>;

	/**
	 * Minimum length for text area, unset by default
	 */
	@Input() minLength: number | undefined = undefined;

	/**
	 * Maximum length for text area, unset by default. When set displays also a character count indicator.
	 */
	@Input() maxLength: number | undefined = undefined;

	/**
	 * Assistive text of max character count for screen readers
	 */
	@Input() maxLengthText: string;

	/**
	 * Fixed size options for text area
	 */
	@Input() size: FudisInputWidth = 'lg';

	/**
	 * Internal id to generate unique id
	 */
	protected _id: string;

	ngOnInit(): void {
		this._id = this.id ?? this._idService.getNewId('textArea');
		checkRequiredAttributes(this.id, this.requiredText, this.control, undefined, this.ignoreRequiredCheck);
	}
}
