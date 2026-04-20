import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
  AfterViewInit,
  DOCUMENT,
  ChangeDetectionStrategy,
  signal,
  Signal,
} from '@angular/core';
import { FudisInputSize, FudisRadioButtonChangeEvent } from '../../../types/forms';
import { FudisValidatorUtilities } from '../../../utilities/form/validator-utilities';
import { FudisIdService } from '../../../services/id/id.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FudisComponentChanges } from '../../../types/miscellaneous';
import { ControlComponentBaseDirective } from '../../../directives/form/control-component-base/control-component-base.directive';
import { FudisFocusService } from '../../../services/focus/focus.service';
import { Subscription } from 'rxjs';
import { GuidanceComponent } from '../guidance/guidance.component';
import { FieldSetComponent } from '../fieldset/fieldset.component';
import { FieldsetContentDirective } from '../fieldset/fieldset-content.directive';
import { AsyncPipe } from '@angular/common';

/**
 * Groups mutually exclusive options.
 *
 * Use this component when user must select exactly one option from a set. Each `fudis-radio-button`
 * child must have an `[option]` input of type `FudisRadioButtonOption`.
 *
 * @example
 *   ```html
 *   <fudis-radio-button-group [label]="'Color'" [control]="colorControl">
 *     <fudis-radio-button [label]="'Red'" [value]="'red'"></fudis-radio-button>
 *     <fudis-radio-button [label]="'Blue'" [value]="'blue'"></fudis-radio-button>
 *   </fudis-radio-button-group>
 *   ```;
 */
@Component({
  selector: 'fudis-radio-button-group',
  templateUrl: './radio-button-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FieldSetComponent, FieldsetContentDirective, GuidanceComponent, AsyncPipe],
})
export class RadioButtonGroupComponent
  extends ControlComponentBaseDirective
  implements OnInit, OnChanges, AfterViewInit
{
  constructor(
    @Inject(DOCUMENT) private _document: Document,
    _focusService: FudisFocusService,
    _idService: FudisIdService,
  ) {
    super(_idService, _focusService);

    this._updateValueAndValidityTrigger.pipe(takeUntilDestroyed()).subscribe(() => {
      if (this.control) {
        this._required.next(FudisValidatorUtilities.required(this.control));
      }
    });
  }

  @ViewChild('radioButtonGroupGuidance') private _guidance: GuidanceComponent;

  /**
   * Width of Radio Button Group: 'sm' | 'md' | 'lg' | 'full-width'
   */
  @Input() size: FudisInputSize = 'lg';

  /**
   * Emit form control and changed option when one option is clicked
   */
  @Output() handleChange = new EventEmitter<FudisRadioButtonChangeEvent>();

  /**
   * Subscription for handling the valueChanges observable
   */
  private _subscription: Subscription;

  /**
   * Private signals for managing the state and selected value of the radio button group
   */
  private _selectedValue = signal<string | boolean | object | null | unknown>(null);
  private _touched = signal(false);
  private _invalid = signal(false);
  private _disabled = signal(false);

  /**
   * Publicly exposed readonly signals for template binding and external use (in single radio
   * button). Not meant to be set from outside the component, but reflect the current state of the
   * form control and selected value.
   */
  public readonly selectedValue: Signal<string | boolean | object | null | unknown> =
    this._selectedValue.asReadonly();
  public readonly touchedState: Signal<boolean> = this._touched.asReadonly();
  public readonly invalidState: Signal<boolean> = this._invalid.asReadonly();
  public readonly disabledState: Signal<boolean> = this._disabled.asReadonly();

  ngOnInit() {
    this._setParentComponentId('radio-button-group');
    this._updateValueAndValidityTrigger.next();
  }

  /**
   * Sync local signals with FormControl states and add value and validity check when control value
   * changes.
   */
  ngOnChanges(changes: FudisComponentChanges<RadioButtonGroupComponent>): void {
    if (changes.control?.currentValue !== changes.control?.previousValue) {
      this._syncControlState();
      this._subscription?.unsubscribe();
      this._subscription = this.control.valueChanges
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe(() => {
          this._syncControlState();
          this._updateValueAndValidityTrigger.next();
        });
    }
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();

    /**
     * For Screen reader users bind guidance text to first radio child input
     */
    const firstRadio = this._getFirstEnabledRadio();
    const guidanceId = this._guidance?.['_id'];

    if (firstRadio && guidanceId) {
      firstRadio.setAttribute('aria-describedby', guidanceId);
    }
  }

  /**
   * Return first radio child input when it is not disabled
   */
  private _getFirstEnabledRadio(): HTMLInputElement | null {
    const radioIds = this._idService.getAllChildrenIds('radio-button-group', this.id);
    if (!radioIds?.length) return null;

    const radio = this._document.getElementById(radioIds[0]);
    if (!(radio instanceof HTMLInputElement) || radio.disabled) {
      return null;
    }

    return radio;
  }

  /**
   * Copy FormControl states into local signals
   */
  private _syncControlState(): void {
    if (!this.control) return;

    this._selectedValue.set(this.control.value);
    this._touched.set(this.control.touched);
    this._invalid.set(this.control.invalid);
    this._disabled.set(this.control.disabled);
  }

  /**
   * Blur can mark the control as touched without changing its value. Sync the local state after
   * Angular Forms finishes blur handling.
   */
  public onRadioBlur(event: FocusEvent): void {
    this.handleBlur.emit(event);

    // Wait for the current call stack to finish, allowing Angular Forms to update the control's states before syncing.
    queueMicrotask(() => {
      this._syncControlState();
      this._updateValueAndValidityTrigger.next();
    });
  }

  public triggerEmit(id: string, label: string): void {
    const data: FudisRadioButtonChangeEvent = {
      option: {
        id: id,
        label: label,
        value: this._selectedValue(),
      },
      control: this.control,
    };
    this.handleChange.emit(data);
  }
}
