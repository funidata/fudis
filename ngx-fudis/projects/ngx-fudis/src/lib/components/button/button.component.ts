/* eslint-disable no-underscore-dangle */
import {
	Component,
	Input,
	Output,
	EventEmitter,
	HostBinding,
	ViewEncapsulation,
	ViewChild,
	ElementRef,
	OnChanges,
	effect,
	Signal,
} from '@angular/core';
import { FudisIcon, FudisIconColor } from '../../types/icons';
import { TooltipApiDirective } from '../../directives/tooltip/tooltip-api.directive';
import { FudisDropdownMenuItemService } from '../dropdown-menu/dropdown-menu-item/dropdown-menu-item.service';

@Component({
	selector: 'fudis-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent extends TooltipApiDirective implements OnChanges {
	constructor(private _clickService: FudisDropdownMenuItemService) {
		super();

		this._menuStatus = this._clickService.getMenuStatus();

		effect(() => {
			this.closeMenu(this._menuStatus());
		});
	}

	@HostBinding('class') classes = 'fudis-button-host';

	@ViewChild('buttonElement') buttonEl: ElementRef<HTMLButtonElement>;

	/**
	 * Text content of the button
	 */
	@Input({ required: true }) label: string;

	/**
	 * Button variant options
	 */
	@Input() variant: 'primary' | 'secondary' | 'tertiary' = 'primary';

	/**
	 * Button size options
	 */
	@Input() size: 'icon-only' | 'small' | 'medium' = 'medium';

	/**
	 * Button type options
	 */
	@Input() type: 'button' | 'submit' = 'button';

	/**
	 * Hide visible label text for icon-only buttons.
	 */
	@Input() labelHidden: boolean = false;

	/**
	 * Additional aria-label for describing context
	 */
	@Input() ariaLabel: string;

	/**
	 * Disables the button, keeping it focusable
	 */
	@Input() disabled = false;

	/**
	 * Icon for button if needed
	 */
	@Input() icon: FudisIcon | undefined = undefined;

	/**
	 * Assign button as menu button with dropdown
	 */
	@Input() asMenuButton: boolean = false;

	/**
	 * Optional click handler
	 */
	@Output() handleClick = new EventEmitter<Event>();

	/**
	 * Automatically sets icon color based on button variant
	 */
	protected _iconColor: FudisIconColor = 'white';

	/**
	 * Toggle menu button
	 */
	protected _toggleOn: boolean = false;

	/**
	 * Button CSS class list
	 */
	protected _classList: string[] = [];

	/**
	 * Aria-label for icon-only buttons
	 */
	protected _ariaLabel: string = '';

	/**
	 * Menu status property if button is used as dropdown menu button
	 */
	private _menuStatus: Signal<boolean>;

	ngOnChanges(): void {
		this._classList = this._getClasses();
		this._ariaLabel = this._getAriaLabel();
	}

	buttonClick(event: Event): void {
		if (this.asMenuButton) {
			this._toggleOn = !this._toggleOn;
			this._clickService.setMenuStatus(this._toggleOn);
		}
		this.handleClick.emit(event);
	}

	closeMenu(menuStatus: boolean): void {
		if (!menuStatus) {
			this._toggleOn = false;
		}
	}

	handleBlur(event: FocusEvent): void {
		const targetIsDropdownMenuButton = (event.relatedTarget as HTMLElement)?.classList?.contains(
			'fudis-dropdown-menu-item'
		);

		if (this.asMenuButton && !targetIsDropdownMenuButton) {
			this._clickService.setMenuStatus(false);
		}
	}

	private _getAriaLabel(): string {
		if (this.labelHidden || this.size === 'icon-only') {
			return this.ariaLabel ? `${this.label} ${this.ariaLabel}` : this.label;
		}
		return this.ariaLabel;
	}

	private _getClasses(): string[] {
		if (this.disabled) {
			this._iconColor = 'default';
		} else if (this.variant === 'primary') {
			this._iconColor = 'white';
		} else if (this.variant === 'secondary' || this.variant === 'tertiary') {
			this._iconColor = 'primary';
		}
		return ['fudis-button', `fudis-button__size-${this.size}`, `fudis-button__${this.variant}`];
	}
}
