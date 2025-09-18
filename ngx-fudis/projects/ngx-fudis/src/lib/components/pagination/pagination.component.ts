import { Component, Input } from '@angular/core';
import { FudisTranslationService } from '../../services/translation/translation.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'fudis-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  constructor(private _translationService: FudisTranslationService) {
    this._paginationPrefix.next(this._translationService.getTranslations()().PAGINATION.PREFIX);
  }

  @Input({ required: true }) label: string;

  /**
   * Prefix for aria-label from Fudis translation keys
   */
  protected _paginationPrefix = new BehaviorSubject<string>(
    this._translationService.getTranslations()().PAGINATION.PREFIX,
  );
}
