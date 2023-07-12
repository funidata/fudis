import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { FudisLanguageAbbr } from '../../../../types/miscellaneous';

@Component({
	selector: 'fudis-dt, fudis-description-list-term',
	templateUrl: './description-list-item-term.component.html',
	styleUrls: ['./description-list-item-term.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class DescriptionListItemTermComponent {
	constructor(private _elementRef: ElementRef) {
		this._element = _elementRef.nativeElement;
	}

	/**
	 * Languages input renders a Fudis language badge component for displaying Description List Item Detail values in given languages.
	 */
	@Input() languages: boolean = false;

	@Input() missingTranslation: FudisLanguageAbbr[];

	private _element: HTMLElement; /* Etsi toinen tyyppi */

	selectLanguage(lang: FudisLanguageAbbr): void {
		console.log(lang, 'olen kieli');

		this._element.classList.value = `fudis-dt-host__${lang}`;
	}
}
