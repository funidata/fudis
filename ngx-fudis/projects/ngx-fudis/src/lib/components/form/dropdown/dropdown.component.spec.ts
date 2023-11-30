import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MockComponent } from 'ng-mocks';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownComponent } from './dropdown.component';
import { LabelComponent } from '../label/label.component';

import { GuidanceComponent } from '../guidance/guidance.component';
import { FudisDropdownOption, FudisInputSize } from '../../../types/forms';
import { IconComponent } from '../../icon/icon.component';
import { FudisValidators } from '../../../utilities/form/validators';

const dropdownOptions: FudisDropdownOption[] = [
	{ value: 1, label: 'Dog' },
	{ value: 2, label: 'Cat' },
	{ value: 3, label: 'Parrot' },
];

const dropdownControl: FormControl = new FormControl(null);

describe('DropdownComponent', () => {
	let component: DropdownComponent;
	let fixture: ComponentFixture<DropdownComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				DropdownComponent,
				MockComponent(LabelComponent),
				MockComponent(GuidanceComponent),
				MockComponent(IconComponent),
			],
			imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, BrowserAnimationsModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DropdownComponent);
		component = fixture.componentInstance;
		component.control = dropdownControl;
		component.options = dropdownOptions;
		fixture.detectChanges();
	});

	function assertDropdownHasClasses(classes: string): void {
		const childSpan = fixture.nativeElement.childNodes;
		const componentClasses = childSpan[0].className.split(' ').sort();

		expect(componentClasses).toEqual(classes.split(' ').sort());
	}

	function dropdownSizeCheck(size: FudisInputSize): void {
		component.size = size;
		fixture.detectChanges();
		assertDropdownHasClasses(`fudis-dropdown fudis-input-size__${size}`);
	}

	it('should create', () => {
		component.control = new FormControl(null, FudisValidators.required('Selection is required'));
		component.options = dropdownOptions;

		expect(component).toBeTruthy();
	});

	describe('Control', () => {
		it('should set control as invalid if required dropdown is touched and empty', () => {
			component.control = new FormControl(null, FudisValidators.required('Selection is required'));

			expect(component.control.value).toEqual(null);
			expect(component.control.invalid).toBeTruthy();
		});

		it('should set control as invalid if control value length does not match to given minLength validator value', () => {
			component.control = new FormControl(null, [FudisValidators.minLength(2, 'Too few selections!')]);
			component.control.patchValue([dropdownOptions[0]]);

			expect(component.control.value?.length).toEqual(1);
			expect(component.control.invalid).toBeTruthy();
		});

		it('should set control as invalid if control value length is bigger than given maxLength validator value', () => {
			component.control = new FormControl(null, [FudisValidators.maxLength(2, 'Too many selected')]);
			component.control.patchValue(dropdownOptions);

			expect(component.control.value?.length).toEqual(3);
			expect(component.control.invalid).toBeTruthy();
		});
	});

	describe('Preselected values', () => {
		it('should have preselected values according to FormControl initialization', () => {
			component.control = new FormControl<FudisDropdownOption[] | null>([dropdownOptions[0], dropdownOptions[2]]);

			expect(component.control.value?.length).toEqual(2);
			expect(component.control.invalid).toBeFalsy();
		});
	});

	describe('CSS classes', () => {
		it('should have respective classes according to given size Input', () => {
			dropdownSizeCheck('sm');
			dropdownSizeCheck('md');
			dropdownSizeCheck('lg');
		});
	});
});
