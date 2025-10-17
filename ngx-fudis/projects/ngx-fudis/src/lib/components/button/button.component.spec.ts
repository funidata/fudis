import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { ButtonBaseDirective } from '../../directives/button-base/button-base.directive';
import { IconComponent } from '../icon/icon.component';
import { getElement, sortClasses } from '../../utilities/tests/utilities';
import { fudisButtonTypeArray } from '../../types/miscellaneous';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent, ButtonBaseDirective, IconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
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
      expect(component['_classes']).toEqual('fudis-button-host');
    });

    it('should have given label Input', () => {
      fixture.componentRef.setInput('label', 'Button label');
      fixture.detectChanges();

      expect(getButton().textContent).toEqual('Button label');
    });

    it('should update CSS classes according to given size Inputs', () => {
      const buttonSizes = ['small', 'medium'];

      buttonSizes.forEach((size) => {
        fixture.componentRef.setInput('size', `${size}`);
        fixture.detectChanges();

        expect(sortClasses(getButton().className)).toEqual(
          sortClasses(`fudis-button fudis-button__primary fudis-button__size__${size}`),
        );
      });
    });

    it('should update button type according to given type Input', () => {
      fudisButtonTypeArray.forEach((type) => {
        fixture.componentRef.setInput('type', `${type}`);
        fixture.detectChanges();

        expect(getButton().getAttribute('type')).toEqual(`${type}`);
      });
    });
  });
});
