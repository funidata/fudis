import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { FudisSelectOption } from "projects/ngx-fudis/src/lib/types/types";

@Component({
  selector: 'app-exercise-two',
  templateUrl: 'exercise-two.component.html',
  standalone: false,
})
export class ExerciseTwoComponent {

  constructor() {
    this.selectOptions = [
      { value: 'option1', label: 'Study plan 23.08.2018', subLabel: 'Fashion, Curriculum period: 2017-2018, modified 2.3.2026' },
      { value: 'option2', label: 'Study plan 13.01.2026', subLabel: 'Fashion, Curriculum period: 2025-2026, modified 13.1.2026' },
      { value: 'option3', label: 'Study plan 12.11.2023', subLabel: 'Fashion, Curriculum period: 2023-2024, modified 12.11.2023' },
    ];
  }

  myControl: FormControl = new FormControl('');
  testControl: FormControl = new FormControl('');
  
  selectOptions: FudisSelectOption<string>[] = [];

  selectControl: FormControl<FudisSelectOption<object> | null> = new FormControl<FudisSelectOption<object> | null>(null);
}