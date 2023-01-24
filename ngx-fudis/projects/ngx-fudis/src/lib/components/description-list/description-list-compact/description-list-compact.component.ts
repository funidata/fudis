import { Component, Input } from '@angular/core';

export interface Item {
	key: string;
	value: string;
}

@Component({
	selector: 'fudis-description-list-compact',
	templateUrl: './description-list-compact.component.html',
	styleUrls: ['./description-list-compact.component.scss'],
})
export class DescriptionListCompactComponent {
	@Input() data: Item[] = [];
}
