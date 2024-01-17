import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectComponent } from './select.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FudisIdService } from '../../../../services/id/id.service';
import { GuidanceComponent } from '../../guidance/guidance.component';
import { IconComponent } from '../../../icon/icon.component';
import { TooltipDirective } from '../../../../directives/tooltip/tooltip.directive';
import { LabelComponent } from '../../label/label.component';
import { defaultOptions } from '../common/mock_data';
import { FudisValidators } from '../../../../utilities/form/validators';
import { SelectBaseDirective } from '../common/select-base/select-base.directive';
import { InputBaseDirective } from '../../../../directives/form/input-base/input-base.directive';
import { FudisTranslationService } from '../../../../services/translation/translation.service';
import { FudisFocusService } from '../../../../services/focus/focus.service';
import { SelectAutocompleteComponent } from '../common/autocomplete/autocomplete.component';
import { SelectDropdownComponent } from '../common/select-dropdown/select-dropdown.component';
import { BodyTextComponent } from '../../../typography/body-text/body-text.component';
import { By } from '@angular/platform-browser';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [SelectComponent, GuidanceComponent, IconComponent, LabelComponent, SelectAutocompleteComponent, SelectDropdownComponent, BodyTextComponent],
      providers: [FudisIdService, FudisTranslationService, FudisFocusService, TooltipDirective, SelectBaseDirective, InputBaseDirective],
			imports:[ReactiveFormsModule]
    }).compileComponents();
  });

	beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
		component.control = new FormControl(defaultOptions[3], FudisValidators.required('For testing purposes, please choose a pet'));
		component.label = 'Test Select Label';
		component.placeholder = 'Test placeholder';
		component.size = 'md';
		component.helpText = 'This is kind reminder for choosing a pet';
		component.ngAfterViewInit();
		fixture.detectChanges();
  });

	describe('Initialized Select', () => {
		it('should have respective classes according to given size Input', () => {

			const expectedValue = 'fudis-select fudis-input-size__md';
			const classes = fixture.nativeElement.childNodes;
			const componentClasses = classes[0].className.split(' ').sort();
			
		expect(componentClasses).toEqual(expectedValue.split(' ').sort());

		})
		it('should have default form control option set', () => {
			const placeholderAnimal = fixture.debugElement.query(By.css('.fudis-select__input__label'));
			expect(placeholderAnimal.nativeElement.innerHTML).toEqual('Really dangerous cat');
		});

		it('should have placehorder text present when no default option is given', () => {
			component.control.patchValue(null);
			fixture.detectChanges();

			const placeholder = fixture.debugElement.query(By.css('.fudis-select__input__placeholder'));
			expect(placeholder.nativeElement.outerHTML).toContain('Test placeholder');
		})
	})
});