import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MockComponent } from 'ng-mocks';
import { By } from '@angular/platform-browser';
import { TextAreaComponent } from './text-area.component';
import { LabelComponent } from '../label/label.component';
import { GuidanceComponent } from '../guidance/guidance.component';
import { FudisInputWidth } from '../../../types/forms';

const textAreaControl: FormControl = new FormControl('');

describe('TextAreaComponent', () => {
	let component: TextAreaComponent;
	let fixture: ComponentFixture<TextAreaComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TextAreaComponent, MockComponent(LabelComponent), MockComponent(GuidanceComponent)],
			imports: [ReactiveFormsModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TextAreaComponent);
		component = fixture.componentInstance;
		component.control = textAreaControl;
		fixture.detectChanges();
	});

	function assertTextAreaHasClasses(classes: string): void {
		const childSpan = fixture.nativeElement.childNodes;
		const componentClasses = childSpan[0].className.split(' ').sort();
		expect(componentClasses).toEqual(classes.split(' ').sort());
	}

	function textAreaSizeCheck(size: FudisInputWidth): void {
		component.size = size;
		fixture.detectChanges();
		assertTextAreaHasClasses(`fudis-text-area fudis-text-area__${size}`);
	}

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('Min and max length attributes', () => {
		it('should set HTML minlength attribute according to given minLength Input', () => {
			component.minLength = 5;
			fixture.detectChanges();
			const elem = fixture.debugElement.query(By.css('textarea'));
			expect(elem.nativeElement.getAttribute('minlength')).toBe('5');
		});

		it('should set HTML maxlength attribute according to given maxLength Input', () => {
			component.maxLength = 20;
			fixture.detectChanges();
			const elem = fixture.debugElement.query(By.css('textarea'));
			expect(elem.nativeElement.getAttribute('maxlength')).toBe('20');
		});
	});

	describe('Control', () => {
		it('should set control as invalid if required text area is touched and empty', () => {
			component.control = new FormControl('', Validators.required);
			component.control.patchValue('');

			expect(component.control.value).toEqual('');
			expect(component.control.invalid).toBeTruthy();
		});

		it('should set control as invalid if text is too short according to given minLength validator value', () => {
			component.control = new FormControl('', [Validators.minLength(10)]);
			component.control.patchValue('too short');

			expect(component.control.value).toEqual('too short');
			expect(component.control.invalid).toBeTruthy();
		});
	});

	describe('CSS classes', () => {
		it('should have respective classes according to given size Input', () => {
			textAreaSizeCheck('sm');
			textAreaSizeCheck('md');
			textAreaSizeCheck('lg');
		});
	});
});
