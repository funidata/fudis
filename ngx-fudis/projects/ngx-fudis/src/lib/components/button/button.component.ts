import { Component, Input, Output, EventEmitter, HostBinding, ViewEncapsulation, ContentChild } from '@angular/core';
import { FudisIcon, FudisIconColor } from '../../types/icons';
import { TooltipApiDirective } from '../../directives/tooltip/tooltip-api.directive';
import { DropdownMenuDirective } from '../dropdown-menu/dropdown-menu.directive';

@Component({
	selector: 'fudis-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent extends TooltipApiDirective {
	@HostBinding('class') classes = 'fudis-button-host';

	/**
	 * If button is used as menu button it will have ng-template to place dropdown-items
	 */
	@ContentChild(DropdownMenuDirective) content: DropdownMenuDirective;

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
	 * Text content of the button
	 */
	@Input() label: string;

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
	iconColor: FudisIconColor = 'white';

	/**
	 * Toggle menu button
	 */
	toggleOn: boolean = false;

	public get getClasses(): string[] {
		if (this.disabled) {
			this.iconColor = 'default';
		} else if (this.variant === 'primary') {
			this.iconColor = 'white';
		} else if (this.variant === 'secondary' || this.variant === 'tertiary') {
			this.iconColor = 'primary';
		}
		return ['fudis-button', `fudis-button__size-${this.size}`, `fudis-button__${this.variant}`];
	}

	public get getAriaLabel(): string {
		if (this.labelHidden || this.size === 'icon-only') {
			return this.ariaLabel ? `${this.label} ${this.ariaLabel}` : this.label;
		}
		return this.ariaLabel;
	}

	toggleMenu(event: Event): void {
		this.toggleOn = !this.toggleOn;
		this.handleClick.emit(event);
	}
}
