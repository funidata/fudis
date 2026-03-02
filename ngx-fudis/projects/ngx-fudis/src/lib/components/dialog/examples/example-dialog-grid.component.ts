import { Component, Input, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { FudisDialogService } from '../../../services/dialog/dialog.service';
import { FudisDialogSize } from '../../../types/miscellaneous';
import { NgxFudisModule } from '../../../ngx-fudis.module';

@Component({
  imports: [NgxFudisModule],
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
        <fudis-dialog-content [contentFocus]="true">
          <fudis-grid [classes]="'fudis-mb-md'">
            <fudis-heading [level]="3" [variant]="'sm'">
              I am fudis-heading inside the grid taking the whole width
            </fudis-heading>
            <fudis-icon-button
              #menuTrigger
              [id]="'fudis-menu-button-1'"
              [ariaLabel]="'Additional menu'"
              [size]="'small'"
              [variant]="'secondary'"
              [icon]="'three-dots'"
              [asMenuButton]="true"
            >
              <fudis-dropdown-menu [size]="'md'">
                <fudis-dropdown-menu-item
                  [label]="'Open new dialog'"
                  (handleClick)="openExtraDialogTemplate(extraDialog)"
                ></fudis-dropdown-menu-item>
              </fudis-dropdown-menu>
            </fudis-icon-button>
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

    <ng-template #extraDialog>
      <fudis-dialog [size]="'sm'">
        <fudis-heading fudisDialogTitle [level]="1" [variant]="'md'">Extra dialog</fudis-heading>
        <fudis-dialog-content>
          <fudis-body-text> I am an extra dialog opened on top of the first one. </fudis-body-text>
        </fudis-dialog-content>
        <fudis-dialog-actions>
          <fudis-button fudisDialogClose [label]="'Close'"></fudis-button>
        </fudis-dialog-actions>
      </fudis-dialog>
    </ng-template>
  `,
})
export class ExampleDialogWithGridComponent {
  constructor(private _dialogService: FudisDialogService) {}

  @Input() size: FudisDialogSize = 'md';

  @ViewChild('menuTrigger', { static: false, read: ElementRef })
  menuTrigger?: ElementRef<HTMLButtonElement>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openDialogTemplate<T = any>(dialogToOpen: ComponentType<T> | TemplateRef<T>) {
    this._dialogService.open(dialogToOpen);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openExtraDialogTemplate<T = any>(extraDialog: TemplateRef<T>) {
    const dialogRef = this._dialogService.open(extraDialog, { restoreFocus: false });
    const buttonElement = this.menuTrigger?.nativeElement.querySelector('button');
    dialogRef.afterClosed().subscribe(() => {
      buttonElement?.focus();
    });
  }
}
