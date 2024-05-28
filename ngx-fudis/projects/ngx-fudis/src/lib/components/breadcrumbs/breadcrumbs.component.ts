import {
  Component,
  Input,
  effect,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FudisTranslationService } from '../../services/translation/translation.service';
import { FudisIdService } from '../../services/id/id.service';

@Component({
  selector: 'fudis-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent {
  constructor(
    private _translationService: FudisTranslationService,
    private _idService: FudisIdService,
    private _cdr: ChangeDetectorRef,
  ) {
    this._id = this._idService.getNewParentId('breadcrumbs');

    effect(() => {
      this._breadcrumbsPrefix = this._translationService.getTranslations()().BREADCRUMBS.PREFIX;
      _cdr.markForCheck();
    });
  }

  /**
   * Label to attach to aria-label
   */
  @Input({ required: true }) label: string;

  /**
   * Prefix for aria-label from Fudis translation keys
   */
  protected _breadcrumbsPrefix: string;

  protected _id: string;

  /**
   * Getter for id
   */
  get id(): string {
    return this._id;
  }
}
