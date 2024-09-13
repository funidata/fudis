import { TestBed } from '@angular/core/testing';
import { ControlComponentBaseDirective } from './control-component-base.directive';
import { FudisIdService } from '../../../services/id/id.service';
import { ChangeDetectorRef } from '@angular/core';

describe('ControlComponentBaseDirective', () => {
  let idService: FudisIdService;
  let cdr: ChangeDetectorRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [FudisIdService, ChangeDetectorRef],
      imports: [],
    });

    idService = TestBed.inject(FudisIdService);
    cdr = TestBed.inject(ChangeDetectorRef);
  });

  it('should create an instance', () => {
    TestBed.runInInjectionContext(() => {
      const directive = new ControlComponentBaseDirective(idService, cdr);
      expect(directive).toBeTruthy();
    });
  });
});

// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FudisIdService } from '../../../services/id/id.service';
// import { FudisTranslationService } from '../../../services/translation/translation.service';
// import { InputBaseDirective } from './input-base.directive';
// import { ChangeDetectorRef, Component } from '@angular/core';
// import { FormControl, ReactiveFormsModule } from '@angular/forms';
// import { GuidanceComponent } from '../../../components/form/guidance/guidance.component';
// import { getElement } from '../../../utilities/tests/utilities';
// import { TextInputComponent } from '../../../components/form/text-input/text-input.component';
// import { ValidatorErrorMessageComponent } from '../../../components/form/error-message/validator-error-message/validator-error-message.component';
// import { LabelComponent } from '../../../components/form/label/label.component';
// import { FudisValidators } from '../../../utilities/form/validators';
// import { IconComponent } from '../../../components/icon/icon.component';

// @Component({
//   selector: 'fudis-mock-text-input-component',
//   template: ` <fudis-text-input
//     [label]="label"
//     [helpText]="helpText"
//     [disabled]="disabled"
//     [invalidState]="invalidState"
//     [control]="textInputControl"
//     [disableGuidance]="disableGuidance"
//     [initialFocus]="initialFocus"
//     [ariaLabel]="ariaLabel"
//     (handleViewInit)="handleViewInit()"
//   />`,
// })
// class MockTextInputComponent {
//   label = 'This is text-input label';
//   helpText = 'Here are some advices';
//   ariaLabel = 'More info in this aria-label';
//   disabled = false;
//   invalidState = false;
//   disableGuidance = false;
//   initialFocus = false;

//   viewInitDone = false;

//   textInputControl = new FormControl<string | null | number>(
//     null,
//     FudisValidators.required('This is required field'),
//   );

//   handleViewInit(): void {
//     this.viewInitDone = true;
//   }
// }

// describe('InputBaseDirective', () => {
//   let idService: FudisIdService;
//   let changeDetectorRef: ChangeDetectorRef;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         IconComponent,
//         GuidanceComponent,
//         LabelComponent,
//         MockTextInputComponent,
//         TextInputComponent,
//         ValidatorErrorMessageComponent,
//       ],
//       providers: [FudisIdService, FudisTranslationService, ChangeDetectorRef],
//       imports: [ReactiveFormsModule],
//     });

//     idService = TestBed.inject(FudisIdService);
//     changeDetectorRef = TestBed.inject(ChangeDetectorRef);
//   });

//   describe('Directive', () => {
//     it('should create an instance', () => {
//       TestBed.runInInjectionContext(() => {
//         const directive: InputBaseDirective = new InputBaseDirective(idService, changeDetectorRef);

//         expect(directive).toBeTruthy();
//       });
//     });

//     it('should emit blur event', () => {
//       TestBed.runInInjectionContext(() => {
//         const directive: InputBaseDirective = new InputBaseDirective(idService, changeDetectorRef);
//         const event = new FocusEvent('blur');

//         jest.spyOn(directive.handleBlur, 'emit');
//         directive.onBlur(event);

//         expect(directive.handleBlur.emit).toHaveBeenCalled();
//       });
//     });



//   describe('Input values', () => {
//     let componentMock: MockTextInputComponent;
//     let fixtureMock: ComponentFixture<MockTextInputComponent>;

//     beforeEach(() => {
//       fixtureMock = TestBed.createComponent(MockTextInputComponent);
//       componentMock = fixtureMock.componentInstance;
//       fixtureMock.autoDetectChanges();
//     });

//     it('should call afterViewInit output', () => {
//       expect(componentMock.viewInitDone).toEqual(true);
//     });

//     it('should have label with required indicator', () => {
//       const labelElement = getElement(fixtureMock, '.fudis-label__content__text');
//       const requiredIndicator = getElement(fixtureMock, '.fudis-label__content__required');

//       expect(labelElement.textContent).toEqual('This is text-input label');
//       expect(requiredIndicator.textContent).toEqual('(Required)');
//     });

//     it('should have id constructed through Fudis id service', () => {
//       const labelElement = getElement(fixtureMock, '.fudis-label');

//       expect(labelElement.id).toEqual('fudis-text-input-1-label');
//     });

//     it('should be disabled with respective CSS class and aria-attribute', () => {
//       componentMock.disabled = true;
//       fixtureMock.autoDetectChanges();

//       const disabledInput = getElement(fixtureMock, 'input');
//       const inputAriaAttribute = !!disabledInput.getAttribute('aria-disabled');

//       expect(inputAriaAttribute).toEqual(true);
//     });

//     it('should be invalid with respective CSS class and aria-attribute', () => {
//       componentMock.invalidState = true;
//       componentMock.textInputControl.markAllAsTouched();
//       fixtureMock.autoDetectChanges();

//       const invalidInput = getElement(fixtureMock, 'input');
//       const inputAriaAttribute = !!invalidInput.getAttribute('aria-invalid');

//       expect(inputAriaAttribute).toEqual(true);
//     });

//     it('should have guidance with correct id', () => {
//       const guidanceElement = getElement(fixtureMock, 'fudis-guidance .fudis-guidance div');

//       expect(guidanceElement).toBeTruthy();
//       expect(guidanceElement.id).toEqual('fudis-text-input-1_guidance');
//     });

//     it('should have correct helpText in guidance', () => {
//       const helpText = getElement(fixtureMock, '.fudis-guidance__help-text');

//       expect(helpText.textContent).toContain('Here are some advices');
//     });

//     it('should have correct aria-label', () => {
//       const textInputAriaLabel = getElement(
//         fixtureMock,
//         'fudis-text-input .fudis-text-input__input',
//       );

//       expect(textInputAriaLabel.getAttribute('aria-label')).toEqual('More info in this aria-label');
//     });

//     it('should not have guidance present if disableGuidance is set', () => {
//       componentMock.disableGuidance = true;
//       fixtureMock.autoDetectChanges();

//       const guidanceElement = getElement(fixtureMock, 'fudis-guidance');

//       expect(guidanceElement).toBeFalsy();
//     });

//     it('should have ng-reflect if initialFocus is set', () => {
//       componentMock.initialFocus = true;
//       fixtureMock.autoDetectChanges();

//       const textInputElement = getElement(fixtureMock, 'fudis-text-input');
//       const textInputAttribute = !!textInputElement.getAttribute('ng-reflect-initial-focus');

//       expect(textInputAttribute).toEqual(true);
//     });
//   });
// });
