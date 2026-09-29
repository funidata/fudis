import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectComponent } from '../../select/select.component';
import { SelectOptionComponent } from '../../select/select-option/select-option.component';
import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FudisSelectOption } from '../../../../../types/forms';
import { defaultOptions, TestCourseValue } from '../../common/mock_data';
import { SelectOptionsDirective } from '../../common/select-options-directive/select-options.directive';
import { getAllElements } from '../../../../../utilities/tests/utilities';
import { By } from '@angular/platform-browser';
import { FudisInternalErrorSummaryService } from '../../../../../services/form/error-summary/internal-error-summary.service';
import { FudisDialogService } from '../../../../../services/dialog/dialog.service';

@Component({
  selector: 'fudis-mock-select-option-base-directive',
  imports: [SelectComponent, SelectOptionsDirective, SelectOptionComponent],
  template: `<fudis-select
    #selectElem
    [label]="'Test Label'"
    [variant]="'autocompleteDropdown'"
    [placeholder]="'Test placeholder'"
    [control]="control"
    [selectionClearButton]="false"
    [size]="'md'"
  >
    <ng-template fudisSelectOptions>
      @for (option of testOptions; track option.value) {
        <fudis-select-option
          [data]="option"
          (handleBlur)="handleOptionBlur($event)"
        ></fudis-select-option>
      }
      <fudis-select-option #selectOption [data]="optionWithSubLabel" />
    </ng-template>
  </fudis-select>`,
})
class MockComponent {
  @ViewChild('selectElem') selectElem: SelectComponent;
  @ViewChild('selectOption') selectOption: SelectOptionComponent;

  testOptions: FudisSelectOption<TestCourseValue>[] = defaultOptions;
  optionWithSubLabel: FudisSelectOption<string> = {
    value: 'test-1-abc',
    label: 'Dragon',
    subLabel: 'Roaaar!',
  };
  control: FormControl<FudisSelectOption<TestCourseValue> | null> = new FormControl(null);
  eventReceived: FocusEvent;

  handleOptionBlur(event: FocusEvent) {
    this.eventReceived = event;
  }
}

describe('SelectOptionBaseDirective', () => {
  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockComponent],
      providers: [FudisDialogService, FudisInternalErrorSummaryService],
    }).compileComponents();

    fixture = TestBed.createComponent(MockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function setSelectDropdownOpen() {
    component.selectElem.openDropdown();
    fixture.detectChanges();
  }

  function updateControlValue(option: FudisSelectOption<TestCourseValue>) {
    component.control.patchValue(option);
    fixture.detectChanges();
  }

  function focusableOptions(): (string | null)[] {
    const focusableOptions = getAllElements(
      fixture,
      '.fudis-select-option__focusable .fudis-select-option__label__main',
    );

    const optionsArray: (string | null)[] = [];

    focusableOptions.forEach((item) => {
      optionsArray.push(item.textContent);
    });

    return optionsArray;
  }

  describe('Component creation', () => {
    it('should create mock component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Autocomplete functionality', () => {
    it('should return option focusable class for selected option', () => {
      updateControlValue(defaultOptions[2]);
      setSelectDropdownOpen();

      const options = fixture.debugElement.queryAll(By.css('fudis-select-option'));
      const textContent = options[2].nativeElement.textContent;

      expect(options[2].nativeElement.outerHTML).toContain(
        'fudis-select-option__focusable fudis-select-option--selected',
      );
      expect(textContent).toEqual('Data Analysis');
    });

    it('should filter correct options for given letter input', async () => {
      setSelectDropdownOpen();

      fixture.detectChanges();

      expect(component.selectOption.visible).toEqual(true);

      expect(focusableOptions().length).toEqual(9);

      component.selectElem.setAutocompleteFilterText('p');

      fixture.detectChanges();

      expect(component.selectOption.visible).toEqual(false);

      expect(focusableOptions()).toEqual([
        'Introduction to Programming',
        'Sustainable Development',
        'Project Management',
        'Sustainable Development',
      ]);

      component.selectElem.setAutocompleteFilterText('roa');

      fixture.detectChanges();

      expect(component.selectOption.visible).toEqual(true);

      expect(focusableOptions()).toEqual(['Dragon']);
    });

    it('should trigger blur event when focused elsewhere', () => {
      updateControlValue(defaultOptions[2]);
      setSelectDropdownOpen();

      jest.spyOn(component, 'handleOptionBlur');

      const firstElement = fixture.nativeElement.querySelector(
        'div.fudis-select-option__focusable',
      ) as HTMLElement;

      firstElement.focus();
      firstElement.dispatchEvent(new FocusEvent('blur'));

      expect(component.eventReceived.target).toEqual(firstElement);
      expect(component.handleOptionBlur).toHaveBeenCalled();
    });
  });
});
