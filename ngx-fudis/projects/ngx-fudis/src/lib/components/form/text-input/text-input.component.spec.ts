import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MockComponent } from 'ng-mocks';
import { By } from '@angular/platform-browser';
import { TextInputComponent } from './text-input.component';
import { LabelComponent } from '../label/label.component';
import { GuidanceComponent } from '../guidance/guidance.component';
import { FudisInputWidth } from '../../../types/forms';

const textInputControl: FormControl = new FormControl('');

describe('TextInputComponent', () => {
	let component: TextInputComponent;
	let fixture: ComponentFixture<TextInputComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TextInputComponent, MockComponent(LabelComponent), MockComponent(GuidanceComponent)],
			imports: [ReactiveFormsModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TextInputComponent);
		component = fixture.componentInstance;
		component.control = textInputControl;
		fixture.detectChanges();
	});

	function assertTextInputHasClasses(classes: string): void {
		const childSpan = fixture.nativeElement.childNodes;
		const componentClasses = childSpan[0].className.split(' ').sort();
		expect(componentClasses).toEqual(classes.split(' ').sort());
	}

	function textInputSizeCheck(size: FudisInputWidth): void {
		component.size = size;
		fixture.detectChanges();
		assertTextInputHasClasses(`fudis-text-input fudis-text-input__${size}`);
	}

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('Min and max length attributes', () => {
		it('should set HTML minlength attribute according to given minLength Input', () => {
			component.minLength = 5;
			fixture.detectChanges();
			const elem = fixture.debugElement.query(By.css('input'));

			expect(elem.nativeElement.getAttribute('minlength')).toBe('5');
		});

		it('should set HTML maxlength attribute according to given maxLength Input', () => {
			component.maxLength = 20;
			fixture.detectChanges();
			const elem = fixture.debugElement.query(By.css('input'));

			expect(elem.nativeElement.getAttribute('maxlength')).toBe('20');
		});
	});

	describe('Min and max number attributes', () => {
		it('should set HTML min attribute according to given minNumber Input', () => {
			component.minNumber = 1;
			fixture.detectChanges();
			const elem = fixture.debugElement.query(By.css('input'));

			expect(elem.nativeElement.getAttribute('min')).toBe('1');
		});

		it('should set HTML max attribute according to given maxNumber Input', () => {
			component.maxNumber = 99;
			fixture.detectChanges();
			const elem = fixture.debugElement.query(By.css('input'));

			expect(elem.nativeElement.getAttribute('max')).toBe('99');
		});
	});

	describe('Control', () => {
		it('should set control as invalid if required text-input is touched and empty', () => {
			component.control = new FormControl('', Validators.required);

			expect(component.control.value).toEqual('');
			expect(component.control.invalid).toBeTruthy();
		});

		it('should set control as invalid if text is too short according to given minLength validator value', () => {
			component.control = new FormControl('', [Validators.minLength(10)]);
			component.control.patchValue('too short');

			expect(component.control.value).toEqual('too short');
			expect(component.control.invalid).toBeTruthy();
		});

		it('should set control as invalid if number is not respective to given min validator value', () => {
			component.control = new FormControl('', [Validators.min(1)]);
			component.control.patchValue('-10');

			expect(component.control.value).toEqual('-10');
			expect(component.control.invalid).toBeTruthy();
		});

		it('should set control as invalid if number is not respective to given max validator value', () => {
			component.control = new FormControl('', [Validators.max(99)]);
			component.control.patchValue('210');

			expect(component.control.value).toEqual('210');
			expect(component.control.invalid).toBeTruthy();
		});
	});

	describe('CSS classes', () => {
		it('should have respective classes according to given size Input', () => {
			textInputSizeCheck('sm');
			textInputSizeCheck('md');
			textInputSizeCheck('lg');
		});
	});
});
