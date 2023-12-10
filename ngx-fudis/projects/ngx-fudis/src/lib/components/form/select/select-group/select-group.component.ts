import { Component, ElementRef, Host, Input, ViewChild } from '@angular/core';
import { FudisIdService } from '../../../../services/id/id.service';
import { SelectComponent } from '../select.component';
import { setVisibleOptionsList } from '../selectUtilities';

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

	@ViewChild('selectGroup') selectGroup: ElementRef;

	/**
	 * Visible title label for this group of options
	 */
	@Input({ required: true }) label: string;

	/**
	 * Optional value which is stored in control.value as 'groupValue' when an option under this group is selected
	 */
	@Input() value: string;

	/**
	 * Set group visible or hide it. By default visible.
	 */
	@Input() visible: boolean = true;

	/**
	 * Id for this Select Group. Generated with FudisIdService and used for accessibility attributes.
	 */
	public id: string;

	/**
	 * Used when filtering autocomplete results to check if 'No results found' text is visible
	 */

	protected _hasChildOptions: boolean = true;

	private _visibleOptionsValues: string[] = [];

	public setOptionsVisibility(value: string, visible: boolean) {
		this._visibleOptionsValues = setVisibleOptionsList(this._visibleOptionsValues, value, visible);

		this._hasChildOptions = this._visibleOptionsValues.length !== 0;
	}
}
