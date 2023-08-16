import { AfterViewInit, Component, ContentChildren, Host, QueryList, effect, signal } from '@angular/core';
import { DescriptionListItemDetailsComponent } from './description-list-item-details/description-list-item-details.component';
import { FudisLanguageAbbr } from '../../../types/miscellaneous';

@Component({
	selector: 'fudis-dl-item, fudis-description-list-item',
	templateUrl: './description-list-item.component.html',
})
export class DescriptionListItemComponent implements AfterViewInit {
	constructor() {
		effect(
			() => {
				this.checkCurrentChildren();
			},
			{ allowSignalWrites: true }
		);
	}

	@ContentChildren(DescriptionListItemDetailsComponent)
	contentChildren!: QueryList<DescriptionListItemDetailsComponent>;

	@Host() public existingLanguageOptions = signal<FudisLanguageAbbr[]>([]);

	protected _languageOptions: FudisLanguageAbbr[] = ['en', 'fi', 'sv'];

	protected _parentVariant: string;

	ngAfterViewInit(): void {
		this.checkCurrentChildren();
	}

	checkCurrentChildren(): void {
		const temp: FudisLanguageAbbr[] = [];

		if (this.contentChildren) {
			this.contentChildren.forEach((item) => {
				temp.push(item.lang);
			});
		}
		this.existingLanguageOptions.set(temp);
	}
}
