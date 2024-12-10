import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { RadioButtonComponent } from './radio-button.component';
import { RadioButtonGroupComponent } from '../radio-button-group.component';
import { FudisRadioButtonChangeEvent, FudisRadioButtonOption } from '../../../../types/forms';
import { FieldSetComponent } from '../../fieldset/fieldset.component';
import { GridDirective } from '../../../../directives/grid/grid/grid.directive';
import { GridApiDirective } from '../../../../directives/grid/grid-api/grid-api.directive';
import { FudisBreakpointService } from '../../../../services/breakpoint/breakpoint.service';
import { GridComponent } from '../../../grid/grid/grid.component';
import { IconComponent } from '../../../icon/icon.component';
import { ValidatorErrorMessageComponent } from '../../error-message/validator-error-message/validator-error-message.component';
import { GuidanceComponent } from '../../guidance/guidance.component';
import { FudisValidators } from '../../../../utilities/form/validators';
import { By } from '@angular/platform-browser';
import { getElement } from '../../../../utilities/tests/utilities';
import { FudisInternalErrorSummaryService } from '../../../../services/form/error-summary/internal-error-summary.service';
import { FieldsetContentDirective } from '../../fieldset/fieldset-content.directive';

@Component({
  selector: 'fudis-mock-component',
  template: `<fudis-radio-button-group
    [id]="'radio-button-test-group'"
    [label]="'Choose a pet'"
    [control]="testControl"
  >
    <fudis-radio-button
      *ngFor="let option of _options"
      [label]="option.label"
      [value]="option.value"
    />
  </fudis-radio-button-group>`,
})
class MockComponent {
  public testControl: FormControl = new FormControl(
    null,
    FudisValidators.required('You must choose an animal'),
  );

  public _options: FudisRadioButtonOption<object>[] = [
    { value: 'platypus', label: 'Platypus' },
    { value: 'otter', label: 'Otter' },
    { value: 'capybara', label: 'Capybara' },
  ];
}

describe('RadioButtonComponent', () => {
  let fixture: ComponentFixture<MockComponent> | ComponentFixture<RadioButtonComponent>;
  let component: MockComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MockComponent,
        RadioButtonComponent,
        RadioButtonGroupComponent,
        FieldSetComponent,
        FieldsetContentDirective,
        GridComponent,
        GridApiDirective,
        GridDirective,
        GuidanceComponent,
        IconComponent,
        ValidatorErrorMessageComponent,
      ],
      providers: [FudisBreakpointService, FudisInternalErrorSummaryService],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('Basic inputs and styles', () => {
    it('should have correct label', () => {
      const radioButton = fixture.nativeElement.querySelector(
        '#radio-button-test-group [ng-reflect-value="capybara"]',
      );

      const label = radioButton.querySelector('.fudis-radio-button__label') as HTMLElement;

      expect(label.textContent).toEqual('Capybara');
    });

    it('should have indicator class if radio button is checked', () => {
      const input: HTMLInputElement = fixture.nativeElement.querySelector(
        'fudis-radio-button input',
      );

      input.click();

      fixture.detectChanges();

      const indicator = fixture.nativeElement.querySelector(
        '.fudis-radio-button__content__control__indicator',
      );

      expect(indicator).toBeTruthy();
    });

    it('should have proper CSS classes before and after when input is focused', () => {
      const input: HTMLInputElement = fixture.nativeElement.querySelector(
        'fudis-radio-button input',
      );

      const radioCircle = fixture.nativeElement.querySelector(
        '.fudis-radio-button__content__control',
      );

      input.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      expect(radioCircle.className).toEqual(
        'fudis-radio-button__content__control fudis-radio-button__content__control--invalid',
      );

      input.click();
      fixture.detectChanges();

      expect(radioCircle.className).toEqual('fudis-radio-button__content__control');
    });
  });

  describe('Interaction and logic when clicking', () => {
    it('should have correct value and emit handleChange() when clicking component', () => {
      const radioButtonComponentToSpy = fixture.debugElement.query(
        By.directive(RadioButtonComponent),
      ).componentInstance;

      const optionToMatch: FudisRadioButtonOption<object> = {
        id: 'radio-button-test-group-item-1',
        value: 'platypus',
        label: 'Platypus',
      };

      let handleChangeTriggered = false;

      radioButtonComponentToSpy.handleChange.subscribe((value: FudisRadioButtonChangeEvent) => {
        if (value) {
          handleChangeTriggered = true;
          expect(value.option).toEqual(optionToMatch);
          expect(value.control.value).toEqual('platypus');
        }
      });

      const input = getElement(fixture, 'input#radio-button-test-group-item-1') as HTMLInputElement;

      input.dispatchEvent(new MouseEvent('click'));

      expect(component.testControl.value).toEqual('platypus');

      expect(handleChangeTriggered).toBeTruthy();
    });
  });
});
