import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGroupComponent } from './select-group.component';
import { Component, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '../../select/select.component';
import { IconComponent } from '../../../../icon/icon.component';
import { GuidanceComponent } from '../../../guidance/guidance.component';
import { LabelComponent } from '../../../label/label.component';
import { BodyTextComponent } from '../../../../typography/body-text/body-text.component';
import { SelectDropdownComponent } from '../select-dropdown/select-dropdown.component';
import { FudisIdService } from '../../../../../services/id/id.service';
import { FudisTranslationService } from '../../../../../services/translation/translation.service';
import { ContentDirective } from '../../../../../directives/content-projection/content/content.directive';
import { SelectOptionComponent } from '../../select/select-option/select-option.component';
import { getAllElements } from '../../../../../utilities/tests/utilities';
import { MultiselectComponent } from '../../multiselect/multiselect.component';
import { FudisSelectOption } from '../../../../../types/forms';
import { SelectAutocompleteComponent } from '../autocomplete/autocomplete.component';
import { ButtonComponent } from '../../../../button/button.component';
import { MultiselectOptionComponent } from '../../multiselect/multiselect-option/multiselect-option.component';
import { groupedTestData } from '../mock_data';
import { SelectIconsComponent } from '../select-icons/select-icons.component';

@Component({
  selector: 'fudis-mock-select',
  template: `<fudis-select
      #singleSelect
      [label]="'Test Label'"
      [placeholder]="'Test placeholder'"
      [control]="control"
      [size]="'md'"
    >
      <ng-template fudisContent type="select-options">
        <fudis-select-group *ngFor="let group of groupedData" [label]="group.country">
          <fudis-select-option *ngFor="let groupedOption of group.options" [data]="groupedOption" />
        </fudis-select-group>
      </ng-template>
    </fudis-select>
    <fudis-multiselect
      #multiSelect
      [variant]="'autocompleteDropdown'"
      [label]="'Test Label'"
      [control]="control"
    >
      <ng-template fudisContent type="select-options">
        <fudis-multiselect-group *ngFor="let group of groupedData" [label]="group.country">
          <fudis-multiselect-option
            *ngFor="let groupedOption of group.options"
            [data]="groupedOption"
          />
        </fudis-multiselect-group>
      </ng-template>
    </fudis-multiselect>`,
})
class MockSelectComponent {
  groupedData = groupedTestData;
  control: FormControl = new FormControl<FudisSelectOption<object> | null>(null);

  @ViewChild('singleSelect') singleSelect: SelectComponent;
  @ViewChild('multiSelect') multiSelect: MultiselectComponent;
}

describe('SelectGroupComponent', () => {
  let component: MockSelectComponent;
  let fixture: ComponentFixture<MockSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContentDirective,
        SelectComponent,
        SelectGroupComponent,
        SelectDropdownComponent,
        SelectOptionComponent,
        SelectIconsComponent,
        GuidanceComponent,
        IconComponent,
        LabelComponent,
        MockSelectComponent,
        MultiselectComponent,
        MultiselectOptionComponent,
        SelectAutocompleteComponent,
        SelectDropdownComponent,
        BodyTextComponent,
        ButtonComponent,
      ],
      providers: [FudisIdService, FudisTranslationService],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function setSelectDropdownOpen() {
    component.singleSelect.openDropdown();
    fixture.detectChanges();
  }

  function setMultiSelectDropdownOpen() {
    component.multiSelect.openDropdown();
    fixture.detectChanges();
  }

  function updateMultiSelectValue() {
    component.multiSelect.autocompleteRef.updateInputValue('g');

    fixture.detectChanges();
  }

  describe('Select Group Component', () => {
    it('should have group label', () => {
      setSelectDropdownOpen();

      const groupLabels = getAllElements(fixture, 'fudis-select-group .fudis-select-group__label');

      const groupLabelsArray: (string | null)[] = [];

      groupLabels.forEach((label) => {
        groupLabelsArray.push(label.textContent);
      });

      expect(groupLabelsArray).toEqual(['Netherlands', 'Brazil', 'China']);
    });

    it('should have matching id', () => {
      setSelectDropdownOpen();

      const correctGroupIds = [
        'fudis-select-1-group-1',
        'fudis-select-1-group-2',
        'fudis-select-1-group-3',
      ];

      const groups = getAllElements(fixture, 'fudis-select-group');

      const groupIdsArray: string[] = [];

      groups.forEach((group) => {
        const groupId = (group as HTMLDivElement)
          .querySelector('.fudis-select-group__label')!
          .getAttribute('id') as string;
        groupIdsArray.push(groupId);
      });

      expect(groupIdsArray).toEqual(correctGroupIds);
    });

    it('should return a correct amount of options for group', () => {
      setSelectDropdownOpen();

      const allGroups = getAllElements(fixture, 'fudis-select-group');

      expect(allGroups.length).toEqual(3);

      const correctLabels = [
        ['Golden jackal', 'Mountain lion', 'Cat, european wild'],
        ['Small Indian mongoose', 'Falcon, prairie', 'Spotted hyena'],
        ['Salmon pink bird eater tarantula', 'Crane, sandhill', 'Arctic fox'],
      ];

      allGroups.forEach((group, index) => {
        const options = (group as HTMLDivElement).querySelectorAll('.fudis-select-option__label');

        const singleGroupLabels: (string | null)[] = [];

        options.forEach((singleOption) => {
          singleGroupLabels.push(singleOption.textContent);
        });

        expect(singleGroupLabels.length).toEqual(3);

        expect(singleGroupLabels).toEqual(correctLabels[index]);
      });
    });
  });

  describe('Autocomplete multiselect', () => {
    it('should respective classes for matching visible group options', () => {
      updateMultiSelectValue();
      setMultiSelectDropdownOpen();
      fixture.detectChanges();

      const visibleOptions = getAllElements(
        fixture,
        '.fudis-select-group .fudis-multiselect-option--visible .fudis-multiselect-option__label__text',
      );

      expect(visibleOptions.length).toEqual(2);

      const optionsArray: (string | null)[] = [];

      visibleOptions.forEach((item) => {
        optionsArray.push(item.textContent);
      });

      expect(optionsArray).toEqual(['Golden jackal', 'Small Indian mongoose']);
    });

    it('should have respective classes for groups that are hidden', () => {
      updateMultiSelectValue();
      setMultiSelectDropdownOpen();
      fixture.detectChanges();

      const hiddenGroups = getAllElements(
        fixture,
        '.fudis-select-group.fudis-select-group--hidden .fudis-select-group__label',
      );

      expect(hiddenGroups.length).toEqual(1);

      const groupsArray: (string | null)[] = [];

      hiddenGroups.forEach((item) => {
        groupsArray.push(item.textContent);
      });

      expect(groupsArray).toEqual(['China']);
    });
  });
});
