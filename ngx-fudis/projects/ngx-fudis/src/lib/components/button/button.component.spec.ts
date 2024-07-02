import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from '../icon/icon.component';
import { ButtonComponent } from './button.component';
import {
  fudisButtonSizeArray,
  fudisButtonTypeArray,
  fudisButtonVariantArray,
} from '../../types/miscellaneous';
import { getElement, sortClasses } from '../../utilities/tests/utilities';
import { fudisIconRotateArray } from '../../types/icons';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent, IconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function getButton(): HTMLElement {
    return getElement(fixture, 'button') as HTMLElement;
  }

  describe('HTML attributes', () => {
    it('should have generated id', () => {
      expect(getButton().getAttribute('id')).toEqual('fudis-button-1');
    });

    it('should update CSS classes according to given size and variant Inputs', () => {
      fudisButtonVariantArray.forEach((variant) => {
        fixture.componentRef.setInput('variant', `${variant}`);
        fixture.detectChanges();

        fudisButtonSizeArray.forEach((size) => {
          fixture.componentRef.setInput('size', `${size}`);
          fixture.detectChanges();

          expect(sortClasses(getButton().className)).toEqual(
            sortClasses(`fudis-button fudis-button__${variant} fudis-button__size-${size}`),
          );
        });
      });
    });

    it('should have proper default CSS classes', () => {
      expect(getButton().className).toEqual(
        'fudis-button fudis-button__primary fudis-button__size-medium',
      );
    });

    it('should update button type according to given type Input', () => {
      fudisButtonTypeArray.forEach((type) => {
        fixture.componentRef.setInput('type', `${type}`);
        fixture.detectChanges();

        expect(getButton().getAttribute('type')).toEqual(`${type}`);
      });
    });

    it('should update icon classes according to given iconRotate Input', () => {
      fixture.componentRef.setInput('icon', 'search');
      fixture.componentRef.setInput('label', 'Icon button');
      fixture.componentRef.setInput('labelHidden', true);

      fudisIconRotateArray.forEach((rotate) => {
        fixture.componentRef.setInput('iconRotate', `${rotate}`);
        fixture.detectChanges();

        const iconClasses = getButton().querySelector('svg')?.classList;

        expect(iconClasses).toContain(`fudis-icon__rotate__${rotate}`);
      });
    });
  });

  describe('Event emitters', () => {
    it('should emit when button is clicked', () => {
      jest.spyOn(component.handleClick, 'emit');

      getButton().click();

      expect(component.handleClick.emit).toHaveBeenCalled();
    });

    it('should emit when button is focused', () => {
      jest.spyOn(component.handleFocus, 'emit');

      getButton().focus();

      expect(component.handleFocus.emit).toHaveBeenCalled();
    });

    it('should emit when button is blurred', () => {
      jest.spyOn(component.handleBlur, 'emit');

      getButton().focus();
      getButton().blur();

      expect(component.handleBlur.emit).toHaveBeenCalled();
    });

    it('should not emit when button is disabled', () => {
      jest.spyOn(component.handleClick, 'emit');
      component.disabled = true;
      fixture.detectChanges();

      getButton().click();

      expect(component.handleClick.emit).not.toHaveBeenCalled();
    });
  });

  describe('Button as MenuButton', () => {
    it('should toggle dropdown menu', () => {
      jest.spyOn(component, 'toggleMenu');

      fixture.componentRef.setInput('icon', 'three-dots');
      fixture.componentRef.setInput('label', 'Open additional menu');
      fixture.componentRef.setInput('labelHidden', true);
      fixture.componentRef.setInput('ariaLabel', 'It has nice things to click');
      fixture.componentRef.setInput('asMenuButton', true);
      fixture.detectChanges();

      getButton().click();

      expect(component.toggleMenu).toHaveBeenCalled();

      expect(!!getButton().getAttribute('aria-expanded')).toEqual(true);

      expect(getButton().getAttribute('aria-label')).toEqual(
        'Open additional menu It has nice things to click',
      );

      expect(getButton().getAttribute('type')).toEqual('button');

      expect(getButton().textContent).toEqual('');
    });
  });
});
