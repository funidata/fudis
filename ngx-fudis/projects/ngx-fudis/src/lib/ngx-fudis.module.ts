import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { FudisDialogTitle } from './fudis-dialog/fudis-dialog-title.directive';
import { FudisDialogService } from './fudis-dialog/fudis-dialog.service';
import { NgxFudisComponent } from './ngx-fudis.component';

@NgModule({
  declarations: [NgxFudisComponent, FudisDialogTitle],
  imports: [MatDialogModule],
  exports: [NgxFudisComponent, FudisDialogTitle],
  providers: [FudisDialogService],
})
export class NgxFudisModule {}
