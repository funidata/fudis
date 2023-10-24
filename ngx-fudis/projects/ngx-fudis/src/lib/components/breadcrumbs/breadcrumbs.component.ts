import { Component, Input, ChangeDetectionStrategy, effect } from '@angular/core';
import { FudisBreadcrumb } from '../../types/miscellaneous';
import { FudisTranslationService } from '../../services/translation/translation.service';

@Component({
	selector: 'fudis-breadcrumbs',
	templateUrl: './breadcrumbs.component.html',
	styleUrls: ['./breadcrumbs.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent {
	constructor(private _translationService: FudisTranslationService) {
		effect(() => {
			this._breadcrumbsPrefix = this._translationService.getTranslations()().BREADCRUMBS.PREFIX;
		});
	}

	@Input({ required: true }) breadcrumbsLabel: string;

	@Input({ required: true }) links: FudisBreadcrumb[] = [];

	protected _breadcrumbsPrefix: string;
}
