import { TestBed } from '@angular/core/testing';
import { SectionActionsDirective, SectionContentDirective } from './section-content.directive';

describe('Section Content Directives', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectionActionsDirective, SectionContentDirective],
    });
  });

  describe('SectionActionsDirective', () => {
    it('should find instance', () => {
      const directive = new SectionActionsDirective();

      expect(directive).toBeTruthy();
    });

    it('should have host class', () => {
      const directive = new SectionActionsDirective();

      expect(directive['_hostClass']).toBe('fudis-section-actions');
    });
  });

  describe('SectionContentDirective', () => {
    it('should find instance', () => {
      const directive = new SectionContentDirective();

      expect(directive).toBeTruthy();
    });

    it('should have host class', () => {
      const directive = new SectionContentDirective();

      expect(directive['_hostClass']).toBe('fudis-section-content');
    });
  });
});
