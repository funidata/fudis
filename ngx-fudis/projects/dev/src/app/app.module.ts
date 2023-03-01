import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxFudisModule } from 'ngx-fudis';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppComponent } from './app.component';
import { DialogTestComponent } from './dialog-test/dialog-test.component';
import { DialogTestContentComponent } from './dialog-test/dialog-test-content/dialog-test-content.component';

@NgModule({
	declarations: [AppComponent, DialogTestComponent, DialogTestContentComponent],
	imports: [BrowserModule, BrowserAnimationsModule, FormsModule, NgxFudisModule, MatButtonModule, MatTooltipModule],
	bootstrap: [AppComponent],
})
export class AppModule {}
