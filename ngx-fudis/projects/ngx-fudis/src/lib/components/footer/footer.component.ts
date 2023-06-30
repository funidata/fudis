import { Component, ContentChild, Input } from '@angular/core';
import { FudisGridColumnsResponsive } from '../../types/grid';
import {
	FooterContentLeftDirective,
	FooterContentRightDirective,
} from '../../directives/content-projection/content/content.directive';

@Component({
	selector: 'fudis-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
	@ContentChild(FooterContentLeftDirective) contentLeft: FooterContentLeftDirective;

	@ContentChild(FooterContentRightDirective) contentRight: FooterContentRightDirective;

	@Input() data: string[];

	_columns: FudisGridColumnsResponsive = { sm: 2 };
}
