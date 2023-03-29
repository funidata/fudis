import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MockComponent } from 'ng-mocks';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownComponent } from './dropdown.component';
import { LabelComponent } from '../label/label.component';

import { GuidanceComponent } from '../guidance/guidance.component';

const dropdownControl: FormControl = new FormControl('');

describe('DropdownComponent', () => {
	let component: DropdownComponent;
	let fixture: ComponentFixture<DropdownComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DropdownComponent, MockComponent(LabelComponent), MockComponent(GuidanceComponent)],
			imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, BrowserAnimationsModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DropdownComponent);
		component = fixture.componentInstance;
		component.label = 'Label for testing purposes';
		component.control = dropdownControl;
		component.id = 'test-id-dropdown';
		component.options = [
			{ value: '1', viewValue: 'First option' },
			{ value: '2', viewValue: 'Second option' },
		];
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
