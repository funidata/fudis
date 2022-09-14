import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import {
  FudisDialogActions,
  FudisDialogClose,
  FudisDialogContent,
  FudisDialogTitle,
} from './components/dialog/dialog-directives';
import { FudisDialog } from './components/dialog/dialog';
import Button from './components/button/button.component';

@NgModule({
  declarations: [
    FudisDialogTitle,
    FudisDialogActions,
    FudisDialogContent,
    FudisDialogClose,
    Button,
  ],
  imports: [MatDialogModule, CommonModule],
  exports: [FudisDialogTitle, FudisDialogActions, FudisDialogContent, FudisDialogClose, Button],
  providers: [FudisDialog],
})
export class NgxFudisModule {}
