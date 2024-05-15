import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MultiselectComponent } from './multiselect.component';
import { GuidanceComponent } from '../../guidance/guidance.component';
import { IconComponent } from '../../../icon/icon.component';
import { LabelComponent } from '../../label/label.component';
import { SelectAutocompleteComponent } from '../common/autocomplete/autocomplete.component';
import { SelectDropdownComponent } from '../common/select-dropdown/select-dropdown.component';
import { BodyTextComponent } from '../../../typography/body-text/body-text.component';
import { MultiselectChipListComponent } from './multiselect-chip-list/multiselect-chip-list.component';
import { MultiselectOptionComponent } from './multiselect-option/multiselect-option.component';
import { SelectGroupComponent } from '../common/select-group/select-group.component';
import { SelectBaseDirective } from '../common/select-base/select-base.directive';
import { InputBaseDirective } from '../../../../directives/form/input-base/input-base.directive';
import { TooltipDirective } from '../../../../directives/tooltip/tooltip.directive';
import { FudisTranslationService } from '../../../../services/translation/translation.service';
import { FudisFocusService } from '../../../../services/focus/focus.service';
import { FudisIdService } from '../../../../services/id/id.service';
import { FudisSelectOption } from '../../../../types/forms';
import {
  getAllElements,
  getElement,
} from '../../../../utilities/tests/utilities';
import { TestAnimalSound, defaultOptions } from '../common/mock_data';

@Component({
  selector: 'fudis-multiselect-mock',
  template: ` <fudis-multiselect
    #multiselectEl
    [placeholder]="'Multiselect placeholder'"
    [control]="control"
    [label]="'Multiselect label'"
    [helpText]="'Multiselect help text'"
  >
    <ng-template fudisContent type="select-options">
      <fudis-multiselect-option *ngFor="let option of options" [data]="option" />
    </ng-template>
  </fudis-multiselect>`,
})
class MultiselectMockComponent {
  @ViewChild('multiselectEl') multiselectEl: MultiselectComponent;

  options: FudisSelectOption<object>[] = defaultOptions;
  control: FormControl<FudisSelectOption<TestAnimalSound>[] | null> = new FormControl<
    TestAnimalSound[] | null
  >(null);
}

// TODO: add test for disabled states

describe('MultiselectComponent', () => {
  let component: MultiselectComponent;
  let fixture: ComponentFixture<MultiselectComponent>;
  let componentMock: MultiselectMockComponent;
  let fixtureMock: ComponentFixture<MultiselectMockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MultiselectComponent,
        MultiselectOptionComponent,
        MultiselectMockComponent,
        MultiselectChipListComponent,
        SelectAutocompleteComponent,
        SelectDropdownComponent,
        SelectGroupComponent,
        BodyTextComponent,
        GuidanceComponent,
        IconComponent,
        LabelComponent,
      ],
      providers: [
        FudisIdService,
        FudisTranslationService,
        FudisFocusService,
        TooltipDirective,
        SelectBaseDirective,
        InputBaseDirective,
      ],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  function initWithControlValue() {
    component.control = new FormControl<FudisSelectOption<object>[]>([
      defaultOptions[0],
      defaultOptions[2],
    ]);
    component.ngAfterViewInit();
    fixture.detectChanges();
  }

  function initWithControlNull() {
    component.control = new FormControl<FudisSelectOption<object>[] | null>(null);
    component.ngAfterViewInit();
    fixture.detectChanges();
  }

  describe('Input', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(MultiselectComponent);
      component = fixture.componentInstance;
      component.label = 'Multiselect label';
      component.placeholder = 'Multiselect placeholder';
      component.size = 'md';
      component.helpText = 'Multiselect help text';
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have respective CSS classes according to given size Input', () => {
      initWithControlNull();
      const expectedValue = 'fudis-select fudis-input-size__md';
      const classes = fixture.nativeElement.childNodes;
      const componentClasses = classes[0].className.split(' ').sort();

      expect(componentClasses).toEqual(expectedValue.split(' ').sort());
    });

    it('should have help text paragraph if helpText Input is given', () => {
      initWithControlNull();
      const helpText = getElement(fixture, '.fudis-guidance .fudis-guidance__help-text');

      expect(helpText).toBeTruthy();
      expect(helpText.outerHTML).toContain('Multiselect help text');
    });

    it('should have placeholder text present when control value is null on init', () => {
      initWithControlNull();
      const placeholder = getElement(fixture, '.fudis-select__input__placeholder');

      expect(placeholder.outerHTML).toContain('Multiselect placeholder');
    });

    it('should have HTML input value from control value if control value is set on init', () => {
      initWithControlValue();
      const expectedValue = 'Dog, Platypus';
      const placeholderItems = getAllElements(fixture, '.fudis-select__input__label');
      const placeholerItemsArray: (string|null)[] = [];

      placeholderItems.forEach((item) => {
        placeholerItemsArray.push(item.textContent);
      });

      expect(placeholerItemsArray).toEqual([expectedValue]);
    });

    it('should have placehorder text present when control value is updated to null', () => {
      initWithControlValue();
      component.control.patchValue(null);
      fixture.detectChanges();

      const placeholder = getElement(fixture, '.fudis-select__input__placeholder');

      expect(placeholder.outerHTML).toContain('Multiselect placeholder');
    });
  });

  describe('Selection change', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(MultiselectComponent);
      component = fixture.componentInstance;
      component.label = 'Multiselect label';
    });

    it('should update component state when handleMultiSelectionChange is called with type "add" and control value is null', () => {
      initWithControlNull();
      component.handleMultiSelectionChange(defaultOptions[5], 'add');
      fixture.detectChanges();

      const value = getElement(fixture, '.fudis-select__input__label').textContent;

      expect(value).toEqual('Southern Titiwangsa Bent-Toed Gecko');
      expect(component.control.value).toEqual([defaultOptions[5]]);
    });

    it('should update component state when handleMultiSelectionChange is called with "add"', () => {
      initWithControlValue();
      component.handleMultiSelectionChange(defaultOptions[5], 'add');
      fixture.detectChanges();

      const value = getElement(fixture, '.fudis-select__input__label').textContent;

      expect(value).toEqual('Dog, Platypus, Southern Titiwangsa Bent-Toed Gecko');
      expect(component.control.value).toEqual([
        defaultOptions[0],
        defaultOptions[2],
        defaultOptions[5],
      ]);
    });

    it('should update component state when handleMultiSelectionChange is called with "remove"', () => {
      initWithControlValue();
      component.handleMultiSelectionChange(defaultOptions[0], 'remove');
      fixture.detectChanges();

      const value = getElement(fixture, '.fudis-select__input__label').textContent;

      expect(value).toEqual('Platypus');
      expect(component.control.value).toEqual([defaultOptions[2]]);
    });
  });

  describe('Chip list', () => {
    beforeEach(() => {
      fixtureMock = TestBed.createComponent(MultiselectMockComponent);
      componentMock = fixtureMock.componentInstance;
      fixtureMock.detectChanges();
    });

    it('should be visible by default', () => {
      componentMock.control.patchValue([defaultOptions[0], defaultOptions[2]]);
      fixtureMock.detectChanges();

      const chipList = getElement(fixtureMock, '.fudis-multiselect-chip-list');

      expect(chipList).toBeTruthy();
    });

    it('should not be visible if showSelectionChips is set to false', () => {
      componentMock.control = new FormControl<TestAnimalSound[]>([
        defaultOptions[0],
        defaultOptions[2],
      ]);
      componentMock.multiselectEl.showSelectionChips = false;
      fixtureMock.detectChanges();

      const chipList = getElement(fixtureMock, '.fudis-multiselect-chip-list');

      expect(chipList).toBeFalsy();
    });

    it('should have correct length of buttons', () => {
      componentMock.control.patchValue([defaultOptions[2], defaultOptions[4], defaultOptions[0]]);
      fixtureMock.detectChanges();

      const chipListButtons = getAllElements(fixtureMock, '.fudis-multiselect-chip-list__button');

      expect(chipListButtons).toHaveLength(3);
    });
  });
});
