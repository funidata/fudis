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

      this._translationNoResultsFound.set(translations.NO_RESULTS);
      this._translationResults.set(translations.RESULTS);
      this._translationShowing.set(translations.SHOWING);
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
  protected _translationNoResultsFound: WritableSignal<string> = signal('');

  /**
   * Internal translated label for visible results
   */
  protected _translationResults: WritableSignal<string> = signal<string>('');

  /**
   * Internal translated label for visible results
   */
  protected _translationShowing: WritableSignal<string> = signal<string>('');

  /**
   * Internal helper for temporary clearing screen reader message
   */
  private _lastAnnouncedMessage = '';

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
      this._lastAnnouncedMessage = '';
      return '';
    }

    // Reset announcement when input is cleared
    if (!filterText) {
      this._lastAnnouncedMessage = '';
      return '';
    }

    const helpText =
      typeof this.autocompleteHelpText === 'string' ? this.autocompleteHelpText : null;

    // Construct the aria-live message
    const message = helpText
      ? helpText
      : results > 0
        ? `${this._translationShowing()} ${results} ${this._translationResults()}`
        : (this.autocompleteNoResultsText ?? this._translationNoResultsFound());

    // If message is the same as last time, force screen reader to re-announce it
    if (message === this._lastAnnouncedMessage) {
      setTimeout(() => {
        this._lastAnnouncedMessage = message;
      }, 50);

      return '';
    }

    // New message, announce normally
    this._lastAnnouncedMessage = message;
    return message;
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
      // Update signals after Angular updates the inputs, ensuring filterText and results are set together for _liveMessage.
      Promise.resolve().then(() => {
        this._filterTextSignal.set(this.filterText ?? '');
        this._resultsSignal.set(this.results ?? 0);
      });
    }
  }
}
