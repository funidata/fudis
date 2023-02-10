import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MockComponent } from 'ng-mocks';
import { ChangeDetectionStrategy } from '@angular/core';
import { TextAreaComponent } from './text-area.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { LabelComponent } from '../label/label.component';

const textAreaControl: UntypedFormControl = new UntypedFormControl('');

describe('TextAreaComponent', () => {
	let component: TextAreaComponent;
	let fixture: ComponentFixture<TextAreaComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TextAreaComponent, MockComponent(ErrorMessageComponent), MockComponent(LabelComponent)],
			imports: [ReactiveFormsModule],
		})
			.overrideComponent(TextAreaComponent, {
				set: { changeDetection: ChangeDetectionStrategy.Default },
			})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TextAreaComponent);
		component = fixture.componentInstance;
		component.label = 'Label for testing purposes';
		component.control = textAreaControl;
		component.id = 'id-for-testing';

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
