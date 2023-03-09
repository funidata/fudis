import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { IconComponent } from 'ngx-fudis';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
	let component: ButtonComponent;
	let fixture: ComponentFixture<ButtonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ButtonComponent, MockComponent(IconComponent)],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	function getButton(): HTMLElement {
		return fixture.nativeElement.querySelector('button') as HTMLElement;
	}

	function assertButtonHasClasses(classes: string): void {
		const buttonClasses = getButton().className.split(' ').sort();
		expect(buttonClasses).toEqual(classes.split(' ').sort());
	}

	describe('CSS classes', () => {
		it('should contain classes for medium sized primary button by default', () => {
			assertButtonHasClasses('fudis-button fudis-button__primary fudis-button__medium');
		});

		it('should map the given inputs to the corresponding CSS classes', () => {
			component.size = 'small';
			component.variant = 'secondary';
			fixture.detectChanges();
			assertButtonHasClasses('fudis-button fudis-button__small fudis-button__secondary');

			component.size = 'medium';
			component.variant = 'tertiary';
			fixture.detectChanges();
			assertButtonHasClasses('fudis-button fudis-button__medium fudis-button__tertiary');
		});
	});

	describe('button clicked', () => {
		it('should emit events when the button is enabled', () => {
			let clicked = false;
			component.handleClick.subscribe(() => {
				clicked = true;
			});

			getButton()?.click();
			expect(clicked).withContext('No click event received').toEqual(true);
		});

		it('should not emit events when the button is disabled', () => {
			let clicked = false;
			component.handleClick.subscribe(() => {
				clicked = true;
			});

			component.disabled = true;
			fixture.detectChanges();

			getButton()?.click();
			expect(clicked).withContext('Unexpected click event received').toEqual(false);
		});
	});

	describe('button with icon and aria-label', () => {
		it('should have icon component present if icon and aria-label has been given as an Input', () => {
			component.icon = 'three-dots';
			component.ariaLabel = 'Open additional menu';
			component.type = 'button';
			fixture.detectChanges();
			expect(IconComponent).toBeTruthy();
			expect(getButton().getAttribute('aria-label')).toBeTruthy();
			expect(getButton().getAttribute('aria-label')).toEqual('Open additional menu');
			expect(getButton().getAttribute('type')).toEqual('button');
		});
	});

	describe('button label', () => {
		it('should show uppercase context', () => {
			component.label = 'Click me!';
			fixture.detectChanges();
			expect(getButton().innerText).toEqual('CLICK ME!');
		});
	});
});
