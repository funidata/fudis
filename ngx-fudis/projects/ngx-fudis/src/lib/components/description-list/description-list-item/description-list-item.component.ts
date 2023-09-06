import { AfterViewInit, Component, ContentChildren, ElementRef, Host, QueryList, signal } from '@angular/core';
import { DescriptionListItemDetailsComponent } from './description-list-item-details/description-list-item-details.component';
import { FudisLanguageBadgeContent } from '../../../types/miscellaneous';

@Component({
	selector: 'fudis-dl-item, fudis-description-list-item',
	templateUrl: './description-list-item.component.html',
})
export class DescriptionListItemComponent implements AfterViewInit {
	constructor(private _element: ElementRef) {}

	@ContentChildren(DescriptionListItemDetailsComponent)
	ddChildrenElements!: QueryList<DescriptionListItemDetailsComponent>;

	/**
	 * Storing list of available languages in dd-elements
	 */
	@Host() public existingLanguageOptions = signal<FudisLanguageBadgeContent>({});

	ngAfterViewInit(): void {
		this.checkCurrentChildren();
	}

	/**
	 * Check for what languages are available as item's children dd-elements
	 */
	checkCurrentChildren(): void {
		let temp: FudisLanguageBadgeContent = {};

		if (this.ddChildrenElements) {
			this.ddChildrenElements.forEach((item) => {
				const htmlContent = (this._element.nativeElement as HTMLElement).querySelector(
					`.fudis-dl__item__details__${item.lang} .fudis-dl__item__details__content`
				)?.textContent;

				const textContent = htmlContent && htmlContent.replaceAll(' ', '') !== '' ? htmlContent : null;

				if (item.lang === 'fi') {
					temp = { ...temp, fi: textContent };
				}
				if (item.lang === 'sv') {
					temp = { ...temp, sv: textContent };
				}
				if (item.lang === 'en') {
					temp = { ...temp, en: textContent };
				}
			});
		}

		this.existingLanguageOptions.set(temp);
	}
}
