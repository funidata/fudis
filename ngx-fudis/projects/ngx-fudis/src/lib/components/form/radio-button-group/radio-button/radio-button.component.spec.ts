import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { FudisTranslationService } from '../../../../services/translation/translation.service';
import { RadioButtonComponent } from './radio-button.component';
import { FudisIdService } from '../../../../services/id/id.service';
import { RadioButtonGroupComponent } from '../radio-button-group.component';
import { FudisRadioButtonOption } from '../../../../types/forms';
import { FieldSetComponent } from '../../fieldset/fieldset.component';
import { ContentDirective } from '../../../../directives/content-projection/content/content.directive';
import { GridDirective } from '../../../../directives/grid/grid/grid.directive';
import { GridApiDirective } from '../../../../directives/grid/grid-api/grid-api.directive';
import { FudisGridService } from '../../../../services/grid/grid.service';
import { FudisBreakpointService } from '../../../../services/breakpoint/breakpoint.service';
import { GridComponent } from '../../../grid/grid/grid.component';
import { IconComponent } from '../../../icon/icon.component';
import { ValidatorErrorMessageComponent } from '../../error-message/validator-error-message/validator-error-message.component';
import { GuidanceComponent } from '../../guidance/guidance.component';
import { FudisValidators } from '../../../../utilities/form/validators';

@Component({
  selector: 'fudis-mock-component',
  template: `<fudis-radio-button-group
    [id]="'radio-button-test-group'"
    [label]="'Choose a pet'"
    [control]="_testControl"
  >
    <fudis-radio-button
      *ngFor="let option of _options"
      [label]="option.label"
      [value]="option.value"
    />
  </fudis-radio-button-group>`,
})
class MockContainerComponent {
  protected _testControl: FormControl = new FormControl(
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
  let fixture: ComponentFixture<MockContainerComponent> | ComponentFixture<RadioButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MockContainerComponent,
        RadioButtonComponent,
        RadioButtonGroupComponent,
        FieldSetComponent,
        GridComponent,
        GridApiDirective,
        GridDirective,
        ContentDirective,
        GuidanceComponent,
        IconComponent,
        ValidatorErrorMessageComponent,
      ],
      providers: [
        FudisIdService,
        FudisBreakpointService,
        FudisGridService,
        FudisTranslationService,
      ],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockContainerComponent);

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
    it('should have correct value', () => {
      const input: HTMLInputElement = fixture.debugElement.nativeElement.querySelector(
        'input#radio-button-test-group-item-1',
      );

      const inputValue = input.getAttribute('ng-reflect-value');
      expect(inputValue).toEqual('platypus');
    });
  });
});
