// eslint-disable-next-line max-classes-per-file
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { FudisBreakpointService } from '../../../../services/breakpoint/breakpoint.service';
import { FudisGridService } from '../../../../services/grid/grid.service';
import { ContentDirective } from '../../../../directives/content-projection/content/content.directive';
import { FudisCheckboxGroupFormGroup } from '../../../../types/forms';
import { FudisGroupValidator } from '../../../../utilities/form/validators';
import { CheckboxGroupComponent } from '../checkbox-group.component';
import { GuidanceComponent } from '../../guidance/guidance.component';
import { CheckboxComponent } from './checkbox.component';
import { FieldSetComponent } from '../../fieldset/fieldset.component';
import { GridComponent } from '../../../grid/grid/grid.component';
import { GridApiDirective } from '../../../../directives/grid/grid-api/grid-api.directive';
import { GridDirective } from '../../../../directives/grid/grid/grid.directive';
import { IconComponent } from '../../../icon/icon.component';

@Component({
	selector: 'fudis-mock-container',
	template: `<fudis-checkbox-group
		[formGroup]="_testFromGroup"
		[title]="'Choose minimum of one fruit'"
		[required]="true">
		<fudis-checkbox *ngFor="let option of _options" [controlName]="option.controlName" [label]="option.label" />
	</fudis-checkbox-group>`,
})
class MockContainerComponent {
	protected _testFromGroup = new FormGroup<FudisCheckboxGroupFormGroup>(
		{
			apple: new FormControl<boolean | null | undefined>(null),
			fairTradeBanana: new FormControl<boolean | null | undefined>(false),
			orange: new FormControl<boolean | null | undefined>(undefined),
			pear: new FormControl<boolean | null | undefined>(true),
			pineapple: new FormControl<boolean | null | undefined>({ value: false, disabled: true }),
		},
		[
			FudisGroupValidator.min({ value: 2, message: new BehaviorSubject('Too few selected') }),
			FudisGroupValidator.max({ value: 3, message: new BehaviorSubject('Too many selected') }),
		]
	);

	protected _options = [
		{ controlName: 'apple', label: 'Apple' },
		{ controlName: 'fairTradeBanana', label: 'Fair trade banana' },
		{ controlName: 'pear', label: 'Pear' },
		{ controlName: 'pineapple', label: 'Pineapple' },
		{ controlName: 'orange', label: 'Orange' },
	];
}

@Component({
	selector: 'fudis-mock-component',
	template: 'Mock!',
})
class MockContentComponent implements OnInit {
	@Output() initialized = new EventEmitter<void>();

	ngOnInit(): void {
		this.initialized.next();
	}
}

describe('CheckboxComponent', () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let containerComponent: MockContainerComponent;
	let fixture: ComponentFixture<MockContainerComponent> | ComponentFixture<CheckboxComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				CheckboxComponent,
				MockContentComponent,
				MockContainerComponent,
				CheckboxGroupComponent,
				FieldSetComponent,
				GridComponent,
				GridApiDirective,
				GridDirective,
				ContentDirective,
				GuidanceComponent,
				IconComponent,
			],
			providers: [FudisBreakpointService, FudisGridService],
			imports: [ReactiveFormsModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MockContainerComponent);
		containerComponent = fixture.componentInstance;

		fixture.detectChanges();
	});

	fit('should create checkbox without checked status, when control is null', () => {
		const nullCheckbox = fixture.nativeElement.querySelector('[ng-reflect-control-name="apple"]');

		const inputValue: string | null | undefined = nullCheckbox.querySelector('input').getAttribute('value');

		const input = nullCheckbox.querySelector('input');

		const checkedIcon = nullCheckbox.querySelector('fudis-icon');

		const inputDisabled = input.getAttribute('disabled');
		const inputAriaDisabled = input.getAttribute('aria-disabled');

		expect(inputValue).toBeFalsy();
		expect(inputDisabled).toBeNull();
		expect(inputAriaDisabled).toBeNull();
		expect(checkedIcon).toBeNull();
	});

	it('should create checkbox without checked status, when control is false', () => {
		const falseCheckbox = fixture.nativeElement.querySelector('[ng-reflect-control-name="fairTradeBanana"]');

		const inputValue: string | null | undefined = falseCheckbox.querySelector('input').getAttribute('value');

		const checkedIcon = falseCheckbox.querySelector('fudis-icon');

		expect(inputValue).toEqual('false');
		expect(checkedIcon).toBeNull();
	});

	it('should create checkbox without checked status, when control value is undefined', () => {
		const undefinedCheckbox = fixture.nativeElement.querySelector('[ng-reflect-control-name="orange"]');

		const inputValue: string | null | undefined = undefinedCheckbox.querySelector('input').getAttribute('value');

		const checkedIcon = undefinedCheckbox.querySelector('fudis-icon');

		expect(inputValue).toBeFalsy();
		expect(checkedIcon).toBeNull();
	});

	it('should create with checked status, if control value is true', () => {
		const checkedCheckbox = fixture.nativeElement.querySelector('[ng-reflect-control-name="pear"]');

		const checkedIcon = checkedCheckbox.querySelector('fudis-icon[ng-reflect-icon="check-small"]');

		const inputValue: string | null | undefined = checkedCheckbox.querySelector('input').getAttribute('value');

		expect(checkedIcon).toBeDefined();
		expect(inputValue).toEqual('true');
	});

	it('should create with disabled status, if control is disabled', () => {
		const checkedCheckbox = fixture.nativeElement.querySelector('[ng-reflect-control-name="pineapple"]');

		const checkedIcon = checkedCheckbox.querySelector('fudis-icon[ng-reflect-icon="check-small"]');

		const inputElement = checkedCheckbox.querySelector('input');

		const inputValue: string | null | undefined = inputElement.getAttribute('value');

		console.log(inputElement);

		const inputDisabled = inputElement.getAttribute('disabled');
		const inputAriaDisabled = inputElement.getAttribute('aria-disabled');

		expect(checkedIcon).toBeDefined();
		expect(inputDisabled).toBeDefined();
		expect(inputAriaDisabled).toEqual('true');
		expect(inputValue).toEqual('false');
	});

	it('should create with correct label', () => {
		const checkedCheckbox = fixture.nativeElement.querySelector('[ng-reflect-control-name="fairTradeBanana"]');

		const labelText: string = checkedCheckbox.querySelector('.fudis-checkbox__content__label').innerText;

		expect(labelText).toEqual('Fair trade banana');
	});
});
