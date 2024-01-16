import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOptionComponent } from './select-option.component';
import { SelectGroupComponent } from '../../common/select-group/select-group.component';
import { SelectComponent } from '../select.component';
import { SelectOptionBaseDirective } from '../../common/select-option-base/select-option-base.directive';
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

@Component({
	selector: 'fudis-mock-container',
	template: `<fudis-select #testSelect [label]="'Test Label'" [placeholder]="'Test placeholder'" [control]="control" [size]="'md'">
	<ng-template fudisContent type="select-options">
			<fudis-select-option #testOption *ngFor="let option of defaultOptions" [data]="option"></fudis-select-option>
	</ng-template>
</fudis-select>`,
})
class MockContainerComponent {
	data: FudisSelectOption[] = []; 
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
				SelectComponent, 
				SelectOptionComponent,
				SelectGroupComponent, 
				SelectDropdownComponent,
				MockContainerComponent,
				SelectAutocompleteComponent,
				GuidanceComponent, IconComponent, LabelComponent, BodyTextComponent],
			providers: [FudisIdService, FudisTranslationService, SelectOptionBaseDirective],
			imports:[ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MockContainerComponent);

    containerComponent = fixture.componentInstance;
		fixture.detectChanges();
  });


  // TODO: create tests
  fit('should create', () => {
		containerComponent.data = defaultOptions;
		containerComponent.control = new FormControl(defaultOptions[4], FudisValidators.required('For testing purposes, please choose a pet'));
		fixture.detectChanges();
		containerComponent.testSelect.ngOnInit();
		containerComponent.testSelect.ngAfterViewInit();
		fixture.detectChanges();
		// jest.spyOn(containerComponent.testOption['_clickOption'], 'click');

		// containerComponent.testOption.ngOnInit();
		containerComponent.control.markAsTouched;
		console.log(containerComponent.control);
		// expect(containerComponent.testOption['_clickOption'].click).toHaveBeenCalled();
  });
});
