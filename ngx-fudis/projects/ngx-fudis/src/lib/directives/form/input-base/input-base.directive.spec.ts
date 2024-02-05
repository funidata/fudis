import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { InputBaseDirective } from './input-base.directive';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GuidanceComponent } from '../../../components/form/guidance/guidance.component';
import { getElement } from '../../../utilities/tests/utilities';
import { TextInputComponent } from '../../../components/form/text-input/text-input.component';
import { ValidatorErrorMessageComponent } from '../../../components/form/error-message/validator-error-message/validator-error-message.component';
import { LabelComponent } from '../../../components/form/label/label.component';

@Component({
  selector: 'fudis-mock-text-input-component',
  template: ` <fudis-text-input
    #inputRef
    [label]="label"
    [helpText]="helpText"
    [required]="required"
    [disabled]="disabled"
    [invalidState]="invalidState"
    [control]="textInputControl"
    [disableGuidance]="disableGuidance"
    [initialFocus]="initialFocus"
  />`,
})
class MockTextInputComponent {
  constructor(
    private _idService: FudisIdService,
    private _translationService: FudisTranslationService,
  ) {}

  label = 'This is text-input label';
  helpText = 'Here are some advices';
  required = false;
  disabled = false;
  invalidState = false;
  disableGuidance = false;
  initialFocus = false;

  textInputControl = new FormControl<string | null | number>(null);
}

describe('InputBaseDirective', () => {
  let idService: FudisIdService;
  let translationService: FudisTranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        GuidanceComponent,
        LabelComponent,
        MockTextInputComponent,
        TextInputComponent,
        ValidatorErrorMessageComponent,
      ],
      providers: [FudisIdService, FudisTranslationService],
      imports: [ReactiveFormsModule],
    });

    idService = TestBed.inject(FudisIdService);
    translationService = TestBed.inject(FudisTranslationService);
  });

  describe('Directive', () => {
    it('should create an instance', () => {
      TestBed.runInInjectionContext(() => {
        const directive: InputBaseDirective = new InputBaseDirective(translationService, idService);

        expect(directive).toBeTruthy();
      });
    });

    it('should emit blur event', () => {
      TestBed.runInInjectionContext(() => {
        const directive: InputBaseDirective = new InputBaseDirective(translationService, idService);
        const event = new FocusEvent('blur');

        jest.spyOn(directive.handleBlur, 'emit');
        directive.onBlur(event);

        expect(directive.handleBlur.emit).toHaveBeenCalled();
      });
    });

    it('should call focusToInput', () => {
      TestBed.runInInjectionContext(() => {
        const directive: InputBaseDirective = new InputBaseDirective(translationService, idService);

        jest.spyOn(directive, 'focusToInput').mockImplementation(() => {});
        directive.focusToInput();

        expect(directive.focusToInput).toHaveBeenCalled();
      });
    });
  });

  describe('Input values', () => {
    let componentMock: MockTextInputComponent;
    let fixtureMock: ComponentFixture<MockTextInputComponent>;

    beforeEach(() => {
      fixtureMock = TestBed.createComponent(MockTextInputComponent);
      componentMock = fixtureMock.componentInstance;
      fixtureMock.detectChanges();
    });

    it('should have label with required indicator', () => {
      componentMock.required = true;
      fixtureMock.detectChanges();

      const labelElement = getElement(fixtureMock, '.fudis-label__content__text');
      const requiredIndicator = getElement(fixtureMock, '.fudis-label__content__required');

      expect(labelElement.textContent).toEqual('This is text-input label');
      expect(requiredIndicator.textContent).toEqual('(Required)');
    });

    it('should have id constructed through Fudis id service', () => {
      const labelElement = getElement(fixtureMock, '.fudis-label');

      expect(labelElement.id).toEqual('fudis-text-input-1-label');
    });

    it('should be disabled with respective CSS class and aria-attribute', () => {
      componentMock.disabled = true;
      fixtureMock.detectChanges();

      const disabledInput = getElement(fixtureMock, 'input');
      const inputAriaAttribute = !!disabledInput.getAttribute('aria-disabled');

      expect(disabledInput.className).toContain('fudis-form-input--disabled');
      expect(inputAriaAttribute).toEqual(true);
    });

    it('should be invalid with respective CSS class and aria-attribute', () => {
      componentMock.invalidState = true;
      componentMock.textInputControl.markAllAsTouched();
      fixtureMock.detectChanges();

      const invalidInput = getElement(fixtureMock, 'input');
      const inputAriaAttribute = !!invalidInput.getAttribute('aria-invalid');

      expect(invalidInput.className).toContain('fudis-form-input--invalid');
      expect(inputAriaAttribute).toEqual(true);
    });

    it('should have guidance with correct id', () => {
      const guidanceElement = getElement(fixtureMock, 'fudis-guidance .fudis-guidance div');

      expect(guidanceElement).toBeTruthy();
      expect(guidanceElement.id).toEqual('fudis-text-input-1_guidance');
    });

    it('should have correct helpText in guidance', () => {
      const helpText = getElement(fixtureMock, '.fudis-guidance__help-text');

      expect(helpText.textContent).toContain('Here are some advices');
    });

    it('should not have guidance present if disableGuidance is set', () => {
      componentMock.disableGuidance = true;
      fixtureMock.detectChanges();

      const guidanceElement = getElement(fixtureMock, 'fudis-guidance');

      expect(guidanceElement).toBeFalsy();
    });

    it('should have ng-reflect if initialFocus is set', () => {
      componentMock.initialFocus = true;
      fixtureMock.detectChanges();

      const textInputElement = getElement(fixtureMock, 'fudis-text-input');
      const textInputAttribute = !!textInputElement.getAttribute('ng-reflect-initial-focus');

      expect(textInputAttribute).toEqual(true);
    });
  });
});
