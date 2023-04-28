import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'fudis-legend',
	templateUrl: './legend.component.html',
	styleUrls: ['./legend.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class LegendComponent {
	@HostBinding('class') classes = 'fudis-legend-host';

	@Input() id: string;
}
