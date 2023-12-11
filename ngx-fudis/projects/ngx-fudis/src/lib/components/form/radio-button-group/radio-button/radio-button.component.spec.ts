import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { Component } from '@angular/core';
import { FudisTranslationService } from '../../../../services/translation/translation.service';
import { RadioButtonComponent } from './radio-button.component';
import { FudisIdService } from '../../../../services/id/id.service';
import { RadioButtonGroupComponent } from '../radio-button-group.component';
import { FudisRadioButtonOption } from '../../../../types/forms';
import { FieldSetComponent } from '../../fieldset/fieldset.component';

import { ContentDirective } from '../../../../directives/content-projection/content/content.directive';
import { GridDirective } from '../../../../directives/grid/grid/grid.directive';
import { GridApiDirective } from '../../../../directives/grid/grid-api/grid-api.directive';
import { FudisGridService } from '../../../../services/grid/grid.service';
import { FudisBreakpointService } from '../../../../services/breakpoint/breakpoint.service';
import { GridComponent } from '../../../grid/grid/grid.component';
import { IconComponent } from '../../../icon/icon.component';
import { ValidationErrorMessageComponent } from '../../error-message/validation-error-message/validation-error-message.component';
import { GuidanceComponent } from '../../guidance/guidance.component';

@Component({
	selector: 'fudis-mock-component',
	template: `<fudis-radio-button-group [title]="'Choose a pet'" [control]="_testControl" [options]="_options" />`,
})
class MockContainerComponent {
	protected _testControl = new FormControl<boolean | null>(null);

	protected _options: FudisRadioButtonOption[] = [
		{ value: 'platypus', viewValue: 'Platypus', name: 'animal' },
		{ value: 'otter', viewValue: 'Otter', name: 'animal' },
		{ value: 'capybara', viewValue: 'Capybara', name: 'animal' },
	];
}

describe('RadioButtonComponent', () => {
	let fixture: ComponentFixture<MockContainerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				MockContainerComponent,
				RadioButtonComponent,
				RadioButtonGroupComponent,
				FieldSetComponent,
				GridComponent,
				GridApiDirective,
				GridDirective,
				ContentDirective,
				GuidanceComponent,
				IconComponent,
				ValidationErrorMessageComponent,
			],
			providers: [FudisIdService, FudisBreakpointService, FudisGridService, FudisTranslationService],
			imports: [ReactiveFormsModule],
		}).compileComponents();

		fixture = TestBed.createComponent(MockContainerComponent);

		fixture.detectChanges();
	});

	function assertRadioButtonHasClasses(classes: string): void {
		fixture.detectChanges();
		const element = fixture.nativeElement.querySelector('fudis-radio-button label');
		const componentClasses = element.className.split(' ').sort();

		expect(componentClasses).toEqual(classes.split(' ').sort());
	}

	describe('Contents', () => {
		it('should have viewValue as label', () => {
			const elem = fixture.debugElement.query(By.css('.fudis-radio-button__label'));

			expect(elem.nativeElement.innerHTML).toEqual('Platypus');
		});
	});

	describe('CSS classes', () => {
		it('should always have fudis-radio-button class', () => {
			assertRadioButtonHasClasses('fudis-radio-button');
		});

		it('should have indicator class if radio button is checked', () => {
			const element: HTMLInputElement = fixture.nativeElement.querySelector('fudis-radio-button input');

			element.click();

			fixture.detectChanges();

			const elem = fixture.nativeElement.querySelector('.fudis-radio-button__content__control__indicator');

			expect(elem).toBeTruthy();
		});
	});
});
