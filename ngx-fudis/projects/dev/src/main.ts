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
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { ExerciseComponent } from './app/exercises/exercise.component';
import { ExerciseOneComponent } from './app/exercises/exercise-one/exercise-one.component';
import { ExerciseTwoComponent } from './app/exercises/exercise-two/exercise-two.component';
import { SandboxComponent } from './app/sandbox/sandbox.component';

const appRoutes: Routes = [
  { path: '', component: SandboxComponent },
  { path: 'sandbox', component: SandboxComponent },
  {
    path: 'exercise',
    component: ExerciseComponent,
    children: [
      { path: 'exercise-one', component: ExerciseOneComponent },
      { path: 'exercise-two', component: ExerciseTwoComponent },
    ],
  },
];

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
    provideRouter([...appRoutes]),
  ],
}).catch((err) => console.error(err));
