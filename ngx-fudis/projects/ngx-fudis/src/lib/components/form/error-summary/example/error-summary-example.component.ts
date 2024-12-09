import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FudisFormErrorSummaryUpdateStrategy } from '../../../../types/errorSummary';
import { NgxFudisModule } from '../../../../ngx-fudis.module';
import { Observable } from 'rxjs';
import { FudisErrorSummaryService } from '../../../../services/form/error-summary/error-summary.service';
import { FudisGroupValidators } from '../../../../utilities/form/groupValidators';
import { FudisValidators } from '../../../../utilities/form/validators';
import { FudisTranslationService } from '../../../../services/translation/translation.service';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';

type Error = {
  formId: string;
  focusId: string;
  id: string;
  message: Observable<string>;
};

interface CourseBooksFormGroup {
  first: FormControl<boolean | null>;
  second: FormControl<boolean | null>;
  third: FormControl<boolean | null>;
}

@Component({
  standalone: true,
  imports: [NgxFudisModule, CommonModule, TranslocoDirective],
  selector: 'example-error-summary',
  templateUrl: './error-summary-example.component.html',
})
export class ErrorSummaryExampleComponent implements OnInit {
  constructor(
    private _errorSummaryService: FudisErrorSummaryService,
    private _translationService: FudisTranslationService,
    private _transloco: TranslocoService,
  ) {}

  toggleLive: FudisFormErrorSummaryUpdateStrategy = 'reloadOnly';

  formExample = new FormGroup({
    courseBooks: new FormGroup<CourseBooksFormGroup>(
      {
        first: new FormControl(null),
        second: new FormControl(null),
        third: new FormControl(null),
      },
      [
        FudisGroupValidators.min({
          value: 1,
          message: this._transloco.selectTranslateObject('form.courseBooks.errors.min'),
        }),
        FudisGroupValidators.max({
          value: 2,
          message: this._transloco.selectTranslateObject('form.courseBooks.errors.max'),
        }),
      ],
    ),
    teacher: new FormControl(
      null,
      FudisValidators.required(
        this._transloco.selectTranslateObject('form.teacherName.errors.required'),
      ),
    ),
    email: new FormControl(null, [
      FudisValidators.required(
        this._transloco.selectTranslateObject('form.teacherEmail.errors.required'),
      ),
      FudisValidators.email(
        this._transloco.selectTranslateObject('form.teacherEmail.errors.email'),
      ),
    ]),
    importantDate: new FormControl(
      null,
      FudisValidators.required(
        this._transloco.selectTranslateObject('form.startDate.errors.required'),
      ),
    ),
    courseType: new FormControl(
      null,
      FudisValidators.required(
        this._transloco.selectTranslateObject('form.courseType.errors.required'),
      ),
    ),
  });

  courseTypeOptions = ['basic', 'advanced'];

  ngOnInit(): void {
    this.firstErrorData = {
      id: 'first-manual-error',
      focusId: 'error-button-1',
      formId: 'fudis-form-1',
      message: this._transloco.selectTranslateObject('customError1'),
    };

    this.secondErrorData = {
      id: 'second-manual-error',
      focusId: 'error-button-2',
      formId: 'fudis-form-1',
      message: this._transloco.selectTranslateObject('customError2'),
    };
  }

  toggleLiveRemove(): void {
    if (this._errorSummaryService.updateStrategy === 'reloadOnly') {
      this._errorSummaryService.setUpdateStrategy('onRemove');
      this.toggleLive = this._errorSummaryService.updateStrategy;
    } else if (this._errorSummaryService.updateStrategy === 'onRemove') {
      this._errorSummaryService.setUpdateStrategy('all');
      this.toggleLive = this._errorSummaryService.updateStrategy;
    } else {
      this._errorSummaryService.setUpdateStrategy('reloadOnly');
      this.toggleLive = this._errorSummaryService.updateStrategy;
    }
  }

  changeLanguage(): void {
    const currLang = this._translationService.getLanguage();

    if (currLang === 'en') {
      this._translationService.setLanguage('fi');
      this._transloco.setActiveLang('fi');
    } else {
      this._translationService.setLanguage('en');
      this._transloco.setActiveLang('en');
    }
  }

  firstError = false;
  secondError = false;
  firstErrorData: Error;
  secondErrorData: Error;

  toggleFirstError(): void {
    this.firstError = !this.firstError;

    if (this.firstError) {
      this._errorSummaryService.addError(
        this.firstErrorData.id,
        this.firstErrorData.formId,
        this.firstErrorData.focusId,
        this.firstErrorData.message,
      );
    } else {
      this._errorSummaryService.removeError(
        this.firstErrorData.id,
        this.firstErrorData.formId,
        this.firstErrorData.focusId,
      );
    }
  }
  toggleSecondError(): void {
    this.secondError = !this.secondError;

    if (this.secondError) {
      this._errorSummaryService.addError(
        this.secondErrorData.id,
        this.secondErrorData.formId,
        this.secondErrorData.focusId,
        this.secondErrorData.message,
      );
    } else {
      this._errorSummaryService.removeError(
        this.secondErrorData.id,
        this.secondErrorData.formId,
        this.secondErrorData.focusId,
      );
    }
  }
}
