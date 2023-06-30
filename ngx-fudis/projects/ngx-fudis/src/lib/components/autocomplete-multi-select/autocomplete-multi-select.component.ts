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
	 * Output for item click
	 */
	@Output() itemChange = new EventEmitter<FudisDropdownOption[]>();

	/**
	 * Internal id to generate unique id
	 */
	protected _id: string;

	/**
	 * Toggle dropdown visibility
	 */
	protected _toggleOn: boolean;

	/**
	 * Signal for listening menu toggle
	 */
	private _menuStatus: Signal<boolean>;

	ngOnInit(): void {
		this._id = this.id ?? this._idService.getNewId('autocompleteMultiSelect');
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
}
