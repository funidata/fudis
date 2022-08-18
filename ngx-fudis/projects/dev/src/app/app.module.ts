import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { DialogTestComponent } from './dialog-test/dialog-test.component';
import { DialogTestContentComponent } from './dialog-test/dialog-test-content/dialog-test-content.component';
import { FudisDialogModule } from "../../../ngx-fudis/src/lib/fudis-dialog";

@NgModule({
  declarations: [AppComponent, DialogTestComponent, DialogTestContentComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FudisDialogModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
