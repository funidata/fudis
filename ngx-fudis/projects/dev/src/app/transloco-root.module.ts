/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-classes-per-file */
import { HttpClient } from '@angular/common/http';
import {
	TRANSLOCO_LOADER,
	Translation,
	TranslocoLoader,
	TRANSLOCO_CONFIG,
	translocoConfig,
	TranslocoModule,
} from '@ngneat/transloco';
import { Injectable, NgModule } from '@angular/core';
import { TranslocoPreloadLangsModule } from '@ngneat/transloco-preload-langs';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
	constructor(private _http: HttpClient) {}

	getTranslation(lang: string) {
		return this._http.get<Translation>(`../../assets/i18n/${lang}.json`);
	}
}

@NgModule({
	imports: [TranslocoPreloadLangsModule.forRoot(['fi', ''])],
	exports: [TranslocoModule],
	providers: [
		{
			provide: TRANSLOCO_CONFIG,
			useValue: translocoConfig({
				availableLangs: ['en', 'fi'],
				defaultLang: 'en',
				// Remove this option if your application doesn't support changing language in runtime.
				reRenderOnLangChange: true,
				prodMode: environment.production,
			}),
		},
		{ provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
	],
})
export class TranslocoRootModule {}
