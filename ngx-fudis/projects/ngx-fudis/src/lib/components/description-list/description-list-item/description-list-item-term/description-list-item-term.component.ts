import { AfterViewInit, Component, ElementRef, Host, Input, Signal, ViewEncapsulation, effect } from '@angular/core';
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

	/**
	 * Internal variable for languages that have existing translations
	 */
	protected _parentLanguageOptions: FudisLanguageAbbr[];

	/**
	 * Internal property for listening description list variant Signal
	 */
	protected _currentVariant: Signal<string>;

	/**
	 * Internal variable for selected language
	 */
	protected _selectedLanguage: FudisLanguageAbbr;

	/**
	 * Internal property for Fudis confiq language
	 */
	private _currentLanguage: FudisLanguageAbbr;

	private _firstLoadFinished: boolean = false;

	ngAfterViewInit(): void {
		this.setLanguageOptions();
	}

	/**
	 * When language is selected, adjust host's CSS classes, so in SCSS other languages are set to 'display: none' and selected one is set to 'display: block'
	 */
	selectLanguage(lang: FudisLanguageAbbr): void {
		if (this.languages) {
			this._elementRef.nativeElement.classList.value = `fudis-dt-host fudis-dt-host__${lang}`;
		}

		this._selectedLanguage = lang;
	}

	setLanguageOptions(): void {
		this._parentLanguageOptions = this._parentDlItem.existingLanguageOptions();

		if (!this._firstLoadFinished && this.languages && this._parentLanguageOptions.includes(this._currentLanguage)) {
			this._firstLoadFinished = true;
			this.selectLanguage(this._currentLanguage);
		} else if (this.languages && this._parentLanguageOptions.length > 0) {
			this.selectLanguage(this._parentLanguageOptions[0]);
		}
	}
}
