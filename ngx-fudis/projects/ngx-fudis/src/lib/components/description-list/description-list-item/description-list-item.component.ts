import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  Host,
  Signal,
  effect,
  inject,
  signal,
} from '@angular/core';
import {
  FudisDescriptionListVariant,
  FudisLanguageAbbr,
  FudisDescriptionListItemDetailLanguageContent,
} from '../../../types/miscellaneous';
import { FudisIdService } from '../../../services/id/id.service';
import { DescriptionListComponent } from '../description-list.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'fudis-dl-item',
  styleUrls: ['./description-list-item.component.scss'],
  templateUrl: './description-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class DescriptionListItemComponent implements AfterViewInit {
  constructor(
    private _element: ElementRef,
    private _idService: FudisIdService,
    @Host() protected _parentDl: DescriptionListComponent,
  ) {
    this.id = _idService.getNewGroupId('description-list', this._parentDl.id);

    /**
     * Listens to parent's changes and updates CSS classes.
     */
    effect(() => {
      this.variant = _parentDl.getVariant()();
      const disabled = _parentDl.getDisabledGridStatus()();

      this._setClasses(disabled, this.variant);

      if (this.variant === 'regular') {
        this._setNewVariant(this.variant);
      } else {
        this._setNewVariant(this.variant);
      }
    });
  }

  /**
   * Storing list of available languages in Details elements
   */
  private _detailsLanguageOptions = signal<FudisDescriptionListItemDetailLanguageContent | null>(
    null,
  );

  /**
   * Selected language to pass to child components
   */
  private _selectedLanguage = signal<FudisLanguageAbbr | null>(null);

  /**
   * Id generated with Id Service
   */
  public id: string;

  private variant: FudisDescriptionListVariant;

  protected _destroyRef = inject(DestroyRef);
  /**
   * Main CSS class
   */
  protected _mainCssClass: BehaviorSubject<string> = new BehaviorSubject<string>('fudis-dl-item');

  ngAfterViewInit() {
    this._setNewVariant(this.variant);
  }

  /**
   * DL Item has combined styles for both regular and compact versions but some styles only apply to
   * regular version if parent's disableGrid is true.
   */
  private _setClasses(disabledGrid: boolean, parentVariant: FudisDescriptionListVariant): void {
    if (disabledGrid && parentVariant !== 'compact') {
      this._mainCssClass.next('fudis-dl-item__disabled-grid');
    } else {
      this._mainCssClass.next('fudis-dl-item');
    }
  }

  private _setNewVariant(parentVariant: FudisDescriptionListVariant): void {
    const children = this._element.nativeElement.querySelectorAll('fudis-dd') as NodeList;
    if (parentVariant === 'compact') {
      children?.forEach(child => {
        const dlItemComma = child.appendChild(document.createElement('span'));
        dlItemComma.className = 'fudis-dl-item-details__compact__comma';
        dlItemComma.ariaHidden = 'true';
        dlItemComma.textContent = ','
      });
    } else {
        children?.forEach(child => {
          child.lastChild?.remove();
        })
    }
  }

  /**
   * Called from child Details, if it has a language property
   */
  public addDetailsLanguage(lang: FudisLanguageAbbr, text: string | null, id: string): void {
    const currentContent: FudisDescriptionListItemDetailLanguageContent =
      this._detailsLanguageOptions() || {};

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
    const currentContent: FudisDescriptionListItemDetailLanguageContent =
      this._detailsLanguageOptions() || {};

    if (currentContent[lang as FudisLanguageAbbr]?.[id]) {
      delete currentContent[lang]![id];
    }

    if (currentContent[lang] && Object.keys(currentContent[lang]!).length === 0) {
      delete currentContent[lang];
    }

    if (Object.keys(currentContent).length !== 0) {
      this._detailsLanguageOptions.set({ ...currentContent });
    } else {
      this._detailsLanguageOptions.set(null);
    }
  }

  public getDetailsLanguageOptions(): Signal<FudisDescriptionListItemDetailLanguageContent | null> {
    return this._detailsLanguageOptions.asReadonly();
  }

  public setSelectedLanguage(lang: FudisLanguageAbbr | null): void {
    this._selectedLanguage.set(lang);
  }

  public getSelectedLanguage(): Signal<FudisLanguageAbbr | null> {
    return this._selectedLanguage.asReadonly();
  }
}
