import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import {
  FudisDialogActions,
  FudisDialogClose,
  FudisDialogContent,
  FudisDialogTitle,
} from './fudis-dialog/fudis-dialog-directives';
import { FudisDialog } from './fudis-dialog/fudis-dialog';
import { NgxFudisComponent } from './ngx-fudis.component';

@NgModule({
  declarations: [
    NgxFudisComponent,
    FudisDialogTitle,
    FudisDialogActions,
    FudisDialogContent,
    FudisDialogClose,
  ],
  imports: [MatDialogModule],
  exports: [
    NgxFudisComponent,
    FudisDialogTitle,
    FudisDialogActions,
    FudisDialogContent,
    FudisDialogClose,
  ],
  providers: [FudisDialog],
})
export class NgxFudisModule {}
