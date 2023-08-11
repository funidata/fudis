import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { LanguageBadgeComponent } from './language-badge.component';
import { TooltipDirective } from '../../../directives/tooltip/tooltip.directive';

fdescribe('LanguageBadgeComponent', () => {
	let component: LanguageBadgeComponent;
	let fixture: ComponentFixture<LanguageBadgeComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LanguageBadgeComponent, TooltipDirective],
			imports: [MatTooltipModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(LanguageBadgeComponent);
		component = fixture.componentInstance;
		component.language = 'en';
		component.variant = 'standard';
		component.id = 'fudis-language-badge-button-id';
		component.badgeGroupId = 'fudis-language-badge-button-id-group';
		fixture.detectChanges();
	});

	function assertLanguageBadgeHasClasses(classes: string): void {
		const childSpan = fixture.nativeElement.childNodes;
		const componentClasses = childSpan[0].className.split(' ').sort();
		expect(componentClasses).toEqual(classes.split(' ').sort());
	}

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('Contents', () => {
		it('should always have class name missing if language badge variant is a type missing', () => {
			component.variant = 'missing';
			fixture.detectChanges();
			assertLanguageBadgeHasClasses('fudis-language-badge fudis-language-badge__missing');
		});

		it('should always have class name selected if language badge is selected', () => {
			component.selected = true;
			fixture.detectChanges();
			assertLanguageBadgeHasClasses(
				'fudis-language-badge fudis-language-badge__standard fudis-language-badge--selected'
			);
		});

		it('should have given label matching to aria-label', () => {
			component.label = 'This is test label';
			fixture.detectChanges();
			const LanguageBadgeLabel = fixture.debugElement.query(By.css('.fudis-language-badge'));
			expect(LanguageBadgeLabel.nativeElement.getAttribute('aria-label')).toEqual('This is test label');
		});
	});
});
