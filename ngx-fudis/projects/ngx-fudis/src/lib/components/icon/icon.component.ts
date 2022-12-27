import { Component, Input } from '@angular/core';

export type Icon =
	| 'achievement'
	| 'achievement-small'
	| 'alert'
	| 'alert-fill'
	| 'alert-fill-attention'
	| 'alert-small'
	| 'archive'
	| 'arrow-big'
	| 'arrow-dashed'
	| 'arrow-solid'
	| 'back'
	| 'brochure'
	| 'bullets'
	| 'calendar'
	| 'change-log'
	| 'check'
	| 'check-indeterminate-small'
	| 'check-small'
	| 'checkmark-circle'
	| 'chevron'
	| 'chevron-ring'
	| 'chevron-ring-fill'
	| 'clock'
	| 'close'
	| 'close-big'
	| 'code'
	| 'decrease-indent'
	| 'delete'
	| 'dot'
	| 'edit'
	| 'editor'
	| 'exclamation-mark-circle'
	| 'exclamation-mark-circle-fill'
	| 'exclamation-mark-small'
	| 'external'
	| 'eye'
	| 'eye-blind'
	| 'fail'
	| 'hourglass'
	| 'increase-indent'
	| 'info'
	| 'info-circle'
	| 'info-circle-fill'
	| 'info-small'
	| 'junction'
	| 'link'
	| 'list-add'
	| 'list-minus'
	| 'lock'
	| 'lock-open'
	| 'magic-wand'
	| 'mail'
	| 'menu'
	| 'message'
	| 'minus'
	| 'minus-ring-fill'
	| 'notebook'
	| 'notification'
	| 'numbering'
	| 'pdf'
	| 'people'
	| 'person'
	| 'person-small'
	| 'picker'
	| 'pin-small'
	| 'place'
	| 'place-ring-fill'
	| 'plus'
	| 'print'
	| 'question-mark'
	| 'question-mark-small'
	| 'required'
	| 'ring-close'
	| 'ring-close-fill'
	| 'ring-plus'
	| 'ring-plus-fill'
	| 'rosette'
	| 'rule'
	| 'search'
	| 'seats'
	| 'settings'
	| 'shopping-cart'
	| 'sorter'
	| 'star'
	| 'switch'
	| 'three-dots'
	| 'three-dots-small'
	| 'waiting-approval'
	| 'waiting-decline'
	| 'zoom-in'
	| 'zoom-out';

export type IconColor = 'attention' | 'danger' | 'default' | 'light' | 'primary' | 'success' | 'white';

/**
 * Example: `<fudis-icon icon="info" color="primary"></fudis-icon>`
 *
 * Icons have default size of 32x32px. Icons with suffix _-small_ are scaled to 16x16px.
 *
 * Icons with suffix _-fill_ (e.g. "alert-fill", "info-circle-fill") have their default style with white background. These icons cannot be colored with css fill.
 *
 * Icons can be rotated 180degrees, 90 degrees clockwise and counterclockwise with rotate class
 */

@Component({
	selector: 'fudis-icon',
	templateUrl: './icon.component.html',
	styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
	@Input() icon: Icon;

	@Input() color: IconColor = 'default';

	@Input() rotate: 'flip-180' | 'cw-90' | 'ccw-90';

	public get classes(): string[] {
		if (this.rotate) {
			return [`fudis-icon-rotate__${this.rotate}`];
		}
		return [];
	}
}
