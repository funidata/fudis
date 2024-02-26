import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  Signal,
  ViewEncapsulation,
} from '@angular/core';
import { FudisLanguageAbbr, FudisTranslationConfig } from '../../../types/miscellaneous';
import { TooltipApiDirective } from '../../../directives/tooltip/tooltip-api.directive';
import { FudisTranslationService } from '../../../services/translation/translation.service';

@Component({
  selector: 'fudis-language-badge',
  styleUrls: ['./language-badge.component.scss'],
  templateUrl: './language-badge.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class LanguageBadgeComponent extends TooltipApiDirective implements OnInit, OnChanges {
  constructor(private _translationService: FudisTranslationService) {
    super();
    this._translations = this._translationService.getTranslations();
    this._selectedLabel = this._translations().LANGUAGE_BADGE.ARIA_LABEL.SELECTED;
    this._missingTranslation = this._translations().LANGUAGE_BADGE.ARIA_LABEL.MISSING_TRANSLATION;
  }

  /**
   * Binding host CSS class to component wrapper
   */
  @HostBinding('class') private _classes = 'fudis-language-badge-host';

  /*
   * Language abbreviation for Language Badge
   */
  @Input({ required: true }) language: FudisLanguageAbbr;

  /*
   * Selected state of a Language Badge
   */
  @Input() selected: boolean;

  /*
   * Language Badge variant
   */
  @Input() variant: 'standard' | 'missing' = 'standard';

  /*
   * Mandatory Language Badge label
   */
  @Input({ required: true }) label: string;

  /*
   * Assistive aria-label
   */
  @Input() ariaLabel: string;

  /**
   * Click handler outputting clicked language abbreviation
   */
  @Output() handleClick = new EventEmitter<FudisLanguageAbbr>();

  /**
   * Label string of the badge
   */
  protected _label: string;

  /**
   * Internal variable for selected translation aria-label
   */
  protected _selectedLabel: string;

  /**
   * Internal variable for missing translation aria-label
   */
  protected _missingTranslation: string;

  /**
   * Fudis translations
   */
  protected _translations: Signal<FudisTranslationConfig>;

  ngOnInit(): void {
    this._setLabel();
  }

  ngOnChanges(): void {
    this._setLabel();
  }

  /**
   * Emit badge's language on click
   */
  protected _handleLanguageSelect(): void {
    this.handleClick.emit(this.language);
  }

  /**
   * Define correct label for Badge
   */
  private _setLabel(): void {
    if (this.selected && this.variant !== 'missing') {
      this._label = `${this.label} ${this._selectedLabel}`;
    } else if (this.selected && this.variant === 'missing') {
      this._label = `${this.label} ${this._missingTranslation} ${this._selectedLabel}`;
    } else if (!this.selected && this.variant === 'missing') {
      this._label = `${this.label} ${this._missingTranslation}`;
    } else {
      this._label = this.label;
    }
  }
}
