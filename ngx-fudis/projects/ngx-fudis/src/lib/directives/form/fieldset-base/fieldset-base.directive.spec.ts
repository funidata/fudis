import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FieldSetBaseDirective } from './fieldset-base.directive';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FudisCheckboxOption } from '../../../types/forms';
import { CheckboxComponent } from '../../../components/form/checkbox-group/checkbox/checkbox.component';
import { CheckboxGroupComponent } from '../../../components/form/checkbox-group/checkbox-group.component';
import { FieldSetComponent } from '../../../components/form/fieldset/fieldset.component';
import { GridDirective } from '../../grid/grid/grid.directive';
import { FudisBreakpointService } from '../../../services/breakpoint/breakpoint.service';
import { FudisGridService } from '../../../services/grid/grid.service';
import { GuidanceComponent } from '../../../components/form/guidance/guidance.component';
import { ContentDirective } from '../../content-projection/content/content.directive';
import { getElement } from '../../../utilities/tests/utilities';

@Component({
  selector: 'fudis-mock-checkbox-group-component',
  template: ` <fudis-checkbox-group
    [title]="title"
    [helpText]="helpText"
    [required]="true"
    [formGroup]="_checkboxFormGroup"
  >
    <fudis-checkbox
      *ngFor="let option of _checkboxOptions"
      [controlName]="option.controlName"
      [label]="option.label"
    />
  </fudis-checkbox-group>`,
})
class MockCheckboxGroupComponent {
  constructor(
    private _idService: FudisIdService,
    private _translationService: FudisTranslationService,
  ) {}

  title = 'This is checkbox group';
  helpText = 'Here are some advices';

  private _checkboxOptions: FudisCheckboxOption[] = [
    { controlName: 'blueberry', label: 'blueberry' },
    { controlName: 'cloudberry', label: 'cloudberry' },
  ];

  private _checkboxFormGroup = new FormGroup({
    blueberry: new FormControl<FudisCheckboxOption | null>(null),
    cloudberry: new FormControl<FudisCheckboxOption | null>(null),
  });
}

describe('FieldSetBaseDirective', () => {
  let idService: FudisIdService;
  let translationService: FudisTranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContentDirective,
        CheckboxComponent,
        CheckboxGroupComponent,
        FieldSetBaseDirective,
        FieldSetComponent,
        GuidanceComponent,
        GridDirective,
        MockCheckboxGroupComponent,
      ],
      providers: [
        FudisIdService,
        FudisTranslationService,
        FudisBreakpointService,
        FudisGridService,
      ],
      imports: [ReactiveFormsModule],
    });

    idService = TestBed.inject(FudisIdService);
    translationService = TestBed.inject(FudisTranslationService);
  });

  it('should create an instance', () => {
    TestBed.runInInjectionContext(() => {
      const directive: FieldSetBaseDirective = new FieldSetBaseDirective(
        idService,
        translationService,
      );

      expect(directive).toBeTruthy();
    });
  });

  describe('Input values', () => {
    let fixtureMock: ComponentFixture<MockCheckboxGroupComponent>;

    beforeEach(() => {
      fixtureMock = TestBed.createComponent(MockCheckboxGroupComponent);
      fixtureMock.detectChanges();
    });

    it('should have title', () => {
      const titleElement = getElement(fixtureMock, '.fudis-fieldset__legend__title__text');

      expect(titleElement.textContent).toEqual('This is checkbox group (Required)');
    });

    it('should have title size with respective CSS class', () => {
      const titleSizeClass = getElement(fixtureMock, '.fudis-fieldset__legend__title__main');

      expect(titleSizeClass.className).toContain('fudis-fieldset__legend__title__main__sm');
    });

    it('should have id constructed through Fudis id service', () => {
      const fieldSetElement = getElement(fixtureMock, 'fieldset');

      expect(fieldSetElement.id).toEqual('fudis-checkbox-group-1');
    });

    it('should have guidance with correct id', () => {
      const guidanceElement = getElement(fixtureMock, 'fudis-guidance .fudis-guidance div');

      expect(guidanceElement.id).toEqual('fudis-checkbox-group-1_guidance');
    });

    it('should have correct helpText in guidance', () => {
      const helpText = getElement(fixtureMock, '.fudis-guidance__help-text');

      expect(helpText.textContent).toContain('Here are some advices');
    });
  });
});
