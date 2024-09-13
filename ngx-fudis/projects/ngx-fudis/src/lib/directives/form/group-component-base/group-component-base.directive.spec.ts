import { ChangeDetectorRef } from '@angular/core';
import { FudisIdService } from '../../../services/id/id.service';
import { GroupComponentBaseDirective } from './group-component-base.directive';
import { TestBed } from '@angular/core/testing';

describe('GroupComponentBaseDirective', () => {
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
      const directive = new GroupComponentBaseDirective(idService, cdr);
      expect(directive).toBeTruthy();
    });
  });
});

// @Component({
//   selector: 'fudis-mock-checkbox-group-component',
//   template: ` <fudis-checkbox-group
//     [label]="label"
//     [helpText]="helpText"
//     [formGroup]="_checkboxFormGroup"
//   >
//     <fudis-checkbox
//       *ngFor="let option of _checkboxOptions"
//       [controlName]="option.controlName"
//       [label]="option.label"
//     />
//   </fudis-checkbox-group>`,
// })
// class MockCheckboxGroupComponent {
//   label = 'This is checkbox group';
//   helpText = 'Here are some advices';

//   private _checkboxOptions: FudisCheckboxOption<object>[] = [
//     { controlName: 'blueberry', label: 'blueberry' },
//     { controlName: 'cloudberry', label: 'cloudberry' },
//   ];

//   private _checkboxFormGroup = new FormGroup(
//     {
//       blueberry: new FormControl<FudisCheckboxOption<object> | null>(null),
//       cloudberry: new FormControl<FudisCheckboxOption<object> | null>(null),
//     },
//     FudisGroupValidators.atLeastOneRequired('Choose at least one berry'),
//   );
// }

// describe('FieldSetBaseDirective', () => {
//   let idService: FudisIdService;
//   let translationService: FudisTranslationService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         ContentDirective,
//         CheckboxComponent,
//         CheckboxGroupComponent,
//         FieldSetBaseDirective,
//         FieldSetComponent,
//         GuidanceComponent,
//         ValidatorErrorMessageComponent,
//         GridDirective,
//         MockCheckboxGroupComponent,
//         TooltipApiDirective,
//       ],
//       providers: [
//         FudisIdService,
//         FudisTranslationService,
//         FudisBreakpointService,
//         FudisGridService,
//       ],
//       imports: [ReactiveFormsModule],
//     });

//     idService = TestBed.inject(FudisIdService);
//     translationService = TestBed.inject(FudisTranslationService);
//   });

//   it('should create an instance', () => {
//     TestBed.runInInjectionContext(() => {
//       const directive: FieldSetBaseDirective = new FieldSetBaseDirective(
//         idService,
//         translationService,
//       );

//       expect(directive).toBeTruthy();
//     });
//   });

//   describe('Input values', () => {
//     let fixtureMock: ComponentFixture<MockCheckboxGroupComponent>;

//     beforeEach(() => {
//       fixtureMock = TestBed.createComponent(MockCheckboxGroupComponent);
//       fixtureMock.autoDetectChanges();
//     });

//     it('should have label', () => {
//       const labelElement = getElement(fixtureMock, '.fudis-fieldset__legend__title__text');

//       expect(labelElement.textContent).toEqual('This is checkbox group (Required)');
//     });

//     it('should have id constructed through Fudis id service', () => {
//       const fieldSetElement = getElement(fixtureMock, 'fieldset');

//       expect(fieldSetElement.id).toEqual('fudis-checkbox-group-1');
//     });

//     it('should have guidance with correct id', () => {
//       const guidanceElement = getElement(fixtureMock, 'fudis-guidance .fudis-guidance div');

//       expect(guidanceElement.id).toEqual('fudis-checkbox-group-1_guidance');
//     });

//     it('should have correct helpText in guidance', () => {
//       const helpText = getElement(fixtureMock, '.fudis-guidance__help-text');

//       expect(helpText.textContent).toContain('Here are some advices');
//     });
//   });
// });
