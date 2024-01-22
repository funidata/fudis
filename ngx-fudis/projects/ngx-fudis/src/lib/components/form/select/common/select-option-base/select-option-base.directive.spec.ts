import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectOptionBaseDirective } from './select-option-base.directive';
import { SelectGroupComponent } from '../select-group/select-group.component';
import { SelectComponent } from '../../select/select.component';
import { FudisTranslationService } from '../../../../../services/translation/translation.service';
import { SelectOptionComponent } from '../../select/select-option/select-option.component';
import { Component, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FudisSelectOption } from '../../../../../types/forms';
import { defaultOptions } from '../../common/mock_data';
import { ContentDirective } from '../../../../../directives/content-projection/content/content.directive';
import { IconComponent } from '../../../../icon/icon.component';
import { BodyTextComponent } from '../../../../typography/body-text/body-text.component';
import { GuidanceComponent } from '../../../guidance/guidance.component';
import { LabelComponent } from '../../../label/label.component';
import { SelectAutocompleteComponent } from '../autocomplete/autocomplete.component';
import { SelectDropdownComponent } from '../select-dropdown/select-dropdown.component';
import { SelectBaseDirective } from '../select-base/select-base.directive';
import { FudisIdService } from '../../../../../services/id/id.service';
import { getTrimmedTextContent } from '../../../../../utilities/tests/utilities';
import { By } from '@angular/platform-browser';

@Component({
	selector: 'fudis-mock-select-option-base-directive',
	template: `<fudis-select
		#selectElem
		[label]="'Test Label'"
		[autocomplete]="true"
		[placeholder]="'Test placeholder'"
		[control]="control"
		[autocompleteClearButton]="false"
		[size]="'md'"
>
	<ng-template fudisContent type="select-options">
		<fudis-select-option
			*ngFor="let option of testOptions"
			[data]="option"
		></fudis-select-option>
	</ng-template>
</fudis-select>`,
})

class MockComponent {
	testOptions: FudisSelectOption[] = defaultOptions;
	control: FormControl = new FormControl(null);
	
	@ViewChild('selectElem') selectElem: SelectComponent;
}

describe('SelectOptionBaseDirective', () => {
	let component: MockComponent;
	let fixture: ComponentFixture<MockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
				ContentDirective,
        SelectComponent,
				SelectOptionBaseDirective,
        SelectOptionComponent,
        SelectGroupComponent,
        SelectDropdownComponent,
        MockComponent,
        SelectAutocompleteComponent,
        GuidanceComponent,
        IconComponent,
        LabelComponent,
        BodyTextComponent,
			],
      providers: [FudisIdService, FudisTranslationService, SelectBaseDirective],
      imports: [ReactiveFormsModule],
    }).compileComponents();

		fixture = TestBed.createComponent(MockComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	})

	function setSelectDropdownOpen() {
    component.selectElem.openDropdown();
    fixture.detectChanges();
  }

	function updateControlValue(givenLabel: string) {
    component.control.patchValue({label: `${givenLabel}`});
    fixture.detectChanges();
  }

	describe('Component creation', () => {
		it('should create mock component', () => {
			expect(component).toBeTruthy();
		});
	})

	describe.only('Autocomplete functionality', () => {
		it('should return option focusable class for selected option', () => {
			updateControlValue('Platypus');
			setSelectDropdownOpen();

			const options = fixture.debugElement.queryAll(By.css('fudis-select-option'))
			const textContent = getTrimmedTextContent(options[2].nativeElement);

			expect(options[2].nativeElement.outerHTML).toContain('fudis-select-option__focusable fudis-select-option--selected');
      expect(textContent).toEqual('Platypus');
		});

		it('should filter correct options for given letter input', () => {
			updateControlValue('P');
			setSelectDropdownOpen();

			const options = fixture.debugElement.queryAll(By.css('fudis-select-option'))
			expect(options[1].nativeElement.outerHTML).toContain('fudis-select-option__focusable');
			expect(options[2].nativeElement.outerHTML).toContain('fudis-select-option__focusable');
		})
		// it('should show message `no result found` when non existent input is given', () => {
		// 	updateControlValue('ÄÄÄ');
		// 	setSelectDropdownOpen();

		// 	const element = getElement(fixture, 'fudis-body-text');
		// 	const textContent = getTrimmedTextContent(element);

    //   expect(textContent).toEqual('No results found');

		// 	console.log(component.selectElem.visibleOptionsValues.length);
		// 	expect(element.outerHTML).toContain('fudis-select-dropdown__no-results--visible');
		// 	phl(element.outerHTML);
		// })
	})
});
