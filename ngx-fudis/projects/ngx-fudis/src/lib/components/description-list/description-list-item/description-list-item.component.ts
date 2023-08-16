import { AfterViewInit, Component, ContentChildren, Host, QueryList, Signal, effect, signal } from '@angular/core';
import { DescriptionListItemDetailsComponent } from './description-list-item-details/description-list-item-details.component';
import { FudisDescriptionListItemDetailInfo, FudisLanguageAbbr } from '../../../types/miscellaneous';
import { FudisDescriptionListItemDetailsService } from './description-list-item-details/description-list-item-details.service';

@Component({
	selector: 'fudis-dl-item, fudis-description-list-item',
	templateUrl: './description-list-item.component.html',
})
export class DescriptionListItemComponent implements AfterViewInit {
	constructor(private _detailsService: FudisDescriptionListItemDetailsService) {
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

		const currentDetails: Signal<FudisDescriptionListItemDetailInfo[]> = this._detailsService.getCurrentDetails();

		if (this.contentChildren && currentDetails().length > 0) {
			this.contentChildren.forEach((item) => {
				temp.push(item.lang);
			});
		}
		this.existingLanguageOptions.set(temp);
	}
}
