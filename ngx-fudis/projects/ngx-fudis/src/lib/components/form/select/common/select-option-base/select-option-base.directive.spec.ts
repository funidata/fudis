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
import { getAllElements } from '../../../../../utilities/tests/utilities';
import { By } from '@angular/platform-browser';
import { SelectIconsComponent } from '../select-icons/select-icons.component';
import { ButtonComponent } from '../../../../button/button.component';
import { FudisFocusService } from '../../../../../services/focus/focus.service';
import { FudisInternalErrorSummaryService } from '../../../../../services/form/error-summary/internal-error-summary.service';

@Component({
  selector: 'fudis-mock-select-option-base-directive',
  template: `<fudis-select
    #selectElem
    [label]="'Test Label'"
    [variant]="'autocompleteDropdown'"
    [placeholder]="'Test placeholder'"
    [control]="control"
    [selectionClearButton]="false"
    [size]="'md'"
  >
    <ng-template fudisContent type="select-options">
      <fudis-select-option
        *ngFor="let option of testOptions"
        [data]="option"
        (handleBlur)="handleOptionBlur($event)"
      />
      <fudis-select-option #selectOption [data]="optionWithSubLabel" />
    </ng-template>
  </fudis-select>`,
})
class MockComponent {
  testOptions: FudisSelectOption<object>[] = defaultOptions;
  optionWithSubLabel: FudisSelectOption<object> = {
    value: 'test-1-abc',
    label: 'Dragon',
    subLabel: 'Roaaar!',
  };
  control: FormControl<FudisSelectOption<object> | null> = new FormControl(null);

  @ViewChild('selectElem') selectElem: SelectComponent;
  @ViewChild('selectOption') selectOption: SelectOptionComponent;

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
      declarations: [
        ContentDirective,
        SelectComponent,
        SelectOptionBaseDirective,
        SelectOptionComponent,
        SelectGroupComponent,
        SelectDropdownComponent,
        SelectIconsComponent,
        ButtonComponent,
        MockComponent,
        SelectAutocompleteComponent,
        GuidanceComponent,
        IconComponent,
        LabelComponent,
        BodyTextComponent,
      ],
      providers: [
        FudisIdService,
        FudisTranslationService,
        SelectBaseDirective,
        FudisFocusService,
        FudisInternalErrorSummaryService,
      ],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function setSelectDropdownOpen() {
    component.selectElem.openDropdown();
    fixture.detectChanges();
  }

  function updateControlValue(option: FudisSelectOption<object>) {
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
      expect(textContent).toEqual('Platypus');
    });

    it('should filter correct options for given letter input', async () => {
      setSelectDropdownOpen();

      fixture.detectChanges();

      expect(component.selectOption.visible).toEqual(true);

      expect(focusableOptions().length).toEqual(7);

      component.selectElem.autocompleteRef.updateInputValue('p');

      fixture.detectChanges();

      expect(component.selectOption.visible).toEqual(false);

      expect(focusableOptions()).toEqual(['Capybara', 'Platypus']);

      component.selectElem.autocompleteRef.updateInputValue('roa');

      fixture.detectChanges();

      expect(component.selectOption.visible).toEqual(true);

      expect(focusableOptions()).toEqual(['Dragon']);
    });

    it('should trigger blur event when focused elsewhere', () => {
      updateControlValue(defaultOptions[2]);
      setSelectDropdownOpen();

      jest.spyOn(component, 'handleOptionBlur');

      const firstElement = fixture.nativeElement.querySelector(
        '#fudis-select-1-option-2',
      ) as HTMLInputElement;
      const secondElement = fixture.nativeElement.querySelector(
        '#fudis-select-1-option-4',
      ) as HTMLInputElement;

      firstElement.focus();
      secondElement.focus();

      expect(component.eventReceived.target).toEqual(firstElement);
      expect(component.handleOptionBlur).toHaveBeenCalled();
    });
  });
});
