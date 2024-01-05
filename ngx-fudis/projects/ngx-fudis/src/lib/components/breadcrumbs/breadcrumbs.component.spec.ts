import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { LinkComponent } from '../link/link.component';
import { IconComponent } from '../icon/icon.component';
import { BodyTextComponent } from '../typography/body-text/body-text.component';
import { FudisIdService } from '../../services/id/id.service';
import { BreadcrumbsItemComponent } from './breadcrumbs-item/breadcrumbs-item.component';
import { FudisTranslationService } from '../../services/translation/translation.service';

@Component({
	selector: 'fudis-mock-component',
	template: `<fudis-breadcrumbs [label]="'Test breadcrumbs navigation'">
		<p class="do-not-find-me">This should not be shown</p>
		<fudis-breadcrumbs-item *ngFor="let link of links" [url]="link.url" [label]="link.label" />
	</fudis-breadcrumbs>`,
})
class MockComponent {
	public links = [
		{ label: 'Components', url: '/components' },
		{ label: 'Breadcrumbs', url: '/components/breadcrumbs' },
		{ label: 'Documentation', url: '/components/breadcrumbs/documentation' },
	];
}

describe('BreadcrumbsComponent', () => {
	let fixture: ComponentFixture<BreadcrumbsComponent> | ComponentFixture<MockComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				BreadcrumbsComponent,
				BreadcrumbsItemComponent,
				LinkComponent,
				IconComponent,
				BodyTextComponent,
				MockComponent,
			],
			imports: [RouterTestingModule],
			providers: [FudisIdService, FudisTranslationService],
		});

		fixture = TestBed.createComponent(MockComponent);
		fixture.detectChanges();
	});

	it('should render the correct number of breadcrumb items', () => {
		const breadcrumbItems = fixture.debugElement.queryAll(By.css('fudis-breadcrumbs-item'));

		const nonWantedItem = fixture.debugElement.queryAll(By.css('.do-not-find-me'));

		expect(breadcrumbItems.length).toBe(3);
		expect(nonWantedItem.length).toBe(0);
	});

	it('should have the correct labels and attributes', () => {
		const breadcrumb: HTMLElement = fixture.nativeElement.querySelector('nav');

		const ariaLabel = breadcrumb.getAttribute('aria-label');

		const id = breadcrumb.getAttribute('id');

		expect(ariaLabel).toEqual('Breadcrumbs: Test breadcrumbs navigation');
		expect(id).toEqual('fudis-breadcrumbs-1');
	});

	describe('child item components', () => {
		// FIXME: Use visual regression tests instead of testing style attribute values directly.
		it.skip('should have only one body text element visible', () => {
			const items: NodeList = fixture.nativeElement.querySelectorAll('fudis-breadcrumbs-item .fudis-breadcrumbs-item');

			const currentTexts: (string | null | undefined)[] = [];

			const foundIndexes: (number | null | undefined)[] = [];

			items.forEach((item, index) => {
				const currentElement: Element | null = (item as Element)!.querySelector('.fudis-breadcrumbs-item__current');
				if (currentElement && getComputedStyle(currentElement).display === 'block') {
					foundIndexes.push(index);
					currentTexts.push(currentElement.querySelector('p')!.innerHTML);
				}
			});

			expect(items.length).toEqual(3);
			expect(foundIndexes).toEqual([2]);
			expect(currentTexts.join(' ')).toEqual('Documentation');
		});

		// FIXME: Use visual regression tests instead of testing style attribute values directly.
		it.skip('should have correct amount of links with correct texts and icons visible', () => {
			const items: NodeList = fixture.nativeElement.querySelectorAll('fudis-breadcrumbs-item .fudis-breadcrumbs-item');

			const linkTexts: (string | null | undefined)[] = [];

			const foundIconIndexes: (number | null | undefined)[] = [];

			const foundLinkIndexes: (number | null | undefined)[] = [];

			items.forEach((item, index) => {
				const iconElement: HTMLElement | null = (item as HTMLElement).querySelector('.fudis-breadcrumbs-item__icon');

				if (iconElement && getComputedStyle(iconElement).display === 'flex') {
					foundIconIndexes.push(index);
				}

				const linkElement: Element | null = (item as Element)!.querySelector('.fudis-breadcrumbs-item__link');
				if (linkElement && getComputedStyle(linkElement).display === 'block') {
					foundLinkIndexes.push(index);

					linkTexts.push(linkElement.querySelector('a')!.innerHTML.trim());
				}
			});

			expect(foundIconIndexes).toEqual([0, 1]);
			expect(foundLinkIndexes).toEqual([0, 1]);
			expect(linkTexts.join(' ')).toEqual('Components Breadcrumbs');
		});

		// FIXME: Use visual regression tests instead of testing style attribute values directly.
		it.skip('should have correct link hrefs', () => {
			const items: NodeList = fixture.nativeElement.querySelectorAll('fudis-breadcrumbs-item .fudis-breadcrumbs-item');

			const linkHrefs: (string | null | undefined)[] = [];

			items.forEach((item) => {
				const linkElement: Element | null = (item as Element)!.querySelector('.fudis-breadcrumbs-item__link');
				if (linkElement && getComputedStyle(linkElement).display === 'block') {
					linkHrefs.push(linkElement.querySelector('a')?.getAttribute('href'));
				}
			});

			expect(linkHrefs.join(' ')).toEqual('/components /components/breadcrumbs');
		});

		it('should have correct id attributes', () => {
			const items: NodeList = fixture.nativeElement.querySelectorAll('fudis-breadcrumbs-item .fudis-breadcrumbs-item');

			const idList: (string | null | undefined)[] = [];

			items.forEach((item) => {
				const itemId = (item as HTMLElement).getAttribute('id');
				idList.push(itemId);
			});

			expect(idList.join(' ')).toEqual(
				'fudis-breadcrumbs-1-item-1 fudis-breadcrumbs-1-item-2 fudis-breadcrumbs-1-item-3'
			);
		});
	});
});
