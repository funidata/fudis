import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeadingComponent } from './heading.component';

describe('HeadingComponent', () => {
	let component: HeadingComponent;
	let fixture: ComponentFixture<HeadingComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [HeadingComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(HeadingComponent);
		component = fixture.componentInstance;
		component.tag = 'h2';
		fixture.detectChanges();
	});

	function assertHeadingHasClasses(classes: string): void {
		const childSpan = fixture.nativeElement.childNodes;
		const componentClasses = childSpan[0].className.split(' ').sort();
		console.log(componentClasses);
		expect(componentClasses).toEqual(classes.split(' ').sort());
	}

	function assertHeadingHasTag(tag: string): void {
		const Tag = fixture.nativeElement.querySelector(tag);
		expect(Tag).toBeTruthy();
	}

	describe('heading has CSS classes and prefered heading tag', () => {
		it('should add size s to header', () => {
			component.size = 's';
			fixture.detectChanges();
			assertHeadingHasClasses('fudis-heading fudis-heading__s');
		});

		it('should add tags to header', () => {
			const headingLevel = 'h3';
			component.tag = headingLevel;
			fixture.detectChanges();
			assertHeadingHasTag(headingLevel);
		});
	});
});
