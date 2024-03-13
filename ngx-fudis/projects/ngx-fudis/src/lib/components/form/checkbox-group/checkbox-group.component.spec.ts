import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CheckboxGroupComponent } from './checkbox-group.component';
import { FieldSetComponent } from '../fieldset/fieldset.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { FudisCheckboxGroupFormGroup } from '../../../types/forms';
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

const testFormGroup = new FormGroup<FudisCheckboxGroupFormGroup>(
  {
    apple: new FormControl<boolean | null | undefined>(null),
    fairTradeBanana: new FormControl<boolean | null | undefined>(null),
    pear: new FormControl<boolean | null | undefined>(null),
    pineapple: new FormControl<boolean | null | undefined>(null),
    orange: new FormControl<boolean | null | undefined>(null),
  },
  [FudisGroupValidators.atLeastOneRequired(new BehaviorSubject('No fruit picked! :('))],
);

@Component({
  selector: 'fudis-mock-component',
  template: `<fudis-checkbox-group
    [formGroup]="testFromGroup"
    [label]="'Choose minimum of one fruit'"
  >
    <p class="do-not-find-me">This should not be shown</p>
    <fudis-checkbox
      *ngFor="let option of options"
      [controlName]="option.controlName"
      [label]="option.label"
    />
  </fudis-checkbox-group>`,
})
class MockContainerComponent {
  public testFromGroup = new FormGroup<FudisCheckboxGroupFormGroup>(
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

  public options = [
    { controlName: 'apple', label: 'Apple' },
    { controlName: 'fairTradeBanana', label: 'Fair trade banana' },
    { controlName: 'pear', label: 'Pear' },
    { controlName: 'pineapple', label: 'Pineapple' },
    { controlName: 'orange', label: 'Orange' },
  ];
}

//TODO: Should write test for size, id, setGroupBlurredOut.

describe('CheckboxGroupComponent', () => {
  let component: CheckboxGroupComponent;

  let fixture: ComponentFixture<CheckboxGroupComponent> | ComponentFixture<MockContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CheckboxComponent,
        MockContainerComponent,
        CheckboxGroupComponent,
        FieldSetComponent,
        GridComponent,
        GridApiDirective,
        GridDirective,
        ContentDirective,
        GuidanceComponent,
        IconComponent,
        ValidatorErrorMessageComponent,
      ],
      providers: [FudisBreakpointService, FudisGridService],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  describe('Basic inputs', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(CheckboxGroupComponent);
      component = fixture.componentInstance;
      component.formGroup = testFormGroup;
      component.label = 'Checkbox Group test title';
      component.helpText = 'Some help text';

      fixture.detectChanges();
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
      component.ngOnChanges();
      fixture.detectChanges();

      const requiredText = fixture.nativeElement.querySelector(
        '.fudis-fieldset__legend__title__text__required',
      ) as HTMLElement;

      expect(requiredText.textContent).toContain('(Required)');
    });
  });

  describe('Child checkboxes', () => {
    let mockComponent: MockContainerComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(MockContainerComponent);
      mockComponent = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should not render p-tag', () => {
      const element = fixture.nativeElement.querySelector('.do-not-find-me');

      expect(element).toBeNull();
    });

    it('should have correct amount of child components', () => {
      const element: NodeList = fixture.nativeElement.querySelectorAll('fudis-checkbox');

      expect(element.length).toEqual(5);
    });

    it('should have invalid styled child elements with invalid state, when form group is touched and should display errors', () => {
      mockComponent.testFromGroup.markAllAsTouched();

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
      expect(errorMessage.textContent).toContain('Too few selected');
    });

    it('should remove invalid state when checking one checkbox more', () => {
      mockComponent.testFromGroup.markAllAsTouched();

      fixture.detectChanges();

      const checkbox = fixture.nativeElement.querySelector('fudis-checkbox');

      checkbox.querySelector('input').click();

      fixture.detectChanges();

      const invalidStyledCheckboxes: NodeList = fixture.nativeElement.querySelectorAll(
        'fudis-checkbox .fudis-checkbox__content__box--invalid',
      );

      const invalidInputs: NodeList = fixture.nativeElement.querySelectorAll(
        'fudis-checkbox input[aria-invalid="true"]',
      );

      const errorMessage = fixture.nativeElement.querySelector(
        'fudis-guidance .fudis-error-message',
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
  });
});
