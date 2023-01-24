import { Component, Input } from '@angular/core';

export interface Item {
	key: string;
	subHeading?: string;
	value: string;
}

@Component({
	selector: 'fudis-description-list',
	templateUrl: './description-list.component.html',
	styleUrls: ['./description-list.component.scss'],
})
export class DescriptionListComponent {
	@Input() data: Item[] = [];
}
