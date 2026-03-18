import { Component, Input, TemplateRef} from '@angular/core';
import { FudisDialogService } from '../../services/dialog/dialog.service';
import { FudisDialogSize } from '../../types/miscellaneous';
import { ComponentType } from '@angular/cdk/portal';
import { NgxFudisModule } from '../../ngx-fudis.module';

@Component({
  imports: [NgxFudisModule],
  selector: 'exercise-2',
  template: `
      <fudis-button
        [label]="'Dialog trigger button'"
        (handleClick)="openDialog(dialogToOpen)"
      ></fudis-button>
      <ng-template #dialogToOpen>
        <fudis-dialog>
          <fudis-heading fudisDialogTitle [level]="1" [variant]="'xl'"
            >Exercise 2</fudis-heading>
          <fudis-dialog-content>
            <table class="fudis-table">
              <caption class="fudis-table__caption">
                Course information
              </caption>
              <thead>
                @for (column of columns; track column) {
                  <th scope="col" class="fudis-table__header fudis-table__header__align__left">
                    <button
                      class="fudis-table__header-button fudis-table__header-button__align__left fudis-table__header-button--sortable"
                      type="button"
                      (click)="sortBy(column)"
                    >
                      {{ column }}
                      <span [class]="" class="fudis-icon fudis-icon__color__primary fudis-icon__lg fudis-icon__sorter"></span>
                    </button>
                  </th>
                }
              </thead>
              <tbody>
                @for (course of courses; track course.code) {
                <tr>
                  <td class="fudis-table__cell fudis-table__cell__align__left fudis-table__cell__vertical-align__top">
                    {{ course.code }}
                  </td>
                  <td class="fudis-table__cell fudis-table__cell__align__left fudis-table__cell__vertical-align__top">
                    {{ course.title }}
                  </td>
                  <td class="fudis-table__cell fudis-table__cell__align__left fudis-table__cell__vertical-align__top">
                    <div class="fudis-badge fudis-badge__success">{{ course.status }}</div>
                  </td>
                  <td class="fudis-table__cell fudis-table__cell__align__left fudis-table__cell__vertical-align__top">
                    {{ course.period }}
                  </td>
                </tr>
              }
              </tbody>
            </table>
          </fudis-dialog-content>
          <fudis-dialog-actions>
            <fudis-button fudisDialogClose [label]="'Close'"></fudis-button>
          </fudis-dialog-actions>
        </fudis-dialog>
      </ng-template>
  `,
})
export class Exercise2Component {
  constructor(private _dialogService: FudisDialogService) {}

  @Input() size: FudisDialogSize = 'md';

  columns: string[] = ['code', 'title', 'status', 'period'];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  courses: any[] = [
    {
      code: 'AUT.116',
      title: 'Information Technology Applications in Automation',
      status: 'Released 19.9.2023',
      period: '2024-2025',
    },
    {
      code: 'URLA-10',
      title: 'Urban Laboratory II (studio)',
      status: 'Released 26.9.2023',
      period: '2025-2026',
    },
    {
      code: 'DES-12.335',
      title: 'Architectural Design and Integrated Sustainable Systems for Urban Environments and Resilient Infrastructures in the 21st Century',
      status: 'Released 28.9.2023',
      period: '2025-2026',
    },
  ];

      sortDirection: { [key: string]: 'asc' | 'desc' } = {
      code: 'asc',
      title: 'asc',
      status: 'asc',
      period: 'asc',
    };

    sortBy(field: string) {
      if (this.sortDirection[field] === undefined) {
        this.sortDirection[field] = 'asc';
      }
      const direction = this.sortDirection[field];
      this.courses.sort((a, b) => {
        const aValue = a[field] ?? '';
        const bValue = b[field] ?? '';
        return direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
      this.sortDirection[field] = direction === 'asc' ? 'desc' : 'asc';
    }


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openDialog<T = any>(dialogToOpen: ComponentType<T> | TemplateRef<T>) {
    this._dialogService.open(dialogToOpen);
  }
}
