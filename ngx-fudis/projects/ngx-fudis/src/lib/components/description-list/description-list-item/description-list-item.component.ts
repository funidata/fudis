import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Host,
  OnDestroy,
  OnInit,
  Signal,
  effect,
  signal,
} from '@angular/core';
import {
  FudisDescriptionListVariant,
  FudisLanguageAbbr,
  FudisLanguageBadgeContent,
} from '../../../types/miscellaneous';
import { FudisIdService } from '../../../services/id/id.service';
import { DescriptionListComponent } from '../description-list.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'fudis-dl-item, fudis-description-list-item',
  styleUrls: ['./description-list-item.component.scss'],
  templateUrl: './description-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionListItemComponent implements OnInit, OnDestroy {
  constructor(
    private _element: ElementRef,
    private _idService: FudisIdService,
    private _cdr: ChangeDetectorRef,
    @Host() protected _parentDl: DescriptionListComponent,
  ) {
    this.id = _idService.getNewGroupId('description-list', this._parentDl.id);

    effect(() => {
      /**
       * Listens to parent's changes and updates CSS classes.
       */
      this._setClasses(_parentDl.getDisabledGridStatus()(), _parentDl.getVariant()());
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
  protected _mainCssClass: string;

  ngOnInit(): void {
    /** Registers itself to the parent */
    this._parentDl.addChildId(this.id);
  }

  ngOnDestroy(): void {
    /** Removes itself from the parent */
    this._parentDl.removeChildId(this.id);
  }

  /**
   * DL Item has combined styles for both regular and compact versions but some styles only apply to regular version if parent's disableGrid is true.
   */
  private _setClasses(disabledGrid: boolean, parentVariant: FudisDescriptionListVariant): void {
    if (disabledGrid && parentVariant !== 'compact') {
      this._mainCssClass = 'fudis-dl-item__disabled-grid';
    } else {
      this._mainCssClass = 'fudis-dl-item';
    }
    this._cdr.detectChanges();
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
