import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MultiselectAutocompleteDirective,
  SelectAutocompleteBaseDirective,
  SelectAutocompleteDirective,
} from './autocomplete.directive';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { getDirective, getElement } from '../../../../../utilities/tests/utilities';

@Component({
  selector: 'fudis-mock-autocomplete-base',
  template: `<input
      #inputRef
      fudisSelectAutocompleteBase
      [enableAutocomplete]="enableAutocomplete"
      [typeThreshold]="typeThreshold"
      [id]="'fudis-test-select'"
      [clearButtonClick]="clearButtonClick"
      (handleFocus)="handleFocus.emit($event)"
      (handleBlur)="handleBlur.emit($event)"
      (handleFilterTextUpdate)="handleFilterTextUpdate.emit($event)"
      (handleDropdownOpen)="handleDropdownOpen.emit()"
      (handleDropdownClose)="handleDropdownClose.emit()"
    />
    <button id="fudis-test-select-clear-button">To test stuff</button> `,
})
class MockAutocompleteBaseComponent {
  @ViewChild('inputRef') inputRef: ElementRef<SelectAutocompleteDirective>;

  enableAutocomplete = true;
  typeThreshold: 0 | 3 = 0;
  clearButtonClick: boolean | null = null;
  /**
   * Output event for updating parent's filter text signal
   */
  @Output() handleFilterTextUpdate = new EventEmitter<string>();

  /**
   * Output event for opening parent dropdown
   */
  @Output() handleDropdownOpen = new EventEmitter<void>();

  /**
   * Output event for closing parent dropdown
   */
  @Output() handleDropdownClose = new EventEmitter<void>();

  /**
   * Output event for input focus
   */
  @Output() handleFocus = new EventEmitter<{ event: FocusEvent; focusFromClearButton: boolean }>();

  /**
   * Output event for input blur
   */
  @Output() handleBlur = new EventEmitter<FocusEvent>();
}

@Component({
  selector: 'fudis-mock-select-autocomplete',
  template: `<input
      #inputRef
      fudisSelectAutocomplete
      [selectedLabel]="selectedLabel"
      [enableAutocomplete]="enableAutocomplete"
      [clearButtonClick]="clearButtonClick"
      (handleClearButtonReset)="handleClearButtonReset.emit()"
    />
    <button id="fudis-test-select-clear-button">To test stuff</button> `,
})
class MockSelectAutocompleteComponent {
  @ViewChild('inputRef') inputRef: ElementRef<SelectAutocompleteDirective>;

  selectedLabel: string | null = 'Initial label';
  enableAutocomplete = true;
  clearButtonClick: boolean | null = null;

  /**
   * Output event for closing parent dropdown
   */
  @Output() handleClearButtonReset = new EventEmitter<void>();
}

@Component({
  selector: 'fudis-mock-select-autocomplete',
  template: `<input
      #inputRef
      fudisMultiselectAutocomplete
      [enableAutocomplete]="enableAutocomplete"
      [clearButtonClick]="clearButtonClick"
      (handleClearButtonReset)="handleClearButtonReset.emit()"
    />
    <button id="fudis-test-select-clear-button">To test stuff</button> `,
})
class MockMultiselectAutocompleteComponent {
  @ViewChild('inputRef') inputRef: ElementRef<MultiselectAutocompleteDirective>;

  enableAutocomplete = true;
  clearButtonClick: boolean | null = null;

  /**
   * Output event for closing parent dropdown
   */
  @Output() handleClearButtonReset = new EventEmitter<void>();
}

describe('SelectAutocompleteBaseDirective', () => {
  let component: MockAutocompleteBaseComponent;
  let fixture: ComponentFixture<MockAutocompleteBaseComponent>;

  let inputElement: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectAutocompleteBaseDirective, MockAutocompleteBaseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MockAutocompleteBaseComponent);
    component = fixture.componentInstance;
    jest.spyOn(component.handleDropdownOpen, 'emit');
    jest.spyOn(component.handleDropdownClose, 'emit');
    jest.spyOn(component.handleFilterTextUpdate, 'emit');
    fixture.detectChanges();

    inputElement = getElement(fixture, 'input') as HTMLInputElement;
  });
  it('should create an directive instance', () => {
    const directive = getDirective(fixture, SelectAutocompleteBaseDirective);
    expect(directive).toBeTruthy();
  });

  describe('focus', () => {
    it('should emit focus event', () => {
      const newFocusEvent = new FocusEvent('focus');

      jest.spyOn(component.handleFocus, 'emit');
      inputElement.dispatchEvent(newFocusEvent);

      expect(component.handleFocus.emit).toHaveBeenCalledWith({
        event: newFocusEvent,
        focusFromClearButton: false,
      });
    });
    it('should emit focus event with focusFromClearButton', () => {
      jest.spyOn(component.handleFocus, 'emit');
      const testButton = getElement(fixture, 'button') as HTMLButtonElement;

      const newFocusEvent = new FocusEvent('focus', { relatedTarget: testButton });

      inputElement.dispatchEvent(newFocusEvent);

      expect(component.handleFocus.emit).toHaveBeenCalledWith({
        event: newFocusEvent,
        focusFromClearButton: true,
      });
    });

    it('should emit blur event', () => {
      const newBlurEvent = new FocusEvent('blur');

      jest.spyOn(component.handleBlur, 'emit');
      inputElement.focus();
      expect(component.handleBlur.emit).not.toHaveBeenCalled();
      inputElement.dispatchEvent(newBlurEvent);
      expect(component.handleBlur.emit).toHaveBeenCalledWith(newBlurEvent);
    });
  });

  describe('keyboard interaction', () => {
    it('should emit dropdown open and filter text update when both keydown and keyup is from input', () => {
      inputElement.dispatchEvent(new Event('focus'));
      inputElement.value = 'New value';
      inputElement.dispatchEvent(new Event('input'));

      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'h' }));

      inputElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'h' }));

      expect(component.handleDropdownOpen.emit).toHaveBeenCalled();
      expect(component.handleFilterTextUpdate.emit).toHaveBeenCalledWith('New value');
    });
    it('should not emit dropdown open when only keyup is from input', () => {
      inputElement.dispatchEvent(new Event('focus'));

      inputElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'h' }));
      fixture.detectChanges();

      expect(component.handleDropdownOpen.emit).not.toHaveBeenCalled();
    });

    it('should emit dropdown close, when threshold is higher than input length', () => {
      component.typeThreshold = 3;
      fixture.detectChanges();

      inputElement.value = 'hi';
      inputElement.dispatchEvent(new Event('input'));
      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'h' }));
      inputElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'h' }));

      expect(component.handleDropdownOpen.emit).not.toHaveBeenCalled();
      expect(component.handleDropdownClose.emit).toHaveBeenCalled();
      expect(component.handleFilterTextUpdate.emit).not.toHaveBeenCalled();
    });

    it('should empty the value and emit open, when Space is pressed and if focused from clear button', () => {
      const value = 'Rebel Scum';
      inputElement.value = value;
      const testButton = getElement(fixture, 'button') as HTMLButtonElement;

      testButton.focus();

      inputElement.focus();

      inputElement.dispatchEvent(new KeyboardEvent('keyup', { key: ' ' }));
      fixture.detectChanges();

      expect(component.handleDropdownOpen.emit).toHaveBeenCalled();
      expect(component.handleFilterTextUpdate.emit).toHaveBeenCalledWith('');
      expect(inputElement.value).toBeFalsy();
    });

    it('should empty the value and emit close, when Space is pressed and if focused from clear button', () => {
      component.typeThreshold = 3;
      fixture.detectChanges();

      const value = 'hi';
      inputElement.value = value;
      inputElement.dispatchEvent(new Event('input'));
      const testButton = getElement(fixture, 'button') as HTMLButtonElement;

      testButton.focus();

      inputElement.focus();

      inputElement.dispatchEvent(new KeyboardEvent('keyup', { key: ' ' }));
      fixture.detectChanges();

      expect(component.handleDropdownOpen.emit).not.toHaveBeenCalled();
      expect(component.handleDropdownClose.emit).toHaveBeenCalled();
      expect(component.handleFilterTextUpdate.emit).toHaveBeenCalledWith('');
      expect(inputElement.value).toBeFalsy();
    });

    it('should empty the value and emit open, when Enter is pressed and if focused from clear button', () => {
      const value = 'Rebel Scum';
      inputElement.value = value;

      const testButton = getElement(fixture, 'button') as HTMLButtonElement;

      testButton.focus();

      inputElement.focus();

      inputElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
      fixture.detectChanges();

      expect(component.handleDropdownOpen.emit).toHaveBeenCalled();
      expect(component.handleFilterTextUpdate.emit).toHaveBeenCalledWith('');
      expect(inputElement.value).toBeFalsy();
    });

    it('should NOT empty the value or emit open, when Enter is pressed and if NOT focused from clear button', () => {
      const value = 'Rebel Scum';
      inputElement.value = value;

      inputElement.focus();

      inputElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
      fixture.detectChanges();

      expect(component.handleDropdownOpen.emit).not.toHaveBeenCalled();
      expect(component.handleFilterTextUpdate.emit).not.toHaveBeenCalled();
      expect(inputElement.value).toEqual(value);
    });
  });
});

describe('SelectAutocompleteDirective', () => {
  let component: MockSelectAutocompleteComponent;
  let fixture: ComponentFixture<MockSelectAutocompleteComponent>;

  let inputElement: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectAutocompleteDirective, MockSelectAutocompleteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MockSelectAutocompleteComponent);
    component = fixture.componentInstance;

    jest.spyOn(component.handleClearButtonReset, 'emit');
    fixture.detectChanges();

    inputElement = getElement(fixture, 'input') as HTMLInputElement;
  });
  it('should create an directive instance', () => {
    const directive = getDirective(fixture, SelectAutocompleteDirective);
    expect(directive).toBeTruthy();
  });

  describe('onChanges', () => {
    it('should emit clear button click and clear value', () => {
      inputElement.value = 'Make me disapper';
      inputElement.dispatchEvent(new Event('input'));

      component.clearButtonClick = true;
      fixture.detectChanges();

      expect(component.handleClearButtonReset.emit).toHaveBeenCalled();

      expect(inputElement.getAttribute('value')).toBeFalsy();
    });

    it('should update input value', () => {
      const label = 'I am Chosen One';

      component.selectedLabel = label;

      fixture.detectChanges();

      expect(inputElement.value).toEqual(label);
    });

    it('should empty the label when unfocused', () => {
      inputElement.value = 'Long live the Empire';
      inputElement.dispatchEvent(new Event('input'));

      component.selectedLabel = null;

      fixture.detectChanges();

      expect(inputElement.getAttribute('value')).toBeFalsy();
    });

    it('should not empty the label when focused', () => {
      inputElement.focus();

      const value = 'Long live the Empire';
      inputElement.value = value;
      component.selectedLabel = null;

      fixture.detectChanges();

      expect(inputElement.value).toEqual(value);
    });
  });
});

describe('MultiselectAutocompleteDirective', () => {
  let component: MockMultiselectAutocompleteComponent;
  let fixture: ComponentFixture<MockMultiselectAutocompleteComponent>;

  let inputElement: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultiselectAutocompleteDirective, MockMultiselectAutocompleteComponent],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(MockMultiselectAutocompleteComponent);
    component = fixture.componentInstance;

    jest.spyOn(component.handleClearButtonReset, 'emit');
    fixture.detectChanges();

    inputElement = getElement(fixture, 'input') as HTMLInputElement;
  });
  it('should create an directive instance', () => {
    const directive = getDirective(fixture, MultiselectAutocompleteDirective);
    expect(directive).toBeTruthy();
  });

  describe('onChanges', () => {
    it('should emit clear button reset', () => {
      inputElement.value = 'Do it!';

      component.clearButtonClick = true;
      fixture.detectChanges();

      expect(component.handleClearButtonReset.emit).toHaveBeenCalled();
      expect(inputElement.value).toBeFalsy();
    });
  });
});
