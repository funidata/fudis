import { Component, HostBinding } from '@angular/core';

@Component({
	selector: 'fudis-legend',
	templateUrl: './legend.component.html',
	styleUrls: ['./legend.component.scss'],
})
export class LegendComponent {
	@HostBinding('class') classes = 'fudis-legend';
}
