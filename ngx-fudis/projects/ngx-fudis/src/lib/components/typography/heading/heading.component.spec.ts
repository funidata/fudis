import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy } from '@angular/core';
import { HeadingComponent } from './heading.component';
import { FudisHeadingSize, FudisHeadingLevel } from '../../../types/typography';
import { FudisTextAlign, FudisSpacing } from '../../../types/miscellaneous';

describe('HeadingComponent', () => {
	let component: HeadingComponent;
	let fixture: ComponentFixture<HeadingComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [HeadingComponent],
		})
			.overrideComponent(HeadingComponent, {
				set: { changeDetection: ChangeDetectionStrategy.Default },
			})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(HeadingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	function getHeading(level: FudisHeadingLevel): HTMLElement {
		fixture.detectChanges();
		return fixture.debugElement.nativeElement.querySelector(`h${level}`) as HTMLElement;
	}

	function assertHeadingHasClasses(classes: string, level: FudisHeadingLevel): void {
		const headingClasses = getHeading(level)?.className.split(' ').sort();

		expect(headingClasses).toEqual(classes.split(' ').sort());
	}

	function headingCheck(
		size: FudisHeadingSize,
		align: FudisTextAlign,
		marginBottom: FudisSpacing,
		level: FudisHeadingLevel
	): void {
		component.size = size;
		component.marginBottom = marginBottom;
		component.level = level;
		component.align = align;
		component.ngOnInit();
		assertHeadingHasClasses(
			`fudis-heading fudis-heading__${align} fudis-heading__${size} fudis-mb-${marginBottom}`,
			level
		);
	}

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('CSS classes', () => {
		it('should have respective size, margin bottom and level values according to given Inputs', () => {
			headingCheck('xxl', 'center', 'xxl', 1);
			headingCheck('xl', 'right', 'xl', 2);
			headingCheck('lg', 'left', 'lg', 3);
			headingCheck('md', 'center', 'md', 4);
			headingCheck('sm', 'right', 'sm', 5);
			headingCheck('xs', 'left', 'xs', 5);
			headingCheck('xxs', 'center', 'xxs', 6);
			headingCheck('xxs', 'right', 'none', 6);
		});
	});

	it('should have default classes', () => {
		assertHeadingHasClasses('fudis-heading fudis-heading__left fudis-heading__lg fudis-mb-xs', 6);
	});
});
