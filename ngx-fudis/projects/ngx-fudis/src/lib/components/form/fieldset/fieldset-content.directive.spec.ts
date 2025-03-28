import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FieldsetActionsDirective, FieldsetContentDirective } from './fieldset-content.directive';
import { fudisFieldsetActionsAlignArray } from '../../../types/miscellaneous';
import { Component } from '@angular/core';
import { getElement } from '../../../utilities/tests/utilities';

@Component({
  standalone: false,
  selector: 'fudis-mock-fieldset-component',
  template: ` <fudis-fieldset
    [label]="'Fieldset label'"
    [helpText]="'Fieldset help text'"
    [required]="false"
    [labelSize]="'md'"
    [initialFocus]="false"
    [inputSize]="'md'"
  >
    <fudis-fieldset-actions [align]="align">
      <p class="test-actions-content">This is actions content</p>
    </fudis-fieldset-actions>
    <fudis-fieldset-content>
      <p class="test-fieldset-content">This is fieldset content</p>
    </fudis-fieldset-content>
  </fudis-fieldset>`,
})
class MockFieldSetComponent {
  align = 'start';
}

describe('FieldsetContentDirectives', () => {
  let component: MockFieldSetComponent;
  let fixture: ComponentFixture<MockFieldSetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FieldsetActionsDirective, FieldsetContentDirective, MockFieldSetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MockFieldSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('FieldsetActionsDirective', () => {
    it('should find instance', () => {
      const directive = new FieldsetActionsDirective();
      expect(directive).toBeTruthy();
    });

    it('should have host class and default alignment', () => {
      const directive = new FieldsetActionsDirective();
      expect(directive['_hostClass']).toBe(
        'fudis-fieldset-actions fudis-fieldset-actions__align--start',
      );
    });

    it('should have correct align Input', () => {
      fudisFieldsetActionsAlignArray.forEach((align) => {
        component.align = align;
        fixture.detectChanges();

        const element = getElement(fixture, 'fudis-fieldset-actions');
        expect(element.outerHTML).toContain(
          `fudis-fieldset-actions fudis-fieldset-actions__align--${align}`,
        );
      });
    });
  });

  describe('FieldsetContentDirective', () => {
    it('should find instance', () => {
      const directive = new FieldsetContentDirective();
      expect(directive).toBeTruthy();
    });

    it('should have host class', () => {
      const directive = new FieldsetContentDirective();
      expect(directive['_hostClass']).toBe('fudis-fieldset-content');
    });
  });
});
