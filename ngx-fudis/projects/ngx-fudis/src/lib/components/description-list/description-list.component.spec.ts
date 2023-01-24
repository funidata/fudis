import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DescriptionListComponent } from './description-list.component';

describe('DescriptionListComponent', () => {
	let component: DescriptionListComponent;
	let fixture: ComponentFixture<DescriptionListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DescriptionListComponent],
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

	function assertDescriptionListHasClasses(...classes: string[]): void {
		const dlClasses = getDescriptionList()?.className ?? '';
		expect(dlClasses.split(' ').sort()).toEqual([...classes].sort());
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
		it('should always have fudis-description-list class', () => {
			assertDescriptionListHasClasses('fudis-description-list');
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

		it('should have respecitve CSS classes', () => {
			assertDtHasClasses('fudis-description-list__key');
			assertDdHasClasses('fudis-description-list__value');
		});
	});
});
