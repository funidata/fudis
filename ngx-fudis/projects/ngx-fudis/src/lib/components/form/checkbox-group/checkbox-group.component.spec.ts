import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CheckboxGroupComponent } from './checkbox-group.component';
import { FieldSetComponent } from '../fieldset/fieldset.component';
import { FieldsetContentDirective } from '../../../directives/content-projection/fieldset/fieldset-content.directive';
import { CheckboxComponent } from './checkbox/checkbox.component';
import {
  FudisCheckboxGroupChangeEvent,
  FudisCheckboxGroupFormGroup,
  fudisInputSizeArray,
} from '../../../types/forms';
import { FudisGroupValidators } from '../../../utilities/form/groupValidators';
import { FudisBreakpointService } from '../../../services/breakpoint/breakpoint.service';
import { FudisGridService } from '../../../services/grid/grid.service';
import { GridComponent } from '../../grid/grid/grid.component';
import { GridApiDirective } from '../../../directives/grid/grid-api/grid-api.directive';
import { GridDirective } from '../../../directives/grid/grid/grid.directive';
import { IconComponent } from '../../icon/icon.component';
import { ContentDirective } from '../../../directives/content-projection/content/content.directive';
import { GuidanceComponent } from '../guidance/guidance.component';
import { ValidatorErrorMessageComponent } from '../error-message/validator-error-message/validator-error-message.component';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisFocusService } from '../../../services/focus/focus.service';
import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';
import { FudisTranslationService } from '../../../services/translation/translation.service';

const testFormGroup = new FormGroup<FudisCheckboxGroupFormGroup<object>>(
  {
    apple: new FormControl<boolean | null | undefined>(null),
    fairTradeBanana: new FormControl<boolean | null | undefined>(null),
    pear: new FormControl<boolean | null | undefined>(null),
    pineapple: new FormControl<boolean | null | undefined>(null),
    orange: new FormControl<boolean | null | undefined>(null),
  },
  [FudisGroupValidators.oneRequired(new BehaviorSubject('No fruit picked! :('))],
);

type TestOption = {
  controlName?: string;
  label: string;
  control?: FormControl<boolean | null | undefined>;
};

type TestFormGroup = {
  [key: string]: FormControl<boolean | null | undefined>;
};

@Component({
  selector: 'fudis-mock-component',
  template: ` <fudis-checkbox-group
      #firstGroup
      [id]="'first-group'"
      [formGroup]="testFromGroup"
      [label]="'With Form Group. Choose minimum of one fruit'"
      (handleChange)="handleCheckboxClick($event)"
    >
      <p class="do-not-find-me">This should not be shown</p>
      <fudis-checkbox
        *ngFor="let option of options"
        [controlName]="option.controlName"
        [label]="option.label"
      />
    </fudis-checkbox-group>
    <fudis-checkbox-group
      #secondGroup
      [id]="'second-group'"
      [label]="'Without FormGroup Choose fruits fruit'"
      (handleChange)="handleCheckboxClick($event)"
    >
      <fudis-checkbox
        *ngFor="let option of optionsWithControls"
        [controlName]="option.controlName"
        [control]="option.control"
        [label]="option.label"
      />
    </fudis-checkbox-group>`,
})
class MockContainerComponent {
  @ViewChild('firstGroup') firstGroup: CheckboxGroupComponent;
  @ViewChild('secondGroup') secondGroup: CheckboxGroupComponent;

  public testFromGroup = new FormGroup<TestFormGroup>(
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

  public optionsWithControls: TestOption[] = [
    { label: 'Apple', control: new FormControl(null) },
    { controlName: 'fairTradeBanana', label: 'Fair trade banana', control: new FormControl(null) },
    { controlName: 'pear', label: 'Pear', control: new FormControl(true) },
    { label: 'Pineapple', control: new FormControl(true) },
    { label: 'Orange', control: new FormControl(null) },
  ];

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
  let component: CheckboxGroupComponent;
  let fixture: ComponentFixture<CheckboxGroupComponent> | ComponentFixture<MockContainerComponent>;
  let fieldsetElement: HTMLFieldSetElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MockContainerComponent,
        CheckboxComponent,
        CheckboxGroupComponent,
        FieldSetComponent,
        FieldsetContentDirective,
        GridComponent,
        GridApiDirective,
        GridDirective,
        ContentDirective,
        GuidanceComponent,
        IconComponent,
        ValidatorErrorMessageComponent,
      ],
      providers: [
        FudisBreakpointService,
        FudisGridService,
        FudisIdService,
        FudisFocusService,
        FudisInternalErrorSummaryService,
        FudisTranslationService,
      ],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  describe('Basic inputs of Checkbox Group', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(CheckboxGroupComponent);
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
        '.fudis-fieldset__legend__title__text',
      ) as HTMLElement;

      expect(legendLabel.textContent).toContain('Checkbox Group test title');
    });

    it('should have correct helptext in the guidance', () => {
      const helpText = fixture.nativeElement.querySelector(
        '.fudis-guidance__help-text',
      ) as HTMLElement;

      expect(helpText.textContent).toContain('Some help text');
    });

    it('should display required text', () => {
      const requiredText = fixture.nativeElement.querySelector(
        '.fudis-fieldset__legend__title__text__required',
      ) as HTMLElement;

      expect(requiredText.textContent).toContain('(Required)');
    });

    it('should pass correct size values to the Fieldset', () => {
      fudisInputSizeArray.forEach((size) => {
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

    it('should have correct aria-describedby value', () => {
      expect(fieldsetElement.getAttribute('aria-describedby')).toEqual(
        'fudis-checkbox-group-1_guidance',
      );
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
        const element = fixture.nativeElement.querySelector('#first-group .do-not-find-me');

        expect(element).toBeNull();
      });

      it('should have correct amount of child components', () => {
        const element: NodeList = fixture.nativeElement.querySelectorAll(
          '#first-group fudis-checkbox',
        );

        expect(element.length).toEqual(5);
      });

      it('should have invalid styled child elements with invalid state, when form group is touched and should display errors', () => {
        mockComponent.testFromGroup.markAllAsTouched();

        fixture.detectChanges();

        const invalidStyledCheckboxes: NodeList = fixture.nativeElement.querySelectorAll(
          '#first-group fudis-checkbox .fudis-checkbox__content__box--invalid',
        );

        const invalidInputs: NodeList = fixture.nativeElement.querySelectorAll(
          '#first-group fudis-checkbox input[aria-invalid="true"]',
        );

        const errorMessage = fixture.nativeElement.querySelector(
          '#first-group fudis-guidance .fudis-error-message',
        ) as HTMLElement;

        expect(invalidInputs.length).toEqual(5);
        expect(invalidStyledCheckboxes.length).toEqual(5);
        expect(errorMessage.textContent).toContain('Too few selected');
      });

      it('should remove invalid state when checking one checkbox more', () => {
        mockComponent.testFromGroup.markAllAsTouched();

        fixture.detectChanges();

        const checkbox = fixture.nativeElement.querySelector('#first-group fudis-checkbox');

        checkbox.querySelector('input').click();

        fixture.detectChanges();

        const invalidStyledCheckboxes: NodeList = fixture.nativeElement.querySelectorAll(
          '#first-group fudis-checkbox .fudis-checkbox__content__box--invalid',
        );

        const invalidInputs: NodeList = fixture.nativeElement.querySelectorAll(
          '#first-group fudis-checkbox input[aria-invalid="true"]',
        );

        const errorMessage = fixture.nativeElement.querySelector(
          '#first-group fudis-guidance .fudis-error-message',
        );

        expect(invalidInputs.length).toEqual(0);
        expect(invalidStyledCheckboxes.length).toEqual(0);
        expect(errorMessage).toBeNull();
      });

      it('should display error, when too many selected', () => {
        mockComponent.testFromGroup.markAllAsTouched();
        const appleInput = fixture.nativeElement.querySelector(
          'fudis-checkbox[ng-reflect-control-name="apple"] input',
        );
        const bananaInput = fixture.nativeElement.querySelector(
          'fudis-checkbox[ng-reflect-control-name="fairTradeBanana"] input',
        );
        const orangeInput = fixture.nativeElement.querySelector(
          'fudis-checkbox[ng-reflect-control-name="orange"] input',
        );

        appleInput.click();
        bananaInput.click();
        orangeInput.click();
        fixture.detectChanges();

        const invalidStyledCheckboxes: NodeList = fixture.nativeElement.querySelectorAll(
          'fudis-checkbox .fudis-checkbox__content__box--invalid',
        );

        const invalidInputs: NodeList = fixture.nativeElement.querySelectorAll(
          'fudis-checkbox input[aria-invalid="true"]',
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
        const checkbox = fixture.nativeElement.querySelector('#first-group fudis-checkbox');

        checkbox.querySelector('input').click();

        expect(mockComponent.eventReceived.changedControlName).toEqual('apple');
        expect(mockComponent.eventReceived.formGroup.controls['apple'].value).toEqual(true);
        expect(mockComponent.handleCheckboxClick).toHaveBeenCalled();
      });
    });
  });

  describe('without Form Group provided', () => {
    describe('Child checkboxes', () => {
      let mockComponent: MockContainerComponent;

      beforeEach(() => {
        fixture = TestBed.createComponent(MockContainerComponent);
        mockComponent = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should have correct amount of child components', () => {
        const element: NodeList = fixture.nativeElement.querySelectorAll(
          '#second-group fudis-checkbox',
        );

        expect(element.length).toEqual(5);
      });

      it('should emit correct object', () => {
        jest.spyOn(mockComponent, 'handleCheckboxClick');
        const checkbox = fixture.nativeElement.querySelector('#second-group fudis-checkbox input');

        checkbox.click();
        fixture.detectChanges();

        expect(mockComponent.eventReceived.changedControlName).toEqual('second-group-item-1');
        expect(mockComponent.eventReceived.formGroup.controls['fairTradeBanana'].value).toEqual(
          null,
        );
        expect(mockComponent.eventReceived.formGroup.controls['pear'].value).toEqual(true);
        expect(mockComponent.eventReceived.formGroup.controls['second-group-item-4'].value).toEqual(
          true,
        );
        expect(mockComponent.eventReceived.formGroup.controls['second-group-item-5'].value).toEqual(
          null,
        );
        expect(mockComponent.handleCheckboxClick).toHaveBeenCalled();
      });

      it('should have correct internal form group, if one option is destroyed', () => {
        const checkbox = fixture.nativeElement.querySelector('#second-group fudis-checkbox input');

        checkbox.click();
        fixture.detectChanges();

        const controlsBeforeTarget: string[] = [
          'second-group-item-1',
          'fairTradeBanana',
          'pear',
          'second-group-item-4',
          'second-group-item-5',
        ];

        const controlsAfterTarget: string[] = [
          'second-group-item-1',
          'fairTradeBanana',
          'second-group-item-5',
        ];

        const controlsBefore: string[] = Object.keys(
          mockComponent.secondGroup.formGroup.controls,
        ).filter((item) => {
          return item;
        });

        expect(controlsBefore).toEqual(controlsBeforeTarget);

        mockComponent.optionsWithControls.splice(2, 2);

        fixture.detectChanges();

        const controlsAfter: string[] = Object.keys(
          mockComponent.secondGroup.formGroup.controls,
        ).filter((item) => {
          return item;
        });

        expect(controlsAfter).toEqual(controlsAfterTarget);
      });
    });
  });
});
