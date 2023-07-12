import { AfterViewInit, Component, ElementRef, Host, Input, ViewEncapsulation, effect } from '@angular/core';
import { FudisLanguageAbbr } from '../../../../types/miscellaneous';
import { FudisTranslationService } from '../../../../utilities/translation/translation.service';
import { DescriptionListItemComponent } from '../description-list-item.component';

@Component({
	selector: 'fudis-dt, fudis-description-list-term',
	templateUrl: './description-list-item-term.component.html',
	styleUrls: ['./description-list-item-term.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class DescriptionListItemTermComponent implements AfterViewInit {
	constructor(
		private _elementRef: ElementRef,
		private _translationService: FudisTranslationService,
		@Host() private _parentDlItem: DescriptionListItemComponent
	) {
		effect(() => {
			this.setLanguageOptions();
		});

		this._currentLanguage = _translationService.getLanguage();
	}

	/**
	 * Languages input renders a Fudis language badge component for displaying Description List Item Detail values in given languages.
	 */
	@Input() languages: boolean = false;

	private _currentLanguage: FudisLanguageAbbr;

	private _firstLoadFinished: boolean = false;

	protected _parentLanguageOptions: FudisLanguageAbbr[];

	protected _selectedLanguage: FudisLanguageAbbr;

	ngAfterViewInit(): void {
		this.setLanguageOptions();
	}

	selectLanguage(lang: FudisLanguageAbbr): void {
		this._elementRef.nativeElement.classList.value = `fudis-dt-host fudis-dt-host__${lang}`;

		this._selectedLanguage = lang;
	}

	setLanguageOptions(): void {
		this._parentLanguageOptions = this._parentDlItem._existingLanguageOptions();

		if (!this._firstLoadFinished && this.languages && this._parentLanguageOptions.includes(this._currentLanguage)) {
			this._firstLoadFinished = true;
			this.selectLanguage(this._currentLanguage);
		} else if (this.languages && this._parentLanguageOptions.length > 0) {
			this.selectLanguage(this._parentLanguageOptions[0]);
		}
	}
}
