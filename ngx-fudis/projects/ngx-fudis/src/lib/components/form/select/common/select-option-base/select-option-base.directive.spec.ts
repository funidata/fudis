import { TestBed } from '@angular/core/testing';
import { SelectOptionBaseDirective } from './select-option-base.directive';
import { SelectGroupComponent } from '../select-group/select-group.component';

describe('SelectOptionBaseDirective', () => {
  let selectGroup: SelectGroupComponent;
  let document: Document;
  let directive: SelectOptionBaseDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectGroupComponent],
      providers: [],
    });

    directive = new SelectOptionBaseDirective(document, selectGroup);
    directive.data = { value: 'test-directive-value', label: 'Test directive label' };
  });

  // TODO: create tests
  it.skip('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
