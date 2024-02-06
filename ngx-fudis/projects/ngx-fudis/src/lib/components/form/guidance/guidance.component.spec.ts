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
    component.helpText = 'This is describing guidance text';
    component.maxLength = testMaxLength;
    component.ariaLive = 'polite';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Guidance component with single control', () => {
    beforeEach(() => {
      component.control = testControl;
      component.control.markAsUntouched();
      fixture.detectChanges();
    });

    it('should have id for related input', () => {
      const element = getElement(fixture, '.fudis-guidance div');
      expect(element.getAttribute('id')).toEqual('related-input-id_guidance');
    });

    it('should have related input label text', () => {
      component.control.markAsTouched();
      fixture.detectChanges();

      const element = getElement(fixture, 'fudis-validator-error-message');
      expect(element.getAttribute('ng-reflect-label')).toEqual('Test Label');
    });

    it('should show given helptext', () => {
      const element = getElement(fixture, '.fudis-guidance__help-text');
      expect(element.innerHTML).toContain('This is describing guidance text');
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

    it('should have ariaLive assertive', () => {
      const element = getElement(fixture, '.fudis-guidance__errors__list');
      expect(element.getAttribute('arialive')).toEqual('polite');
    });
  });

  describe('Guidance component with form group', () => {
    beforeEach(() => {
      component.formGroup = testFormGroup;
      testFormGroup.markAsUntouched();
      fixture.detectChanges();
    });

    it('should have correct number in max Length indicator when selected option is set', () => {
      component.selectedOption = 'swedish';

      fixture.detectChanges();

      component.formGroup.controls['swedish'].patchValue(
        'This is a too long input and will not pass max length validation',
      );
      fixture.detectChanges();

      const lengthIndicator = getElement(fixture, '.fudis-guidance__character-limit-indicator');
      expect(lengthIndicator.innerHTML).toContain('64/20');
    });

    it('should show errors when form control is touched', () => {
      component.formGroup.controls['finnish'].markAsTouched();
      const errorList = getAllElements(fixture, 'fudis-validator-error-message');
      expect(errorList.length).toBe(3);
    });

    it('should hide error when required form control value is updated', () => {
      const errorList = getAllElements(fixture, 'fudis-validator-error-message');
      expect(errorList.length).toBe(3);

      component.formGroup.controls['finnish'].patchValue('Some text for input');
      fixture.detectChanges();

      const errorListWithoutFinnish = getAllElements(fixture, 'fudis-validator-error-message');

      expect(errorListWithoutFinnish.length).toBe(2);
    });

    it('should not show errors when groupBlurred out is set to ', () => {
      component.groupBlurredOut = false;
      fixture.detectChanges();

      const errorList = getAllElements(fixture, 'fudis-validator-error-message');
      expect(errorList.length).toBe(0);
    });
  });
});
