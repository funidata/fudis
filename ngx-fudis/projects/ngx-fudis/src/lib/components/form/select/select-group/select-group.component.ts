import { Component, Host, Input } from '@angular/core';
import { FudisIdService } from '../../../../services/id/id.service';
import { SelectComponent } from '../select.component';

@Component({
	selector: 'fudis-select-group',
	templateUrl: './select-group.component.html',
	styleUrls: ['./select-group.component.scss'],
})
export class SelectGroupComponent {
	constructor(
		private _idService: FudisIdService,
		@Host() protected _parentSelect: SelectComponent
	) {
		this.id = this._idService.getNewChildId('select', this._parentSelect.id, true);
	}

	/**
	 * Visible title label for this group of options
	 */
	@Input({ required: true }) label: string;

	/**
	 * Optional value which is stored in control.value as 'groupValue' when an option under this group is selected
	 */
	@Input() value: string;

	/**
	 * Id for this Select Group. Generated with FudisIdService and used for accessibility attributes.
	 */
	public id: string;
}
