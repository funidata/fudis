import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { FudisDialog } from './fudis-dialog/fudis-dialog';
import { NgxFudisComponent } from './ngx-fudis.component';

@NgModule({
  declarations: [NgxFudisComponent],
  imports: [MatDialogModule],
  exports: [NgxFudisComponent],
  providers: [FudisDialog],
})
export class NgxFudisModule {}
