import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  SelectAutocompleteBaseDirective,
  SelectAutocompleteDirective,
} from './autocomplete.directive';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { getDirective, getElement } from '../../../../../utilities/tests/utilities';

@Component({
  selector: 'fudis-mock-autocomplete',
  template: `<input
      #inputRef
      fudisSelectAutocomplete
      fudisSelectAutocompleteBase
      [selectedLabel]="selectedLabel"
      [enableAutocomplete]="enableAutocomplete"
      [typeThreshold]="typeThreshold"
      [id]="'fudis-test-select'"
      [clearButtonClick]="clearButtonClick"
      (triggerFilterTextUpdate)="triggerFilterTextUpdate.emit($event)"
      (triggerDropdownOpen)="triggerDropdownOpen.emit()"
      (triggerDropdownClose)="triggerDropdownClose.emit()"
      (triggerClearButtonReset)="triggerClearButtonReset.emit()"
    />
    <button id="fudis-test-select-clear-button">To test stuff</button> `,
})
class MockComponent {
  @ViewChild('inputRef') inputRef: ElementRef<HTMLInputElement>;

  selectedLabel: string | null = 'Initial label';
  enableAutocomplete = true;
  typeThreshold: 0 | 3 = 0;
  clearButtonClick: boolean | null = null;
  /**
   * Output event for updating parent's filter text signal
   */
  @Output() triggerFilterTextUpdate = new EventEmitter<string>();

  /**
   * Output event for opening parent dropdown
   */
  @Output() triggerDropdownOpen = new EventEmitter<void>();

  /**
   * Output event for closing parent dropdown
   */
  @Output() triggerDropdownClose = new EventEmitter<void>();

  /**
   * Output event for closing parent dropdown
   */
  @Output() triggerClearButtonReset = new EventEmitter<void>();
}

describe('SelectAutocompleteDirective', () => {
  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;

  let inputElement: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectAutocompleteDirective, SelectAutocompleteBaseDirective, MockComponent],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(MockComponent);
    component = fixture.componentInstance;
    jest.spyOn(component.triggerDropdownOpen, 'emit');
    jest.spyOn(component.triggerDropdownClose, 'emit');
    jest.spyOn(component.triggerFilterTextUpdate, 'emit');
    jest.spyOn(component.triggerClearButtonReset, 'emit');
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

      component.clearButtonClick = true;
      fixture.detectChanges();

      expect(component.triggerClearButtonReset.emit).toHaveBeenCalled();

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

      component.selectedLabel = null;

      fixture.detectChanges();

      expect(inputElement.value).toBeFalsy();
    });

    it('should not empty the label when focused', () => {
      inputElement.focus();

      const value = 'Long live the Empire';
      inputElement.value = value;

      fixture.detectChanges();
      component.selectedLabel = null;

      fixture.detectChanges();

      expect(inputElement.value).toEqual(value);
    });

    it('should empty the value and emit open, Space is pressed and if focused from clear button', () => {
      const value = 'Rebel Scum';
      inputElement.value = value;
      const testButton = getElement(fixture, 'button') as HTMLButtonElement;

      testButton.focus();

      inputElement.focus();

      inputElement.dispatchEvent(new KeyboardEvent('keyup', { key: ' ' }));
      fixture.detectChanges();

      expect(component.triggerDropdownOpen.emit).toHaveBeenCalled();
      expect(component.triggerFilterTextUpdate.emit).toHaveBeenCalledWith('');
      expect(inputElement.value).toBeFalsy();
    });
  });

  describe('keyboard interaction', () => {
    it('should emit dropdown open', () => {
      inputElement.dispatchEvent(new Event('focus'));

      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'h' }));

      inputElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'h' }));

      expect(component.triggerDropdownOpen.emit).toHaveBeenCalled();
    });
    it('should not emit dropdown open', () => {
      component.inputRef.nativeElement.dispatchEvent(new Event('focus'));

      component.inputRef.nativeElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'h' }));
      fixture.detectChanges();

      expect(component.triggerDropdownOpen.emit).not.toHaveBeenCalled();
    });
  });
});


