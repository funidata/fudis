import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FudisIcon } from '../../types/icons';

export type NotificationType = 'warning' | 'danger' | 'success' | 'light';

@Component({
	selector: 'fudis-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnChanges, OnInit {
	/**
	 * Notification variant options
	 */
	@Input() variant?: NotificationType;

	/**
	 * Icon for notification
	 */
	icon: FudisIcon;

	ngOnInit(): void {
		this.getClasses();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (!changes['icon']) {
			this.getClasses();
		}
	}

	private getClasses(): void {
		switch (this.variant) {
			case 'warning':
				this.icon = 'exclamation-mark-circle';
				break;
			case 'danger':
				this.icon = 'alert';
				break;
			case 'success':
				this.icon = 'checkmark-circle';
				break;
			case 'light':
				this.icon = 'info-circle';
				break;
			default:
				break;
		}
	}
}
