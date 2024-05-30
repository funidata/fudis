import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  effect,
} from '@angular/core';
import { FudisComponentChanges, FudisLanguageAbbr } from '../../../types/miscellaneous';
import { TooltipApiDirective } from '../../../directives/tooltip/tooltip-api.directive';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisIdService } from '../../../services/id/id.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'fudis-language-badge',
  styleUrls: ['./language-badge.component.scss'],
  templateUrl: './language-badge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageBadgeComponent extends TooltipApiDirective implements OnChanges, OnInit {
  constructor(
    private _translationService: FudisTranslationService,
    private _idService: FudisIdService,
    private _cdr: ChangeDetectorRef,
  ) {
    super();

    effect(() => {
      const translations = this._translationService.getTranslations()();

      this._selectedLabel = translations.LANGUAGE_BADGE.ARIA_LABEL.SELECTED;
      this._missingTranslation = translations.LANGUAGE_BADGE.ARIA_LABEL.MISSING_TRANSLATION;

      this._setLabel();
    });
  }

  /*
   * Language abbreviation for Language Badge
   */
  @Input({ required: true }) language: FudisLanguageAbbr;

  /*
   * Mandatory Language Badge label
   */
  @Input({ required: true }) label: string;

  /*
   * Parent group's id
   */
  @Input({ required: true }) parentId: string;

  /*
   * Selected state of a Language Badge
   */
  @Input() selected: boolean;

  /*
   * Language Badge variant
   */
  @Input() variant: 'standard' | 'missing' = 'standard';

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
  protected _badgeLabel = new BehaviorSubject<string>('');

  /**
   * Internal variable for selected translation aria-label
   */
  protected _selectedLabel: string;

  /**
   * Internal variable for missing translation aria-label
   */
  protected _missingTranslation: string;

  /**
   * Generated HTML id
   */
  protected _id: string;

  ngOnInit(): void {
    this._id = this._idService.getNewChildId('language-badge-group', this.parentId);
  }

  ngOnChanges(changes: FudisComponentChanges<LanguageBadgeComponent>): void {
    if (
      changes.selected?.currentValue !== changes.selected?.previousValue ||
      changes.variant?.currentValue !== changes.variant?.previousValue ||
      changes.label?.currentValue !== changes.label?.previousValue
    ) {
      this._setLabel();
    }
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
    let newLabel;

    if (this.selected && this.variant !== 'missing') {
      newLabel = `${this.label} ${this._selectedLabel}`;
    } else if (this.selected && this.variant === 'missing') {
      newLabel = `${this.label} ${this._missingTranslation} ${this._selectedLabel}`;
    } else if (!this.selected && this.variant === 'missing') {
      newLabel = `${this.label} ${this._missingTranslation}`;
    } else {
      newLabel = this.label;
    }

    this._badgeLabel.next(newLabel);
  }
}
