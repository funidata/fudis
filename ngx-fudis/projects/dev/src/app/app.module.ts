import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxFudisModule } from 'ngx-fudis';
import { UIRouterModule } from '@uirouter/angular';

import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DialogTestComponent } from './dialog-test/dialog-test.component';
import { DialogTestContentComponent } from './dialog-test/dialog-test-content/dialog-test-content.component';
import { TranslocoRootModule } from './transloco-root.module';
import { AppFormExampleComponent } from './components/formExamples.component';
import { ExamplePageComponent } from './components/examplePage.component';
import { AppDropdownExamplesComponent } from './components/dropdownExamples.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogTestFormComponent } from './dialog-test/dialog-test-content/dialog-test-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogTestComponent,
    DialogTestContentComponent,
    DialogTestFormComponent,
    AppFormExampleComponent,
    AppDropdownExamplesComponent,
    ExamplePageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxFudisModule,
    ScrollingModule,
    HttpClientModule,
    TranslocoRootModule,
    RouterModule.forRoot([]),
    UIRouterModule.forRoot({
      states: [{ name: 'example', url: '/example', component: ExamplePageComponent }],
      useHash: false,
    }),
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: [],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
