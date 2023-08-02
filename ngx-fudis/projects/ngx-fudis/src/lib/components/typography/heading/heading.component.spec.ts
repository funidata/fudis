import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy } from '@angular/core';
import { HeadingComponent } from './heading.component';
import { FudisHeadingSize, FudisHeadingTag } from '../../../types/typography';
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

	function getHeading(tag: FudisHeadingTag): HTMLElement {
		fixture.detectChanges();
		return fixture.debugElement.nativeElement.querySelector(tag) as HTMLElement;
	}

	function assertHeadingHasClasses(classes: string, tag: FudisHeadingTag): void {
		const headingClasses = getHeading(tag)?.className.split(' ').sort();
		expect(headingClasses).toEqual(classes.split(' ').sort());
	}

	function headingCheck(size: FudisHeadingSize, marginBottom: FudisSpacing, tag: FudisHeadingTag): void {
		component.size = size;
		component.marginBottom = marginBottom;
		component.tag = tag;
		component.ngOnInit();
		assertHeadingHasClasses(`fudis-heading fudis-heading__${size} fudis-mb-${marginBottom}`, tag);
	}

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('CSS classes', () => {
		it('should have respective size, margin bottom and tag values according to given Inputs', () => {
			headingCheck('xxl', 'xxl', 'h1');
			headingCheck('xl', 'xl', 'h2');
			headingCheck('lg', 'lg', 'h3');
			headingCheck('md', 'md', 'h3');
			headingCheck('sm', 'sm', 'h4');
			headingCheck('xs', 'xs', 'h5');
			headingCheck('xxs', 'xxs', 'h6');
			headingCheck('xxs', 'none', 'h6');
		});
	});

	it('should have default classes', () => {
		assertHeadingHasClasses('fudis-heading fudis-heading__lg fudis-mb-xs', 'h6');
	});
});
