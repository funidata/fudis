import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';

import { FudisIdService } from '../../../utilities/id-service.service';
import { FudisTranslationConfigService } from '../../../utilities/translation-config.service';

@Component({
	selector: 'fudis-checkbox',
	templateUrl: './checkbox.component.html',
	styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent extends InputBaseDirective implements OnInit {
	constructor(private _idService: FudisIdService, _configService: FudisTranslationConfigService) {
		super(_configService);
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

	handleCheckboxClick(): void {
		this.input.nativeElement.focus();
	}

	ngOnInit(): void {
		this._id = this.id ?? this._idService.getNewId('checkbox');
	}
}
