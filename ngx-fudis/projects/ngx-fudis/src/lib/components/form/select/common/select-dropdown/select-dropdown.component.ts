import { Component, Input, effect, OnChanges } from '@angular/core';
import { DropdownBaseDirective } from '../../../../../directives/form/dropdown-base/dropdown-base.directive';
import { BehaviorSubject } from 'rxjs';
import { FudisTranslationService } from '../../../../../services/translation/translation.service';
import { FudisSelectVariant } from '../../../../../types/forms';
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

  protected _displayStatus: boolean = false;

  /**
   * Current filter text from Autocomplete parents
   */
  @Input() filterText: string;

  ngOnChanges(changes: FudisComponentChanges<SelectDropdownComponent>): void {
    const newFilterText = changes.filterText?.currentValue;

    const newResults = changes.results?.currentValue;

    if (
      newFilterText !== changes.filterText?.previousValue ||
      newResults !== changes.results?.previousValue
    ) {
      const delay =
        changes.results?.isFirstChange || changes.filterText?.isFirstChange ? 2000 : 500;
      this._displayStatus = false;

      setTimeout(() => {
        if (newFilterText === this.filterText || newResults === 0) {
          this._displayStatus = true;
        }
      }, delay);
    }
  }

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
}
