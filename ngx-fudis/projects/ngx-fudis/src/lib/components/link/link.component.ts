import { ChangeDetectionStrategy, Component, Input, Signal, effect } from '@angular/core';
import { FudisTranslationService } from '../../utilities/translation/translation.service';
import { FudisTranslationConfig } from '../../types/miscellaneous';

/**
 * Example usages:
 *
 * Inside another element e.g. fudis-heading
 * ```
 * <fudis-heading [level]="3">
 * 		<fudis-link
 *     		[href]="/path-to"
 *     		[linkTitle]="'Heading link'">
 * 		</fudis-link>
 * </fudis-heading>
 * ```
 *
 * External link with icon and assistive aria-label
 * ```
 * <fudis-link
 *     [href]="https://www.example.com"
 *     [isExternalLink]="true"
 * 	color="default">
 * </fudis-link>
 * ```
 */

@Component({
	selector: 'fudis-link',
	templateUrl: './link.component.html',
	styleUrls: ['./link.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent {
	constructor(private _translationService: FudisTranslationService) {
		effect(() => {
			this._translations = this._translationService.getTranslations();

			this._externalLinkAriaLabel = this._translations().LINK.EXTERNAL_LINK;
		});
	}

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
	 * Link uses primary blue color.
	 * Option to set color to 'default' which is a dark gray color. It is mainly used in links inside notification component but can be added to any link component if necessary.
	 */
	@Input() color: 'primary' | 'default' = 'primary';

	/**
	 * Aria-label for the external link
	 */
	protected _externalLinkAriaLabel: string;

	/**
	 * Fudis translations
	 */
	protected _translations: Signal<FudisTranslationConfig>;
}
