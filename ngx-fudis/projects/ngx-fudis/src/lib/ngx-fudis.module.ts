import { NgModule } from '@angular/core';
import { NgxFudisComponent } from './ngx-fudis.component';
import { FudisDialogComponent } from './fudis-dialog/fudis-dialog.component';



@NgModule({
  declarations: [
    NgxFudisComponent,
    FudisDialogComponent
  ],
  imports: [
  ],
  exports: [
    NgxFudisComponent
  ]
})
export class NgxFudisModule { }
