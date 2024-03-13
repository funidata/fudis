import {
  Directive,
  Input,
  EventEmitter,
  Output,
  Signal,
  effect,
  ViewChild,
  ElementRef,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { TooltipApiDirective } from '../../tooltip/tooltip-api.directive';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisTranslationConfig } from '../../../types/miscellaneous';
import { FudisIdComponent } from '../../../types/id';
import { FudisIdService } from '../../../services/id/id.service';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Directive({
  selector: '[fudisInputBase]',
})
export class InputBaseDirective extends TooltipApiDirective implements OnDestroy {
  constructor(
    protected _translationService: FudisTranslationService,
    protected _idService: FudisIdService,
    protected _changeDetectorRef: ChangeDetectorRef,
  ) {
    super();

    effect(() => {
      this._translations = _translationService.getTranslations();
      this._requiredText = this._translations().REQUIRED;
    });
  }

  /**
   * Template reference for input. Used in e. g. initialFocus
   */
  @ViewChild('inputRef') protected _inputRef: ElementRef;

  /**
   * Label for input.
   */
  @Input({ required: true }) label: string;

  /**
   * For screen reader users for providing additional information by extending text content in normal label. Used in e. g. input with language options for providing info about currently selected language.
   */
  @Input() ariaLabel: string;

  /**
   * Unique id for input.
   */
  @Input() id: string;

  /**
   * If component is a child of Form component, Form's Error Summary is visible,this component's control has errors and when this component is loaded for the first time, it will by default call Error Summary to reload itself again and mark control as touched. This is because if component is lazy loaded to the DOM after the initial reload errors call was made, errors of this component might not appear on the list. To disable this feature, set this to false.
   */
  @Input() errorSummaryReloadOnInit: boolean = true;

  // TODO: Disabling should be done straight from the form control. But because form control sets HTML disabled="true" and not only aria-disabled="true", this will be prevent user to focus on input even if it 'disabled'. As long this Angular 'feature' exists, we should 'manually' provide disabling through input as well.

  /**
   * Option for disabling the input.
   */
  @Input() disabled: boolean = false;

  /**
   * Help text, aligned underneath the input.
   */
  @Input() helpText: string | undefined;

  /**
   * Set input's visual style and attributes as invalid. Does not override if control.invalid is true.
   */
  @Input() invalidState: boolean = false;

  /**
   * Set browser focus to input on the first load.
   */
  @Input() initialFocus: boolean = false;

  /**
   * If Guidance should be disabled for this component instance. No help text or errors will be visible.
   */
  @Input() disableGuidance: boolean;

  /**
   * To listen for input's blur event.
   */
  @Output() handleBlur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

  /**
   * Basic Fudis translation keys
   */
  protected _translations: Signal<FudisTranslationConfig>;

  /**
   * Fudis translation key for required text
   */
  protected _requiredText: string;

  /**
   * Set requiredText based on this boolean value
   */
  protected _required: boolean = false;

  protected _focusTryCounter: number = 0;

  protected _destroyed = new Subject<void>();

  /**
   * To trigger Error Summary reload when this component's children Validator Error Messages are initialised. This is used in cases when this parent component is lazy loaded to DOM after initial Error Summary reload was called before children Validator Error Messages existed.
   */
  protected _reloadErrorSummary = false;

  /**
   * TODO: write test
   */
  protected reloadErrorSummary(control: FormControl): void {
    if (control.errors) {
      this._reloadErrorSummary = true;
      this._changeDetectorRef.detectChanges();
    }
  }

  public onBlur(event: FocusEvent): void {
    this.handleBlur.emit(event);
  }

  public focusToInput(): void {
    if (this._inputRef?.nativeElement) {
      this._inputRef.nativeElement.focus();
      this._focusTryCounter = 0;
    } else if (this._focusTryCounter < 100) {
      setTimeout(() => {
        this._focusTryCounter += 1;
        this.focusToInput();
      }, 100);
    }
  }

  protected _setInputId(componentType: FudisIdComponent): void {
    if (this.id) {
      this._idService.addNewId(componentType, this.id);
    } else {
      this.id = this._idService.getNewId(componentType);
    }
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }
}
