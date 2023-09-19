import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy } from '@angular/core';
import { BodyTextComponent } from './body-text.component';
import { getElement, sortClasses } from '../../../../../utilities/tests/utilities';

describe('BodyTextComponent', () => {
	let component: BodyTextComponent;
	let fixture: ComponentFixture<BodyTextComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [BodyTextComponent],
		})
			.overrideComponent(BodyTextComponent, {
				set: { changeDetection: ChangeDetectionStrategy.Default },
			})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BodyTextComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	describe('CSS classes', () => {
		it('should change CSS classes according to the given body-text size', () => {
			const element = getElement(fixture, '.fudis-body-text');

			expect(sortClasses(element.className)).toEqual(
				sortClasses('fudis-body-text fudis-body-text__default fudis-body-text__left fudis-body-text__md-regular')
			);

			component.size = 'lg-light';
			fixture.detectChanges();

			expect(sortClasses(element.className)).toEqual(
				sortClasses('fudis-body-text fudis-body-text__default fudis-body-text__left fudis-body-text__lg-light')
			);

			component.size = 'lg-regular';
			fixture.detectChanges();

			expect(sortClasses(element.className)).toEqual(
				sortClasses('fudis-body-text fudis-body-text__default fudis-body-text__left fudis-body-text__lg-regular')
			);

			component.size = 'md-light';
			fixture.detectChanges();

			expect(sortClasses(element.className)).toEqual(
				sortClasses('fudis-body-text fudis-body-text__default fudis-body-text__left fudis-body-text__md-light')
			);

			component.size = 'sm-regular';
			fixture.detectChanges();

			expect(sortClasses(element.className)).toEqual(
				sortClasses('fudis-body-text fudis-body-text__default fudis-body-text__left fudis-body-text__sm-regular')
			);
		});

		it('should change CSS classes according to given body-text color', () => {
			const element = getElement(fixture, '.fudis-body-text');
			component.color = 'white';
			fixture.detectChanges();

			expect(sortClasses(element.className)).toEqual(
				sortClasses('fudis-body-text fudis-body-text__white fudis-body-text__left fudis-body-text__md-regular')
			);
		});

		it('should change CSS classes according to given body-text align', () => {
			const element = getElement(fixture, '.fudis-body-text');

			expect(sortClasses(element.className)).toEqual(
				sortClasses('fudis-body-text fudis-body-text__default fudis-body-text__left fudis-body-text__md-regular')
			);

			component.align = 'center';
			fixture.detectChanges();

			expect(sortClasses(element.className)).toEqual(
				sortClasses('fudis-body-text fudis-body-text__default fudis-body-text__center fudis-body-text__md-regular')
			);

			component.align = 'right';
			fixture.detectChanges();

			expect(sortClasses(element.className)).toEqual(
				sortClasses('fudis-body-text fudis-body-text__default fudis-body-text__right fudis-body-text__md-regular')
			);
		});
	});
});
