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
			assertButtonHasClasses('fudis-button', 'fudis-button--primary', 'fudis-button--medium');
		});

		it('should map the given inputs to the corresponding CSS classes', () => {
			component.size = 'small';
			component.variant = 'secondary';
			fixture.detectChanges();

			assertButtonHasClasses('fudis-button', 'fudis-button--small', 'fudis-button--secondary');
		});
	});
});
