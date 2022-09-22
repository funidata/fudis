import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import {
  FudisDialogActionsDirective,
  FudisDialogCloseDirective,
  FudisDialogContentDirective,
  FudisDialogTitleDirective,
} from './components/dialog/dialog-directives';
import { FudisDialog } from './components/dialog/dialog';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    FudisDialogTitleDirective,
    FudisDialogActionsDirective,
    FudisDialogContentDirective,
    FudisDialogCloseDirective,
    ButtonComponent,
  ],
  imports: [MatDialogModule, CommonModule],
  exports: [
    FudisDialogTitleDirective,
    FudisDialogActionsDirective,
    FudisDialogContentDirective,
    FudisDialogCloseDirective,
    ButtonComponent,
  ],
  providers: [FudisDialog],
})
export class NgxFudisModule {}
