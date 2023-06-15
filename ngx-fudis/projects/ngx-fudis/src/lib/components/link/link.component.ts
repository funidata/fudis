import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Example usages:
 *
 * Inside another element e.g. fudis-heading
 * ```
 * <fudis-heading tag="h3">
 * 		<fudis-link
 *     		href="/path-to"
 *     		linkTitle="Heading link">
 * 		</fudis-link>
 * </fudis-heading>
 * ```
 *
 * External link with icon and assistive aria-label
 * ```
 * <fudis-link
 *     href="https://www.example.com"
 *     [isExternalLink]="true"
 *     externalLinkAriaLabel="Opens in a new window"
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
	/**
	 * Link URL using native href
	 */
	@Input() href: string;

	/**
	 * Link URL using Angular RouterLink
	 */
	@Input() routerLinkUrl: string | any[];

	/**
	 * Title for the link, if not defined title will be the same as link URL
	 */
	@Input() linkTitle: string;

	/**
	 * Link size - by default link will inherit its parent's font-size. If link is not inside e.g. <fudis-heading> or <fudis-body-text> its size can be defined either 'm' (14px) or 'l' (16px).
	 */
	@Input() size: 'inherit' | 'm' | 'l' = 'inherit';

	/**
	 * Option to create an external link to point a target page on another domain.
	 * External link contains external icon and assistive aria-label
	 */
	@Input() isExternalLink: boolean = false;

	/**
	 * Aria-label for the external link
	 */
	@Input() externalLinkAriaLabel?: string;

	/**
	 * Link uses primary blue color.
	 * Option to set color to 'default' which is a dark gray color. It is mainly used in links inside notification component but can be added to any link component if necessary.
	 */
	@Input() color: 'primary' | 'default' = 'primary';
}
