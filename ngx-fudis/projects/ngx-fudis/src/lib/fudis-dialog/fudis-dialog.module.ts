import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import {
  FudisDialogActions,
  FudisDialogClose,
  FudisDialogContent,
  FudisDialogTitle,
} from './fudis-dialog-directives';
import { FudisDialog } from './fudis-dialog';

@NgModule({
  declarations: [
    FudisDialogTitle,
    FudisDialogActions,
    FudisDialogContent,
    FudisDialogClose,
  ],
  imports: [MatDialogModule],
  exports: [
    FudisDialogTitle,
    FudisDialogActions,
    FudisDialogContent,
    FudisDialogClose,
  ],
  providers: [FudisDialog],
})
export class FudisDialogModule {}
