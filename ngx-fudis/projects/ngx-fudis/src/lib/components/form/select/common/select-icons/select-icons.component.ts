import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  effect,
  OnChanges,
  inject,
  DestroyRef,
} from '@angular/core';
import { FudisTranslationService } from '../../../../../services/translation/translation.service';
import { FudisSelectVariant } from '../../../../../types/forms';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FudisComponentChanges } from '../../../../../types/miscellaneous';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'fudis-select-icons',
  templateUrl: './select-icons.component.html',
  styleUrls: ['./select-icons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
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
   * If clear button is disabled
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
   * Id of parent Select
   */
  @Input() parentId: string;

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
   * Subscription for handling the valueChanges observable
   */
  private _subscription: Subscription;

  private _destroyRef = inject(DestroyRef);

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

      this._subscription?.unsubscribe();
      this._subscription = this.parentControl.valueChanges
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe((value) => {
          this._controlValue.next(!!value);
        });
    }
  }
}
