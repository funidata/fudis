import { AfterViewInit, Component, Host, Input, OnChanges, OnInit, Optional } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';
import { FudisInputSize } from '../../../types/forms';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisFocusService } from '../../../services/focus/focus.service';
import {
  getMaxLengthFromValidator,
  getMinLengthFromValidator,
  hasRequiredValidator,
} from '../../../utilities/form/getValidators';
import { FudisComponentChanges } from '../../../types/miscellaneous';
import { FormComponent } from '../form/form.component';
import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'fudis-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent
  extends InputBaseDirective
  implements OnInit, OnChanges, AfterViewInit
{
  constructor(
    @Host() @Optional() protected _parentForm: FormComponent,
    _errorSummaryService: FudisInternalErrorSummaryService,
    private _focusService: FudisFocusService,
    _idService: FudisIdService,
    _translationService: FudisTranslationService,
  ) {
    super(_translationService, _idService, _errorSummaryService);
  }

  /**
   * FormControl for text-area
   */
  @Input({ required: true }) control: FormControl<string | null | number>;

  /**
   * Text Area size
   */
  @Input() size: FudisInputSize = 'lg';

  /**
   * Min length for HTML attribute
   */
  protected _minLength: number | undefined = undefined;

  /**
   * Max length for HTML attribute and for character indicator in guidance
   */
  protected _maxLength: number | undefined = undefined;

  ngOnInit(): void {
    this._setInputId('text-area');

    /**
     * TODO: write test
     */
    this.control.valueChanges.pipe(takeUntil(this._destroyed)).subscribe((value) => {
      if (typeof value === 'string' && value.trim() === '') {
        this.control.setValue(null);
      }
    });
  }

  ngOnChanges(changes: FudisComponentChanges<TextAreaComponent>): void {
    if (changes.control) {
      this._required = hasRequiredValidator(this.control);
      this._maxLength = getMaxLengthFromValidator(this.control);
      this._minLength = getMinLengthFromValidator(this.control);
    }
  }

  ngAfterViewInit(): void {
    if (this.initialFocus && !this._focusService.isIgnored(this.id)) {
      this.focusToInput();
    }

    if (this._parentForm?.errorSummaryVisible && this.errorSummaryReloadOnInit) {
      this.reloadErrorSummary(this.control, this._parentForm.id);
    }
  }
}
