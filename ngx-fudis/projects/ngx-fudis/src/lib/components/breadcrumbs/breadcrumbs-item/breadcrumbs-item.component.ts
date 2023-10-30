import { Component, Host, Input, OnInit } from '@angular/core';
import { FudisIdService } from '../../../services/id/id.service';
import { BreadcrumbsComponent } from '../breadcrumbs.component';

@Component({
	selector: 'fudis-breadcrumbs-item',
	templateUrl: './breadcrumbs-item.component.html',
	styleUrls: ['./breadcrumbs-item.component.scss'],
})
export class BreadcrumbsItemComponent implements OnInit {
	constructor(
		private _idService: FudisIdService,
		@Host() protected _breadCrumbs: BreadcrumbsComponent
	) {}

	/**
	 * Label to attach to aria-label
	 */
	@Input({ required: true }) label: string;

	/**
	 * Label to attach to aria-label
	 */
	@Input({ required: true }) url: string;

	protected _id: string;

	ngOnInit(): void {
		this._id = this._idService.getNewChildId('breadcrumbs', this._breadCrumbs.id);
	}
}
