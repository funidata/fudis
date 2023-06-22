import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng-mocks';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ButtonComponent } from '../../button/button.component';
import { IconComponent } from '../../icon/icon.component';
import { GuidanceComponent } from '../guidance/guidance.component';
import { LabelComponent } from '../label/label.component';
import { AutocompleteComponent, AutocompleteInputSize } from './autocomplete.component';
import { ErrorSummaryService } from '../error-summary/error-summary.service';
import { ErrorMessageComponent } from '../error-message/error-message.component';

const autocompleteControl: FormControl = new FormControl('');
const autocompleteRequiredControl: FormControl = new FormControl('', Validators.required);

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
			providers: [ErrorSummaryService],
			imports: [MatAutocompleteModule, ScrollingModule, ReactiveFormsModule, BrowserAnimationsModule],
		}).compileComponents();

		fixture = TestBed.createComponent(AutocompleteComponent);
		component = fixture.componentInstance;
		component.control = autocompleteControl;
		component.id = 'fudis-autocomplete-id';
		component.label = 'Choose one option';
		component.errorMsg = { required: 'This input is required' };
		fixture.detectChanges();
	});

	function assertAutocompleteHasClasses(classes: string): void {
		const childSpan = fixture.nativeElement.childNodes;
		const componentClasses = childSpan[0].className.split(' ').sort();
		expect(componentClasses).toEqual(classes.split(' ').sort());
	}

	function autocompleteSize(size: AutocompleteInputSize): void {
		component.size = size;
		fixture.detectChanges();
		assertAutocompleteHasClasses(`fudis-autocomplete fudis-autocomplete__${size}`);
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

			expect(autocompleteInput.className).toContain('fudis-autocomplete__input--disabled');
		});

		it('should have invalid CSS styling if control is invalid', () => {
			const autocompleteInput = fixture.nativeElement.querySelector('input');
			component.control = autocompleteRequiredControl;
			component.control.markAsTouched();
			fixture.detectChanges();

			expect(autocompleteInput.className).toContain('fudis-autocomplete__input--invalid');
		});
	});
});
