import { Component, ContentChild, Input, ViewEncapsulation } from '@angular/core';
import { FudisGridColumnsResponsive } from '../../types/grid';
import {
	FooterContentLeftDirective,
	FooterContentRightDirective,
} from '../../directives/content-projection/content/content.directive';

@Component({
	selector: 'fudis-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class FooterComponent {
	@ContentChild(FooterContentLeftDirective) contentLeft: FooterContentLeftDirective;

	@ContentChild(FooterContentRightDirective) contentRight: FooterContentRightDirective;

	@Input({ required: true }) logoAltText: string;

	protected _columns: FudisGridColumnsResponsive = { sm: 2 };
}
