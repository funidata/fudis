import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import {
  FudisDialogActions,
  FudisDialogClose,
  FudisDialogContent,
  FudisDialogTitle,
} from './components/dialog/dialog-directives';
import { FudisDialog } from './components/dialog/dialog';

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
export class NgxFudisModule {}
