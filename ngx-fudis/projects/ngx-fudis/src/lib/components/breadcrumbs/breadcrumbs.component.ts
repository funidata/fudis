import { Component, Input, effect, OnInit, ViewEncapsulation } from '@angular/core';
import { FudisTranslationService } from '../../services/translation/translation.service';
import { FudisIdService } from '../../services/id/id.service';

@Component({
	selector: 'fudis-breadcrumbs',
	templateUrl: './breadcrumbs.component.html',
	styleUrls: ['./breadcrumbs.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class BreadcrumbsComponent implements OnInit {
	constructor(
		private _translationService: FudisTranslationService,
		private _idService: FudisIdService
	) {
		effect(() => {
			this._breadcrumbsPrefix = this._translationService.getTranslations()().BREADCRUMBS.PREFIX;
		});
	}

	/**
	 * Label to attach to aria-label
	 */
	@Input({ required: true }) label: string;

	/**
	 * Prefix for aria-label from Fudis translation keys
	 */
	protected _breadcrumbsPrefix: string;

	protected _id: string;

	ngOnInit(): void {
		this._id = this._idService.getNewParentId('breadcrumbs');
	}

	getId(): string {
		return this._id;
	}
}
