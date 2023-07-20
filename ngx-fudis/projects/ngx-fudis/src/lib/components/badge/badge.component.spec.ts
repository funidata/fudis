import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BadgeComponent } from './badge.component';
import { FudisBadgeVariant } from '../../types/miscellaneous';

describe('BadgeComponent', () => {
	let component: BadgeComponent;
	let fixture: ComponentFixture<BadgeComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [BadgeComponent],
		})
			.overrideComponent(BadgeComponent, {
				set: { changeDetection: ChangeDetectionStrategy.Default },
			})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BadgeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	function assertBadgeHasClasses(classes: string): void {
		const childSpan = fixture.nativeElement.childNodes;
		const componentClasses = childSpan[0].className.split(' ').sort();
		expect(componentClasses).toEqual(classes.split(' ').sort());
	}

	function badgeVariantCheck(variant: FudisBadgeVariant): void {
		component.variant = variant;
		fixture.detectChanges();
		assertBadgeHasClasses(`fudis-badge fudis-badge__${variant}`);
	}

	describe('CSS classes', () => {
		it('should change the class according to the given variant Input', () => {
			badgeVariantCheck('accent');
			badgeVariantCheck('danger');
			badgeVariantCheck('primary');
			badgeVariantCheck('secondary');
			badgeVariantCheck('success');
		});
	});

	describe('Content', () => {
		it('should have text content according to the give content Input', () => {
			component.content = 'Badge text';
			fixture.detectChanges();
			const elem = fixture.debugElement.query(By.css('.fudis-badge'));
			// NOTE: Had to use toContain because there were some unexpected spaces in the HTML element,
			// caused by Input and ng-content being displayed after one another (with space), hence toEqual did not pass.
			expect(elem.nativeElement.innerHTML).toContain(component.content);
		});
	});
});
