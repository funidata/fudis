import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GridComponent } from '../../grid/grid/grid.component';
import { GridApiDirective } from '../../../directives/grid/grid-api/grid-api.directive';
import { GridDirective } from '../../../directives/grid/grid/grid.directive';
import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';
import { FudisBreakpointService } from '../../../services/breakpoint/breakpoint.service';
import { FieldsetActionsDirective, FieldsetContentDirective } from './fieldset-content.directive';
import { FieldSetComponent } from './fieldset.component';
import { TextInputComponent } from '../text-input/text-input.component';
import { GuidanceComponent } from '../guidance/guidance.component';
import { ValidatorErrorMessageComponent } from '../error-message/validator-error-message/validator-error-message.component';
import { LabelComponent } from '../label/label.component';
import { ButtonComponent } from '../../button/button.component';
import { IconComponent } from '../../icon/icon.component';
import { BodyTextComponent } from '../../typography/body-text/body-text.component';
import { getElement } from '../../../utilities/tests/utilities';
import { FudisInputSize } from '../../../types/forms';

@Component({
  standalone: false,
  selector: 'fudis-mock-fieldset-component',
  template: ` <fudis-fieldset
    [label]="'Fieldset label'"
    [helpText]="'Fieldset help text'"
    [required]="required"
    [labelSize]="labelSize"
    [initialFocus]="initialFocus"
    [inputSize]="inputSize"
  >
    <fudis-fieldset-actions>
      <p class="test-actions-content">This is actions content</p>
    </fudis-fieldset-actions>
    <fudis-fieldset-content>
      <p class="test-fieldset-content">This is fieldset content</p>
    </fudis-fieldset-content>
    <p class="test-do-not-find">You should not find me</p>
  </fudis-fieldset>`,
})
class MockFieldSetComponent {
  required = false;
  initialFocus = false;
  labelSize = 'md';
  inputSize: FudisInputSize;
}

describe('FieldSetComponent', () => {
  let componentMock: MockFieldSetComponent;
  let fixtureMock: ComponentFixture<MockFieldSetComponent>;
  let fieldsetElement: HTMLFieldSetElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BodyTextComponent,
        ButtonComponent,
        FieldsetActionsDirective,
        FieldsetContentDirective,
        FieldSetComponent,
        GridComponent,
        GridApiDirective,
        GridDirective,
        GuidanceComponent,
        IconComponent,
        LabelComponent,
        MockFieldSetComponent,
        TextInputComponent,
        ValidatorErrorMessageComponent,
      ],
      providers: [FudisInternalErrorSummaryService, FudisBreakpointService],
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
        'fudis-grid fudis-grid__xxl fudis-grid__align__start fudis-grid__row-gap__none';

      expect(fieldsetElement.parentElement?.className).toContain(classesFromGrid);
    });
  });

  describe('Component inputs', () => {
    it('should have Fieldset label as given', () => {
      const fieldsetLabel = getElement(fixtureMock, '.fudis-fieldset__legend__main__text');

      expect(fieldsetLabel.textContent).toEqual('Fieldset label');
    });

    it('should have fieldset helpText as given', () => {
      const fieldsetHelpText = getElement(fixtureMock, '.fudis-fieldset__help-text');

      expect(fieldsetHelpText?.textContent).toEqual('Fieldset help text');
    });

    it('should have aria hidden true as default for group help text', () => {
      const requiredTextElement = getElement(
        fixtureMock,
        '.fudis-fieldset__legend__main__group-helptext',
      );

      expect(requiredTextElement.getAttribute('aria-hidden')).toEqual('true');
    });

    it('should have required text if given', () => {
      componentMock.required = true;
      fixtureMock.detectChanges();

      const requiredTextElement = getElement(
        fixtureMock,
        '.fudis-fieldset__legend__main__required',
      );

      expect(requiredTextElement).toBeTruthy();
      expect(requiredTextElement?.textContent).toEqual('(Required)');
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
      const labelSizeClass = getElement(fixtureMock, '.fudis-fieldset__legend__main');

      expect(labelSizeClass.className).toContain('fudis-fieldset__legend__md');

      componentMock.labelSize = 'sm';
      fixtureMock.detectChanges();
      expect(labelSizeClass.className).toContain('fudis-fieldset__legend__sm');
    });
  });

  describe('Content directives', () => {
    it('should have fieldset actions content', () => {
      const actionsContentDiv = getElement(fixtureMock, '.fudis-fieldset-actions');
      const actionsContent = getElement(fixtureMock, '.test-actions-content');

      expect(actionsContentDiv).toBeTruthy();
      expect(actionsContent.textContent).toEqual('This is actions content');
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
