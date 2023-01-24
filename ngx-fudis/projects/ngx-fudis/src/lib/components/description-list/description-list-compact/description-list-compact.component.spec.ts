import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DescriptionListCompactComponent } from './description-list-compact.component';

describe('DescriptionListCompactComponent', () => {
	let component: DescriptionListCompactComponent;
	let fixture: ComponentFixture<DescriptionListCompactComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DescriptionListCompactComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DescriptionListCompactComponent);
		component = fixture.componentInstance;
		component.data = [
			{
				key: 'Kieli',
				value: 'Tagalog',
			},
		];
		fixture.detectChanges();
	});

	function getDescriptionListCompact(): HTMLElement {
		return fixture.nativeElement.querySelector('dl') as HTMLElement;
	}

	function getDescriptionListCompactDt(): HTMLElement {
		return fixture.nativeElement.querySelector('dt') as HTMLElement;
	}

	function getDescriptionListCompactDd(): HTMLElement {
		return fixture.nativeElement.querySelector('dd') as HTMLElement;
	}

	function assertDescriptionListCompactHasClasses(...classes: string[]): void {
		const dlClasses = getDescriptionListCompact()?.className ?? '';
		expect(dlClasses.split(' ').sort()).toEqual([...classes].sort());
	}

	function assertDtHasClasses(...classes: string[]): void {
		const dtClasses = getDescriptionListCompactDt()?.className ?? '';
		expect(dtClasses.split(' ').sort()).toEqual([...classes].sort());
	}

	function assertDdHasClasses(...classes: string[]): void {
		const ddClasses = getDescriptionListCompactDd()?.className ?? '';
		expect(ddClasses.split(' ').sort()).toEqual([...classes].sort());
	}

	describe('Parent CSS class', () => {
		it('should always have fudis-description-list-compact class', () => {
			assertDescriptionListCompactHasClasses('fudis-description-list-compact');
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
			assertDtHasClasses('fudis-description-list-compact__key');
			assertDdHasClasses('fudis-description-list-compact__value');
		});
	});
});
