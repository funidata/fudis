import { Component, ContentChild, Input, OnInit, QueryList, TemplateRef, ViewChildren } from '@angular/core';

import { IFudisDropdownOption } from 'dist/ngx-fudis/lib/types/forms';
import { FormControl } from '@angular/forms';
import { FieldsetContentDirective, FieldsetGuidanceDirective } from './fieldset-directives';
import { FieldsetBaseDirective } from '../../../directives/form/fieldset-base/fieldset-base.directive';
import { LanguageSelectService } from './language-select.service';

@Component({
	selector: 'fudis-fieldset',
	templateUrl: './fieldset.component.html',
	styleUrls: ['./fieldset.component.scss'],
})
export class FieldsetComponent extends FieldsetBaseDirective implements OnInit {
	@ContentChild(FieldsetGuidanceDirective) fieldsetGuidanceContent: FieldsetGuidanceDirective;

	@ContentChild(FieldsetContentDirective) fieldsetContent: FieldsetContentDirective;

	@ViewChildren(TemplateRef, { read: TemplateRef }) contentChildren: QueryList<TemplateRef<any>>;

	@Input() languages: string[] | null | undefined = ['fi', 'en', 'sv'];

	options: IFudisDropdownOption[] = [];

	dropdownControl: FormControl;

	constructor(private languageChangeService: LanguageSelectService) {
		super();
	}

	ngOnInit(): void {
		if (this.languages && this.languages.length > 0) {
			this.languages.forEach((language) => {
				this.options.push({ value: language, viewValue: language });
			});

			this.dropdownControl = new FormControl(this.options[1]);
		}
	}

	handleLanguageSelect(value: IFudisDropdownOption): void {
		this.languageChangeService.updateLanguage(value);
	}
}
