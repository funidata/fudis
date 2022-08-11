import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { FudisDialogService } from './fudis-dialog/fudis-dialog.service';
import { NgxFudisComponent } from './ngx-fudis.component';

@NgModule({
  declarations: [NgxFudisComponent],
  imports: [MatDialogModule],
  exports: [NgxFudisComponent],
  providers: [FudisDialogService],
})
export class NgxFudisModule {}
