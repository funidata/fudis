import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy } from '@angular/core';
import { BodyTextComponent } from './body-text.component';
import { BodyTextSize } from '../../../types/typography';
import { Spacing } from '../../../types/spacing';

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

	function assertBodyTextHasClasses(classes: string): void {
		const childSpan = fixture.nativeElement.childNodes;
		const componentClasses = childSpan[0].className.split(' ').sort();
		expect(componentClasses).toEqual(classes.split(' ').sort());
	}

	function bodyTextSizes(size: BodyTextSize): void {
		component.size = size;
		fixture.detectChanges();
		assertBodyTextHasClasses(`fudis-body-text fudis-body-text__${size} fudis-mb-none`);
	}

	function marginBottomSizes(marginBottom: Spacing): void {
		component.marginBottom = marginBottom;

		fixture.detectChanges();
		assertBodyTextHasClasses(`fudis-body-text fudis-body-text__m-regular fudis-mb-${marginBottom}`);
	}

	describe('CSS classes', () => {
		it('should change the class according to the given body text size', () => {
			bodyTextSizes('l-regular');
			bodyTextSizes('m-regular');
			bodyTextSizes('s-regular');
			bodyTextSizes('l-light');
			bodyTextSizes('m-light');
		});

		it('should change the class according to the given margin bottom value', () => {
			marginBottomSizes('xxl');
			marginBottomSizes('xl');
			marginBottomSizes('md');
			marginBottomSizes('lg');
			marginBottomSizes('sm');
			marginBottomSizes('xs');
			marginBottomSizes('xxs');
			marginBottomSizes('none');
		});
	});
});
