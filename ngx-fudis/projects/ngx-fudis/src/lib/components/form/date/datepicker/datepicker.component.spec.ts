import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { By } from '@angular/platform-browser';
import { FudisValidators } from '../../../../utilities/form/validators';
import { DatepickerComponent } from './datepicker.component';
import { getElement, sortClasses } from '../../../../utilities/tests/utilities';
import { fudisInputSizeArray } from '../../../../types/forms';
import { FudisInternalErrorSummaryService } from '../../../../services/form/error-summary/internal-error-summary.service';
import { FudisDialogService } from '../../../../services/dialog/dialog.service';

describe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;
  let wrapperElement: HTMLDivElement;
  let datepickerInput: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatepickerComponent],
      providers: [FudisDialogService, FudisInternalErrorSummaryService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('control', new FormControl(null));
    fixture.componentRef.setInput('label', 'Select a date');
    fixture.detectChanges();
  });

  describe('Wrapper element', () => {
    beforeEach(() => {
      wrapperElement = getElement(fixture, '.fudis-datepicker') as HTMLDivElement;
    });

    it('should always have default CSS classes', () => {
      expect(sortClasses(wrapperElement.className)).toEqual(
        sortClasses('fudis-datepicker fudis-input-size__md'),
      );
    });

    it('should change CSS classes according to the given datepicker input size', () => {
      fudisInputSizeArray.forEach((size) => {
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();

        expect(sortClasses(wrapperElement.className)).toEqual(
          sortClasses(`fudis-datepicker fudis-input-size__${size}`),
        );
      });
    });

    it('should have label element present', () => {
      const childLabelElement = fixture.debugElement.query(By.css('label.fudis-label'));

      expect(childLabelElement).toBeTruthy();
      expect(childLabelElement.attributes['id']).toEqual('fudis-datepicker-1-label');
      expect(childLabelElement.attributes['for']).toEqual('fudis-datepicker-1');
    });

    it('should have guidance element present', () => {
      const childGuidanceElement = fixture.debugElement.query(
        By.css('fudis-guidance .fudis-guidance #fudis-datepicker-1_guidance'),
      );

      expect(childGuidanceElement).toBeTruthy();

      fixture.componentRef.setInput('helpText', 'Select your favourite date');
      fixture.detectChanges();

      const guidanceHelpText = fixture.debugElement.nativeElement.querySelector(
        '.fudis-guidance__help-text',
      ) as HTMLParagraphElement;

      expect(guidanceHelpText.textContent.trim()).toEqual('Select your favourite date');
    });
  });

  describe('Input', () => {
    beforeEach(() => {
      datepickerInput = getElement(fixture, 'input') as HTMLInputElement;

      jest.spyOn(component.handleBlur, 'emit');
      jest.spyOn(component.handleKeyUp, 'emit');
    });

    it('should have invalid attribute if datepicker is required, input is touched and no date has been chosen', () => {
      const requiredControl = new FormControl(null, FudisValidators.required('Date is required'));
      fixture.componentRef.setInput('control', requiredControl);
      fixture.detectChanges();

      datepickerInput.dispatchEvent(new Event('focus'));
      fixture.detectChanges();

      datepickerInput.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      expect(!!datepickerInput.getAttribute('aria-invalid')).toEqual(true);
    });

    it('should have calendar icon', () => {
      const datepickerIconSvgElement = fixture.debugElement.query(By.css('fudis-icon svg'));

      expect(datepickerIconSvgElement.nativeElement.getAttribute('id')).toEqual('calendar');
    });

    it('should have disabled attributes if input has been disabled', () => {
      component.control.disable();
      fixture.detectChanges();

      expect(!!datepickerInput.getAttribute('aria-disabled')).toEqual(true);
      expect(datepickerInput.hasAttribute('disabled')).toBeTruthy();
    });

    it('should emit events', () => {
      datepickerInput.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      expect(component.handleBlur.emit).toHaveBeenCalled();

      datepickerInput.dispatchEvent(new KeyboardEvent('keyup', { keyCode: 65 }));
      fixture.detectChanges();

      expect(component.handleKeyUp.emit).toHaveBeenCalled();
    });
  });

  describe('Control updates', () => {
    it('should have no value selected', () => {
      fixture.componentRef.setInput('control', new FormControl(null));
      fixture.detectChanges();

      const inputEl = getElement(fixture, 'input') as HTMLInputElement;

      expect(inputEl.value).toEqual('');
      expect(component.control.valid).toBe(true);
    });

    it('should update control validity and visible input value according to given min validator and value', () => {
      
      fixture.componentRef.setInput('control', new FormControl(null, FudisValidators.datepickerMin({
          value: new Date('2024-01-12'),
          message: 'Date is not inside allowed range',
        })));
      component.control.markAsTouched();
      fixture.detectChanges();

      component.control.patchValue(new Date('2024-01-10'));
      fixture.detectChanges();

      const falseInputValue = (getElement(fixture, '.fudis-datepicker__input') as HTMLInputElement)
        .value;

      const errorMessage = (getElement(fixture, '.fudis-error-message') as HTMLParagraphElement)
        .innerHTML;

      expect(errorMessage).toEqual('Date is not inside allowed range');
      expect(falseInputValue).toEqual('10.1.2024');
      expect(component.control.valid).toBe(false);

      component.control.patchValue(new Date('2024-01-13'));
      fixture.detectChanges();

      const validInputValue = (getElement(fixture, '.fudis-datepicker__input') as HTMLInputElement)
        .value;

      expect(getElement(fixture, '.fudis-error-message')).toBeFalsy();
      expect(validInputValue).toEqual('13.1.2024');
      expect(component.control.valid).toBe(true);
    });

    it('should update control validity according to given max validator and value', () => {
      
      fixture.componentRef.setInput('control', new FormControl(null, FudisValidators.datepickerMax({
          value: new Date('2025-01-01'),
          message: 'Date is not inside allowed range',
        })));
      
      fixture.detectChanges();

      component.control.patchValue(new Date('2025-01-10'));
      fixture.detectChanges();

      expect(component.control.valid).toBe(false);

      component.control.patchValue(new Date('2024-12-31'));
      fixture.detectChanges();

      expect(component.control.valid).toBe(true);
    });
  });

  describe('Escape key behavior', () => {
    let dialogService: FudisDialogService;

    beforeEach(() => {
      dialogService = TestBed.inject(FudisDialogService);
      jest.spyOn(dialogService, 'dropdownClosedWithEscape').mockImplementation();

      component['_picker'] = {
        opened: true,
        close: jest.fn(),
      } as unknown as MatDatepicker<Date>;
    });

    it('should call dropdownClosedWithEscape()when Escape is pressed and calendar is open', () => {
      // Arrange
      component['_picker'].opened = true;

      // Act
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      component['_handleEscapePress'](event);

      // Assert
      expect(dialogService.dropdownClosedWithEscape).toHaveBeenCalledTimes(1);
      expect(component['_picker'].close).toHaveBeenCalled();
    });

    it('should not call dropdownClosedWithEscape() when Escape is pressed and calendar is closed', () => {
      // Arrange
      component['_picker'].opened = false;

      // Act
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      component['_handleEscapePress'](event);

      // Assert
      expect(dialogService.dropdownClosedWithEscape).toHaveBeenCalledTimes(0);
      expect(component['_picker'].close).not.toHaveBeenCalled();
    });

    it('should not call dropdownClosedWithEscape() when A key is pressed and calendar is open', () => {
      // Arrange
      component['_picker'].opened = true;

      // Act
      const event = new KeyboardEvent('keydown', { key: 'a' });
      component['_handleEscapePress'](event);

      // Assert
      expect(dialogService.dropdownClosedWithEscape).toHaveBeenCalledTimes(0);
      expect(component['_picker'].close).not.toHaveBeenCalled();
    });
  });
});
