import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'fudis-dl-item, fudis-description-list-item',
	templateUrl: './description-list-item.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class DescriptionListItemComponent {}
