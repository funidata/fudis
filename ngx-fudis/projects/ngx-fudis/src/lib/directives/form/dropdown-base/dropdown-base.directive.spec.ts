import { DropdownBaseDirective } from './dropdown-base.directive';

describe('DropdownBaseDirective', () => {
  const directive = new DropdownBaseDirective();

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('Default Input values', () => {
    const directive = new DropdownBaseDirective();

    it('should have size lg', () => {
      expect(directive.size).toEqual('lg');
    });

    it('should be single-select', () => {
      expect(directive.multiselect).toEqual(false);
    });

    it('should be closed', () => {
      expect(directive.open).toEqual(false);
    });

    it('should have CSS host class', () => {
      expect(directive.classes).toEqual('fudis-dropdown-menu-host');
    });

    it('should have _maxWidth initial', () => {
      expect(directive.maxWidth).toEqual('initial');
    });
  });
});
