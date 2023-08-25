import { Component, ContentChild, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FudisIcon } from '../../types/icons';
import { ContentDirective } from '../../directives/content-projection/content/content.directive';
import { FudisNotification } from '../../types/miscellaneous';

@Component({
	selector: 'fudis-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnChanges, OnInit {
	@ContentChild(ContentDirective) content: ContentDirective | null;

	/**
	 * Notification variant options
	 */
	@Input() variant: FudisNotification = 'warning';

	/**
	 * Aria text of the notification variant
	 */
	@Input() ariaVariantText: string;

	/**
	 * Add link href address
	 */
	@Input() link: string;

	/**
	 * Option to create an external link to point a target page on another domain.
	 * External link contains external icon and assistive aria-label
	 */
	@Input() externalLink: boolean = false;

	/**
	 * Title for the link, if not defined title will be the same as link URL
	 */
	@Input() linkTitle: string;

	/**
	 * Icon for notification
	 */
	protected _icon: FudisIcon;

	/**
	 * Initialization
	 */
	ngOnInit(): void {
		this._getClasses();
	}

	/**
	 * Detecting icon changes
	 */
	ngOnChanges(changes: SimpleChanges): void {
		if (!changes['icon']) {
			this._getClasses();
		}
	}

	/**
	 * Used to initialize notifications variant icons
	 */
	private _getClasses(): void {
		switch (this.variant) {
			case 'warning':
				this._icon = 'exclamation-mark-circle';
				break;
			case 'danger':
				this._icon = 'alert';
				break;
			case 'success':
				this._icon = 'checkmark-circle';
				break;
			case 'info':
				this._icon = 'info-circle';
				break;
			default:
				break;
		}
	}
}
