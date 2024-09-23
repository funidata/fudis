import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  effect,
  OnChanges,
} from '@angular/core';
import { FudisTranslationService } from '../../../../../services/translation/translation.service';
import { FudisSelectVariant } from '../../../../../types/forms';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { FudisComponentChanges } from '../../../../../types/miscellaneous';

@Component({
  selector: 'fudis-select-icons',
  templateUrl: './select-icons.component.html',
  styleUrls: ['./select-icons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectIconsComponent implements OnChanges {
  constructor(protected _translationService: FudisTranslationService) {
    effect(() => {
      this._translationClearFilterText.next(
        _translationService.getTranslations()().SELECT.AUTOCOMPLETE.CLEAR,
      );
    });
  }

  /**
   * If Select's dropdown is open
   */
  @Input() dropdownOpen: boolean | null;

  /**
   * Parent Select's variant
   */
  @Input() parentVariant: FudisSelectVariant;

  /**
   * Show / hide clear button
   */
  @Input() clearButton: boolean;

  /**
   * If parent'c control is disabled
   * TODO: to be removed when Fudis is refactored only to use FormControl's disabled state
   */
  @Input() disabled: boolean;

  /**
   * Autocomplete's filter text
   */
  @Input() filterText: boolean;

  /**
   * Parent Select's form control
   */
  @Input() parentControl: FormControl;

  /**
   * Output event for Clear Button click
   */
  @Output() handleClearButtonClick: EventEmitter<Event> = new EventEmitter<Event>();

  /**
   * Output event for Clear Button focus
   */
  @Output() handleClearButtonFocus: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

  /**
   * Output event for Clear Button blur
   */
  @Output() handleClearButtonBlur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

  /**
   * Output event for Clear Button destroy
   */
  @Output() handleClearButtonDestroy: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Observable for status if parent control has value
   */
  protected _controlValue = new BehaviorSubject<boolean>(false);

  /**
   * Translated aria-label for autocomplete close icon button which clears the input
   */
  protected _translationClearFilterText = new BehaviorSubject<string>('');

  /**
   * Click handler for Clear Button
   */
  protected _clearButtonClick(event: Event): void {
    this.handleClearButtonClick.emit(event);
  }

  /**
   * Focus handler for Clear Button
   */
  protected _handleClearButtonFocus(event: FocusEvent): void {
    this.handleClearButtonFocus.emit(event);
  }

  /**
   * Blur handler for Clear Button
   */
  protected _handleClearButtonBlur(event: FocusEvent): void {
    this.handleClearButtonBlur.emit(event);
  }

  ngOnChanges(changes: FudisComponentChanges<SelectIconsComponent>): void {
    if (changes.parentControl?.currentValue !== changes.parentControl?.previousValue) {
      this._controlValue.next(!!changes.parentControl?.currentValue?.value);

      this.parentControl.valueChanges.subscribe((value) => {
        this._controlValue.next(!!value);
      });
    }
  }
}
