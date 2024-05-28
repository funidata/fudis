import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Host,
  Signal,
  signal,
} from '@angular/core';
import {
  FudisDescriptionListVariant,
  FudisLanguageAbbr,
  FudisLanguageBadgeContent,
} from '../../../types/miscellaneous';
import { FudisIdService } from '../../../services/id/id.service';
import { DescriptionListComponent } from '../description-list.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'fudis-dl-item, fudis-description-list-item',
  styleUrls: ['./description-list-item.component.scss'],
  templateUrl: './description-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionListItemComponent {
  constructor(
    private _element: ElementRef,
    private _idService: FudisIdService,
    @Host() protected _parentDl: DescriptionListComponent,
  ) {
    this.id = _idService.getNewGroupId('description-list', this._parentDl.id);

    /**
     * Listens to parent's changes and updates CSS classes.
     */
    this._parentDl
      .getVariant()
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        this._setClasses(_parentDl.getDisabledGridStatus().value, value);
      });

    this._parentDl
      .getDisabledGridStatus()
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        this._setClasses(value, _parentDl.getVariant().value);
      });
  }

  /**
   * Storing list of available languages in Details elements
   */
  private _detailsLanguageOptions = signal<FudisLanguageBadgeContent>({});

  /**
   * Selected language to pass to child components
   */
  public selectedLanguage: Subject<FudisLanguageAbbr | null> = new Subject();

  /**
   * Id generated with Id Service
   */
  public id: string;

  /**
   * Main CSS class
   */
  protected _mainCssClass: BehaviorSubject<string> = new BehaviorSubject<string>('fudis-dl-item');

  /**
   * DL Item has combined styles for both regular and compact versions but some styles only apply to regular version if parent's disableGrid is true.
   */
  private _setClasses(disabledGrid: boolean, parentVariant: FudisDescriptionListVariant): void {
    if (disabledGrid && parentVariant !== 'compact') {
      this._mainCssClass.next('fudis-dl-item__disabled-grid');
    } else {
      this._mainCssClass.next('fudis-dl-item');
    }
  }

  /**
   * Called from child Details, if it has a language property
   */
  public addDetailsLanguage(lang: FudisLanguageAbbr, text: string | null, id: string): void {
    const currentContent: FudisLanguageBadgeContent = this._detailsLanguageOptions();

    if (!currentContent[lang]) {
      currentContent[lang] = {};
    }

    currentContent[lang]![id] = text;

    this._detailsLanguageOptions.set({ ...currentContent });
  }

  /**
   * Called from child Details, if its language property is removed (or updated)
   */
  public removeDetailsLanguage(lang: FudisLanguageAbbr, id: string): void {
    const currentContent: FudisLanguageBadgeContent = this._detailsLanguageOptions();

    if (currentContent[lang as FudisLanguageAbbr]?.[id]) {
      delete currentContent[lang]![id];
    }

    if (currentContent[lang] && Object.keys(currentContent[lang]!).length === 0) {
      delete currentContent[lang];
    }

    this._detailsLanguageOptions.set({ ...currentContent });
  }

  public getDetailsLanguageOptions(): Signal<FudisLanguageBadgeContent> {
    return this._detailsLanguageOptions.asReadonly();
  }

  public setSelectedLanguage(lang: FudisLanguageAbbr | null): void {
    this.selectedLanguage.next(lang);
  }
}
