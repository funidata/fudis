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
import { Heading } from './components/heading/heading.component';

@NgModule({
  declarations: [
    FudisDialogTitleDirective,
    FudisDialogActionsDirective,
    FudisDialogContentDirective,
    FudisDialogCloseDirective,
    ButtonComponent,
    Heading,
  ],
  imports: [MatDialogModule, CommonModule],
  exports: [
    FudisDialogTitleDirective,
    FudisDialogActionsDirective,
    FudisDialogContentDirective,
    FudisDialogCloseDirective,
    ButtonComponent,
    Heading,
  ],
  providers: [FudisDialog],
})
export class NgxFudisModule {}
