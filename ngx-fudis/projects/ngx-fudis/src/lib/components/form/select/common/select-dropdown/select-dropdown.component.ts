import {
  Component,
  Input,
  effect,
  OnChanges,
  signal,
  WritableSignal,
  computed,
} from '@angular/core';
import { DropdownBaseDirective } from '../../../../../directives/form/dropdown-base/dropdown-base.directive';
import { FudisTranslationService } from '../../../../../services/translation/translation.service';
import { FudisInputSize, FudisSelectVariant } from '../../../../../types/forms';
import { FudisComponentChanges } from '../../../../../types/miscellaneous';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'fudis-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.scss'],
  standalone: false,
})
export class SelectDropdownComponent extends DropdownBaseDirective implements OnChanges {
  constructor(private _translationService: FudisTranslationService) {
    super();
    effect(() => {
      const translations = _translationService.getTranslations()().SELECT.AUTOCOMPLETE;

      this._translationNoResultsFound.next(translations.NO_RESULTS);
      this._translationResults.next(translations.RESULTS);
      this._translationShowing.next(translations.SHOWING);
    });
  }

  /**
   * Variant of parent Select / Multiselect
   */
  @Input({ required: true }) selectVariant: FudisSelectVariant;

  /**
   * Number of results
   */
  @Input() results: number;

  /**
   * With Autocomplete variants optional helper text displayed as first item in Dropdown
   */
  @Input() autocompleteHelpText: string | false;

  /**
   * By default, Autocomplete variant will display "No results found" text when there are 0 options
   * matching. When combined with 'autocompleteFilter' false, application can set their own
   * 'Fetching options...' etc. text while their own filtering is in progress.
   */
  @Input() autocompleteNoResultsText: string | null = null;

  /**
   * Current filter text from Autocomplete parents
   */
  @Input() filterText: string;

  /**
   * Assign Select dropdown to contain single-select or multiselect options (with checkboxes)
   */
  @Input() multiselect: boolean = false;

  /**
   * Id of parent component
   */
  @Input() parentId: string;

  /**
   * Set dropdown size
   */
  @Input() size: FudisInputSize | 'xs' = 'lg';

  /**
   * Set dropdown open status
   */
  @Input() open: boolean | null = false;

  /**
   * Internal translated label for situations where no results with current filters were found
   */
  protected _translationNoResultsFound = new BehaviorSubject<string>('');

  /**
   * Internal translated label for visible results
   */
  protected _translationResults = new BehaviorSubject<string>('');

  /**
   * Internal translated label for visible results
   */
  protected _translationShowing = new BehaviorSubject<string>('');

  /**
   * Internal helper for temporary clearing screen reader message
   */
  private _lastAnnouncedMessage = new BehaviorSubject<string>('');

  /**
   * Internal signal mirroring results Input
   */
  private _resultsSignal: WritableSignal<number> = signal(0);

  /**
   * Internal signal mirroring filterText Input
   */
  private _filterTextSignal: WritableSignal<string> = signal('');

  /**
   * Computed signal for building and updating screen reader message
   */
  protected _liveMessage = computed(() => {
    const filterText = this._filterTextSignal();
    const results = this._resultsSignal();

    // Only announce while dropdown is open
    if (!this.open) {
      this._lastAnnouncedMessage.next('');
      return '';
    }

    // Reset announcement when input is cleared
    if (!filterText) {
      this._lastAnnouncedMessage.next('');
      return '';
    }

    const helpText =
      typeof this.autocompleteHelpText === 'string' ? this.autocompleteHelpText : null;

    let message: Observable<string>;

    if (helpText) {
      // Wrap helpText in an Observable if it exists
      message = of(helpText);
    } else {
      // Handle the message based on results
      message = this._translationShowing.pipe(
        switchMap((showingText) => {
          if (results > 0) {
            return this._translationResults.pipe(
              map((resultsText) => `${showingText} ${results} ${resultsText}`),
            );
          } else {
            return this._translationNoResultsFound.pipe(map((noResultsText) => noResultsText));
          }
        }),
      );
    }

    const currentMessage$ = message.pipe(
      map((msg) => {
        if (msg !== this._lastAnnouncedMessage.value) {
          this._lastAnnouncedMessage.next(msg);
        }
        return msg;
      }),
    );

    currentMessage$.subscribe((msg) => {
      this._lastAnnouncedMessage.next(msg);
    });

    console.log('last announced message: ', this._lastAnnouncedMessage.value);

    // Return the latest message for the live region
    return this._lastAnnouncedMessage.value;
  });

  ngOnChanges(changes: FudisComponentChanges<SelectDropdownComponent>): void {
    const newResults = changes.results?.currentValue;
    const newFilterText = changes.filterText?.currentValue;

    if (
      (changes.filterText &&
        newFilterText !== undefined &&
        newFilterText !== changes.filterText?.previousValue) ||
      (changes.results && newResults !== undefined && newResults !== changes.results?.previousValue)
    ) {
      console.log('Updating filterText:', this.filterText);
      console.log('Updating results:', this.results);

      this._filterTextSignal.set(this.filterText ?? '');
      this._resultsSignal.set(this.results ?? 0);

      this._lastAnnouncedMessage.next(''); // Clear previous message immediately
    }
  }
}
