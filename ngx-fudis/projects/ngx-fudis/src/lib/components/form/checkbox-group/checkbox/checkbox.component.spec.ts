import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { FudisBreakpointService } from '../../../../services/breakpoint/breakpoint.service';
import { FudisGridService } from '../../../../services/grid/grid.service';
import { ContentDirective } from '../../../../directives/content-projection/content/content.directive';
import {
  FudisCheckboxChangeEvent,
  FudisCheckboxGroupFormGroup,
  FudisCheckboxOption,
} from '../../../../types/forms';
import { FudisGroupValidators } from '../../../../utilities/form/groupValidators';
import { CheckboxGroupComponent } from '../checkbox-group.component';
import { GuidanceComponent } from '../../guidance/guidance.component';
import { CheckboxComponent } from './checkbox.component';
import { FieldSetComponent } from '../../fieldset/fieldset.component';
import { GridComponent } from '../../../grid/grid/grid.component';
import { GridApiDirective } from '../../../../directives/grid/grid-api/grid-api.directive';
import { GridDirective } from '../../../../directives/grid/grid/grid.directive';
import { IconComponent } from '../../../icon/icon.component';
import { ValidatorErrorMessageComponent } from '../../error-message/validator-error-message/validator-error-message.component';
import { FudisFocusService } from '../../../../services/focus/focus.service';
import { FudisInternalErrorSummaryService } from '../../../../services/form/error-summary/internal-error-summary.service';
import { FudisIdService } from '../../../../services/id/id.service';
import { FudisTranslationService } from '../../../../services/translation/translation.service';

@Component({
  selector: 'fudis-mock-container',
  template: `<fudis-checkbox-group
      #firstGroup
      [formGroup]="testFromGroup"
      [label]="'With Group. Choose minimum of one fruit'"
    >
      <fudis-checkbox
        *ngFor="let option of _options"
        [controlName]="option.controlName"
        [label]="option.label"
      />
    </fudis-checkbox-group>
    <fudis-checkbox-group #secondGroup [label]="'Without Group. Choose minimum of one fruit'">
      <fudis-checkbox
        *ngFor="let option of optionsWithControls"
        [id]="option.id"
        [controlName]="option.controlName"
        [control]="option.control"
        [label]="option.label"
      />
    </fudis-checkbox-group> `,
})
class MockContainerComponent {
  @ViewChild('firstGroup') firstGroup: CheckboxGroupComponent;
  @ViewChild('secondGroup') secondGroup: CheckboxGroupComponent;

  public testFromGroup = new FormGroup<FudisCheckboxGroupFormGroup<object>>(
    {
      apple: new FormControl<boolean | null | undefined>(null),
      fairTradeBanana: new FormControl<boolean | null | undefined>(false),
      orange: new FormControl<boolean | null | undefined>(undefined),
      pear: new FormControl<boolean | null | undefined>(true),
      pineapple: new FormControl<boolean | null | undefined>({ value: false, disabled: true }),
    },
    [
      FudisGroupValidators.min({ value: 2, message: new BehaviorSubject('Too few selected') }),
      FudisGroupValidators.max({ value: 3, message: new BehaviorSubject('Too many selected') }),
    ],
  );

  protected _options = [
    { controlName: 'apple', label: 'Apple' },
    { controlName: 'fairTradeBanana', label: 'Fair trade banana' },
    { controlName: 'pear', label: 'Pear' },
    { controlName: 'pineapple', label: 'Pineapple' },
    { controlName: 'orange', label: 'Orange' },
  ];

  public optionsWithControls = [
    { label: 'Apple', control: new FormControl(null) },
    { controlName: 'fairTradeBanana', label: 'Fair trade banana', control: new FormControl(null) },
    { controlName: 'pear', label: 'Pear', control: new FormControl(true) },
    { label: 'Pineapple', control: new FormControl(true) },
    { label: 'Orange', control: new FormControl(null), id: 'checkbox-with-orange-id' },
  ];
}

describe('CheckboxComponent', () => {
  let fixture: ComponentFixture<MockContainerComponent> | ComponentFixture<CheckboxComponent>;

  let mockComponent: MockContainerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CheckboxComponent,
        ValidatorErrorMessageComponent,
        MockContainerComponent,
        CheckboxGroupComponent,
        FieldSetComponent,
        GridComponent,
        GridApiDirective,
        GridDirective,
        ContentDirective,
        GuidanceComponent,
        IconComponent,
      ],
      providers: [
        FudisBreakpointService,
        FudisGridService,
        FudisIdService,
        FudisTranslationService,
        FudisFocusService,
        FudisInternalErrorSummaryService,
      ],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockContainerComponent);
    mockComponent = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('Determine checked status from formControl value', () => {
    it('should create as unchecked, when control is null', () => {
      const nullCheckbox = fixture.nativeElement.querySelector(
        '#fudis-checkbox-group-1 [ng-reflect-control-name="apple"]',
      );
      const input = nullCheckbox.querySelector('input');
      const inputValue: string | null | undefined = input.getAttribute('value');
      const checkedIcon = nullCheckbox.querySelector('fudis-icon');

      const inputDisabled = input.getAttribute('disabled');
      const inputAriaDisabled = input.getAttribute('aria-disabled');

      expect(inputValue).toBeFalsy();
      expect(inputDisabled).toBeNull();
      expect(inputAriaDisabled).toBeNull();
      expect(checkedIcon).toBeNull();
    });

    it('should create as unchecked, when control is false', () => {
      const falseCheckbox = fixture.nativeElement.querySelector(
        '#fudis-checkbox-group-1 [ng-reflect-control-name="fairTradeBanana"]',
      );

      const inputValue: string | null | undefined = falseCheckbox
        .querySelector('input')
        .getAttribute('value');

      const checkedIcon = falseCheckbox.querySelector('fudis-icon');

      expect(inputValue).toEqual('false');
      expect(checkedIcon).toBeNull();
    });

    it('should create unchecked, when control value is undefined', () => {
      const undefinedCheckbox = fixture.nativeElement.querySelector(
        '#fudis-checkbox-group-1 [ng-reflect-control-name="orange"]',
      );

      const inputValue: string | null | undefined = undefinedCheckbox
        .querySelector('input')
        .getAttribute('value');

      const checkedIcon = undefinedCheckbox.querySelector('fudis-icon');

      expect(inputValue).toBeFalsy();
      expect(checkedIcon).toBeNull();
    });

    it('should create as checked, when control value is true', () => {
      const checkedCheckbox = fixture.nativeElement.querySelector(
        '#fudis-checkbox-group-1 [ng-reflect-control-name="pear"]',
      );

      const checkedIcon = checkedCheckbox.querySelector('fudis-icon[ng-reflect-icon="check"]');

      const inputValue: string | null | undefined = checkedCheckbox
        .querySelector('input')
        .getAttribute('value');

      expect(checkedIcon).not.toBeNull();
      expect(inputValue).toEqual('true');
    });

    it('should create with disabled status, if control is set as disabled', () => {
      const unCheckedCheckbox = fixture.nativeElement.querySelector(
        '#fudis-checkbox-group-1 [ng-reflect-control-name="pineapple"]',
      );

      const checkedIcon = unCheckedCheckbox.querySelector(
        'fudis-icon[ng-reflect-icon="check-small"]',
      );

      const inputElement = unCheckedCheckbox.querySelector('input');

      const inputValue: string | null | undefined = inputElement.getAttribute('value');
      const inputDisabled = inputElement.getAttribute('disabled');
      const inputAriaDisabled = inputElement.getAttribute('aria-disabled');

      expect(checkedIcon).toBeNull();
      expect(inputDisabled).not.toBeNull();
      expect(inputAriaDisabled).toEqual('true');
      expect(inputValue).toEqual('false');
    });
  });

  describe('Basic inputs and styles', () => {
    it('should create with correct label', () => {
      const checkedCheckbox = fixture.nativeElement.querySelector(
        '#fudis-checkbox-group-1 [ng-reflect-control-name="fairTradeBanana"]',
      );

      const label = checkedCheckbox.querySelector('.fudis-checkbox__content__label') as HTMLElement;

      expect(label.textContent).toContain('Fair trade banana');
    });

    it('should have proper CSS classes before, during and after when input focused', () => {
      const checkboxComponent = fixture.nativeElement.querySelector(
        '#fudis-checkbox-group-1 [ng-reflect-control-name="fairTradeBanana"] .fudis-checkbox',
      );

      const labelBox: HTMLSpanElement = checkboxComponent.querySelector(
        '.fudis-checkbox__content__box',
      );

      expect(labelBox.className).toEqual('fudis-checkbox__content__box');

      const input: HTMLInputElement = checkboxComponent.querySelector('input');

      input.dispatchEvent(new Event('focus'));
      fixture.detectChanges();

      expect(labelBox.className).toEqual(
        'fudis-checkbox__content__box fudis-checkbox__content__box--focused',
      );

      input.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      expect(labelBox.className).toEqual('fudis-checkbox__content__box');
    });
  });

  describe('Interaction and logic when clicking', () => {
    it('should display the check icon and emit handleChange() when clicking component', waitForAsync(() => {
      const checkboxComponentToSpy = fixture.debugElement.query(
        By.directive(CheckboxComponent),
      ).componentInstance;

      const optionToMatch: FudisCheckboxOption<object> = {
        id: 'fudis-checkbox-group-1-item-1',
        groupName: 'fudis-checkbox-group-1',
        controlName: 'apple',
        label: 'Apple',
        value: true,
      };

      checkboxComponentToSpy.handleChange.subscribe((value: FudisCheckboxChangeEvent) => {
        if (value) {
          expect(value.checkbox).toEqual(optionToMatch);

          expect(value.control.value).toEqual(true);
        }
      });

      const input: HTMLInputElement = fixture.debugElement.nativeElement.querySelector(
        '#fudis-checkbox-group-1 input#fudis-checkbox-group-1-item-1',
      );

      input.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector(
        '[ng-reflect-control-name="apple"] fudis-icon',
      );
      const inputValue = input.getAttribute('value');

      expect(inputValue).toEqual('true');
      expect(icon).not.toBeNull();
    }));
  });

  describe('With FormControl provided', () => {
    it('should have updated FormGroup in the parent correctly', () => {
      const mockComponentFormGroupControls = mockComponent.secondGroup.formGroup.controls;

      const expectedKeys = [
        'fudis-checkbox-group-2-item-1',
        'fairTradeBanana',
        'pear',
        'fudis-checkbox-group-2-item-4',
        'checkbox-with-orange-id',
      ];

      const receivedKeys: string[] = [];

      Object.keys(mockComponentFormGroupControls).forEach((key) => {
        receivedKeys.push(key);
      });

      expect(expectedKeys).toEqual(receivedKeys);
    });
  });
});
