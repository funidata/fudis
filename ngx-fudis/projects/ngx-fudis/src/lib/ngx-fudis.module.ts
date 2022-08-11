import { NgModule } from '@angular/core';
import { MatDialogModule } from "@angular/material/dialog";
import { NgxFudisComponent } from './ngx-fudis.component';

@NgModule({
  declarations: [NgxFudisComponent],
  imports: [MatDialogModule],
  exports: [NgxFudisComponent],
})
export class NgxFudisModule {}
