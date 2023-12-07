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
} from '@angular/core';
import { FudisIcon, FudisIconColor, FudisIconRotate } from '../../types/icons';
import { TooltipApiDirective } from '../../directives/tooltip/tooltip-api.directive';
import { FudisIdService } from '../../services/id/id.service';

@Component({
	selector: 'fudis-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent extends TooltipApiDirective implements OnChanges {
	constructor(private _idService: FudisIdService) {
		super();

		this._id = _idService.getNewId('button');
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
	 * Icon rotation option
	 */
	@Input() iconRotate: FudisIconRotate = 'none';

	/**
	 * Assign button as menu button with dropdown
	 */
	@Input() asMenuButton: boolean = false;

	/**
	 * Optional click handler
	 */
	@Output() handleClick = new EventEmitter<Event>();

	/**
	 * Toggle menu button
	 */
	public dropdownOpen: boolean = false;

	/**
	 * Automatically sets icon color based on button variant
	 */
	protected _iconColor: FudisIconColor = 'white';

	/**
	 * Button CSS class list
	 */
	protected _classList: string[] = [];

	/**
	 * Aria-label for icon-only buttons
	 */
	protected _ariaLabel: string = '';

	/**
	 * Id generated with FudisIdService
	 */
	protected _id: string;

	ngOnChanges(): void {
		this._classList = this._getClasses();
		this._ariaLabel = this._getAriaLabel();
	}

	buttonClick(event: Event): void {
		if (this.asMenuButton) {
			this.toggleMenu();
		}
		this.handleClick.emit(event);
	}

	toggleMenu(): void {
		this.dropdownOpen = !this.dropdownOpen;
	}

	openMenu(): void {
		this.dropdownOpen = true;
	}

	closeMenu(): void {
		this.dropdownOpen = false;
	}

	handleBlur(event: FocusEvent): void {
		const targetIsDropdownMenuButton = (event.relatedTarget as HTMLElement)?.classList?.contains(
			'fudis-dropdown-menu-item'
		);

		if (this.asMenuButton && !targetIsDropdownMenuButton) {
			this.dropdownOpen = false;
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
