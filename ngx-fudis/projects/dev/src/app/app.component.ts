import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { TranslocoService } from '@ngneat/transloco';
import {
  // FudisAlertService,
  FudisDialogService,
  FudisGridService,
  FudisTranslationService,
  FudisBreakpointService,
  FudisErrorSummaryService,
  // FudisValidators,
  // FudisGroupValidators,
} from 'ngx-fudis';
import { DOCUMENT } from '@angular/common';

import {
  FudisSelectOption,
  FudisCheckboxOption,
  FudisRadioButtonOption,
} from 'dist/ngx-fudis/lib/types/forms';

// import { FudisAlert } from 'dist/ngx-fudis/lib/types/miscellaneous';
// import { FormControl, FormGroup } from '@angular/forms';
import { DialogTestContentComponent } from './dialog-test/dialog-test-content/dialog-test-content.component';
import { FudisGridAlign } from 'projects/ngx-fudis/src/lib/types/grid';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogTestFormComponent } from './dialog-test/dialog-test-content/dialog-test-form.component';

// type MyForm = {
//   textInput: FormControl<string | null | number>;
//   checkboxFormGroup: FormGroup;
//   truth: FormControl<boolean | null>;
// };

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { res: string },
    @Inject(DOCUMENT) private _document: Document,
    private _dialogService: FudisDialogService,
    private _translocoService: TranslocoService,
    private _gridService: FudisGridService,
    private _fudisLanguage: FudisTranslationService,
    // private _alertService: FudisAlertService,
    private _errorSummaryService: FudisErrorSummaryService,
    private _breakpointService: FudisBreakpointService,
  ) {
    _gridService.setDefaultValues({
      columns: { xs: 1, md: 2 },
      align: 'center',
    });
  }

  @ViewChild('exampleDialogTemplate', { static: true }) templateRef: TemplateRef<unknown>;

  title = 'dev';

  visibleRemValue: number;

  fontSize: string;

  multiplier: number;

  newRemBase: string;

  protected _message: string;

  dropdownOptions: FudisSelectOption[] = [
    { value: 'value-1-dog', label: 'Dog' },
    { value: 'value-2-capybara', label: 'Capybara' },
    { value: 'value-3-platypys', label: 'Platypus' },
    { value: 'value-4-cat', label: 'Really dangerous cat', disabled: true },
    { value: 'value-5-armadillo', label: 'Screaming hairy armadillo' },
    { value: 'value-6-gecko', label: 'Southern Titiwangsa Bent-Toed Gecko' },
  ];

  errorSummaryVisible = false;

  multipleOptions = Array.from({ length: 1000 }).map((value, i) => {
    return {
      value: i,
      label: `Item number ${i}`,
    };
  });

  testData = [
    { key: 'First Name', value: 'Rex' },
    { key: 'Last Name', value: 'Dangerwest' },
    { key: 'Alias', value: 'Radical Emmet Xtreme' },
    { key: 'Voice actor', value: 'Chris Pratt' },
    { key: 'Favorite animal', value: 'Velociraptor', subHeading: 'Dinosaurus' },
    { key: 'Real name', value: 'Emmet Joseph Brickowski' },
    { key: 'Species', value: 'Lego' },
    { key: 'Enemy', value: 'Emmet Brickowski', subHeading: 'Archenemy' },
    { key: 'Enemy', value: 'Lucy', subHeading: 'Second Archenemy' },
  ];

  checkboxOptions: FudisCheckboxOption[] = [
    { controlName: 'blueberry', label: 'blueberry' },
    { controlName: 'cloudberry', label: 'cloudberry' },
    { controlName: 'raspberry', label: 'raspberry' },
    { controlName: 'strawberry', label: 'strawberry' },
  ];

  radioButtonOptions: FudisRadioButtonOption[] = [
    { value: true, label: 'True', id: 'boolean-2' },
    { value: false, label: 'False', id: 'boolean-1' },
  ];

  // testFormGroup = new FormGroup<MyForm>({
  //   textInput: new FormControl<string | null | number>(null, [
  //     FudisValidators.required(
  //       this._translocoService.selectTranslateObject('form_errors.required'),
  //     ),
  //     FudisValidators.minLength(
  //       5,
  //       this._translocoService.selectTranslateObject('form_errors.notEnoughCharacters'),
  //     ),
  //   ]),
  //   checkboxFormGroup: new FormGroup(
  //     {
  //       blueberry: new FormControl<FudisCheckboxOption | null>(null),
  //       cloudberry: new FormControl<FudisCheckboxOption | null>(null),
  //       raspberry: new FormControl<FudisCheckboxOption | null>(null),
  //       strawberry: new FormControl<FudisCheckboxOption | null>(null),
  //     },
  //     [
  //       FudisGroupValidators.min({
  //         value: 2,
  //         message: this._translocoService.selectTranslate('chooseBerryErrorMin'),
  //       }),
  //       FudisGroupValidators.max({
  //         value: 3,
  //         message: this._translocoService.selectTranslate('chooseBerryErrorMax'),
  //       }),
  //     ],
  //   ),
  //   truth: new FormControl<boolean | null>(
  //     null,
  //     FudisValidators.required(
  //       this._translocoService.selectTranslateObject('form_errors.required'),
  //     ),
  //   ),
  // });

  protected _gridAlignValue: FudisGridAlign = 'end';

  ngOnInit(): void {
    this._translocoService.setActiveLang('fi');
    this._translocoService.setActiveLang('en');

    this._document.documentElement.lang = 'en';
    this._fudisLanguage.setLanguage('en');
    this.getMultiplier();
    this.getApplicationFontSize();
  }

  // triggerAlert(): void {
  //   const newAlert: FudisAlert = {
  //     message: 'Something dangerous MIGHT happen.',
  //     type: 'warning',
  //     id: 'my-own-id-3',
  //     routerLinkUrl: '/',
  //     linkTitle: 'More info about this warning.',
  //   };
  //   this._alertService.addAlert(newAlert);
  // }

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

  // submitDialogForm(): void {
  //   this.testFormGroup.markAllAsTouched();

  //   if (this.testFormGroup.invalid) {
  //     this.errorSummaryVisible = true;
  //     this._errorSummaryService.reloadErrors();
  //   } else {
  //     this.errorSummaryVisible = false;
  //     this._dialogService.close(this.data.size);
  //   }
  // }
  submitDialogForm(): void {
    // if (this.testFormGroup.valid) {
    //   this._dialog.close();
    // }
  }

  doSomething(event: Event) {
    console.log('event received!', event);
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
