import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'fudis-dl-item, fudis-description-list-item',
	templateUrl: './description-list-item.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionListItemComponent {}
