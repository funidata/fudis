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
import { getAllElements, getTrimmedTextContent } from '../../../../../utilities/tests/utilities';
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
        (handleBlur)="handleOptionBlur($event)"
      ></fudis-select-option>
    </ng-template>
  </fudis-select>`,
})
class MockComponent {
  testOptions: FudisSelectOption<object>[] = defaultOptions;
  control: FormControl<FudisSelectOption<object> | null> = new FormControl(null);

  @ViewChild('selectElem') selectElem: SelectComponent;

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
  });

  function setSelectDropdownOpen() {
    component.selectElem.openDropdown();
    fixture.detectChanges();
  }

  function updateControlValue(option: FudisSelectOption<object>) {
    component.control.patchValue(option);
    fixture.detectChanges();
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
      const textContent = getTrimmedTextContent(options[2].nativeElement);

      expect(options[2].nativeElement.outerHTML).toContain(
        'fudis-select-option__focusable fudis-select-option--selected',
      );
      expect(textContent).toEqual('Platypus');
    });

    it('should filter correct options for given letter input', () => {
      const input = fixture.debugElement.query(By.css('.fudis-select-autocomplete__input'));
      const el = input.nativeElement;

      el.value = 'p';
      el.dispatchEvent(new KeyboardEvent('keyup'));
      fixture.detectChanges();

      setSelectDropdownOpen();

      fixture.detectChanges();

      const focusableOptions = getAllElements(
        fixture,
        '.fudis-select-option__focusable .fudis-select-option__label',
      );

      expect(focusableOptions.length).toEqual(2);

      const optionsArray: string[] = [];

      focusableOptions.forEach((item) => {
        const cleanedContent = getTrimmedTextContent(item as HTMLElement);

        optionsArray.push(cleanedContent);
      });

      expect(optionsArray).toEqual(['Capybara', 'Platypus']);
    });

    it('should trigger blur event when focused elsewhere', () => {
      updateControlValue(defaultOptions[2]);
      setSelectDropdownOpen();

      jest.spyOn(component, 'handleOptionBlur');

      const firstElement = fixture.nativeElement.querySelector(
        '#fudis-select-1-item-2',
      ) as HTMLInputElement;
      const secondElement = fixture.nativeElement.querySelector(
        '#fudis-select-1-item-4',
      ) as HTMLInputElement;

      firstElement.focus();
      secondElement.focus();

      expect(component.eventReceived.target).toEqual(firstElement);
      expect(component.handleOptionBlur).toHaveBeenCalled();
    });
  });
});
