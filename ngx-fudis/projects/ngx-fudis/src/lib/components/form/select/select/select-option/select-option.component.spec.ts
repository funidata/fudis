import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOptionComponent } from './select-option.component';
import { SelectGroupComponent } from '../../common/select-group/select-group.component';
import { SelectComponent } from '../select.component';
import { FudisTranslationService } from '../../../../../services/translation/translation.service';
import { FudisIdService } from '../../../../../services/id/id.service';
import { defaultOptions } from '../../common/mock_data';
// import { phl } from '@angular-extensions/pretty-html-log';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FudisValidators } from '../../../../../utilities/form/validators';
import { Component, ViewChild } from '@angular/core';
import { GuidanceComponent } from '../../../guidance/guidance.component';
import { IconComponent } from '../../../../icon/icon.component';
import { LabelComponent } from '../../../label/label.component';
import { BodyTextComponent } from '../../../../typography/body-text/body-text.component';
import { SelectDropdownComponent } from '../../common/select-dropdown/select-dropdown.component';
import { FudisSelectOption } from '../../../../../types/forms';
import { SelectAutocompleteComponent } from '../../common/autocomplete/autocomplete.component';
import { ContentDirective } from '../../../../../directives/content-projection/content/content.directive';

@Component({
	selector: 'fudis-mock-container',
	template: `<fudis-select #testSelect [label]="'Test Label'" [placeholder]="'Test placeholder'" [control]="control" [size]="'md'">
	<ng-template fudisContent type="select-options">
			<fudis-select-option *ngFor="let option of testOptions" #testOption [data]="option"></fudis-select-option>
	</ng-template>
</fudis-select>`,
})
class MockContainerComponent {
	testOptions: FudisSelectOption[] = defaultOptions; 
	control: FormControl = new FormControl(null);

	@ViewChild('testOption') testOption: SelectOptionComponent;
	@ViewChild('testSelect') testSelect: SelectComponent;

}

describe('SelectOptionComponent', () => {
	let containerComponent: MockContainerComponent;
  let fixture: ComponentFixture<SelectOptionComponent> | ComponentFixture<MockContainerComponent>;


  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [
				ContentDirective,
				SelectComponent, 
				SelectOptionComponent,
				SelectGroupComponent, 
				SelectDropdownComponent, 
				MockContainerComponent,
				SelectAutocompleteComponent,
				GuidanceComponent,
				IconComponent,
				LabelComponent,
				BodyTextComponent],
			providers: [FudisIdService, FudisTranslationService ],
			imports:[ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MockContainerComponent);

    containerComponent = fixture.componentInstance;
		fixture.detectChanges();
  });

	function initializeSelect() {
		containerComponent.testSelect.ngOnInit();
		containerComponent.testSelect.ngAfterViewInit();
		containerComponent.testSelect.openDropdown();
		
		fixture.detectChanges();
	}

  it('should not have selected option icon if form control is not initialized', () => {

		initializeSelect();

		const iconNotToBeFound = fixture.nativeElement.querySelector('[ng-reflect-icon="check"]');
		expect(iconNotToBeFound).toBeFalsy();

		containerComponent.control = new FormControl(defaultOptions[4], FudisValidators.required('For testing purposes, please choose a pet'));
		fixture.detectChanges();

		const checkIcon = fixture.nativeElement.querySelector('[ng-reflect-icon="check"]');

		expect(checkIcon).toBeTruthy();
	});

	it('should not be able to select disabled option  ', () => {

		initializeSelect();

		containerComponent.control = new FormControl(defaultOptions[3], FudisValidators.required('For testing purposes, please choose a pet'));
		fixture.detectChanges();



		// phl(fixture.nativeElement);

	});
});
