import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { FudisBreakpointService } from '../../../../services/breakpoint/breakpoint.service';
import { FudisCheckboxChangeEvent, FudisCheckboxGroupOption } from '../../../../types/forms';
import { FudisGroupValidators } from '../../../../utilities/form/groupValidators';
import { CheckboxGroupComponent } from '../checkbox-group.component';
import { GuidanceComponent } from '../../guidance/guidance.component';
import { CheckboxGroupOptionComponent } from './checkbox-group-option.component';
import { FieldSetComponent } from '../../fieldset/fieldset.component';
import { GridComponent } from '../../../grid/grid/grid.component';
import { GridApiDirective } from '../../../../directives/grid/grid-api/grid-api.directive';
import { GridDirective } from '../../../../directives/grid/grid/grid.directive';
import { IconComponent } from '../../../icon/icon.component';
import { ValidatorErrorMessageComponent } from '../../error-message/validator-error-message/validator-error-message.component';
import { FudisInternalErrorSummaryService } from '../../../../services/form/error-summary/internal-error-summary.service';
import { FieldsetContentDirective } from '../../fieldset/fieldset-content.directive';

type TestForm = {
  apple: FormControl<boolean | null>;
  fairTradeBanana: FormControl<boolean | null>;
  pear: FormControl<boolean | null>;
  pineapple: FormControl<boolean | null>;
  orange: FormControl<boolean | null>;
};

@Component({
  standalone: false,
  selector: 'fudis-mock-container',
  template: `<fudis-checkbox-group
    [formGroup]="testFromGroup"
    [label]="'Choose minimum of one fruit'"
  >
    <fudis-checkbox-group-option
      *ngFor="let option of _options"
      [controlName]="option.controlName"
      [label]="option.label"
    />
  </fudis-checkbox-group>`,
})
class MockContainerComponent {
  public testFromGroup = new FormGroup<TestForm>(
    {
      apple: new FormControl<boolean | null>(null),
      fairTradeBanana: new FormControl<boolean | null>(false),
      orange: new FormControl<boolean | null>(null),
      pear: new FormControl<boolean | null>(true),
      pineapple: new FormControl<boolean | null>({ value: false, disabled: true }),
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
}

describe('CheckboxGroupOptionComponent', () => {
  let fixture:
    | ComponentFixture<MockContainerComponent>
    | ComponentFixture<CheckboxGroupOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CheckboxGroupOptionComponent,
        ValidatorErrorMessageComponent,
        MockContainerComponent,
        CheckboxGroupComponent,
        FieldSetComponent,
        FieldsetContentDirective,
        GridComponent,
        GridApiDirective,
        GridDirective,
        GuidanceComponent,
        IconComponent,
      ],
      providers: [FudisBreakpointService, FudisInternalErrorSummaryService],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockContainerComponent);
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
      const CheckboxGroupOptionComponent = fixture.nativeElement.querySelector(
        '#fudis-checkbox-group-1 [ng-reflect-control-name="fairTradeBanana"] .fudis-checkbox',
      );

      const labelBox: HTMLSpanElement = CheckboxGroupOptionComponent.querySelector(
        '.fudis-checkbox__content__box',
      );

      expect(labelBox.className).toEqual('fudis-checkbox__content__box');

      const input: HTMLInputElement = CheckboxGroupOptionComponent.querySelector('input');

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
      const CheckboxGroupOptionComponentToSpy = fixture.debugElement.query(
        By.directive(CheckboxGroupOptionComponent),
      ).componentInstance;

      const optionToMatch: FudisCheckboxGroupOption<object> = {
        id: 'fudis-checkbox-group-1-item-1',
        groupName: 'fudis-checkbox-group-1',
        controlName: 'apple',
        label: 'Apple',
        value: true,
      };

      CheckboxGroupOptionComponentToSpy.handleChange.subscribe(
        (value: FudisCheckboxChangeEvent) => {
          if (value) {
            expect(value.checkbox).toEqual(optionToMatch);

            expect(value.control.value).toEqual(true);
          }
        },
      );

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
});
