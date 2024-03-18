import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { GuidanceComponent } from './guidance.component';
import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';
import { FudisIdService } from '../../../services/id/id.service';
import { ValidatorErrorMessageComponent } from '../error-message/validator-error-message/validator-error-message.component';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { IconComponent } from '../../icon/icon.component';
import { FudisValidators } from '../../../utilities/form/validators';
import { getElement, getAllElements } from '../../../utilities/tests/utilities';
import { ContentDirective } from '../../../directives/content-projection/content/content.directive';
import { MockComponent } from 'ng-mocks';
import { FudisGroupValidators } from '../../../utilities/form/groupValidators';

const testMaxLength = 20;

const testFormGroup: FormGroup = new FormGroup({
  finnish: new FormControl<string | null>(null, [
    FudisValidators.required('Missing input in Finnish.'),
    FudisValidators.maxLength(testMaxLength, 'Too long input'),
  ]),
  swedish: new FormControl<string | null>(null, [
    FudisValidators.maxLength(testMaxLength, 'Too long input'),
  ]),
  english: new FormControl<string | null>(null, [
    FudisValidators.required('Missing input in English.'),
    FudisValidators.maxLength(testMaxLength, 'Too long input'),
  ]),
});

const testFormGroupWithGroupValidator: FormGroup = new FormGroup(
  {
    finnish: new FormControl<string | null>(null),
    swedish: new FormControl<string | null>(null),
    english: new FormControl<string | null>(null),
  },
  FudisGroupValidators.atLeastOneRequired('There must be one value!'),
);

const testControl = new FormControl(null, [
  FudisValidators.required('This field is required'),
  FudisValidators.maxLength(testMaxLength, 'Too long input'),
]);

describe('GuidanceComponent', () => {
  let component: GuidanceComponent;
  let fixture: ComponentFixture<GuidanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GuidanceComponent,
        ContentDirective,
        ValidatorErrorMessageComponent,
        MockComponent(IconComponent),
      ],
      providers: [FudisInternalErrorSummaryService, FudisIdService, FudisTranslationService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidanceComponent);
    component = fixture.componentInstance;
    component.inputLabel = 'Test Label';
    component.for = 'related-input-id';
    component.formId = 'test-form-id';
    component.helpText = 'This is describing guidance text';
    component.maxLength = testMaxLength;
    component.ariaLive = 'polite';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('common properties', () => {
    it('should have id for related input with "for" attribute', () => {
      const element = getElement(fixture, '.fudis-guidance div#related-input-id_guidance');
      expect(element.getAttribute('id')).toEqual('related-input-id_guidance');
    });

    it('should show given helptext', () => {
      const element = getElement(fixture, '.fudis-guidance__help-text');
      expect(element.innerHTML).toContain('This is describing guidance text');
    });

    it('should have ariaLive assertive', () => {
      const element = getElement(fixture, '.fudis-guidance__errors__list');
      expect(element.getAttribute('arialive')).toEqual('polite');
    });
  });

  describe('with single Form Control', () => {
    beforeEach(() => {
      component.control = testControl;
      component.control.markAsUntouched();
      fixture.detectChanges();
    });

    it('should not have errors when control is untouched', () => {
      const element = getElement(fixture, '.fudis-guidance__errors');
      const error = getElement(fixture, 'fudis-validator-error-message');

      expect(error.getAttribute('ng-reflect-visible')).toEqual('false');
      expect(element).toBeNull();
    });

    it('should have errors when control is touched', () => {
      component.control.markAsTouched();
      fixture.detectChanges();
      const element = getElement(fixture, '.fudis-guidance__errors');
      const error = getElement(fixture, 'fudis-validator-error-message');

      expect(error.getAttribute('ng-reflect-visible')).toEqual('true');
      expect(element).toBeTruthy();
    });

    it('should have related input label text passed to Validator Error Message', () => {
      component.control.markAsTouched();
      fixture.detectChanges();

      const element = getElement(fixture, 'fudis-validator-error-message');
      expect(element.getAttribute('ng-reflect-label')).toEqual('Test Label');
      expect(element.getAttribute('ng-reflect-visible')).toEqual('true');
    });

    it('should show maxLength indicator', () => {
      const lengthIndicator = getElement(fixture, '.fudis-guidance__character-limit-indicator');

      expect(lengthIndicator.innerHTML).toContain('0/20');

      component.control.patchValue(
        'This is a too long input and will not pass max length validation',
      );
      fixture.detectChanges();

      expect(lengthIndicator.innerHTML).toContain('64/20');
    });

    it('should display screen reader assistive text correctly', () => {
      component.control.patchValue('Fifteen chars!!');
      fixture.detectChanges();
      const assistiveTextOn = getElement(fixture, '.fudis-visually-hidden');

      expect(assistiveTextOn.innerHTML).toContain('15/20 characters used');

      component.control.patchValue('Sixteen chars!!!');
      fixture.detectChanges();
      const assistiveTextOff = getElement(fixture, '.fudis-visually-hidden');

      expect(assistiveTextOff).toBeNull();

      component.control.patchValue('Twenty characters!!!');
      fixture.detectChanges();
      const assistiveTextFull = getElement(fixture, '.fudis-visually-hidden');

      expect(assistiveTextFull.innerHTML).toContain('20/20 characters used');
    });
  });

  describe('with Form Group', () => {
    beforeEach(() => {
      component.formId = 'some-test-id';
      component.formGroup = testFormGroup;
      component.groupBlurredOut = true;
      component.formGroup.controls['finnish'].markAsUntouched();
      component.formGroup.controls['swedish'].markAsUntouched();
      component.formGroup.controls['english'].markAsUntouched();
      component.formGroup.markAsUntouched();
      fixture.detectChanges();
    });

    describe('common tests', () => {
      it('should have correct amount of errors', () => {
        const errorListAfterTouching = getAllElements(fixture, 'fudis-validator-error-message');
        expect(errorListAfterTouching.length).toBe(2);
      });

      it('should have correct number in max length indicator when selected option is set', () => {
        component.selectedOption = 'swedish';

        fixture.detectChanges();

        component.formGroup!.controls['swedish'].patchValue(
          'This is a too long input and will not pass max length validation',
        );
        fixture.detectChanges();

        const lengthIndicator = getElement(fixture, '.fudis-guidance__character-limit-indicator');
        expect(lengthIndicator.innerHTML).toContain('64/20');
      });

      it('should display screen reader assistive text correctly', () => {
        component.formGroup!.controls['finnish'].patchValue('Fifteen chars!!');
        fixture.detectChanges();
        const assistiveTextOn = getElement(fixture, '.fudis-visually-hidden');

        expect(assistiveTextOn.innerHTML).toContain('15/20 characters used');

        component.formGroup!.controls['finnish'].patchValue('Sixteen chars!!!');
        fixture.detectChanges();
        const assistiveTextOff = getElement(fixture, '.fudis-visually-hidden');

        expect(assistiveTextOff).toBeNull();

        component.formGroup!.controls['finnish'].patchValue('Twenty characters!!!');
        fixture.detectChanges();
        const assistiveTextFull = getElement(fixture, '.fudis-visually-hidden');

        expect(assistiveTextFull.innerHTML).toContain('20/20 characters used');
      });

      it('should show errors when single form control is touched', () => {
        const errorListBefore = getAllElements(
          fixture,
          'fudis-validator-error-message[ng-reflect-visible="true"]',
        );

        expect(errorListBefore.length).toBe(0);

        component.formGroup!.controls['finnish'].markAsTouched();
        fixture.detectChanges();

        const errorList = getAllElements(
          fixture,
          'fudis-validator-error-message[ng-reflect-visible="true"]',
        );
        expect(errorList.length).toBe(2);
      });

      it('should not show errors when groupBlurred out is false', () => {
        component.groupBlurredOut = false;
        fixture.detectChanges();

        const errorList = getAllElements(
          fixture,
          'fudis-validator-error-message[ng-reflect-visible="true"]',
        );
        expect(errorList.length).toBe(0);
      });

      it('should show error list when group is marked as touched', () => {
        const errorsBefore = getElement(fixture, '.fudis-guidance__errors');

        expect(errorsBefore).toBeFalsy();

        component.formGroup!.markAsTouched();

        fixture.detectChanges();

        const errorsAfter = getElement(fixture, '.fudis-guidance__errors');

        expect(errorsAfter).toBeTruthy();
        const errorListAfterTouching = getAllElements(fixture, 'fudis-validator-error-message');
        expect(errorListAfterTouching.length).toBe(2);
      });
    });

    describe('errors for single controls inside group', () => {
      it('should hide error when required form control value is updated', () => {
        const errorList = getAllElements(fixture, 'fudis-validator-error-message');
        expect(errorList.length).toBe(2);

        component.formGroup!.controls['english'].patchValue('Some text for input');
        fixture.detectChanges();
        const errorListWithoutFinnish = getAllElements(fixture, 'fudis-validator-error-message');
        expect(errorListWithoutFinnish.length).toBe(1);
      });
    });

    describe('group errors', () => {
      beforeEach(() => {
        component.formGroup = testFormGroupWithGroupValidator;
        fixture.detectChanges();
      });
      it('should display right amount of errors', () => {
        const errorListBefore = getAllElements(fixture, 'fudis-validator-error-message');
        expect(errorListBefore.length).toBe(1);

        component.formGroup!.controls['finnish'].patchValue('Some text for input');
        fixture.detectChanges();

        const errorListWithoutFinnish = getAllElements(fixture, 'fudis-validator-error-message');
        expect(errorListWithoutFinnish.length).toBe(0);
      });
    });
  });
});
