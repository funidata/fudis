import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
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
    protected _translationService: FudisTranslationService,
    private _idService: FudisIdService,
  ) {
    this._id = this._idService.getNewParentId('breadcrumbs');
  }

  /**
   * Label to attach to aria-label
   */
  @Input({ required: true }) label: string;

  protected _id: string;

  /**
   * Getter for id
   */
  get id(): string {
    return this._id;
  }
}
