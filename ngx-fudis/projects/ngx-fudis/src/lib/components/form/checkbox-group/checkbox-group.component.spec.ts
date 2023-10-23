import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng-mocks';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CheckboxGroupComponent } from './checkbox-group.component';
import { FieldSetComponent } from '../fieldset/fieldset.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { FudisCheckboxGroupFormGroup } from '../../../types/forms';
import { FudisGroupValidator } from '../../../utilities/form/validators';

const testFormGroup = new FormGroup<FudisCheckboxGroupFormGroup>(
	{
		apple: new FormControl<boolean | null | undefined>(null),
		fairTradeBanana: new FormControl<boolean | null | undefined>(null),
		pear: new FormControl<boolean | null | undefined>(null),
		pineapple: new FormControl<boolean | null | undefined>(null),
		orange: new FormControl<boolean | null | undefined>(null),
	},
	[FudisGroupValidator.atLeastOneRequired(new BehaviorSubject('No fruit picked! :('))]
);

describe('CheckboxGroupComponent', () => {
	let component: CheckboxGroupComponent;
	let fixture: ComponentFixture<CheckboxGroupComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [CheckboxComponent, CheckboxGroupComponent, MockComponent(FieldSetComponent)],
			imports: [ReactiveFormsModule],
		});
		fixture = TestBed.createComponent(CheckboxGroupComponent);
		component = fixture.componentInstance;
		component.formGroup = testFormGroup;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
