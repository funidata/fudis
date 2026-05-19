import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MultiselectOptionComponent } from './multiselect-option.component';
import { MultiselectComponent } from '../multiselect.component';
import { FudisSelectOption } from '../../../../../types/forms';
import { getElement } from '../../../../../utilities/tests/utilities';
import { defaultOptions, defaultOptionsSecondaryLang } from '../../common/mock_data';
import { FudisInternalErrorSummaryService } from '../../../../../services/form/error-summary/internal-error-summary.service';
import { SelectOptionsDirective } from '../../common/select-options-directive/select-options.directive';
import { FudisDialogService } from '../../../../../services/dialog/dialog.service';

@Component({
  selector: 'fudis-multiselect-mock',
  imports: [MultiselectComponent, SelectOptionsDirective, MultiselectOptionComponent],
  template: `<fudis-multiselect
    #selectEl
    [label]="'Select multiple options'"
    [placeholder]="'Select your favourites'"
    [control]="control"
  >
    <ng-template fudisSelectOptions>
      @for (option of multiOptions; track option.value) {
        <fudis-multiselect-option #multiOption [data]="option"></fudis-multiselect-option>
      }
    </ng-template>
  </fudis-multiselect>`,
})
class MultiselectMockComponent {
  @ViewChild('multiOption') multiOption: MultiselectOptionComponent;
  @ViewChild('selectEl') selectEl: MultiselectComponent;

  multiOptions: FudisSelectOption<string | object>[] = defaultOptions;
  control: FormControl<FudisSelectOption<string | object>[] | null> = new FormControl(null);
}

describe('MultiselectOptionComponent', () => {
  let component: MultiselectMockComponent;
  let fixture: ComponentFixture<MultiselectMockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiselectMockComponent],
      providers: [FudisDialogService, FudisInternalErrorSummaryService],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiselectMockComponent);
    component = fixture.componentInstance;
  });

  function setMultiSelectDropdownOpen() {
    component.selectEl.openDropdown();
    fixture.detectChanges();
  }

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('Options reflect on parent control value', () => {
    it('should have respective HTML attributes after parent control value changes', () => {
      fixture.detectChanges();

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

    it('should change visible input value when options are changed', () => {
      component.control.patchValue([defaultOptions[2]]);
      fixture.detectChanges();

      const element = getElement(fixture, '.fudis-select__input');
      expect(element.getAttribute('value')).toEqual('Platypus');

      component.multiOptions = defaultOptionsSecondaryLang;
      fixture.detectChanges();
      expect(element.getAttribute('value')).toEqual('Vesinokkaeläin');
    });

    it('should add value to control with already existing values when another option is selected and emit selection', () => {
      fixture.detectChanges();

      jest.spyOn(component.selectEl.selectionUpdate, 'emit');

      component.control.patchValue([defaultOptions[5], defaultOptions[0]]);

      fixture.detectChanges();

      setMultiSelectDropdownOpen();

      const options = fixture.debugElement.queryAll(By.css('fudis-multiselect-option'));
      options[2].nativeElement.querySelector('input').click();
      fixture.detectChanges();

      const controlValueArray = component.selectEl.control.value;

      expect(controlValueArray).toMatchObject([
        { label: 'Screaming hairy armadillo (partly endangered)' },
        { label: 'Dog' },
        { label: 'Platypus' },
      ]);

      expect(component.selectEl.selectionUpdate.emit).toHaveBeenCalledWith([
        {
          label: 'Screaming hairy armadillo (partly endangered)',
          sound: "Rollin' rollin' rollin'!",
          value: 'value-5-armadillo_(PARTLY_ENDANGERED)',
        },
        {
          label: 'Dog',
          sound: 'Wuf!',
          value: { name: 'Max The Great', breed: 'Staffy' },
        },
        {
          label: 'Platypus',
          sound: 'Plat plat!',
          value: 'value-3-platypys',
        },
      ]);
    });

    it('should remove value from control when already selected option is clicked and set as null, if no selected options are left', () => {
      fixture.detectChanges();

      setMultiSelectDropdownOpen();

      const options = fixture.debugElement.queryAll(By.css('fudis-multiselect-option'));

      // Select multiple options
      options[0].nativeElement.querySelector('input').click();
      options[1].nativeElement.querySelector('input').click();
      options[5].nativeElement.querySelector('input').click();
      fixture.detectChanges();

      const controlValueArray = component.selectEl.control.value;

      expect(controlValueArray).toMatchObject([
        { label: 'Dog' },
        { label: 'Capybara' },
        { label: 'Screaming hairy armadillo (partly endangered)' },
      ]);

      // Remove one of the already selected options
      options[5].nativeElement.querySelector('input').click();
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
    beforeEach(() => {
      fixture.detectChanges();
    });

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
