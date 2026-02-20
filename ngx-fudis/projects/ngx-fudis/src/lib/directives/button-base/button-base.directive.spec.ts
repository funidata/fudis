import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from '../../components/icon/icon.component';
import { ButtonComponent } from '../../components/button/button.component';
import { fudisButtonVariantArray } from '../../types/miscellaneous';
import { getElement } from '../../utilities/tests/utilities';
import { fudisIconRotateArray } from '../../types/icons';

describe('ButtonBaseDirective', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent, IconComponent],
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

    it('should update CSS classes according to given variant Inputs', () => {
      fudisButtonVariantArray.forEach((variant) => {
        fixture.componentRef.setInput('variant', `${variant}`);
        fixture.detectChanges();
      });
    });

    it('should have proper default CSS classes', () => {
      expect(getButton().className).toEqual(
        'fudis-button fudis-button__primary fudis-button__size__medium',
      );
    });

    it('should update icon classes according to given iconRotate Input', () => {
      fixture.componentRef.setInput('icon', 'search');
      fixture.componentRef.setInput('label', 'Icon button');

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
});
