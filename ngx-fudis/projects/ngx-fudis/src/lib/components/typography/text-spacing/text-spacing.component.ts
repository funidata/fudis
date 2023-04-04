import { Component, ViewEncapsulation, HostBinding } from '@angular/core';

@Component({
	selector: 'fudis-text-spacing',
	templateUrl: './text-spacing.component.html',
	styleUrls: ['./text-spacing.component.scss'],
	encapsulation: ViewEncapsulation.ShadowDom,
})
export class TextSpacingComponent {
	@HostBinding('class') mainClass = 'fudis-text-spacing-host';
}
