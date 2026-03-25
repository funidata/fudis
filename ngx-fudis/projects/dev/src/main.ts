import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgxFudisModule } from 'ngx-fudis';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TranslocoRootModule } from './app/transloco-root.module';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      FormsModule,
      NgxFudisModule.forRoot(),
      ScrollingModule,
      TranslocoRootModule,
    ),
    {
      provide: MatDialogRef,
      useValue: {},
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: [],
    },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideRouter([]),
  ],
}).catch((err) => console.error(err));
