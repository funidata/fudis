import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconButtonComponent } from './icon-button.component';
import { ButtonBaseDirective } from '../../directives/button-base/button-base.directive';
import { IconComponent } from '../icon/icon.component';
import { fudisButtonSizeArray, fudisButtonVariantArray } from '../../types/miscellaneous';
import { getElement, sortClasses } from '../../utilities/tests/utilities';

describe('IconButtonComponent', () => {
  let component: IconButtonComponent;
  let fixture: ComponentFixture<IconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconButtonComponent, ButtonBaseDirective, IconComponent],
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

    it('should update CSS classes according to given size and variant Inputs', () => {
      fudisButtonVariantArray.forEach((variant) => {
        fixture.componentRef.setInput('variant', `${variant}`);
        fixture.detectChanges();

        fudisButtonSizeArray.forEach((size) => {
          fixture.componentRef.setInput('size', `${size}`);
          fixture.detectChanges();

          expect(sortClasses(getButton().className)).toEqual(
            sortClasses(`fudis-button fudis-button__${variant} fudis-button__size__${size}`),
          );
        });
      });
    });
  });
});
