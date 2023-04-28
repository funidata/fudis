import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxFudisModule } from 'ngx-fudis';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DialogTestComponent } from './dialog-test/dialog-test.component';
import { DialogTestContentComponent } from './dialog-test/dialog-test-content/dialog-test-content.component';
import { TranslocoRootModule } from './transloco-root.module';

@NgModule({
	declarations: [AppComponent, DialogTestComponent, DialogTestContentComponent],
	imports: [BrowserModule, BrowserAnimationsModule, FormsModule, NgxFudisModule, HttpClientModule, TranslocoRootModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
