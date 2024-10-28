import { Directive } from '@angular/core';
import { FudisSelectOption } from '../../../../types/forms';
import { selectMovieMockData } from '../common/mock_data';
import { BehaviorSubject, debounceTime, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';

@Directive({
  standalone: true,
  selector: 'example-select-backend-simulation-directive',
})
export class StorybookExampleBackendSimulationBaseDirective {
  constructor() {
    this.searchTextUpdateSubject.pipe(takeUntilDestroyed()).subscribe((value) => {
      this.databaseCounter = 0;
      if (value?.trim()) {
        this.filterStatus = 'In progress...';
        this.autocompleteNoResultsText = 'Fetching results...';
      }
      this.searchResults?.next([]);
    });

    this.searchTextUpdateSubject
      .pipe(debounceTime(300), takeUntilDestroyed())
      .subscribe((value) => {
        if (value?.trim()) {
          setTimeout(() => {
            let counter = 0;

            const counterLimit = 10;

            const results: FudisSelectOption<object>[] = [];

            for (const option of selectMovieMockData) {
              if (counter >= counterLimit) {
                break;
              }

              if (this.control.value && option === this.control.value?.label) {
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
            this.filterStatus = 'Finished';
            setTimeout(() => {
              this.autocompleteNoResultsText = null;
            }, 100);
          }, 500);
        }
      });
  }

  protected filterStatus: 'Finished' | 'In progress...' = 'Finished';

  protected searchTextUpdateSubject = new Subject<string | null>();

  protected databaseCounter = 0;

  protected searchResults = new BehaviorSubject<FudisSelectOption<object>[]>([]);

  protected autocompleteNoResultsText: null | string = null;

  protected label = 'Select a movie';

  protected helpText =
    'There are 1000 options to choose from. You can also search by genre, e. g. action.';

  protected placeholder = 'Select a movie';

  protected control: FormControl;
}
