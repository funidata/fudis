import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { LocalizedTextGroupComponent } from './localized-text-group.component';
import { GuidanceComponent } from '../guidance/guidance.component';
import { FudisValidators } from '../../../utilities/form/validators';
import { SelectComponent } from '../select/select/select.component';
import { getAllElements, getElement } from '../../../utilities/tests/utilities';
import { LabelComponent } from '../label/label.component';
import { SimpleChange } from '@angular/core';
import { ValidatorErrorMessageComponent } from '../error-message/validator-error-message/validator-error-message.component';
import { SelectIconsComponent } from '../select/common/select-icons/select-icons.component';
import { IconComponent } from '../../icon/icon.component';
import {
  fudisInputSizeArray,
  FudisLocalizedTextGroupDefaultFormGroup,
  FudisLocalizedTextGroupFormGroup,
  FudisLocalizedTextGroupFormGroupOptions,
} from '../../../types/forms';
import { FudisGroupValidators } from '../../../utilities/form/groupValidators';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';
import { SelectControlValueAccessorDirective } from '../select/common/select-control-value-accessor/select-control-value-accessor.directive';
import { SelectAutocompleteDirective } from '../select/common/autocomplete/autocomplete.directive';
import { SelectDropdownComponent } from '../select/common/select-dropdown/select-dropdown.component';

const values = {
  label: 'Label for testing purposes',
  helpText: 'Help text for testing purposes',
};

const controlRequired = FudisValidators.required('Required in Finnish');

const groupRequired = FudisGroupValidators.oneRequired('One required!');

const minLength = FudisValidators.minLength(5, 'Min length is 5');

const maxlength = FudisValidators.maxLength(25, 'Max length is 25');

describe('LocalizedTextGroupComponent', () => {
  let component: LocalizedTextGroupComponent<
    FudisLocalizedTextGroupFormGroup<FudisLocalizedTextGroupDefaultFormGroup>
  >;
  let fixture: ComponentFixture<
    LocalizedTextGroupComponent<
      FudisLocalizedTextGroupFormGroup<FudisLocalizedTextGroupDefaultFormGroup>
    >
  >;
  let translationService: FudisTranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LocalizedTextGroupComponent,
        LabelComponent,
        SelectComponent,
        SelectControlValueAccessorDirective,
        SelectAutocompleteDirective,
        SelectDropdownComponent,
        GuidanceComponent,
        ValidatorErrorMessageComponent,
        SelectIconsComponent,
        IconComponent,
      ],
      providers: [FudisInternalErrorSummaryService],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LocalizedTextGroupComponent);
    translationService = TestBed.inject(FudisTranslationService);
    component = fixture.componentInstance;

    const formGroup = new FormGroup<FudisLocalizedTextGroupDefaultFormGroup>({
      fi: new FormControl('', controlRequired),
      sv: new FormControl(''),
      en: new FormControl('', FudisValidators.required('Required in English')),
    });

    component.formGroup = formGroup;
    component.label = values.label;
    component.helpText = values.helpText;
    component.ngOnChanges({
      formGroup: new SimpleChange(undefined, formGroup, true),
    });

    jest.spyOn(component.handleViewInit, 'emit');

    fixture.detectChanges();
  });

  const testWithVariant = (variant: 'text-input' | 'text-area') => {
    beforeEach(() => {
      const previous = component.variant;

      component.variant = variant;
      component.ngOnChanges({
        variant: new SimpleChange(previous, variant, false),
      });

      fixture.autoDetectChanges();
    });

    describe(`basic inputs with ${variant}`, () => {
      it(`should create`, () => {
        expect(component).toBeTruthy();
      });

      it(`should have correct variant`, () => {
        const textInput = getElement(fixture, '.fudis-localized-text-group__inputs__text');

        const textArea = getElement(fixture, '.fudis-localized-text-group__inputs__area');

        expect(component.variant).toEqual(variant);

        if (variant === 'text-input') {
          expect(textInput).toBeTruthy();
          expect(textArea).toBeNull();
        } else {
          expect(textInput).toBeNull();
          expect(textArea).toBeTruthy();
        }
      });

      it(`should have correct size`, () => {
        fudisInputSizeArray.forEach((size) => {
          const wrapperElement = getElement(fixture, '.fudis-localized-text-group');

          fixture.componentRef.setInput('size', size);
          fixture.detectChanges();

          expect(wrapperElement.className).toContain(`fudis-input-size__${size}`);
        });
      });

      it(`should have correct label`, () => {
        const labelText = getElement(fixture, '.fudis-label__content__text').textContent;

        expect(labelText).toEqual(values.label);
      });

      it(`should have correct help text`, () => {
        const helpText = getElement(fixture, '.fudis-guidance__help-text').textContent;

        expect(helpText).toEqual(values.helpText);
      });

      it(`should have correct id`, () => {
        const id = getElement(
          fixture,
          `${variant === 'text-input' ? 'input' : 'textarea'}.fudis-form-input`,
        ).getAttribute('id');

        expect(id).toEqual(`fudis-localized-text-group-1`);
      });

      it(`should have correct aria-label`, () => {
        const element = getElement(
          fixture,
          `${variant === 'text-input' ? 'input' : 'textarea'}.fudis-form-input`,
        );

        expect(element.getAttribute('aria-label')).toEqual(values.label + ', FI (Missing)');
      });

      it(`should have default option in Select`, () => {
        const selectElement = (getElement(fixture, '.fudis-select__input') as HTMLInputElement)
          .value;

        expect(selectElement).toEqual('FI (Missing)');
      });

      it(`should have custom default option in Select`, () => {
        // By purpose false type casting, as it would be tedious to either make this component instance to accept two interface types or to just create another whole test component case for this single unit test. So therefore on purpose typecasting falsely to supress TS lint errors.
        const formGroupSecond = new FormGroup({
          klingon: new FormControl<string | null>(null),
          elvish: new FormControl<string | null>(null),
          dothraki: new FormControl<string | null>(null),
        }) as unknown as FormGroup<FudisLocalizedTextGroupDefaultFormGroup>;

        const optionsSecond: FudisLocalizedTextGroupFormGroupOptions[] = [
          { controlName: 'klingon', label: 'KLI' },
          { controlName: 'elvish', label: 'ELV' },
          { controlName: 'dothraki', label: 'DOT' },
        ];

        const previous = component.formGroup;
        component.formGroup = formGroupSecond;
        component.options = optionsSecond;

        component.ngOnChanges({
          formGroup: new SimpleChange(previous, formGroupSecond, false),
        });

        fixture.detectChanges();

        const selectElement = (getElement(fixture, '.fudis-select__input') as HTMLInputElement)
          .value;

        expect(selectElement).toEqual('KLI (Missing)');
      });

      it('should have correct translations', () => {
        translationService.setLanguage('fi');
        fixture.detectChanges();

        const selectElement = (getElement(fixture, '.fudis-select__input') as HTMLInputElement)
          .value;
        const requiredText = getElement(fixture, '.fudis-label__content__required').textContent;

        expect(selectElement).toEqual('FI (Puuttuu)');
        expect(requiredText).toEqual('(Pakollinen)');
      });
    });

    describe(`FormControl and Group updates with ${variant}`, () => {
      it(`should have errors visible, when touched`, () => {
        component.formGroup.markAllAsTouched();
        fixture.detectChanges();

        const errors = getAllElements(fixture, '.fudis-error-message');

        expect(errors.length).toEqual(2);

        const expectedErrors = ['Required in English', 'Required in Finnish'];

        errors.forEach((error, index) => {
          expect(error.textContent).toEqual(expectedErrors[index]);
        });
      });

      it(`should not have min or max length`, () => {
        component.formGroup.controls['fi'].removeValidators(minLength);
        component.formGroup.controls['fi'].removeValidators(maxlength);
        component.formGroup.updateValueAndValidity();
        fixture.detectChanges();
        const element = getElement(
          fixture,
          `${variant === 'text-input' ? 'input' : 'textarea'}.fudis-form-input`,
        );

        expect(element.getAttribute('minlength')).toBeNull();
        expect(element.getAttribute('maxlength')).toBeNull();
      });

      it(`should have min or max length`, () => {
        component.formGroup.controls['fi'].addValidators(minLength);
        component.formGroup.controls['fi'].addValidators(maxlength);
        component.formGroup.updateValueAndValidity();
        fixture.detectChanges();

        const element = getElement(
          fixture,
          `${variant === 'text-input' ? 'input' : 'textarea'}.fudis-form-input`,
        );

        expect(element.getAttribute('minlength')).toEqual('5');
        expect(element.getAttribute('maxlength')).toEqual('25');
      });

      it(`should have required attribute, when control is required`, () => {
        component.formGroup.controls['fi'].addValidators(controlRequired);
        component.formGroup.updateValueAndValidity();
        fixture.detectChanges();
        const element = getElement(
          fixture,
          `${variant === 'text-input' ? 'input' : 'textarea'}.fudis-form-input`,
        );

        expect(element.getAttribute('required')).toBeTruthy();
      });

      it(`should not have required attribute, when control is required`, () => {
        component.formGroup.controls['fi'].removeValidators(controlRequired);
        component.formGroup.updateValueAndValidity();
        fixture.detectChanges();

        const element = getElement(
          fixture,
          `${variant === 'text-input' ? 'input' : 'textarea'}.fudis-form-input`,
        );

        expect(element.getAttribute('required')).toBeNull();
      });

      it(`should have required attribute, when group is required`, () => {
        component.formGroup.addValidators(groupRequired);
        component.formGroup.controls['fi'].removeValidators(controlRequired);
        component.formGroup.updateValueAndValidity();
        fixture.detectChanges();

        const element = getElement(
          fixture,
          `${variant === 'text-input' ? 'input' : 'textarea'}.fudis-form-input`,
        );

        expect(element.getAttribute('required')).toBeTruthy();
      });

      it(`should not have required attribute, when group is required`, () => {
        component.formGroup.removeValidators(groupRequired);
        component.formGroup.controls['fi'].removeValidators(controlRequired);
        component.formGroup.updateValueAndValidity();
        fixture.detectChanges();

        const element = getElement(
          fixture,
          `${variant === 'text-input' ? 'input' : 'textarea'}.fudis-form-input`,
        );

        expect(element.getAttribute('required')).toBeNull();
      });

      it(`should be disabled`, () => {
        component.formGroup.disable();
        fixture.detectChanges();

        const element = getElement(
          fixture,
          `${variant === 'text-input' ? 'input' : 'textarea'}.fudis-form-input`,
        );

        expect(element.getAttribute('disabled')).toEqual('');
        expect(element.getAttribute('aria-disabled')).toBeTruthy();
        expect(element.getAttribute('readonly')).toEqual('');
      });

      it(`should not be disabled`, () => {
        const element = getElement(
          fixture,
          `${variant === 'text-input' ? 'input' : 'textarea'}.fudis-form-input`,
        );

        expect(element.getAttribute('disabled')).toBeNull();
        expect(element.getAttribute('aria-disabled')).toBeNull();
        expect(element.getAttribute('readonly')).toBeNull();
      });

      it(`should update Select menu option, when control is updated`, async () => {
        component.formGroup.controls['fi'].patchValue('Hello');

        fixture.detectChanges();

        await fixture.whenStable().then(() => {
          const selectElement = (getElement(fixture, '.fudis-select__input') as HTMLInputElement)
            .value;

          expect(selectElement).toEqual('FI');
        });
      });
    });

    describe(`output emits with ${variant}`, () => {
      it('should emit handleFocus', () => {
        jest.spyOn(component.handleFocus, 'emit');

        const focusEvent = new FocusEvent('focus');

        getElement(fixture, '.fudis-form-input').dispatchEvent(focusEvent);

        expect(component.handleFocus.emit).toHaveBeenCalledWith(focusEvent);
      });

      it('should emit handleBlur', () => {
        jest.spyOn(component.handleBlur, 'emit');

        const focusEvent = new FocusEvent('blur');

        getElement(fixture, '.fudis-form-input').dispatchEvent(focusEvent);

        expect(component.handleBlur.emit).toHaveBeenCalledWith(focusEvent);
      });

      it('should emit handleKeyUp', () => {
        jest.spyOn(component.handleKeyUp, 'emit');

        const keyEvent = new KeyboardEvent('keyup', { key: 'q' });

        getElement(fixture, '.fudis-form-input').dispatchEvent(keyEvent);

        fixture.detectChanges();

        expect(component.handleKeyUp.emit).toHaveBeenCalledWith(keyEvent);
      });

      it('should emit handleViewInit', () => {
        expect(component.handleViewInit.emit).toHaveBeenCalled();
      });
    });
  };

  describe('with text-input', () => {
    testWithVariant('text-input');
  });

  describe('with text-area', () => {
    testWithVariant('text-area');
  });

  describe('select disabling', () => {
    it('should disable and enable Select input', async () => {
      component.formGroup.disable();

      await fixture
        .whenStable()
        .then(() => {
          fixture.detectChanges();
          const selectInput = getElement(fixture, '#fudis-localized-text-group-1_language-select');

          expect(selectInput.getAttribute('tabindex')).toEqual('-1');
          expect(selectInput.getAttribute('aria-disabled')).toBeTruthy();

          component.formGroup.enable();
        })
        .finally(() => {
          fixture.detectChanges();

          const selectInput = getElement(fixture, '#fudis-localized-text-group-1_language-select');

          expect(selectInput.getAttribute('tabindex')).toBeNull();
          expect(selectInput.getAttribute('aria-disabled')).toBeNull();
        });
    });
  });
});
