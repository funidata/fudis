import {
	Component,
	EventEmitter,
	ElementRef,
	Input,
	OnInit,
	Output,
	Signal,
	ViewChild,
	ViewEncapsulation,
	effect,
} from '@angular/core';
import { InputBaseDirective } from '../../directives/form/input-base/input-base.directive';
import { FudisDropdownOption, FudisInputWidth } from '../../types/forms';
import { FudisIdService } from '../../utilities/id-service.service';
import { FudisDropdownMenuItemService } from '../dropdown-menu/dropdown-menu-item/dropdown-menu-item.service';

@Component({
	selector: 'fudis-autocomplete-multi-select',
	templateUrl: './autocomplete-multi-select.component.html',
	styleUrls: ['./autocomplete-multi-select.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class AutocompleteMultiSelectComponent extends InputBaseDirective implements OnInit {
	constructor(private _idService: FudisIdService, private _clickService: FudisDropdownMenuItemService) {
		super();

		this._menuStatus = this._clickService.getMenuStatus();

		effect(() => {
			this.closeMenu(this._menuStatus());
		});
	}

	@ViewChild('autocompleteMultiSelectWrapper') wrapper: ElementRef;

	/**
	 * Available sizes for the multi-select - defaults to large.
	 */
	@Input() size: FudisInputWidth = 'lg';

	/**
	 * Dropdown options
	 */
	@Input({ required: true }) options: FudisDropdownOption[] = [];

	/**
	 * Selected options
	 */
	@Input() selectedOptions: FudisDropdownOption[] = [];

	/**
	 * Aria-label for icon-only button when opeening dropdown
	 */
	@Input() openAriaLabel: string = 'Open dropdown';

	/**
	 * Aria-label for icon-only button when closing dropdown
	 */
	@Input() closeAriaLabel: string = 'Close dropdown';

	/**
	 * Label for situations where no results with current filters were found
	 */
	@Input() noResultsFound: string = 'No results were found';

	/**
	 * Output for item click
	 */
	@Output() itemChange = new EventEmitter<FudisDropdownOption[]>();

	/**
	 * Internal id to generate unique id
	 */
	protected _id: string;

	/**
	 * Internal variable for toggle dropdown visibility
	 */
	protected _toggleOn: boolean;

	/**
	 * Internal variable for listening menu toggle Signal
	 */
	private _menuStatus: Signal<boolean>;

	/**
	 * Internal variable for user input filtering
	 */
	protected _filterText: string = '';

	/**
	 * Internal variable for results filtered from options
	 */
	protected _results: FudisDropdownOption[] = [];

	ngOnInit(): void {
		this._id = this.id ?? this._idService.getNewId('autocompleteMultiSelect');
		this._results = [...this.options];
	}

	closeMenu(menuStatus: boolean): void {
		if (!menuStatus) {
			this._toggleOn = false;
		}
	}

	handleInputClick(): void {
		this._toggleOn = !this._toggleOn;
		this._clickService.setMenuStatus(this._toggleOn);
	}

	selectItem(item: FudisDropdownOption): void {
		if (this.isChecked(item)) {
			this.removeItem(item);
		} else {
			this.selectedOptions.push(item);
		}
		this.itemChange.emit(this.selectedOptions);
	}

	removeItem(item: FudisDropdownOption): void {
		this.selectedOptions = this.selectedOptions.filter((option) => item.viewValue !== option.viewValue);
		this.itemChange.emit(this.selectedOptions);
	}

	isChecked(item: FudisDropdownOption): boolean {
		return this.selectedOptions.some((e) => e.viewValue === item.viewValue);
	}

	doSearch(event: any): void {
		this._filterText = event.target.value;

		this._results = this.options.filter((option) =>
			option.viewValue.toLowerCase().includes(this._filterText.toLowerCase())
		);
	}
}
