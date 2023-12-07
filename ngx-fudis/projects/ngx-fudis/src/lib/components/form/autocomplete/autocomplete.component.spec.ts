import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng-mocks';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from '../../button/button.component';
import { IconComponent } from '../../icon/icon.component';
import { GuidanceComponent } from '../guidance/guidance.component';
import { LabelComponent } from '../label/label.component';
import { AutocompleteComponent } from './autocomplete.component';
import { FudisErrorSummaryService } from '../../../services/form/error-summary/error-summary.service';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { FudisInputSize } from '../../../types/forms';
import { FudisValidators } from '../../../utilities/form/validators';

const autocompleteControl: FormControl = new FormControl('');
const autocompleteRequiredControl: FormControl = new FormControl(
	'',
	FudisValidators.required('This input is required')
);

describe('AutocompleteComponent', () => {
	let component: AutocompleteComponent;
	let fixture: ComponentFixture<AutocompleteComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				AutocompleteComponent,
				LabelComponent,
				GuidanceComponent,
				MockComponent(IconComponent),
				MockComponent(ButtonComponent),
				MockComponent(ErrorMessageComponent),
			],
			providers: [FudisErrorSummaryService],
			imports: [MatAutocompleteModule, ScrollingModule, ReactiveFormsModule, BrowserAnimationsModule],
		}).compileComponents();

		fixture = TestBed.createComponent(AutocompleteComponent);
		component = fixture.componentInstance;
		component.control = autocompleteControl;
		component.id = 'fudis-autocomplete-id';
		component.label = 'Choose one option';
		fixture.detectChanges();
	});

	function assertAutocompleteHasClasses(classes: string): void {
		const childSpan = fixture.nativeElement.childNodes;
		const componentClasses = childSpan[0].className.split(' ').sort();

		expect(componentClasses).toEqual(classes.split(' ').sort());
	}

	function autocompleteSize(size: FudisInputSize): void {
		component.size = size;
		fixture.detectChanges();
		assertAutocompleteHasClasses(`fudis-autocomplete fudis-input-size__${size}`);
	}

	describe('child components', () => {
		it('should display given label', () => {
			fixture.detectChanges();
			const childLabelComponent = fixture.debugElement.query(By.css('.fudis-label'));

			expect(childLabelComponent.nativeElement.innerHTML).toContain('Choose one option');
		});

		it('should show guidance if helpText Input is given', () => {
			component.helpText = 'This is autocomplete input';
			fixture.detectChanges();
			const helpText = fixture.debugElement.query(By.css('.fudis-guidance__help-text'));

			expect(helpText.nativeElement.innerHTML).toBe('This is autocomplete input');
		});
	});

	describe('CSS classes', () => {
		it('should have respective CSS class indicating the autocomplete size given as an Input', () => {
			autocompleteSize('sm');
			autocompleteSize('md');
			autocompleteSize('lg');
		});

		it('should have disabled CSS styling if input is disabled', () => {
			const autocompleteInput = fixture.nativeElement.querySelector('input');
			component.disabled = true;
			fixture.detectChanges();

			expect(autocompleteInput.className).toContain('fudis-form-input--disabled');
		});

		it('should have invalid CSS styling if control is invalid', () => {
			const autocompleteInput = fixture.nativeElement.querySelector('input');
			component.control = autocompleteRequiredControl;
			component.control.markAsTouched();
			fixture.detectChanges();

			expect(autocompleteInput.className).toContain('fudis-form-input--invalid');
		});
	});
});
