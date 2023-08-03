import { Component, ContentChild, Input, OnDestroy, OnInit } from '@angular/core';
import { FudisDescriptionListItemDetailInfo, FudisLanguageAbbr } from '../../../../types/miscellaneous';
import { ActionsDirective } from '../../../../directives/content-projection/actions/actions.directive';
import { FudisIdService } from '../../../../utilities/id-service.service';
import { FudisDescriptionListItemDetailsService } from './description-list-item-details.service';

@Component({
	selector: 'fudis-dd, fudis-description-list-details',
	templateUrl: './description-list-item-details.component.html',
})
export class DescriptionListItemDetailsComponent implements OnInit, OnDestroy {
	constructor(
		private _idService: FudisIdService,
		private _detailsService: FudisDescriptionListItemDetailsService
	) {
		this._id = this._idService.getNewId('dlItemDetails');
	}

	@ContentChild(ActionsDirective) actions: ActionsDirective;

	@Input() lang: FudisLanguageAbbr;

	@Input() subHeading: string | undefined;

	private _id: string;

	private _info: FudisDescriptionListItemDetailInfo;

	private _infoSent: boolean = false;

	ngOnInit(): void {
		if (this.lang && this._id) {
			this._info = {
				id: this._id,
				language: this.lang,
			};
			this._detailsService.addDetail(this._info);
			this._infoSent = true;
		}
	}

	ngOnDestroy(): void {
		if (this._infoSent) {
			this._detailsService.removeDetail(this._info);
		}
	}
}
