import {
  AfterViewInit,
  DestroyRef,
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TooltipApiDirective } from '../../tooltip/tooltip-api.directive';
import { FudisIdComponent, FudisIdParent } from '../../../types/id';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisFocusService } from '../../../services/focus/focus.service';

@Directive({
  selector: '[fudisFormCommonApi]',
})
export class FormCommonApiDirective extends TooltipApiDirective implements AfterViewInit {
  constructor(
    protected _idService: FudisIdService,
    protected _focusService: FudisFocusService,
  ) {
    super();
  }

  /**
   * Template reference for input. Used in e. g. initialFocus
   */
  @ViewChild('inputRef') protected _inputRef: ElementRef<HTMLInputElement>;

  /**
   * Label for the form component.
   */
  @Input({ required: true }) label: string;

  /**
   * Provide additional information for screen reader users by extending text content of the label. Used in e. g. Localized Text Group for providing info about currently selected language.
   */
  @Input() ariaLabel: string;

  /**
   * Input id. If not provided when component is initialized, generated by Id Service
   */
  @Input() id: string;

  /**
   * If component is a child of Form component, Form's Error Summary is visible, this component's control has errors and when this component is loaded for the first time, it will by default call Error Summary to reload itself again and mark control as touched. This is because if component is lazy loaded to the DOM after the initial reload errors call was made, errors of this component might not appear on the list. To disable this feature, set this to false.
   */
  @Input() errorSummaryReloadOnInit: boolean = true;

  /**
   * Help text, aligned underneath the input.
   */
  @Input() helpText: string | undefined;

  /**
   * Set browser focus to the input on the first load.
   */
  @Input() initialFocus: boolean = false;

  /**
   * Disable guidance for this component instance. No help text or errors will be visible.
   */
  @Input() disableGuidance: boolean;

  /**
   * To listen for component's blur event.
   */
  @Output() handleBlur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

  /**
   * To listen for component's focus event.
   */
  @Output() handleFocus: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

  /**
   * To listen for input's key up event.
   */
  @Output() handleKeyUp: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

  /**
   * Output emitted when component has finished AfterViewInit lifecycle hook
   */
  @Output() handleViewInit: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Set requiredText based on this boolean value
   */
  protected _required = new BehaviorSubject<boolean>(false);

  protected _destroyRef = inject(DestroyRef);

  /**
   * Trigger update when control validator is changed
   */
  protected _updateValueAndValidityTrigger = new Subject<void>();

  /**
   * Generate id for parent component
   */
  protected _setParentComponentId(parentType: FudisIdParent): void {
    if (this.id) {
      this._idService.addNewParentId(parentType, this.id);
    } else {
      this.id = this._idService.getNewParentId(parentType);
    }
  }

  /**
   * Add given id to Id Service or generate unique id
   */
  protected _setComponentId(componentType: FudisIdComponent): void {
    if (this.id) {
      this._idService.addNewId(componentType, this.id);
    } else {
      this.id = this._idService.getNewId(componentType);
    }
  }

  protected _afterViewInitCommon(): void {
    if (this.initialFocus && !this._focusService.isIgnored(this.id)) {
      this.focusToInput();
    }
    this.handleViewInit.emit();
  }

  ngAfterViewInit(): void {
    this._afterViewInitCommon();
  }

  /**
   * Set focus to the input element
   */
  public focusToInput(): void {
    this._inputRef?.nativeElement?.focus();
  }

  /**
   * Executed when component's input is focused or when child input, e.g. Checkbox is focused
   */
  public onFocus(event: FocusEvent): void {
    this.handleFocus.emit(event);
  }
}
