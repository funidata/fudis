import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgxFudisModule } from '../../../ngx-fudis.module';
import { CommonModule } from '@angular/common';
import { FudisDialogService } from '../../../services/dialog/dialog.service';
import { FudisDialogSize } from '../../../types/miscellaneous';
import { ExampleDialogFormComponent } from './example-dialog-form.component';

@Component({
  standalone: true,
  imports: [NgxFudisModule, CommonModule],
  selector: 'example-dialog-size',
  template: `
    <fudis-heading [level]="1">Dialog size examples</fudis-heading>
    <fudis-grid [columns]="'repeat(3,auto)'" [width]="'sm'">
      <fudis-heading [level]="2" [variant]="'lg'">Regular Dialogs</fudis-heading>
      <fudis-button
        *ngFor="let size of sizes"
        [label]="'Open regular ' + size + ' dialog'"
        (handleClick)="openDialog(size)"
      />
    </fudis-grid>
    <fudis-hr class="fudis-my-xl" />
    <fudis-grid [columns]="'repeat(3,auto)'" [width]="'sm'">
      <fudis-heading [level]="2" [variant]="'lg'">Form Dialogs</fudis-heading>
      <fudis-button
        *ngFor="let size of sizes"
        [label]="'Open form ' + size + ' dialog'"
        (handleClick)="openDialogWithForm(size)"
      />
    </fudis-grid>

    <ng-template #exampleDialogTemplate>
      <fudis-dialog [size]="_size">
        <fudis-heading fudisDialogTitle [level]="1" [variant]="'xl'"
          >This dialog size is {{ _size }}</fudis-heading
        >
        <fudis-dialog-content>
          <fudis-body-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis porttitor nunc. Nunc
            vehicula ut massa non facilisis. Aliquam vehicula risus vitae ex condimentum, sed
            efficitur neque scelerisque.
          </fudis-body-text>
        </fudis-dialog-content>
        <fudis-dialog-actions>
          <fudis-button fudisDialogClose [label]="'Ok'"></fudis-button>
        </fudis-dialog-actions>
      </fudis-dialog>
    </ng-template>
  `,
})
export class ExampleDialogSizeComponent {
  constructor(private _dialogService: FudisDialogService) {}

  protected _size: FudisDialogSize;

  sizes: FudisDialogSize[] = ['xs', 'md', 'md', 'lg', 'xl'];

  @ViewChild('exampleDialogTemplate', { static: true }) templateRef: TemplateRef<unknown>;

  openDialog(size: FudisDialogSize): void {
    this._size = size;
    this._dialogService.open(this.templateRef);
  }

  openDialogWithForm(size: FudisDialogSize): void {
    this._dialogService.open(ExampleDialogFormComponent, { data: { size: size } });
  }
}
