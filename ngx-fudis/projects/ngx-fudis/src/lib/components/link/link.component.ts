import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	Signal,
	ViewChild,
	effect,
} from '@angular/core';
import { FudisTranslationService } from '../../services/translation/translation.service';
import { FudisTranslationConfig } from '../../types/miscellaneous';
import { FudisFocusService } from '../../services/focus/focus.service';

@Component({
	selector: 'fudis-link',
	templateUrl: './link.component.html',
	styleUrls: ['./link.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent implements AfterViewInit {
	constructor(
		private _translationService: FudisTranslationService,
		private _focusService: FudisFocusService
	) {
		effect(() => {
			this._translations = this._translationService.getTranslations();

			this._externalLinkAriaLabel = this._translations().LINK.EXTERNAL_LINK;
		});
	}

	/**
	 * Template reference for input. Used in e. g. initialFocus
	 */
	@ViewChild('linkRef') linkRef: ElementRef;

	/**
	 * Determines if the link is disabled or not. When disabled, the link won't be interactive.
	 */
	@Input() disabled: boolean = false;

	/**
	 * Link URL using native href
	 */
	@Input() href: string;

	/**
	 * Link URL using Angular RouterLink
	 */
	@Input() routerLinkUrl: string | any[] | null;

	/**
	 * Fragment ID for Angular Router
	 */
	@Input() fragmentId: string | undefined;

	/**
	 * Title for the link, if not defined title will be the same as link URL
	 */
	@Input() linkTitle: string;

	/**
	 * Link size - by default link will inherit its parent's font-size. If link is not inside e.g. <fudis-heading> or <fudis-body-text> its size can be defined either 'md' (14px) or 'lg' (16px).
	 */
	@Input() size: 'inherit' | 'md' | 'lg' = 'inherit';

	/**
	 * Option to create an external link to point a target page on another domain.
	 * External link contains external icon and assistive aria-label
	 */
	@Input() isExternalLink: boolean = false;

	/**
	 * Link color
	 */
	@Input() color: 'primary' | 'default' | 'white' = 'primary';

	/**
	 * Set browser focus to link on the first load.
	 */
	@Input() initialFocus: boolean = false;

	/**
	 * Focus event output
	 */
	@Output() handleFocus = new EventEmitter<FocusEvent>();

	/**
	 * Blur event output
	 */
	@Output() handleBlur = new EventEmitter<FocusEvent>();

	/**
	 * Aria-label for the external link
	 */
	protected _externalLinkAriaLabel: string;

	/**
	 * Fudis translations
	 */
	protected _translations: Signal<FudisTranslationConfig>;

	private _focusTryCounter: number = 0;

	ngAfterViewInit(): void {
		if (this.initialFocus) {
			this._focusToLink();
		}
	}

	protected _handleFocus(event: FocusEvent): void {
		this.handleFocus.emit(event);
	}

	protected _handleBlur(event: FocusEvent): void {
		this.handleBlur.emit(event);
	}

	private _focusToLink(): void {
		if (this.linkRef?.nativeElement) {
			this.linkRef.nativeElement.focus();
		} else if (this._focusTryCounter < 100) {
			setTimeout(() => {
				this._focusTryCounter += 1;
				this._focusToLink();
			}, 100);
		}
	}
}
