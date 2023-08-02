import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RadioButtonComponent } from './radio-button.component';

const lonelyFormControl = new FormControl();

describe('RadioButtonComponent', () => {
	let component: RadioButtonComponent;
	let fixture: ComponentFixture<RadioButtonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [RadioButtonComponent],
			imports: [ReactiveFormsModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(RadioButtonComponent);
		component = fixture.componentInstance;
		component.control = lonelyFormControl;
		fixture.detectChanges();
	});

	function assertRadioButtonHasClasses(classes: string): void {
		const childSpan = fixture.nativeElement.childNodes;
		const componentClasses = childSpan[0].className.split(' ').sort();
		expect(componentClasses).toEqual(classes.split(' ').sort());
	}

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('Contents', () => {
		it('should have viewValue as label', () => {
			component.viewValue = 'Visible value';
			fixture.detectChanges();
			const elem = fixture.debugElement.query(By.css('.fudis-radio-button__label'));
			expect(elem.nativeElement.innerHTML).toEqual(component.viewValue);
		});
	});

	describe('CSS classes', () => {
		it('should always have fudis-radio-button class', () => {
			assertRadioButtonHasClasses('fudis-radio-button');
		});

		it('should have indicator class if radio button is checked', () => {
			component.checked = true;
			fixture.detectChanges();
			const elem = fixture.debugElement.query(By.css('.fudis-radio-button__content__control__indicator'));
			expect(elem.nativeElement).toBeTruthy();
		});
	});
});
