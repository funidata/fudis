import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Injectable, NgModule, inject, isDevMode } from '@angular/core';
import {
  Translation,
  TranslocoLoader,
  TranslocoModule,
  provideTransloco,
} from '@jsverse/transloco';

/**
 * TranslocoHttpLoader implementation to use in 'loader' in the module.
 * This is where the language files loaded.
 */
@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private http = inject(HttpClient);

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/${lang}.json`);
  }
}

@NgModule({
  exports: [TranslocoModule],
  providers: [
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: ['en', 'fi'],
        defaultLang: 'en',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
  ],
})
export class TranslocoRootModule {}
