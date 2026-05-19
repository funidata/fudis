import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  BadgeComponent,
  BodyTextComponent,
  ButtonComponent,
  CheckboxComponent,
  DescriptionListComponent,
  DescriptionListItemComponent,
  DescriptionListItemDetailsComponent,
  DescriptionListItemTermComponent,
  ExpandableComponent,
  ExpandableContentDirective,
  GridComponent,
  GridItemDirective,
  HeadingComponent,
  LinkDirective,
  SelectComponent,
  SelectOptionComponent,
  SelectOptionsDirective,
} from 'ngx-fudis';
import { FudisSelectOption } from 'projects/ngx-fudis/src/lib/types/types';
import { TranslocoRootModule } from '../../transloco-root.module';

@Component({
  selector: 'app-exercise-one',
  templateUrl: 'exercise-one.component.html',
  imports: [
    GridComponent,
    GridItemDirective,
    BadgeComponent,
    BodyTextComponent,
    ButtonComponent,
    CheckboxComponent,
    HeadingComponent,
    LinkDirective,
    ExpandableComponent,
    ExpandableContentDirective,
    DescriptionListComponent,
    DescriptionListItemComponent,
    DescriptionListItemTermComponent,
    DescriptionListItemDetailsComponent,
    SelectComponent,
    SelectOptionComponent,
    SelectOptionsDirective,
    TranslocoRootModule,
  ],
})
export class ExerciseOneComponent {
  constructor() {
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

  myControl: FormControl = new FormControl('');
  testControl: FormControl = new FormControl('');

  selectOptions: FudisSelectOption<string>[] = [];

  selectControl: FormControl<FudisSelectOption<object> | null> =
    new FormControl<FudisSelectOption<object> | null>(null);
}
