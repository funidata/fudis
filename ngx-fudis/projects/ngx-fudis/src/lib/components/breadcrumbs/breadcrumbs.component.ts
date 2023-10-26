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

	/**
	 * Label to attach to aria-label
	 */
	@Input({ required: true }) label: string;

	/**
	 * Breadcrumb item array
	 */
	@Input({ required: true }) links: FudisBreadcrumb[] = [];

	/**
	 * Prefix for aria-label from Fudis translation keys
	 */
	protected _breadcrumbsPrefix: string;
}
