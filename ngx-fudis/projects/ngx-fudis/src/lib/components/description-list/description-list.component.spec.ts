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
		const dlItemDisplayValue = fixture.nativeElement.querySelector('dl') as HTMLElement;
		return dlItemDisplayValue;
	}

	function getDescriptionListDt(classes: string): HTMLElement {
		const itemTermValue = fixture.debugElement.query(By.css(`fudis-dt .${classes}`));
		return itemTermValue.nativeElement;
	}

	function getDescriptionListDd(classes: string): HTMLElement {
		const itemDetail = fixture.debugElement.query(By.css(`fudis-dd .${classes}`));
		return itemDetail.nativeElement;
	}

	function assertDescriptionListHasClasses(classes: string[]): void {
		const dlClasses = getDescriptionList()?.className ?? '';
		expect(dlClasses.split(' ').sort()).toEqual(classes.sort());
	}

	function assertDtHasClasses(classes: string): void {
		const itemTermElement = getDescriptionListDt(classes);
		const dtClasses = itemTermElement.className ?? '';

		expect(dtClasses).toContain(classes);
	}

	function assertDdHasClasses(classes: string, display: string) {
		const itemDetailElement = getDescriptionListDd(classes);
		const ddClasses = itemDetailElement.className ?? '';
		const ddDisplay = getComputedStyle(itemDetailElement).display;
		expect(ddDisplay).toEqual(display);
		expect(ddClasses).toContain(classes);
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
			const parent = fixture.debugElement.query(By.css('fudis-dl-item'));
			const childDt = parent.nativeElement.querySelector('fudis-dt');
			const childDd = parent.nativeElement.querySelector('fudis-dd');
			expect(childDt).toBeTruthy();
			expect(childDd).toBeTruthy();
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
