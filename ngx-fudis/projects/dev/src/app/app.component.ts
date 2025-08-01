import { Component, Inject, OnInit } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import {
  FudisAlertService,
  FudisDialogService,
  FudisGridService,
  FudisTranslationService,
  FudisBreakpointService,
  FudisErrorSummaryService,
} from 'ngx-fudis';
import { DOCUMENT } from '@angular/common';
import { FudisCheckboxGroupOption } from 'dist/ngx-fudis/lib/types/forms';
import { FudisAlert } from 'dist/ngx-fudis/lib/types/miscellaneous';
import { DialogTestContentComponent } from './dialog-test/dialog-test-content/dialog-test-content.component';
import { FudisGridAlign } from 'projects/ngx-fudis/src/lib/types/grid';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogTestFormComponent } from './dialog-test/dialog-test-content/dialog-test-form.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { res: string },
    @Inject(DOCUMENT) private _document: Document,
    private _dialogService: FudisDialogService,
    private _translocoService: TranslocoService,
    private _gridService: FudisGridService,
    private _fudisLanguage: FudisTranslationService,
    private _alertService: FudisAlertService,
    private _errorSummaryService: FudisErrorSummaryService,
    private _breakpointService: FudisBreakpointService,
  ) {
    _gridService.setDefaultValues({
      columns: { xs: 1, md: 2 },
      align: 'center',
    });
  }

  title = 'dev';
  visibleRemValue: number;
  fontSize: string;
  multiplier: number;
  newRemBase: string;
  errorSummaryVisible = false;
  protected _message: string;

  checkboxOptions: FudisCheckboxGroupOption<object>[] = [
    { controlName: 'blueberry', label: 'blueberry' },
    { controlName: 'cloudberry', label: 'cloudberry' },
    { controlName: 'raspberry', label: 'raspberry' },
    { controlName: 'strawberry', label: 'strawberry' },
  ];

  protected _gridAlignValue: FudisGridAlign = 'end';

  ngOnInit(): void {
    this._translocoService.setActiveLang('fi');
    this._translocoService.setActiveLang('en');

    this._document.documentElement.lang = 'en';
    this._fudisLanguage.setLanguage('en');
    this.getMultiplier();
    this.getApplicationFontSize();
  }

  triggerAlert(): void {
    const newAlert: FudisAlert = {
      message: this._translocoService.selectTranslate('alertText'),
      type: 'warning',
      id: 'my-own-id-3',
    };
    this._alertService.addAlert(newAlert);
  }

  getApplicationFontSize(): void {
    this.fontSize = getComputedStyle(
      document.querySelector('html') as HTMLElement,
    ).getPropertyValue('font-size');
    if (this.fontSize === '16px') {
      this.fontSize = '100%';
    }
  }

  getMultiplier(): void {
    const currentRemBase: string = getComputedStyle(
      document.querySelector(':root') as HTMLElement,
    ).getPropertyValue('--fudis-rem-multiplier');
    this.multiplier = Number(currentRemBase);
    this.visibleRemValue = this.multiplier * 16;
  }

  /* Following function is for testing changing Application pixel base between 16 and 10 pixel base values */
  changeRemBase(): void {
    if (this.multiplier === 1) {
      this.newRemBase = '0.625';
      this.fontSize = '62.5%';
    } else {
      this.newRemBase = '1';
      this.fontSize = '100%';
    }
    const documentRoot = document.querySelector(':root') as HTMLElement;
    const documentHtml = document.querySelector('html') as HTMLElement;

    documentRoot.style.setProperty('--fudis-rem-multiplier', this.newRemBase);
    documentHtml.style.setProperty('font-size', this.fontSize);
    this.getMultiplier();
  }

  changeLanguage(): void {
    if (this._translocoService.getActiveLang() === 'en') {
      this._document.documentElement.lang = 'fi';
      this._fudisLanguage.setLanguage('fi');
      this._translocoService.setActiveLang('fi');
    } else {
      this._document.documentElement.lang = 'en';
      this._translocoService.setActiveLang('en');
      this._fudisLanguage.setLanguage('en');
    }
  }

  openDialog(): void {
    const dialogRef = this._dialogService.open(DialogTestFormComponent, {
      data: { size: 'sm', greeting: 'Hello from component which opened this dialog' },
    });

    dialogRef.afterClosed().subscribe((response: string) => {
      this._message = response;
    });
  }

  openDialogFromComponent(): void {
    this._dialogService.open(DialogTestContentComponent);
  }

  updateGridAlignValue(): void {
    this._gridAlignValue =
      this._gridAlignValue === 'center'
        ? 'end'
        : this._gridAlignValue === 'end'
          ? 'start'
          : 'center';
  }

  updateGridServiceDefaults(): void {
    console.log('Current GridService defaults are:');
    console.log(this._gridService.getDefaultValues()());

    const updateValue =
      this._gridService.getDefaultValues()()?.alignItemsX === 'end' ? 'stretch' : 'end';

    const updateColumnsValue =
      JSON.stringify(this._gridService.getDefaultValues()()?.columns) === '{"xs":1,"md":2}'
        ? { xs: 1, md: 3 }
        : { xs: 1, md: 2 };

    this._gridService.setDefaultValues({
      alignItemsX: updateValue,
      columns: updateColumnsValue,
    });
    console.log('Updated GridService defaults are:');
    console.log(this._gridService.getDefaultValues()());
  }
}
