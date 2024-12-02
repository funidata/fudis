import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonGroupComponent } from './radio-button-group.component';
import {
  FudisRadioButtonChangeEvent,
  FudisRadioButtonOption,
  fudisInputSizeArray,
} from '../../../types/forms';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { FieldSetComponent } from '../fieldset/fieldset.component';
import { GuidanceComponent } from '../guidance/guidance.component';
import { getElement } from '../../../utilities/tests/utilities';
import { Component } from '@angular/core';
import { ContentDirective } from '../../../directives/content-projection/content/content.directive';
import { IconComponent } from '../../icon/icon.component';
import { ValidatorErrorMessageComponent } from '../error-message/validator-error-message/validator-error-message.component';
import { FudisValidators } from '../../../utilities/form/validators';
import { GridDirective } from '../../../directives/grid/grid/grid.directive';
import { FudisBreakpointService } from '../../../services/breakpoint/breakpoint.service';
import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FieldsetContentDirective } from '../../../directives/content-projection/fieldset/fieldset-content.directive';

@Component({
  selector: 'fudis-mock-component',
  template: `<fudis-radio-button-group
    [id]="'radio-button-test-group'"
    [control]="testFormControl"
    [label]="'Test label'"
    [helpText]="'Some help text'"
    (handleChange)="handleRadioButtonClick($event)"
  >
    <p class="do-not-find-me">This should not be shown</p>
    <fudis-radio-button
      *ngFor="let option of options"
      [label]="option.label"
      [value]="option.value"
    />
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
        ContentDirective,
        IconComponent,
        ValidatorErrorMessageComponent,
      ],
      providers: [FudisBreakpointService, FudisInternalErrorSummaryService],
      imports: [ReactiveFormsModule],
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
      '.fudis-fieldset__legend__title__text',
    ) as HTMLElement;

    expect(legendLabel.textContent).toContain('Radio Button Group test label');
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
    component.id = 'my-custom-radio-button-group';
    fixture.detectChanges();

    expect(fieldsetElement.getAttribute('id')).toEqual('my-custom-radio-button-group');
  });

  it('should generate correct id', () => {
    expect(fieldsetElement.getAttribute('id')).toEqual('fudis-radio-button-group-1');
  });

  it('should have correct aria-describedby value', () => {
    expect(fieldsetElement.getAttribute('aria-describedby')).toEqual(
      'fudis-radio-button-group-1_guidance',
    );
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
          .nativeElement.getAttribute('ng-reflect-name');
        expect(radioName).toEqual(radioGroupId);
      });
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
