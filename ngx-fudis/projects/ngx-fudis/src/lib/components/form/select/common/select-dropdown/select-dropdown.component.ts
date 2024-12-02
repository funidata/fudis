import { Component, Input, effect, OnChanges, signal } from '@angular/core';
import { DropdownBaseDirective } from '../../../../../directives/form/dropdown-base/dropdown-base.directive';
import { BehaviorSubject } from 'rxjs';
import { FudisTranslationService } from '../../../../../services/translation/translation.service';
import { FudisInputSize, FudisSelectVariant } from '../../../../../types/forms';
import { FudisComponentChanges } from '../../../../../types/miscellaneous';

@Component({
  selector: 'fudis-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.scss'],
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
   * By default, Autocomplete variant will display "No results found" text when there are 0 options matching. When combined with 'autocompleteFilter' false, application can set their own 'Fetching options...' etc. text while their own filtering is in progress.
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
   * Boolean which toggles status updates for screen readers about changed option results
   */
  protected _displayStatus = new BehaviorSubject<boolean>(false);

  /**
   * Internal translated label for situations where no results with current filters were found
   */
  protected _translationNoResultsFound = new BehaviorSubject<string>('');

  /**
   * Internal translated label for number of visible results
   */
  protected _translationResults = new BehaviorSubject<string>('');

  /**
   * Internal translated label for number of visible results
   */
  protected _translationShowing = new BehaviorSubject<string>('');

  ngOnChanges(changes: FudisComponentChanges<SelectDropdownComponent>): void {
    const newFilterText = changes.filterText?.currentValue;

    const newResults = changes.results?.currentValue;

    if (
      newFilterText !== changes.filterText?.previousValue ||
      newResults !== changes.results?.previousValue
    ) {
      this._displayStatus.next(false);

      setTimeout(() => {
        if (newFilterText === this.filterText || newResults === 0) {
          this._displayStatus.next(true);
        }
      }, 500);
    }
  }
}
