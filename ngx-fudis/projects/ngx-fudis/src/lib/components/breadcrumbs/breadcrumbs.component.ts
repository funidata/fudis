import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FudisBreadcrumb } from '../../types/miscellaneous';

@Component({
	selector: 'fudis-breadcrumbs',
	templateUrl: './breadcrumbs.component.html',
	styleUrls: ['./breadcrumbs.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent {
	@Input() breadcrumbsAriaLabel: string;

	@Input() links: FudisBreadcrumb[] = [];
}
