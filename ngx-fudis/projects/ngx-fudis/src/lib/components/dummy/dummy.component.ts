import { Component } from '@angular/core';
import { FudisDialogService } from '../../services/dialog/dialog.service';
import { NgxFudisModule } from '../../ngx-fudis.module';
// 3. Import your dummy table component here

// This is the main component file that needs to be imported to a Story.
// Your job is to implement a dialog with a table inside it.
// Follow the implementation steps from 1 to 6.

@Component({
  imports: [NgxFudisModule, /*3. Import dummy table component */],
  selector: 'fudis-dummy',
  template: `
      <fudis-button
        [label]="'Trigger Dummy Dialog'"
        (handleClick)="openDialog()"
      ></fudis-button>
  <!-- 1. Implement your dialog here. Alternatively, create a separate dialog component to import and reference it here -->
   <!-- 4. Insert your dummy table selector within dialog content -->
  `,
})
export class DummyComponent {
  constructor(private _dialogService: FudisDialogService) {}

  // 2. Add dummy component inputs here

  openDialog() {
    // 5. Implement dialog opening logic here.
  };

  // 6. Implement a button to close the dialog
}
