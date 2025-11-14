import { Component } from '@angular/core';
import { FudisTranslationService } from '../../../../services/translation/translation.service';
import { NgxFudisModule } from '../../../../ngx-fudis.module';
import { CommonModule } from '@angular/common';

@Component({
  imports: [NgxFudisModule, CommonModule],
  selector: 'example-language-change-component',
  template: ` <fudis-grid [classes]="'fudis-mt-sm'" [rowGap]="'xs'">
    <fudis-button [label]="_label" (handleClick)="changeLanguage()" />
    <fudis-body-text>Current language: {{ _translationService.getLanguage() }}</fudis-body-text>
  </fudis-grid>`,
})
export class LanguageChangeComponent {
  constructor(protected _translationService: FudisTranslationService) {
    this._translationService.setLanguage('en');
  }

  protected _label = 'Change calendar language';

  changeLanguage(): void {
    if (this._translationService.getLanguage() === 'en') {
      this._translationService.setLanguage('fi');
    } else if (this._translationService.getLanguage() === 'fi') {
      this._translationService.setLanguage('sv');
    } else {
      this._translationService.setLanguage('en');
    }
  }
}
