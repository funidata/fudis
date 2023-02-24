import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

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
 *     externalLinkAriaLabel="Opens in a new window">
 * </fudis-link>
 * ```
 */

@Component({
	selector: 'fudis-link[href]',
	templateUrl: './link.component.html',
	styleUrls: ['./link.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class LinkComponent {
	/**
	 * Link URL
	 */
	@Input() href: string;

	/**
	 * Title for the link, if not defined title will be the same as link URL
	 */
	@Input() linkTitle?: string;

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
	 * Link uses primary blue link color. "Default"" class name is a dark gray color used by icon component. Icon component inherits this color attribute when external link is used.
	 */
	@Input() color: 'primary' | 'default' = 'primary';
}
