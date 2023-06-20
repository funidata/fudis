import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy } from '@angular/core';
import { HeadingComponent } from './heading.component';

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
		component.ngOnInit();
		fixture.detectChanges();
	});

	function getHeading(): HTMLElement {
		return fixture.nativeElement.querySelector('.fudis-heading__s') as HTMLElement;
	}

	function assertHeadingHasClasses(classes: string[]): void {
		const headingClasses = getHeading()?.className ?? '';

		expect(headingClasses.split(' ').sort()).toEqual([...classes].sort());
	}

	function assertHeadingHasTag(tag: string): void {
		const Tag = fixture.nativeElement.querySelector(tag);
		expect(Tag).toBeTruthy();
	}

	describe('heading has CSS classes and prefered heading tag', () => {
		it('should add size s to header', () => {
			component.size = 's';
			component.ngOnInit();
			fixture.detectChanges();
			assertHeadingHasClasses(['fudis-heading', 'fudis-heading__s', 'fudis-mb-xs']);
		});

		it('should add tags to header', () => {
			const headingLevel = 'h3';
			component.tag = headingLevel;
			component.ngOnInit();
			fixture.detectChanges();
			assertHeadingHasTag(headingLevel);
		});
	});
});
