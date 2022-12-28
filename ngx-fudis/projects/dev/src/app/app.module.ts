import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxFudisModule } from 'ngx-fudis';
import { MatSelectModule } from '@angular/material/select';
import { AppComponent } from './app.component';
import { DialogTestComponent } from './dialog-test/dialog-test.component';
import { DialogTestContentComponent } from './dialog-test/dialog-test-content/dialog-test-content.component';

@NgModule({
	declarations: [AppComponent, DialogTestComponent, DialogTestContentComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		NgxFudisModule,
		MatButtonModule,
		MatInputModule,
		MatFormFieldModule,
		MatDialogModule,
		MatCheckboxModule,
		MatSelectModule,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
