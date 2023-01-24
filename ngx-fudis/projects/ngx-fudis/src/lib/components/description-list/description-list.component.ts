import { Component, Input } from '@angular/core';
import { DescriptionListItem } from '../../types/lists';

@Component({
	selector: 'fudis-description-list',
	templateUrl: './description-list.component.html',
	styleUrls: ['./description-list.component.scss'],
})
export class DescriptionListComponent {
	@Input() data: DescriptionListItem[] = [];
}
