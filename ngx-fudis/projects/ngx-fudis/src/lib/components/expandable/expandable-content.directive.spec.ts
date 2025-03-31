import { TestBed } from '@angular/core/testing';
import { ExpandableActionsDirective } from './expandable-content.directive';

describe('ExpandableActionsDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpandableActionsDirective],
    });
  });
  it('should find instance', () => {
    const directive = new ExpandableActionsDirective();

    expect(directive).toBeTruthy();
  });

  it('should have host class', () => {
    const directive = new ExpandableActionsDirective();

    expect(directive['_hostClass']).toBe('fudis-expandable-actions');
  });
});
