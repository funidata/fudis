import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonGroupComponent } from './radio-button-group.component';
import {
  FudisRadioButtonChangeEvent,
  FudisRadioButtonOption,
  fudisSelectionGroupInputSizeArray,
} from '../../../types/forms';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { FieldSetComponent } from '../fieldset/fieldset.component';
import { GuidanceComponent } from '../guidance/guidance.component';
import { getElement } from '../../../utilities/tests/utilities';
import { Component } from '@angular/core';
import { IconComponent } from '../../icon/icon.component';
import { ValidatorErrorMessageComponent } from '../error-message/validator-error-message/validator-error-message.component';
import { FudisValidators } from '../../../utilities/form/validators';
import { GridDirective } from '../../../directives/grid/grid/grid.directive';
import { FudisBreakpointService } from '../../../services/breakpoint/breakpoint.service';
import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';
import { FieldsetContentDirective } from '../fieldset/fieldset-content.directive';

@Component({
  standalone: false,
  selector: 'fudis-mock-component',
  template: `<fudis-radio-button-group
    [id]="'radio-button-test-group'"
    [control]="testFormControl"
    [label]="'Test label'"
    [helpText]="'Some help text'"
    (handleChange)="handleRadioButtonClick($event)"
  >
    <p class="do-not-find-me">This should not be shown</p>
    @for (option of options; track option) {
      <fudis-radio-button [label]="option.label" [value]="option.value" />
    }
  </fudis-radio-button-group>`,
})
class MockContainerComponent {
  public testFormControl: FormControl = new FormControl(
    null,
    FudisValidators.required('You must choose an animal'),
  );

  public options: FudisRadioButtonOption<object>[] = [
    { value: 'platypus', label: 'Platypus', id: 'test-1' },
    { value: 'otter', label: 'Otter', id: 'test-2' },
    { value: 'capybara', label: 'Capybara', id: 'test-3' },
  ];

  eventReceived: FudisRadioButtonChangeEvent;

  handleRadioButtonClick(event: FudisRadioButtonChangeEvent): void {
    this.eventReceived = event;
  }
}

describe('Basic inputs of Radio Button Group', () => {
  let component: RadioButtonGroupComponent;
  let fixture:
    | ComponentFixture<RadioButtonGroupComponent>
    | ComponentFixture<MockContainerComponent>;
  let fieldsetElement: HTMLFieldSetElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MockContainerComponent,
        RadioButtonGroupComponent,
        RadioButtonComponent,
        FieldSetComponent,
        FieldsetContentDirective,
        GridDirective,
        GuidanceComponent,
        ValidatorErrorMessageComponent,
      ],
      imports: [IconComponent, ReactiveFormsModule],
      providers: [FudisBreakpointService, FudisInternalErrorSummaryService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioButtonGroupComponent);
    component = fixture.componentInstance;
    component.control = new FormControl(null, FudisValidators.required('This is required field'));
    component.label = 'Radio Button Group test label';
    component.helpText = 'Some help text';
    fixture.autoDetectChanges();

    fieldsetElement = fixture.nativeElement.querySelector(
      'fudis-fieldset .fudis-fieldset',
    ) as HTMLFieldSetElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct label as legend', () => {
    const legendLabel = fixture.nativeElement.querySelector(
      '.fudis-fieldset__legend__main__text',
    ) as HTMLElement;

    expect(legendLabel.textContent).toContain('Radio Button Group test label');
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
    component.id = 'my-custom-radio-button-group';
    fixture.detectChanges();

    expect(fieldsetElement.getAttribute('id')).toEqual('my-custom-radio-button-group');
  });

  it('should generate correct id', () => {
    expect(fieldsetElement.getAttribute('id')).toEqual('fudis-radio-button-group-1');
  });

  describe('Child Radio Buttons', () => {
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
      const element: NodeList = fixture.nativeElement.querySelectorAll('fudis-radio-button');

      expect(element.length).toEqual(3);
    });

    it('should all have matching name attribute with radio button group id', () => {
      const radioGroup = getElement(fixture, 'fieldset') as HTMLElement;
      const radioGroupId = radioGroup.getAttribute('id');

      const radioButtons = fixture.debugElement.queryAll(By.css('fudis-radio-button'));
      const radioArray = [...radioButtons];

      radioArray.forEach((radio) => {
        const radioName = radio
          .query(By.css('.fudis-radio-button__input'))
          .nativeElement.getAttribute('name');
        expect(radioName).toEqual(radioGroupId);
      });
    });

    it('first input should have matching aria-described-by id', () => {
      const guidance = getElement(fixture, '.fudis-guidance') as HTMLElement;
      const guidanceId = guidance.getAttribute('id');

      const radioButtons = fixture.debugElement.queryAll(By.css('fudis-radio-button'));
      const radioArray = [...radioButtons];

      const ariaDescribedBy = radioArray[0]
        .query(By.css('.fudis-radio-button__input'))
        .nativeElement.getAttribute('aria-describedby');
      const noneExistingAriaDescribedBy = radioArray[1]
        .query(By.css('.fudis-radio-button__input'))
        .nativeElement.getAttribute('aria-describedby');

      expect(ariaDescribedBy).toEqual(guidanceId);
      expect(noneExistingAriaDescribedBy).toBeNull();
    });

    it('should have invalid styles and states, when form control is touched and should display errors', () => {
      const inputElement = getElement(fixture, 'input');
      inputElement.dispatchEvent(new FocusEvent('blur'));

      fixture.detectChanges();

      const invalidStylesRadioButtons: NodeList = fixture.nativeElement.querySelectorAll(
        'fudis-radio-button .fudis-radio-button__content__control--invalid',
      );

      const invalidInputs: NodeList = fixture.nativeElement.querySelectorAll(
        'fudis-radio-button input[aria-invalid="true"]',
      );

      const errorMessage = fixture.nativeElement.querySelector(
        'fudis-guidance .fudis-error-message',
      ) as HTMLElement;

      expect(invalidStylesRadioButtons.length).toEqual(3);
      expect(invalidInputs.length).toEqual(3);
      expect(errorMessage.textContent).toContain('You must choose an animal');
    });

    it('should emit correct object', () => {
      jest.spyOn(mockComponent, 'handleRadioButtonClick');
      const radio = fixture.nativeElement.querySelector('fudis-radio-button input');

      radio.click();
      fixture.detectChanges();

      expect(mockComponent.eventReceived.option.id).toEqual('radio-button-test-group-item-1');
      expect(mockComponent.eventReceived.option.value).toEqual('platypus');
      expect(mockComponent.handleRadioButtonClick).toHaveBeenCalled();
    });
  });
});
