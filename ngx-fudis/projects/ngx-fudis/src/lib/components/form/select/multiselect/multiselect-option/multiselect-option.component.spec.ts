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
import { FudisTranslationService } from '../../../../../services/translation/translation.service';
import { FudisIdService } from '../../../../../services/id/id.service';
import { ContentDirective } from '../../../../../directives/content-projection/content/content.directive';
import { defaultOptions } from '../../common/mock_data';

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
  multiOptions: FudisSelectOption[] = defaultOptions;
  control: FormControl = new FormControl(null);

  @ViewChild('multiOption') multiOption: MultiselectOptionComponent;
  @ViewChild('selectEl') selectEl: MultiselectComponent;
}

describe('MultiselectOptionComponent', () => {
  let componentMock: MultiselectMockComponent;
  let fixtureMock: ComponentFixture<MultiselectMockComponent>;

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
        ContentDirective,
        GuidanceComponent,
        IconComponent,
        LabelComponent,
      ],
      providers: [FudisIdService, FudisTranslationService],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixtureMock = TestBed.createComponent(MultiselectMockComponent);
    componentMock = fixtureMock.componentInstance;
    fixtureMock.detectChanges();
  });

  function setMultiSelectDropdownOpen() {
    componentMock.selectEl.openDropdown();
    fixtureMock.detectChanges();
  }

  function initializeFormControlWithOneValue() {
    componentMock.control = new FormControl(defaultOptions[4]);
    componentMock = fixtureMock.componentInstance;
    fixtureMock.detectChanges();
  }

  function initializeFormControlWithMultipleValues() {
    componentMock.control = new FormControl([defaultOptions[4], defaultOptions[0]]);
    componentMock = fixtureMock.componentInstance;
    fixtureMock.detectChanges();
  }

  it('should create', () => {
    expect(componentMock).toBeTruthy();
  });

  describe('Parent control', () => {
    it('should add value to empty control when control value is changed', () => {
      componentMock.control.patchValue(defaultOptions[2]);
      const controlValueArray = componentMock.selectEl.control.value;

      expect(controlValueArray).toMatchObject({ label: 'Platypus' });
    });

    it('should have preselected value if control has value on init', () => {
      initializeFormControlWithOneValue();
      const controlValueArray = componentMock.selectEl.control.value;

      expect(controlValueArray).toStrictEqual({
        value: 'value-5-armadillo',
        label: 'Screaming hairy armadillo',
      });
    });

    it('should add value to control with already existing values when another option is selected', () => {
      initializeFormControlWithMultipleValues();
      setMultiSelectDropdownOpen();

      const options = fixtureMock.debugElement.queryAll(By.css('fudis-multiselect-option'));
      options[2].nativeElement.querySelector('input').click();
      fixtureMock.detectChanges();

      const controlValueArray = componentMock.selectEl.control.value;

      expect(controlValueArray).toMatchObject([
        { label: 'Screaming hairy armadillo' },
        { label: 'Dog' },
        { label: 'Platypus' },
      ]);
    });

    it('should remove value from control when already selected option is clicked', () => {
      setMultiSelectDropdownOpen();

      const options = fixtureMock.debugElement.queryAll(By.css('fudis-multiselect-option'));

      // Select multiple options
      options[0].nativeElement.querySelector('input').click();
      options[1].nativeElement.querySelector('input').click();
      options[4].nativeElement.querySelector('input').click();
      fixtureMock.detectChanges();

      const controlValueArray = componentMock.selectEl.control.value;

      expect(controlValueArray).toMatchObject([
        { label: 'Dog' },
        { label: 'Capybara' },
        { label: 'Screaming hairy armadillo' },
      ]);

      // Remove one of the already selected options
      options[4].nativeElement.querySelector('input').click();
      fixtureMock.detectChanges();

      const updatedControlValueArray = componentMock.selectEl.control.value;

      expect(updatedControlValueArray).toMatchObject([{ label: 'Dog' }, { label: 'Capybara' }]);
    });
  });

  describe('Single option', () => {
    it('should have respective attributes if selected', () => {
      setMultiSelectDropdownOpen();

      const options = fixtureMock.debugElement.queryAll(By.css('.fudis-multiselect-option'));
      options[1].nativeElement.querySelector('input').click();
      fixtureMock.detectChanges();

      expect(options[1].nativeElement.outerHTML).toContain(
        'fudis-multiselect-option__label--checked',
      );
      expect(options[1].nativeElement.outerHTML).toContain('fudis-icon');
    });
  });
});
