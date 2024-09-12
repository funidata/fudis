import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GridComponent } from '../../grid/grid/grid.component';
import { GridApiDirective } from '../../../directives/grid/grid-api/grid-api.directive';
import { GridDirective } from '../../../directives/grid/grid/grid.directive';
import { FudisGridService } from '../../../services/grid/grid.service';
import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';
import { FudisBreakpointService } from '../../../services/breakpoint/breakpoint.service';
import { FudisValidators } from '../../../utilities/form/validators';
import { FieldSetComponent } from './fieldset.component';
import { NotificationComponent } from '../../notification/notification.component';
import { TextInputComponent } from '../text-input/text-input.component';
import { ContentDirective } from '../../../directives/content-projection/content/content.directive';
import { GuidanceComponent } from '../guidance/guidance.component';
import { ValidatorErrorMessageComponent } from '../error-message/validator-error-message/validator-error-message.component';
import { LabelComponent } from '../label/label.component';
import { ButtonComponent } from '../../button/button.component';
import { IconComponent } from '../../icon/icon.component';
import { ActionsDirective } from '../../../directives/content-projection/actions/actions.directive';
import { NotificationsDirective } from '../../../directives/content-projection/notifications/notifications.directive';
import { BodyTextComponent } from '../../typography/body-text/body-text.component';
import { getElement } from '../../../utilities/tests/utilities';
import { FudisInputSize } from '../../../types/forms';

@Component({
  selector: 'fudis-mock-fieldset-component',
  template: ` <fudis-fieldset
    [label]="'Fieldset label'"
    [helpText]="'Fieldset help text'"
    [required]="required"
    [labelSize]="labelSize"
    [initialFocus]="initialFocus"
    [inputSize]="inputSize"
  >
    <ng-template fudisActions [type]="'fieldset'">
      <p class="test-actions-content">This is actions content</p>
    </ng-template>
    <ng-template fudisNotifications [type]="'fieldset'">
      <p class="test-notifications-content">This is notifications content</p>
    </ng-template>
    <ng-template fudisContent [type]="'fieldset'">
      <p class="test-fieldset-content">This is fieldset content</p>
    </ng-template>
    <p class="test-do-not-find">You should not find me</p>
  </fudis-fieldset>`,
})
class MockFieldSetComponent {
  required = false;
  initialFocus = false;
  labelSize = 'md';
  inputSize: FudisInputSize;

  fieldsetExample = new FormGroup({
    exampleTextInput: new FormControl(null, FudisValidators.required('This field is required')),
  });
}

describe('FieldSetComponent', () => {
  let componentMock: MockFieldSetComponent;
  let fixtureMock: ComponentFixture<MockFieldSetComponent>;
  let fieldsetElement: HTMLFieldSetElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ActionsDirective,
        BodyTextComponent,
        ButtonComponent,
        ContentDirective,
        FieldSetComponent,
        GridComponent,
        GridApiDirective,
        GridDirective,
        GuidanceComponent,
        IconComponent,
        LabelComponent,
        MockFieldSetComponent,
        NotificationComponent,
        NotificationsDirective,
        TextInputComponent,
        ValidatorErrorMessageComponent,
      ],
      providers: [FudisGridService, FudisInternalErrorSummaryService, FudisBreakpointService],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixtureMock = TestBed.createComponent(MockFieldSetComponent);
    componentMock = fixtureMock.componentInstance;
    fixtureMock.detectChanges();
  });

  function fieldSetInputSizeCheck(size: FudisInputSize): void {
    componentMock.inputSize = size;
    fixtureMock.detectChanges();

    const fieldsetEl = getElement(fixtureMock, 'fieldset') as HTMLFieldSetElement;

    expect(fieldsetEl.className).toContain(`fudis-fieldset fudis-input-size__${size}`);
  }

  describe('Wrapper fieldset element HTML attributes', () => {
    beforeEach(() => {
      fieldsetElement = getElement(fixtureMock, 'fieldset') as HTMLFieldSetElement;
    });

    it('should have native fieldset element present', () => {
      expect(fieldsetElement).toBeTruthy();
    });

    it('should have legend element as a first child', () => {
      expect(fieldsetElement.firstChild?.nodeName).toEqual('LEGEND');
    });

    it('should have id constructed through IdService', () => {
      expect(fieldsetElement.id).toEqual('fudis-fieldset-1');
    });

    it('should have default CSS class for fudis-fieldset', () => {
      expect(fieldsetElement.className).toContain('fudis-fieldset');
    });

    it('should have default CSS classes coming from fudisGrid directive', () => {
      const classesFromGrid =
        'fudis-grid fudis-grid__xxl fudis-grid__align__start fudis-grid__margin__top__none fudis-grid__margin__bottom__none fudis-grid__row-gap__none';

      expect(fieldsetElement.parentElement?.className).toContain(classesFromGrid);
    });
  });

  describe('Component inputs', () => {
    it('should have Fieldset label as given', () => {
      const fieldsetLabel = getElement(fixtureMock, '.fudis-fieldset__legend__title__text');

      expect(fieldsetLabel.textContent).toEqual('Fieldset label');
    });

    it('should have fieldset helpText as given', () => {
      const fieldsetHelpText = getElement(fixtureMock, '.fudis-fieldset__legend__help-text');

      expect(fieldsetHelpText?.textContent).toEqual('Fieldset help text');
    });

    it.only('should have required text if given', () => {
      componentMock.required = true;

      fixtureMock.whenStable().finally(() => {
        const requiredTextElement = getElement(
          fixtureMock,
          '.fudis-fieldset__legend__title__text__required',
        );

        expect(requiredTextElement).toBeTruthy();
        expect(requiredTextElement?.textContent).toEqual(' (Required)');
      });
    });

    it('should have initial focus', () => {
      componentMock.initialFocus = true;
      fixtureMock.detectChanges();

      expect(fieldsetElement.focus).toBeTruthy();
    });

    it('should override width value and have respective fudis-input-size class if InputSize is given ', () => {
      fieldSetInputSizeCheck('sm');
      fieldSetInputSizeCheck('md');
      fieldSetInputSizeCheck('lg');
    });

    it('should have label size with respective CSS class', () => {
      const labelSizeClass = getElement(fixtureMock, '.fudis-fieldset__legend__title__main');

      expect(labelSizeClass.className).toContain('fudis-fieldset__legend__title__main__md');

      componentMock.labelSize = 'sm';
      fixtureMock.detectChanges();
      expect(labelSizeClass.className).toContain('fudis-fieldset__legend__title__main__sm');
    });
  });

  describe('Content directives', () => {
    it('should have fieldset actions content', () => {
      const actionsContentDiv = getElement(fixtureMock, '.fudis-fieldset__legend__actions');
      const actionsContent = getElement(fixtureMock, '.test-actions-content');

      expect(actionsContentDiv).toBeTruthy();
      expect(actionsContent.textContent).toEqual('This is actions content');
    });

    it('should have fieldset notifications content', () => {
      const notificationsContentDiv = getElement(
        fixtureMock,
        '.fudis-fieldset__legend__notifications',
      );
      const notificationsContent = getElement(fixtureMock, '.test-notifications-content');

      expect(notificationsContentDiv).toBeTruthy();
      expect(notificationsContent.textContent).toEqual('This is notifications content');
    });

    it('should have fieldset content', () => {
      const contentExampleDiv = getElement(fixtureMock, '.test-fieldset-content');

      expect(contentExampleDiv.textContent).toEqual('This is fieldset content');
    });

    it('should not find elements without proper content type', () => {
      const incorrectElement = getElement(fixtureMock, '.test-do-not-find');

      expect(incorrectElement).toBeNull();
    });
  });
});
