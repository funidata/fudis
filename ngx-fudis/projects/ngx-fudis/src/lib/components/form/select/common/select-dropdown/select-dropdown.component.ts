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
      const translations = _translationService.getTranslations()();

      this._translationNoResultsFound.next(translations.SELECT.AUTOCOMPLETE.NO_RESULTS);
    });
  }

  /**
   * Variant of parent Select / Multiselect
   */
  @Input({ required: true }) selectVariant: FudisSelectVariant;

  /**
   * Boolean if there are no results
   */
  @Input() noResults: boolean;

  /**
   * With Autocomplete variants optional helper text displayed as first item in Dropdown
   */
  @Input() autocompleteHelpText: string;

  /**
   * Current filter text from Autocomplete parents
   */
  @Input() filterText: string;

  ngOnChanges(changes: FudisComponentChanges<SelectDropdownComponent>): void {
    if (changes.filterText?.currentValue !== changes.filterText?.previousValue) {
      console.log(this.filterText);
    }
  }

  /**
   * Internal translated label for situations where no results with current filters were found
   */
  protected _translationNoResultsFound = new BehaviorSubject<string>('');
}
