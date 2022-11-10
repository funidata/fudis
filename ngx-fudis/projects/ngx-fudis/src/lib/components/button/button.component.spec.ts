import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
	let component: ButtonComponent;
	let fixture: ComponentFixture<ButtonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ButtonComponent],
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

	function assertButtonHasClasses(...classes: string[]): void {
		const buttonClasses = getButton()?.className ?? '';
		expect(buttonClasses.split(' ').sort()).toEqual([...classes].sort());
	}

	describe('button CSS classes', () => {
		it('should contain classes for medium sized primary button by default', () => {
			assertButtonHasClasses('fudis-button', 'fudis-button__primary', 'fudis-button__medium');
		});

		it('should map the given inputs to the corresponding CSS classes', () => {
			component.size = 'small';
			component.variant = 'secondary';
			fixture.detectChanges();

			assertButtonHasClasses('fudis-button', 'fudis-button__small', 'fudis-button__secondary');
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
});
