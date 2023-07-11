import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MockComponent } from 'ng-mocks';
import { TextAreaComponent } from './text-area.component';
import { LabelComponent } from '../label/label.component';
import { GuidanceComponent } from '../guidance/guidance.component';

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

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('MinLength', () => {
		it('should set control as invalid according to given minLength validator value', () => {
			component.control = new FormControl('', [Validators.minLength(10)]);
			component.control.patchValue('too short');

			expect(component.control.value).toEqual('too short');
			expect(component.control.invalid).toBeTruthy();
		});
	});

	describe('Required', () => {
		it('should set control as invalid if required text area is touched and empty', () => {
			component.control = new FormControl('', Validators.required);
			component.control.patchValue('');

			expect(component.control.value).toEqual('');
			expect(component.control.invalid).toBeTruthy();
		});
	});
});
