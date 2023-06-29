import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { GridComponent } from '../grid/grid/grid.component';
import { GridDirective } from '../../directives/grid/grid/grid.directive';

import { DescriptionListComponent } from './description-list.component';
import { FudisGridService } from '../../directives/grid/grid-service/grid.service';
import { DescriptionListItemComponent } from './description-list-item/description-list-item.component';
import { DescriptionListItemTermComponent } from './description-list-item/description-list-item-term/description-list-item-term.component';
import { DescriptionListItemDetailsComponent } from './description-list-item/description-list-item-details/description-list-item-details.component';

describe('DescriptionListComponent', () => {
	let component: DescriptionListComponent;
	let fixture: ComponentFixture<DescriptionListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				DescriptionListComponent,
				GridDirective,
				GridComponent,
				DescriptionListItemComponent,
				DescriptionListItemTermComponent,
				DescriptionListItemDetailsComponent,
			],
			providers: [FudisGridService],
		}).compileComponents();
	});

	beforeEach(async () => {
		fixture = TestBed.createComponent(DescriptionListComponent);
		component = fixture.componentInstance;
		component.data = [
			{
				key: 'Kieli',
				value: 'Tagalog',
			},
		];

		fixture.detectChanges();
	});

	function getDescriptionList(): HTMLElement {
		const descriptionListItemElement = fixture.nativeElement.querySelector('dl') as HTMLElement;
		return descriptionListItemElement;
	}

	function getDescriptionListDt(classes: string): HTMLElement {
		const descriptionListItemKeyElement = fixture.debugElement.query(By.css(`fudis-dt .${classes}`));
		return descriptionListItemKeyElement.nativeElement;
	}

	function getDescriptionListDd(classes: string): HTMLElement {
		const descriptionListItemValueElement = fixture.debugElement.query(By.css(`fudis-dd .${classes}`));
		return descriptionListItemValueElement.nativeElement;
	}

	function assertDescriptionListHasClasses(classes: string[]): void {
		const descriptionListItemClassName = getDescriptionList()?.className ?? '';
		expect(descriptionListItemClassName.split(' ').sort()).toEqual(classes.sort());
	}

	function assertDtHasClasses(classes: string): void {
		const descriptionListItemKeyClassName = getDescriptionListDt(classes).className ?? '';

		expect(descriptionListItemKeyClassName).toContain(classes);
	}

	function assertDdHasClasses(classes: string, display: string) {
		const descriptionListItemValueElement = getDescriptionListDd(classes);
		const descriptionListItemValueClassName = descriptionListItemValueElement.className ?? '';
		const descriptionListItemValueDisplayStyle = getComputedStyle(descriptionListItemValueElement).display;
		expect(descriptionListItemValueDisplayStyle).toEqual(display);
		expect(descriptionListItemValueClassName).toContain(classes);
	}

	describe('Parent CSS class', () => {
		it('should have fudis-description-list and fudis-grid classes if regular list', () => {
			const classList = [
				'fudis-description-list',
				'fudis-grid',
				'fudis-grid__margin__sides__none',
				'fudis-grid__align__center',
				'fudis-grid__margin__bottom__none',
				'fudis-grid__margin__top__none',
				'fudis-grid__xxl',
			];
			assertDescriptionListHasClasses(classList);
		});
		it('should have fudis-description-list-compact and fudis-grid classes if compact list', () => {
			component.variant = 'compact';
			component.ngOnChanges();
			fixture.detectChanges();
			const classList = [
				'fudis-description-list-compact',
				'fudis-grid',
				'fudis-grid__align__center',
				'fudis-grid__margin__sides__none',
				'fudis-grid__margin__bottom__none',
				'fudis-grid__margin__top__none',
				'fudis-grid__row-gap__none',
				'fudis-grid__xxl',
			];
			assertDescriptionListHasClasses(classList);
		});
		it('should not have fudis-grid classes if grid directive is disabled if regular list', () => {
			component.disableGrid = true;
			component.ngOnChanges();
			fixture.detectChanges();
			const classList = ['fudis-description-list', 'fudis-description-list__disabled-grid'];
			assertDescriptionListHasClasses(classList);
		});
		it('should not have fudis-grid classes if grid directive is disabled if compact list', () => {
			component.variant = 'compact';
			component.disableGrid = true;
			component.ngOnChanges();
			fixture.detectChanges();
			const classList = ['fudis-description-list-compact', 'fudis-description-list-compact__disabled-grid'];
			assertDescriptionListHasClasses(classList);
		});
	});

	describe('description list item, term and detail components', () => {
		it('should be present', () => {
			const descriptionListItem = fixture.debugElement.query(By.css('fudis-dl-item'));
			const descriptionListItemTerm = descriptionListItem.nativeElement.querySelector('fudis-dt');
			const descriptionListItemDetails = descriptionListItem.nativeElement.querySelector('fudis-dd');
			expect(descriptionListItemTerm).toBeTruthy();
			expect(descriptionListItemDetails).toBeTruthy();
		});

		it('should have respective CSS classes and display style in regular list', () => {
			assertDtHasClasses('fudis-description-list__item__term');
			assertDdHasClasses('fudis-description-list__item__details', 'flex');
		});

		it('should have respective CSS classes and display style in compact list', () => {
			component.variant = 'compact';
			component.ngOnChanges();
			fixture.detectChanges();
			assertDtHasClasses('fudis-description-list-compact__item__term');
			assertDdHasClasses('fudis-description-list-compact__item__details', 'inline');
		});
	});
});
