import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, QueryList } from '@angular/core';
import { DescriptionListItemDetailsComponent } from './description-list-item-details/description-list-item-details.component';

@Component({
	selector: 'fudis-dl-item, fudis-description-list-item',
	templateUrl: './description-list-item.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionListItemComponent implements AfterViewInit {
	@ContentChildren(DescriptionListItemDetailsComponent)
	contentChildren!: QueryList<DescriptionListItemDetailsComponent>;

	ngAfterViewInit(): void {
		console.log(this.contentChildren);

		this.contentChildren.forEach((item) => {
			console.log(item.lang);
		});
	}
}
