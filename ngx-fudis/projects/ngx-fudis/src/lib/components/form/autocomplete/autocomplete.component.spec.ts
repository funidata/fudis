import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng-mocks';
import { GuidanceComponent } from '../guidance/guidance.component';
import { LabelComponent } from '../label/label.component';
import { AutocompleteComponent } from './autocomplete.component';

const autocompleteControl: FormControl = new FormControl('');

describe('AutocompleteComponent', () => {
	let component: AutocompleteComponent;
	let fixture: ComponentFixture<AutocompleteComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AutocompleteComponent, MockComponent(LabelComponent), MockComponent(GuidanceComponent)],
			imports: [MatAutocompleteModule, ReactiveFormsModule, BrowserAnimationsModule],
		}).compileComponents();

		fixture = TestBed.createComponent(AutocompleteComponent);
		component = fixture.componentInstance;
		component.control = autocompleteControl;
		component.id = 'test-id-autocomplete';
		component.label = 'Pick one';
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
