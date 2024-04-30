import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FudisValidators } from '../../../../utilities/form/validators';
import { IconComponent } from '../../../icon/icon.component';
import { GuidanceComponent } from '../../guidance/guidance.component';
import { LabelComponent } from '../../label/label.component';
import { DatepickerComponent } from './datepicker.component';
import { ValidatorErrorMessageComponent } from '../../error-message/validator-error-message/validator-error-message.component';
import { getElement } from 'projects/ngx-fudis/src/lib/utilities/tests/utilities';

describe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DatepickerComponent,
        LabelComponent,
        IconComponent,
        GuidanceComponent,
        ValidatorErrorMessageComponent,
      ],
      imports: [
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
    component.control = new FormControl(null);
    component.id = 'fudis-dp-unique-id-3';
    component.label = 'Select a date';
    fixture.detectChanges();
  });

  function getDatepickerTopWrapperDiv(): HTMLElement {
    return fixture.nativeElement.querySelector('.fudis-datepicker') as HTMLElement;
  }

  function assertDatepickerTopWrapperDivHasClasses(...classes: string[]): void {
    const datepickerTopDivClasses = getDatepickerTopWrapperDiv()?.className ?? '';

    expect(datepickerTopDivClasses.split(' ').sort()).toEqual([...classes].sort());
  }

  describe('Top wrapper div', () => {
    it('should always have default CSS classes: fudis-datepicker and fudis-datepicker__md', () => {
      assertDatepickerTopWrapperDivHasClasses('fudis-datepicker', 'fudis-input-size__md');
    });

    // TODO: Testing size Input could be improved and compacted to one test
    it('should have respective CSS class indicating the datepicker size of small', () => {
      component.size = 'sm';
      fixture.detectChanges();

      assertDatepickerTopWrapperDivHasClasses('fudis-datepicker', 'fudis-input-size__sm');
    });

    it('should have respective CSS class indicating the datepicker size of large', () => {
      component.size = 'lg';
      fixture.detectChanges();

      assertDatepickerTopWrapperDivHasClasses('fudis-datepicker', 'fudis-input-size__lg');
    });

    // TODO: Change ng-reflect to HTML id and for attributes if possible
    it('should have fudis-label component present with given id', () => {
      const childLabelComponent = fixture.debugElement.query(
        By.css('fudis-label label.fudis-label'),
      );

      expect(childLabelComponent).toBeTruthy();
      expect(childLabelComponent.attributes['id']).toEqual('label_fudis-dp-unique-id-3');
      expect(childLabelComponent.attributes['for']).toEqual('fudis-dp-unique-id-3');
    });

    it('should have fudis-guidance component present with given id and helpText', () => {
      const childGuidanceComponent = fixture.debugElement.query(
        By.css('fudis-guidance .fudis-guidance #fudis-dp-unique-id-3_guidance'),
      );

      expect(childGuidanceComponent).toBeTruthy();

      component.helpText = 'Select your favourite date';
      fixture.detectChanges();

      const guidanceHelpText = fixture.debugElement.nativeElement.querySelector(
        '.fudis-guidance__help-text',
      ) as HTMLParagraphElement;

      expect(guidanceHelpText.textContent).toEqual('Select your favourite date');
    });
  });

  describe('Input', () => {
    it('should have invalid attribute if datepicker is required, input is touched and no date has been chosen', () => {
      const datepickerInput = fixture.nativeElement.querySelector('input');
      const requiredControl = new FormControl(null, FudisValidators.required('Date is required'));
      component.control = requiredControl;
      fixture.detectChanges();

      datepickerInput.dispatchEvent(new Event('focus'));
      fixture.detectChanges();

      datepickerInput.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      expect(!!datepickerInput.getAttribute('aria-invalid')).toEqual(true);
    });

    it('should have calendar icon from fudis-icon component', () => {
      const datepickerIcon = fixture.debugElement.query(By.css('fudis-icon'));

      expect(datepickerIcon.attributes['ng-reflect-icon']).toEqual('calendar');
    });

    it('should have proper disabled attribute if input has been disabled', () => {
      const datepickerInput = fixture.nativeElement.querySelector('input');
      component.disabled = true;
      fixture.detectChanges();

      expect(!!datepickerInput.getAttribute('aria-disabled')).toEqual(true);
    });
  });

  describe('Control updates', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(DatepickerComponent);
      component = fixture.componentInstance;
      component.label = 'Select a date';
    });

    it('should have no value selected', () => {
      component.control = new FormControl(null);
      fixture.detectChanges();

      const inputEl = getElement(fixture, 'input') as HTMLInputElement;

      expect(inputEl.value).toEqual('');
    });
  });
});
