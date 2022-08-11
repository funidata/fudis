import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxFudisModule } from '../../../ngx-fudis/src/public-api';

import { AppComponent } from './app.component';
import { DialogTestComponent } from './dialog-test/dialog-test.component';
import { DialogTestContentComponent } from './dialog-test/dialog-test-content/dialog-test-content.component';

@NgModule({
  declarations: [AppComponent, DialogTestComponent, DialogTestContentComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxFudisModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
