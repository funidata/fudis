import { Component } from '@angular/core';

// This component is for practicing styling with Fudis Core Style Library.
// Your goal is to produce a table that looks like the one in dummy-table-reference.png. You can find the image in the same folder as this component.
// You don't need to edit the sorting logic for this exercise.
// Follow the implementation steps from 1 to 2.

@Component({
  selector: 'fudis-dummy-table',
  imports: [],
  template: `
  <!-- 1. This table needs some styling. Add styles by using Fudis Core Style Library. -->
      <table>
        <caption>
          Course information
        </caption>
        <thead>
          @for (column of columns; track column) {
            <th>
              <button
                type="button"
                (click)="sortBy(column)"
              >
                <!-- 2. Add sorting icon here -->
                <!-- BONUS! Make icon rotate when sorted and make it accessible -->
                {{ column }}
              </button>
            </th>
          }
        </thead>
        <tbody>
          @for (course of courses; track course.code) {
          <tr>
            <td>
              {{ course.code }}
            </td>
            <td>
              {{ course.title }}
            </td>
            <td>
              <div>{{ course.status }}</div>
            </td>
            <td>
              {{ course.period }}
            </td>
          </tr>
        }
        </tbody>
      </table>
  `
})
export class DummyTableComponent {
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
}
