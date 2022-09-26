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
import { Heading } from './components/heading/heading.component';

@NgModule({
  declarations: [
    FudisDialogTitle,
    FudisDialogActions,
    FudisDialogContent,
    FudisDialogClose,
    Button,
    Heading,
  ],
  imports: [MatDialogModule, CommonModule],
  exports: [
    FudisDialogTitle,
    FudisDialogActions,
    FudisDialogContent,
    FudisDialogClose,
    Button,
    Heading,
  ],
  providers: [FudisDialog],
})
export class NgxFudisModule {}
