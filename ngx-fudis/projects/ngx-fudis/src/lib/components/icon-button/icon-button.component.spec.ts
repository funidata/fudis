import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconButtonComponent } from './icon-button.component';
import { ButtonBaseDirective } from '../../directives/button-base/button-base.directive';
import { fudisButtonSizeArray } from '../../types/miscellaneous';
import { getElement, sortClasses } from '../../utilities/tests/utilities';

describe('IconButtonComponent', () => {
  let component: IconButtonComponent;
  let fixture: ComponentFixture<IconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonBaseDirective],
      imports: [IconButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function getButton(): HTMLElement {
    return getElement(fixture, 'button') as HTMLElement;
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('HTML attributes', () => {
    it('should have CSS host class', () => {
      expect(component['_classes']).toEqual('fudis-icon-button-host');
    });

    it('should have given ariaLabel Input', () => {
      fixture.componentRef.setInput('ariaLabel', 'Button ariaLabel');
      fixture.detectChanges();

      expect(getButton().getAttribute('aria-label')).toEqual('Button ariaLabel');
    });

    it('should update CSS classes according to given size Inputs', () => {
      fudisButtonSizeArray.forEach((size) => {
        fixture.componentRef.setInput('size', `${size}`);
        fixture.detectChanges();

        expect(sortClasses(getButton().className)).toEqual(
          sortClasses(`fudis-button fudis-button__primary fudis-button__size__${size}`),
        );
      });
    });

    it('should have default button type', () => {
      expect(getButton().getAttribute('type')).toEqual('button');
    });
  });

  describe('Button as MenuButton', () => {
    it('should toggle dropdown menu', () => {
      jest.spyOn(component, 'toggleMenu');

      fixture.componentRef.setInput('icon', 'three-dots');
      fixture.componentRef.setInput('ariaLabel', 'Additional menu');
      fixture.componentRef.setInput('asMenuButton', true);
      fixture.detectChanges();

      expect(getButton().getAttribute('aria-expanded')).toEqual('false');

      getButton().click();
      fixture.detectChanges();

      expect(component.toggleMenu).toHaveBeenCalled();

      expect(getButton().getAttribute('aria-expanded')).toEqual('true');

      expect(getButton().getAttribute('aria-label')).toEqual('Additional menu');

      expect(getButton().getAttribute('type')).toEqual('button');
    });
  });
});
