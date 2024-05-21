import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  effect,
} from '@angular/core';
import { FudisTranslationService } from '../../../../../services/translation/translation.service';
import { FudisSelectVariant } from '../../../../../types/forms';
import { FormControl } from '@angular/forms';
import { FudisComponentChanges } from '../../../../../types/miscellaneous';

@Component({
  selector: 'fudis-select-icons',
  templateUrl: './select-icons.component.html',
  styleUrls: ['./select-icons.component.scss'],
})
export class SelectIconsComponent implements OnChanges {
  constructor(
    protected _translationService: FudisTranslationService,
    private _changeDetectionRef: ChangeDetectorRef,
  ) {
    effect(() => {
      // TODO: check proper translation
      this._translationClearFilterText =
        _translationService.getTranslations()().SELECT.AUTOCOMPLETE.CLEAR;
    });
  }

  @Input() dropdownOpen: boolean;

  @Input() parentVariant: FudisSelectVariant;

  @Input() clearButton: boolean;

  @Input() chevron: boolean;

  @Input() disabled: boolean;

  @Input() filterText: boolean;

  @Input() parentControlValue: boolean;

  @Input() parentControl: FormControl;

  @Output() handleClearButtonClick: EventEmitter<Event> = new EventEmitter<Event>();

  ngOnChanges(changes: FudisComponentChanges<SelectIconsComponent>): void {
    // if (
    //   changes.chevron?.currentValue !== changes.chevron?.previousValue ||
    //   changes.parentVariant?.currentValue !== changes.parentVariant?.previousValue ||
    //   changes.filterText?.currentValue !== changes.filterText?.previousValue
    // ) {
    //   this._chevronVisible = this.chevron && this.parentVariant !== 'autocompleteType';

    //   this._searchVisible = !!this.filterText
    // }

    if (changes.parentControl?.currentValue !== changes.parentControl?.previousValue) {
      this.parentControl.valueChanges.subscribe((value) => {
        this._controlValue = value;
        this._changeDetectionRef.detectChanges();
      });
    }
  }

  /**
   * Translated aria-label for autocomplete close icon button which clears the input
   */
  protected _translationClearFilterText: string;

  protected _chevronVisible: boolean;

  protected _searchVisible: boolean;

  protected _clearVisible: boolean;

  protected _controlValue: boolean;

  protected _clearButtonClick(event: Event): void {
    this.handleClearButtonClick.emit(event);
  }
}
