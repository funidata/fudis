import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Host,
  Input,
  OnChanges,
  OnInit,
  Optional,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';
import { FudisInputSize } from '../../../types/forms';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisFocusService } from '../../../services/focus/focus.service';
import {
  getMaxLengthFromValidator,
  getMinLengthFromValidator,
  hasRequiredValidator,
} from '../../../utilities/form/getValidators';
import { FudisComponentChanges } from '../../../types/miscellaneous';
import { FormComponent } from '../form/form.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';

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
    @Host() @Optional() protected _parentForm: FormComponent | null,
    private _focusService: FudisFocusService,
    _idService: FudisIdService,
    _changeDetectorRef: ChangeDetectorRef,
  ) {
    super(_idService, _changeDetectorRef);
    this._updateValueAndValidityTrigger.pipe(takeUntilDestroyed()).subscribe(() => {
      if (this.control) {
        this._required.next(hasRequiredValidator(this.control));
        this._maxLength.next(getMaxLengthFromValidator(this.control));
        this._minLength.next(getMinLengthFromValidator(this.control));
      }
    });
  }

  /**
   * FormControl for text-area
   */
  @Input({ required: true }) override control: FormControl<string | null | number>;

  /**
   * Text Area size
   */
  @Input() size: FudisInputSize = 'lg';

  /**
   * Min length for HTML attribute
   */
  protected _minLength = new BehaviorSubject<number | null>(null);

  /**
   * Max length for HTML attribute and for character indicator in guidance
   */
  protected _maxLength = new BehaviorSubject<number | null>(null);

  ngOnInit(): void {
    this._setInputId('text-area');
    this._updateValueAndValidityTrigger.next();

    /**
     * TODO: write test
     */
    this.control.valueChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((value) => {
      if (typeof value === 'string' && value.trim() === '') {
        this.control.setValue(null);
      }
    });

    this._triggerErrorSummaryOnInitReload(this._parentForm?.errorSummaryVisible, this.control);
  }

  ngOnChanges(changes: FudisComponentChanges<TextAreaComponent>): void {
    if (changes.control?.currentValue !== changes.control?.previousValue) {
      this._applyControlUpdateCheck();
    }
  }

  ngAfterViewInit(): void {
    if (this.initialFocus && !this._focusService.isIgnored(this.id)) {
      this.focusToInput();
    }
    this.handleViewInit.emit();
    /**
     * If Angular FormControl has 'disabled' property, it will bind this as HTML attribute as well. This prevents user to focus to it. This check removes that attribute making input focusable again.
     */
    if (this.control.disabled) {
      this._inputRef.nativeElement.removeAttribute('disabled');
    }
  }
}
