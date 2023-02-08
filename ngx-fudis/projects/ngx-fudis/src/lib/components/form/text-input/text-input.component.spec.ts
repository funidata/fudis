import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, ReactiveFormsModule } from '@angular/forms';
import { MockComponent } from 'ng-mocks';
import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';
import { TextInputComponent } from './text-input.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';

const textInputControl: UntypedFormControl = new UntypedFormControl('');

describe('TextInputComponent', () => {
	let component: TextInputComponent;
	let fixture: ComponentFixture<TextInputComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TextInputComponent, MockComponent(ErrorMessageComponent)],
			imports: [ReactiveFormsModule],
		})
			.overrideComponent(TextInputComponent, {
				set: { changeDetection: ChangeDetectionStrategy.Default },
			})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TextInputComponent);
		component = fixture.componentInstance;
		component.label = 'Label for testing purposes';
		component.control = textInputControl;

		fixture.detectChanges();
	});

	describe('number input', () => {
		it('should accept numbers', () => {
			const numberInput = fixture.debugElement.query(By.css('input'));
			component.type = 'number';
			numberInput.nativeElement.value = '99';
			fixture.detectChanges();
			expect(numberInput.nativeElement.value).toContain('99');
		});
	});

	describe('text input', () => {
		it('should have focus when input is focused', () => {
			const numberInput = fixture.nativeElement.querySelector('input');
			numberInput.dispatchEvent(new Event('focus'));
			fixture.detectChanges();
			expect(numberInput.focus).toBeTruthy();
		});
	});
});
