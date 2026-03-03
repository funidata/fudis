import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CheckboxGroupComponent } from './checkbox-group.component';
import { FieldSetComponent } from '../fieldset/fieldset.component';
import { FieldsetContentDirective } from '../fieldset/fieldset-content.directive';
import { CheckboxGroupOptionComponent } from './checkbox-group-option/checkbox-group-option.component';
import {
  FudisCheckboxGroupChangeEvent,
  fudisSelectionGroupInputSizeArray,
} from '../../../types/forms';
import { FudisGroupValidators } from '../../../utilities/form/groupValidators';
import { FudisBreakpointService } from '../../../services/breakpoint/breakpoint.service';
import { GridComponent } from '../../grid/grid/grid.component';
import { GridApiDirective } from '../../../directives/grid/grid-api/grid-api.directive';
import { GridDirective } from '../../../directives/grid/grid/grid.directive';
import { IconComponent } from '../../icon/icon.component';
import { GuidanceComponent } from '../guidance/guidance.component';
import { ValidatorErrorMessageComponent } from '../error-message/validator-error-message/validator-error-message.component';
import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';
import { getElement } from '../../../utilities/tests/utilities';

type TestForm = {
  apple: FormControl<boolean | null>;
  fairTradeBanana: FormControl<boolean | null>;
  pear: FormControl<boolean | null>;
  pineapple: FormControl<boolean | null>;
  orange: FormControl<boolean | null>;
};

const testFormGroup = new FormGroup<TestForm>(
  {
    apple: new FormControl<boolean | null>(null),
    fairTradeBanana: new FormControl<boolean | null>(null),
    pear: new FormControl<boolean | null>(null),
    pineapple: new FormControl<boolean | null>(null),
    orange: new FormControl<boolean | null>(null),
  },
  [FudisGroupValidators.oneRequired(new BehaviorSubject('No fruit picked! :('))],
);

type TestOption = {
  controlName?: string;
  label: string;
  control?: FormControl<boolean | null>;
};

type TestFormGroup = {
  [key: string]: FormControl<boolean | null>;
};

@Component({
  standalone: false,
  selector: 'fudis-mock-component',
  template: ` <fudis-checkbox-group
    [id]="'group-id'"
    [formGroup]="testFromGroup"
    [label]="'With Form Group. Choose minimum of one fruit'"
    (handleChange)="handleCheckboxClick($event)"
  >
    <p class="do-not-find-me">This should not be shown</p>
    @for (option of options; track option.controlName) {
      <fudis-checkbox-group-option [controlName]="option.controlName" [label]="option.label" />
    }
  </fudis-checkbox-group>`,
})
class MockContainerComponent {
  public testFromGroup = new FormGroup<TestFormGroup>(
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

  public options: TestOption[] = [
    { controlName: 'apple', label: 'Apple' },
    { controlName: 'fairTradeBanana', label: 'Fair trade banana' },
    { controlName: 'pear', label: 'Pear' },
    { controlName: 'pineapple', label: 'Pineapple' },
    { controlName: 'orange', label: 'Orange' },
  ];

  eventReceived: FudisCheckboxGroupChangeEvent;

  handleCheckboxClick(event: FudisCheckboxGroupChangeEvent): void {
    this.eventReceived = event;
  }
}

describe('CheckboxGroupComponent', () => {
  let component: CheckboxGroupComponent<TestForm>;
  let fixture:
    | ComponentFixture<CheckboxGroupComponent<TestForm>>
    | ComponentFixture<MockContainerComponent>;
  let fieldsetElement: HTMLFieldSetElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MockContainerComponent,
        CheckboxGroupOptionComponent,
        CheckboxGroupComponent,
        FieldSetComponent,
        FieldsetContentDirective,
        GridComponent,
        GridApiDirective,
        GridDirective,
        GuidanceComponent,
        ValidatorErrorMessageComponent,
      ],
      imports: [IconComponent, ReactiveFormsModule],
      providers: [FudisBreakpointService, FudisInternalErrorSummaryService],
    }).compileComponents();
  });

  describe('Basic inputs of Checkbox Group', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(CheckboxGroupComponent<TestForm>);
      component = fixture.componentInstance;
      component.formGroup = testFormGroup;
      component.label = 'Checkbox Group test title';
      component.helpText = 'Some help text';

      fixture.autoDetectChanges();

      fieldsetElement = fixture.nativeElement.querySelector(
        'fudis-fieldset .fudis-fieldset',
      ) as HTMLFieldSetElement;
    });

    it('should have correct label as legend', () => {
      const legendLabel = fixture.nativeElement.querySelector(
        '.fudis-fieldset__legend__main__text',
      ) as HTMLElement;

      expect(legendLabel.textContent).toContain('Checkbox Group test title');
    });

    it('should have correct helptext in the guidance', () => {
      const helpText = fixture.nativeElement.querySelector(
        '.fudis-guidance__help-text',
      ) as HTMLElement;

      expect(helpText.textContent).toContain('Some help text');
    });

    it('should have visible helptext set to aria-hidden true', () => {
      const helpText = fixture.nativeElement.querySelector(
        '.fudis-guidance__help-text',
      ) as HTMLElement;

      expect(helpText.getAttribute('aria-hidden')).toEqual('true');
    });

    it('should have correct helptext and aria hidden removed in the legend', () => {
      const helpText = fixture.nativeElement.querySelector(
        '.fudis-guidance__help-text',
      ) as HTMLElement;

      const groupHelpText = fixture.nativeElement.querySelector(
        '.fudis-fieldset__legend__main__group-helptext',
      ) as HTMLElement;

      expect(groupHelpText.getAttribute('aria-hidden')).toBeNull();
      expect(groupHelpText.textContent.trim()).toEqual(helpText.textContent.trim());
    });

    it('should display required text', () => {
      const requiredText = fixture.nativeElement.querySelector(
        '.fudis-fieldset__legend__main__required',
      ) as HTMLElement;

      expect(requiredText.textContent).toContain('(Required)');
    });

    it('should pass correct size values to the Fieldset', () => {
      fudisSelectionGroupInputSizeArray.forEach((size) => {
        component.size = size;
        fixture.detectChanges();

        expect(fieldsetElement.classList).toContain(`fudis-input-size__${size}`);
      });
    });

    it('should pass correct id', () => {
      component.id = 'my-custom-checkbox-group';
      fixture.detectChanges();

      expect(fieldsetElement.getAttribute('id')).toEqual('my-custom-checkbox-group');
    });

    it('should generate correct id', () => {
      expect(fieldsetElement.getAttribute('id')).toEqual('fudis-checkbox-group-1');
    });
  });

  describe('with Form Group provided', () => {
    describe('Child checkboxes', () => {
      let mockComponent: MockContainerComponent;

      beforeEach(() => {
        fixture = TestBed.createComponent(MockContainerComponent);
        mockComponent = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should not render p-tag', () => {
        const element = fixture.nativeElement.querySelector('#group-id .do-not-find-me');

        expect(element).toBeNull();
      });

      it('should have correct amount of child components', () => {
        const element: NodeList = fixture.nativeElement.querySelectorAll(
          '#group-id fudis-checkbox-group-option',
        );

        expect(element.length).toEqual(5);
      });

      it('first input should have matching aria-described-by id', () => {
        const guidance = getElement(fixture, '#group-id .fudis-guidance') as HTMLElement;
        const guidanceId = guidance.getAttribute('id');

        const element: HTMLElement[] = fixture.nativeElement.querySelectorAll(
          '#group-id fudis-checkbox-group-option .fudis-checkbox__input',
        );

        expect(element[0].getAttribute('aria-describedby')).toEqual(guidanceId);
        expect(element[1].getAttribute('aria-describedby')).toBeNull();
      });

      it('should have invalid styled child elements with invalid state, when form group is touched and should display errors', () => {
        mockComponent.testFromGroup.markAllAsTouched();

        fixture.detectChanges();

        const invalidStyledCheckboxes: NodeList = fixture.nativeElement.querySelectorAll(
          '#group-id fudis-checkbox-group-option .fudis-checkbox__content__box--invalid',
        );

        const invalidInputs: NodeList = fixture.nativeElement.querySelectorAll(
          '#group-id fudis-checkbox-group-option input[aria-invalid="true"]',
        );

        const errorMessage = fixture.nativeElement.querySelector(
          '#group-id fudis-guidance .fudis-error-message',
        ) as HTMLElement;

        expect(invalidInputs.length).toEqual(5);
        expect(invalidStyledCheckboxes.length).toEqual(5);
        expect(errorMessage.textContent).toContain('Too few selected');
      });

      it('should remove invalid state when checking one checkbox more', () => {
        mockComponent.testFromGroup.markAllAsTouched();

        fixture.detectChanges();

        const checkbox = fixture.nativeElement.querySelector(
          '#group-id fudis-checkbox-group-option',
        );

        checkbox.querySelector('input').click();

        fixture.detectChanges();

        const invalidStyledCheckboxes: NodeList = fixture.nativeElement.querySelectorAll(
          '#group-id fudis-checkbox-group-option .fudis-checkbox__content__box--invalid',
        );

        const invalidInputs: NodeList = fixture.nativeElement.querySelectorAll(
          '#group-id fudis-checkbox-group-option input[aria-invalid="true"]',
        );

        const errorMessage = fixture.nativeElement.querySelector(
          '#group-id fudis-guidance .fudis-error-message',
        );

        expect(invalidInputs.length).toEqual(0);
        expect(invalidStyledCheckboxes.length).toEqual(0);
        expect(errorMessage).toBeNull();
      });

      it('should display error, when too many selected', () => {
        mockComponent.testFromGroup.markAllAsTouched();
        const appleInput = fixture.nativeElement.querySelector('#group-id-item-1');
        const bananaInput = fixture.nativeElement.querySelector('#group-id-item-2');
        const orangeInput = fixture.nativeElement.querySelector('#group-id-item-5');

        appleInput.click();
        bananaInput.click();
        orangeInput.click();
        fixture.detectChanges();

        const invalidStyledCheckboxes: NodeList = fixture.nativeElement.querySelectorAll(
          'fudis-checkbox-group-option .fudis-checkbox__content__box--invalid',
        );

        const invalidInputs: NodeList = fixture.nativeElement.querySelectorAll(
          'fudis-checkbox-group-option input[aria-invalid="true"]',
        );

        const errorMessage = fixture.nativeElement.querySelector(
          'fudis-guidance .fudis-error-message',
        ) as HTMLElement;

        expect(invalidInputs.length).toEqual(5);
        expect(invalidStyledCheckboxes.length).toEqual(5);
        expect(errorMessage.textContent).toContain('Too many selected');
      });

      it('should emit correct object', () => {
        jest.spyOn(mockComponent, 'handleCheckboxClick');
        const checkbox = fixture.nativeElement.querySelector(
          '#group-id fudis-checkbox-group-option',
        );

        checkbox.querySelector('input').click();

        expect(mockComponent.eventReceived.changedControlName).toEqual('apple');
        expect(mockComponent.eventReceived.formGroup.controls['apple'].value).toEqual(true);
        expect(mockComponent.handleCheckboxClick).toHaveBeenCalled();
      });
    });
  });
});
