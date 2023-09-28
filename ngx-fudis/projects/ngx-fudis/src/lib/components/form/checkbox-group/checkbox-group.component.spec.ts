import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng-mocks';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxGroupComponent } from './checkbox-group.component';
import { FieldSetComponent } from '../fieldset/fieldset.component';
import { CheckboxComponent } from './checkbox/checkbox.component';

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
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
