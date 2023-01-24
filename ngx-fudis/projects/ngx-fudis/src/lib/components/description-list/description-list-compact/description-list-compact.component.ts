import { Component, Input } from '@angular/core';
import { DescriptionListCompactItem } from '../../../types/lists';

@Component({
	selector: 'fudis-description-list-compact',
	templateUrl: './description-list-compact.component.html',
	styleUrls: ['./description-list-compact.component.scss'],
})
export class DescriptionListCompactComponent {
	@Input() data: DescriptionListCompactItem[] = [];
}
