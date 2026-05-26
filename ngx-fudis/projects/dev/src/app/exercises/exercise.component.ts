import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  BodyTextComponent,
  GridComponent,
  HeadingComponent,
  LinkDirective,
  TabNavigationBarComponent,
  TabNavigationPanelComponent,
  TabNavigationTabComponent,
  FudisSelectOption,
} from 'ngx-fudis';
import pkg from '../../../../ngx-fudis/package.json';
import { TranslocoRootModule } from '../transloco-root.module';

@Component({
  selector: 'app-exercise',
  templateUrl: 'exercise.component.html',
  imports: [
    GridComponent,
    BodyTextComponent,
    HeadingComponent,
    LinkDirective,
    RouterModule,
    TabNavigationBarComponent,
    TabNavigationPanelComponent,
    TabNavigationTabComponent,
    TranslocoRootModule,
  ],
})
export class ExerciseComponent {
  constructor(protected router: Router) {
    this.selectOptions = [
      {
        value: 'option1',
        label: 'Study plan 23.08.2018',
        subLabel: 'Fashion, Curriculum period: 2017-2018, modified 2.3.2026',
      },
      {
        value: 'option2',
        label: 'Study plan 13.01.2026',
        subLabel: 'Fashion, Curriculum period: 2025-2026, modified 13.1.2026',
      },
      {
        value: 'option3',
        label: 'Study plan 12.11.2023',
        subLabel: 'Fashion, Curriculum period: 2023-2024, modified 12.11.2023',
      },
    ];
  }

  routes: { id: string; label: string; path: string }[] = [
    { id: 'exercise-1', label: 'Exercise 1', path: 'exercise-one' },
    { id: 'exercise-2', label: 'Exercise 2', path: 'exercise-two' },
  ];

  change(path: string) {
    this.router.navigate([path]);
  }

  @ViewChild('navigationTabPanel') navigationTabPanel: TabNavigationPanelComponent;

  version = pkg.version;

  myControl: FormControl = new FormControl('');
  testControl: FormControl = new FormControl('');

  selectOptions: FudisSelectOption<string>[] = [];

  selectControl: FormControl<FudisSelectOption<object> | null> =
    new FormControl<FudisSelectOption<object> | null>(null);
}
