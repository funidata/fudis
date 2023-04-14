import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';
import { GridComponent } from '../grid/grid.component';
import { GridDirective } from '../../directives/grid/grid.directive';

import { DescriptionListComponent } from './description-list.component';

describe('DescriptionListComponent', () => {
	let component: DescriptionListComponent;
	let fixture: ComponentFixture<DescriptionListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DescriptionListComponent, GridDirective, MockComponent(GridComponent)],
		}).compileComponents();
	});

	beforeEach(() => {
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
		return fixture.nativeElement.querySelector('dl') as HTMLElement;
	}

	function getDescriptionListDt(): HTMLElement {
		return fixture.nativeElement.querySelector('dt') as HTMLElement;
	}

	function getDescriptionListDd(): HTMLElement {
		return fixture.nativeElement.querySelector('dd') as HTMLElement;
	}

	function assertDescriptionListHasClasses(classes: string[]): void {
		const dlClasses = getDescriptionList()?.className ?? '';
		expect(dlClasses.split(' ').sort()).toEqual(classes.sort());
	}

	function assertDtHasClasses(...classes: string[]): void {
		const dtClasses = getDescriptionListDt()?.className ?? '';
		expect(dtClasses.split(' ').sort()).toEqual([...classes].sort());
	}

	function assertDdHasClasses(...classes: string[]): void {
		const ddClasses = getDescriptionListDd()?.className ?? '';
		expect(ddClasses.split(' ').sort()).toEqual([...classes].sort());
	}

	describe('Parent CSS class', () => {
		it('should have fudis-description-list and fudis-grid classes if regular list', () => {
			const classList = [
				'fudis-description-list',
				'fudis-grid',
				'fudis-grid__align__center',
				'fudis-grid__margin__bottom__none',
				'fudis-grid__margin__top__none',
				'fudis-grid__xxl',
			];

			assertDescriptionListHasClasses(classList);
		});

		it('should have fudis-description-list-compact and fudis-grid classes if compact list', () => {
			component.variant = 'compact';
			fixture.detectChanges();
			const classList = [
				'fudis-description-list-compact',
				'fudis-grid',
				'fudis-grid__align__center',
				'fudis-grid__margin__bottom__none',
				'fudis-grid__margin__top__none',
				'fudis-grid__row-gap__none',
				'fudis-grid__xxl',
			];
			assertDescriptionListHasClasses(classList);
		});
		it('should not have fudis-grid classes if grid directive is disabled if regular list', () => {
			component.disableGrid = true;
			fixture.detectChanges();
			const classList = ['fudis-description-list', 'fudis-description-list__disabled-grid'];

			assertDescriptionListHasClasses(classList);
		});

		it('should not have fudis-grid classes if grid directive is disabled if compact list', () => {
			component.variant = 'compact';
			component.disableGrid = true;
			fixture.detectChanges();
			const classList = ['fudis-description-list-compact', 'fudis-description-list-compact__disabled-grid'];
			assertDescriptionListHasClasses(classList);
		});
	});

	describe('dt and dd child elements', () => {
		it('should be present', () => {
			const parent = fixture.debugElement.query(By.css('dl'));
			const childDt = parent.nativeElement.querySelector('dt');
			const childDd = parent.nativeElement.querySelector('dd');
			expect(childDt).toBeTruthy();
			expect(childDd).toBeTruthy();
		});

		it('should have respective CSS classes in regular list', () => {
			assertDtHasClasses('fudis-description-list__item__key');
			assertDdHasClasses('fudis-description-list__item__value');
		});

		it('should have respective CSS classes in compact list', () => {
			component.variant = 'compact';
			fixture.detectChanges();
			assertDtHasClasses('fudis-description-list-compact__item__key');
			assertDdHasClasses('fudis-description-list-compact__item__value');
		});
	});
});
