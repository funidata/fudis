import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDetectionStrategy } from '@angular/core';
import { BadgeComponent } from './badge.component';

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

	describe('CSS classes', () => {
		it('should change the class according to the given badge variant', () => {
			component.variant = 'accent';
			fixture.detectChanges();
			assertBadgeHasClasses('fudis-badge fudis-badge__accent');
		});
	});
});
