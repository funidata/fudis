import { DropdownItemBaseDirective } from './dropdown-item-base.directive';

describe('DropdownItemBaseDirective', () => {
  const doc: Document = new Document();
  it('should create an instance', () => {
    const directive = new DropdownItemBaseDirective(doc);

    expect(directive).toBeTruthy();
  });
});

// TODO: add tests
