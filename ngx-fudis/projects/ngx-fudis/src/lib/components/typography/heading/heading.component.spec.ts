import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy } from '@angular/core';
import { HeadingComponent } from './heading.component';
import { FudisHeadingSize, FudisHeadingLevel } from '../../../types/typography';
import { FudisSpacing } from '../../../types/miscellaneous';

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

	function headingCheck(size: FudisHeadingSize, marginBottom: FudisSpacing, level: FudisHeadingLevel): void {
		component.size = size;
		component.marginBottom = marginBottom;
		component.level = level;
		component.ngOnInit();
		assertHeadingHasClasses(`fudis-heading fudis-heading__${size} fudis-mb-${marginBottom}`, level);
	}

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('CSS classes', () => {
		it('should have respective size, margin bottom and level values according to given Inputs', () => {
			headingCheck('xxl', 'xxl', 1);
			headingCheck('xl', 'xl', 2);
			headingCheck('lg', 'lg', 3);
			headingCheck('md', 'md', 4);
			headingCheck('sm', 'sm', 5);
			headingCheck('xs', 'xs', 5);
			headingCheck('xxs', 'xxs', 6);
			headingCheck('xxs', 'none', 6);
		});
	});

	it('should have default classes', () => {
		assertHeadingHasClasses('fudis-heading fudis-heading__lg fudis-mb-xs', 6);
	});
});
