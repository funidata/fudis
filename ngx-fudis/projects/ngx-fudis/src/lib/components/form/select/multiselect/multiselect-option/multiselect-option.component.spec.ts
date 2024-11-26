import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MultiselectOptionComponent } from './multiselect-option.component';
import { MultiselectComponent } from '../multiselect.component';
import { MultiselectChipListComponent } from '../multiselect-chip-list/multiselect-chip-list.component';
import { SelectDropdownComponent } from '../../common/select-dropdown/select-dropdown.component';
import { SelectOptionComponent } from '../../select/select-option/select-option.component';
import { SelectGroupComponent } from '../../common/select-group/select-group.component';
import { IconComponent } from '../../../../icon/icon.component';
import { LabelComponent } from '../../../label/label.component';
import { GuidanceComponent } from '../../../guidance/guidance.component';
import { FudisSelectOption } from '../../../../../types/forms';
import { ContentDirective } from '../../../../../directives/content-projection/content/content.directive';
import { getElement } from '../../../../../utilities/tests/utilities';
import { defaultOptions } from '../../common/mock_data';
import { SelectIconsComponent } from '../../common/select-icons/select-icons.component';
import { ButtonComponent } from '../../../../button/button.component';
import { FudisInternalErrorSummaryService } from '../../../../../services/form/error-summary/internal-error-summary.service';

@Component({
  selector: 'fudis-multiselect-mock',
  template: `<fudis-multiselect
    #selectEl
    [label]="'Select multiple options'"
    [placeholder]="'Select your favourites'"
    [control]="control"
  >
    <ng-template fudisContent type="select-options">
      <fudis-multiselect-option
        *ngFor="let option of multiOptions"
        #multiOption
        [data]="option"
      ></fudis-multiselect-option>
    </ng-template>
  </fudis-multiselect>`,
})
class MultiselectMockComponent {
  multiOptions: FudisSelectOption<object>[] = defaultOptions;
  control = new FormControl<FudisSelectOption<object>[] | null>(null);

  @ViewChild('multiOption') multiOption: MultiselectOptionComponent;
  @ViewChild('selectEl') selectEl: MultiselectComponent;
}

describe('MultiselectOptionComponent', () => {
  let component: MultiselectMockComponent;
  let fixture: ComponentFixture<MultiselectMockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MultiselectMockComponent,
        MultiselectOptionComponent,
        MultiselectComponent,
        MultiselectChipListComponent,
        SelectOptionComponent,
        SelectGroupComponent,
        SelectDropdownComponent,
        SelectIconsComponent,
        IconComponent,
        ButtonComponent,
        ContentDirective,
        GuidanceComponent,
        IconComponent,
        LabelComponent,
      ],
      providers: [FudisInternalErrorSummaryService],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiselectMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function setMultiSelectDropdownOpen() {
    component.selectEl.openDropdown();
    fixture.detectChanges();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Options reflect on parent control value', () => {
    it('should have respective HTML attributes after parent control value changes', () => {
      component.control.patchValue([defaultOptions[2]]);
      fixture.detectChanges();

      setMultiSelectDropdownOpen();

      const selectedOption = getElement(fixture, '.fudis-multiselect-option--checked');
      const selectedOptionLabel = selectedOption.querySelector(
        '.fudis-multiselect-option__label__text__main',
      )?.textContent;

      expect(selectedOption).toBeTruthy();
      expect(selectedOptionLabel).toEqual('Platypus');
    });

    it('should add value to control with already existing values when another option is selected and emit selection', () => {
      jest.spyOn(component.selectEl.selectionUpdate, 'emit');

      component.control.patchValue([defaultOptions[4], defaultOptions[0]]);

      fixture.detectChanges();

      setMultiSelectDropdownOpen();

      const options = fixture.debugElement.queryAll(By.css('fudis-multiselect-option'));
      options[2].nativeElement.querySelector('input').click();
      fixture.detectChanges();

      const controlValueArray = component.selectEl.control.value;

      expect(controlValueArray).toMatchObject([
        { label: 'Screaming hairy armadillo' },
        { label: 'Dog' },
        { label: 'Platypus' },
      ]);

      expect(component.selectEl.selectionUpdate.emit).toHaveBeenCalledWith([
        {
          label: 'Screaming hairy armadillo',
          sound: "Rollin' rollin' rollin'!",
          value: 'value-5-armadillo',
        },
        { label: 'Dog', sound: 'Wuf!', value: 'value-1-dog' },
        { label: 'Platypus', sound: 'Plat plat!', value: 'value-3-platypys' },
      ]);
    });

    it('should remove value from control when already selected option is clicked and set as null, if no selected options are left', () => {
      setMultiSelectDropdownOpen();

      const options = fixture.debugElement.queryAll(By.css('fudis-multiselect-option'));

      // Select multiple options
      options[0].nativeElement.querySelector('input').click();
      options[1].nativeElement.querySelector('input').click();
      options[4].nativeElement.querySelector('input').click();
      fixture.detectChanges();

      const controlValueArray = component.selectEl.control.value;

      expect(controlValueArray).toMatchObject([
        { label: 'Dog' },
        { label: 'Capybara' },
        { label: 'Screaming hairy armadillo' },
      ]);

      // Remove one of the already selected options
      options[4].nativeElement.querySelector('input').click();
      fixture.detectChanges();

      const updatedControlValueArray = component.selectEl.control.value;

      expect(updatedControlValueArray).toMatchObject([{ label: 'Dog' }, { label: 'Capybara' }]);

      options[1].nativeElement.querySelector('input').click();
      fixture.detectChanges();
      options[0].nativeElement.querySelector('input').click();
      fixture.detectChanges();

      expect(component.selectEl.control.value).toEqual(null);
    });
  });

  describe('Single option HTML attributes', () => {
    it('should have respective attributes if selected', () => {
      setMultiSelectDropdownOpen();

      const options = fixture.debugElement.queryAll(By.css('.fudis-multiselect-option'));
      const optionToSelect = options[1].nativeElement.querySelector('input');

      optionToSelect.click();
      fixture.detectChanges();

      const optionAriaAttribute = !!optionToSelect.getAttribute('aria-selected');

      expect(options[1].nativeElement.outerHTML).toContain(
        'fudis-multiselect-option__label--checked',
      );
      expect(optionAriaAttribute).toEqual(true);
      expect(options[1].nativeElement.outerHTML).toContain('fudis-icon');
    });

    it('should have focusable CSS class', () => {
      setMultiSelectDropdownOpen();

      const options = fixture.debugElement.queryAll(By.css('.fudis-multiselect-option'));
      const expectedInputClasses =
        'fudis-multiselect-option__label__checkbox__input fudis-select-option__focusable';
      const inputClassArray: string[] = [];

      options.forEach((option) => {
        const inputClasses = option.nativeElement.querySelector('input').className;
        inputClassArray.push(inputClasses);

        expect(inputClassArray).toContain(expectedInputClasses);
      });
    });

    it('should have disabled CSS class if option is disabled', () => {
      setMultiSelectDropdownOpen();

      const options = fixture.nativeElement.querySelectorAll('.fudis-multiselect-option');
      const expectedDisabledOptionClasses =
        'fudis-multiselect-option fudis-multiselect-option--visible fudis-multiselect-option--disabled';
      const disabledOption = options[3];

      expect(disabledOption.className).toContain(expectedDisabledOptionClasses);
    });
  });
});
