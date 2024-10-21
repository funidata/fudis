import { Directive } from '@angular/core';
import { FudisSelectOption } from '../../../../types/forms';
import { selectMovieMockData } from '../common/mock_data';
import { BehaviorSubject, debounceTime, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

              if (
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

            results.sort((a, b) => a.label.localeCompare(b.label));

            this.searchResults?.next(results);
            this.filterStatus = 'Finished';
          }, 500);
        }
      });
  }

  protected filterStatus: 'Finished' | 'In progress...' = 'Finished';

  protected searchTextUpdateSubject = new Subject<string | null>();

  protected mockData = selectMovieMockData;

  protected databaseCounter = 0;

  protected searchResults = new BehaviorSubject<FudisSelectOption<object>[]>([]);

  protected label = 'Select a movie';

  protected helpText = 'There are 1000 options to choose from';

  protected placeholder = 'Select a movie';
}
