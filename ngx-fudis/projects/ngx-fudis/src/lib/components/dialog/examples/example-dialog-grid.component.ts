import { Component, Input, TemplateRef } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { FudisDialogService } from '../../../services/dialog/dialog.service';
import { FudisDialogSize } from '../../../types/miscellaneous';
import { NgxFudisModule } from '../../../ngx-fudis.module';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [NgxFudisModule, CommonModule],
  selector: 'example-dialog-with-grid',
  template: `
    <fudis-button
      (handleClick)="openDialogTemplate(dialogWithGrid)"
      [label]="'Open dialog with grid'"
    ></fudis-button>

    <ng-template #dialogWithGrid>
      <fudis-dialog [size]="size">
        <fudis-heading fudisDialogTitle [level]="1" [variant]="'xl'"
          >Dialog with fudis-grid and scrollable content</fudis-heading
        >
        <fudis-dialog-content [focusToContent]="true">
          <fudis-grid [classes]="'fudis-mb-md'">
            <fudis-heading [level]="3" [variant]="'sm'">
              I am fudis-heading inside the grid taking the whole width
            </fudis-heading>
            <fudis-body-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis porttitor nunc. Nunc
              vehicula ut massa non facilisis. Aliquam vehicula risus vitae ex condimentum, sed
              efficitur neque scelerisque. Mauris facilisis vel orci sit amet tincidunt. Praesent
              ante leo, tempus eu blandit vel, tempus nec augue. Nam dui est, scelerisque quis
              mauris sit amet, sagittis pharetra lectus. Donec nec ligula et dolor venenatis
              bibendum. Vestibulum metus tortor, fermentum eu dignissim id, ultrices vitae metus.
              Donec eget vulputate risus. Proin eros augue, volutpat mollis varius non, posuere ac
              turpis. Aliquam et convallis tortor, non semper mi. Praesent nec eleifend mauris, at
              laoreet urna. Quisque dignissim nibh sollicitudin, finibus justo non, efficitur est.
            </fudis-body-text>
            <fudis-body-text>
              Proin pellentesque at felis vel imperdiet. Vivamus eros lorem, condimentum non rutrum
              quis, aliquam vitae dolor. Morbi dictum leo non porttitor egestas. Sed sed aliquet
              purus. Sed nec metus dictum, porta justo ut, cursus lorem. Nam libero dolor, pulvinar
              eu enim et, porttitor sodales ipsum. Nullam tristique ante sed massa porta, in
              accumsan nibh pretium. Integer vel facilisis neque, a lacinia dui. Donec cursus eget
              mi a aliquam. Vestibulum commodo, elit a mattis porttitor, eros neque euismod sem, eu
              hendrerit ante nisl sed quam. Vestibulum euismod leo ac magna pretium.
            </fudis-body-text>
          </fudis-grid>
          <fudis-hr />
          <fudis-grid [columns]="{ xs: 1, sm: 2, md: 3 }" [classes]="'fudis-mt-sm fudis-mb-sm'">
            <div style="border: 2px solid lightblue">
              <fudis-body-text>Showcase of grid items</fudis-body-text>
            </div>
            <div style="border: 2px solid lightblue">
              <fudis-body-text>Showcase of grid items</fudis-body-text>
            </div>
            <div style="border: 2px solid lightblue">
              <fudis-body-text>Showcase of grid items</fudis-body-text>
            </div>
            <div style="border: 2px solid lightblue">
              <fudis-body-text>Showcase of grid items</fudis-body-text>
            </div>
            <div style="border: 2px solid lightblue">
              <fudis-body-text>Showcase of grid items</fudis-body-text>
            </div>
            <div style="border: 2px solid lightblue">
              <fudis-body-text>Showcase of grid items</fudis-body-text>
            </div>
            <div style="border: 2px solid lightblue">
              <fudis-body-text>Showcase of grid items</fudis-body-text>
            </div>
            <div style="border: 2px solid lightblue">
              <fudis-body-text>Showcase of grid items</fudis-body-text>
            </div>
            <div style="border: 2px solid lightblue">
              <fudis-body-text>Showcase of grid items</fudis-body-text>
            </div>
            <div style="border: 2px solid lightblue">
              <fudis-body-text>Showcase of grid items</fudis-body-text>
            </div>
            <div style="border: 2px solid lightblue">
              <fudis-body-text>Showcase of grid items</fudis-body-text>
            </div>
            <div style="border: 2px solid lightblue">
              <fudis-body-text>I am last item of the grid</fudis-body-text>
            </div>
          </fudis-grid>
        </fudis-dialog-content>
        <fudis-dialog-actions>
          <fudis-button fudisDialogClose [label]="'Ok'"></fudis-button>
        </fudis-dialog-actions>
      </fudis-dialog>
    </ng-template>
  `,
})
export class ExampleDialogWithGridComponent {
  constructor(private _dialogService: FudisDialogService) {}

  @Input() size: FudisDialogSize = 'md';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openDialogTemplate<T = any>(dialogToOpen: ComponentType<T> | TemplateRef<T>) {
    this._dialogService.open(dialogToOpen);
  }
}
