import { TestBed } from '@angular/core/testing';
import {
  FormActionsDirective,
  FormContentDirective,
  FormHeaderDirective,
} from './form-content.directive';

describe('Form Content Directives', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormActionsDirective, FormContentDirective, FormHeaderDirective],
    });
  });

  describe('FormActionsDirective', () => {
    it('should find instance', () => {
      const directive = new FormActionsDirective();

      expect(directive).toBeTruthy();
    });

    it('should have host class', () => {
      const directive = new FormActionsDirective();

      expect(directive.hostClass).toBe('fudis-form-actions');
    });
  });

  describe('FormHeaderDirective', () => {
    it('should find instance', () => {
      const directive = new FormHeaderDirective();

      expect(directive).toBeTruthy();
    });

    it('should have host class', () => {
      const directive = new FormHeaderDirective();

      expect(directive.hostClass).toBe('fudis-form-header');
    });
  });

  describe('FormContentDirective', () => {
    it('should find instance', () => {
      const directive = new FormContentDirective();
      expect(directive).toBeTruthy();
    });

    it('should have host class', () => {
      const directive = new FormContentDirective();

      expect(directive.hostClass).toBe('fudis-form-content');
    });
  });
});
