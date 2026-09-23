import { Directive } from '@angular/core';
import { FudisSelectOption } from '../../../../types/forms';
import { selectCourseCatalogueMockData } from '../common/mock_data';
import { BehaviorSubject, debounceTime, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';

@Directive({
  selector: 'example-select-backend-simulation-directive',
})
export class StorybookExampleBackendSimulationBaseDirective<T = string> {
  constructor() {
    this.searchTextUpdateSubject.pipe(takeUntilDestroyed()).subscribe((value) => {
      if (value?.trim()) {
        this.autocompleteNoResultsText = 'Fetching results...';
      }
    });

    this.searchTextUpdateSubject
      .pipe(debounceTime(300), takeUntilDestroyed())
      .subscribe((value) => {
        this.databaseCounter = 0;
        if (value?.trim()) {
          setTimeout(() => {
            let counter = 0;

            const counterLimit = 10;

            const results: FudisSelectOption<T>[] = [];

            for (const option of selectCourseCatalogueMockData as FudisSelectOption<T>[]) {
              if (counter >= counterLimit) {
                break;
              }

              if (this.control.value && option.label === this.control.value?.label) {
                results.push(option);
                counter = counterLimit;
              } else if (
                (option.label.toLowerCase().includes(value.toLowerCase()) ||
                  option.subLabel?.toLowerCase().includes(value.toLowerCase()) ||
                  value === '&&&') &&
                counter < counterLimit
              ) {
                results.push(option);
                counter = counter + 1;
              }

              this.databaseCounter = this.databaseCounter + 1;
            }

            this.searchResults?.next(results);
            if (!results.length) {
              this.autocompleteNoResultsText = null;
            }
          }, 500);
        }
      });
  }

  protected searchTextUpdateSubject = new Subject<string | null>();

  protected databaseCounter = 0;

  protected searchResults = new BehaviorSubject<FudisSelectOption<T>[]>([]);

  protected autocompleteNoResultsText: null | string = null;

  protected label = 'Select a course';

  protected helpText =
    'There are 1000 courses to choose from. You can search by course catalogue information.';

  protected placeholder = 'Select a course';

  protected control: FormControl<FudisSelectOption<T> | null>;
}
