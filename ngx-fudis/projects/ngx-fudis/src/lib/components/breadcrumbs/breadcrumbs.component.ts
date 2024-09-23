import {
  Component,
  Input,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  effect,
} from '@angular/core';
import { FudisTranslationService } from '../../services/translation/translation.service';
import { FudisIdService } from '../../services/id/id.service';
import { BehaviorSubject } from 'rxjs';

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
  ) {
    this._id = this._idService.getNewParentId('breadcrumbs');

    effect(() => {
      this._breadcrumbsPrefix.next(this._translationService.getTranslations()().BREADCRUMBS.PREFIX);
    });
  }

  /**
   * Label to attach to aria-label
   */
  @Input({ required: true }) label: string;

  /**
   * Prefix for aria-label from Fudis translation keys
   */
  protected _breadcrumbsPrefix = new BehaviorSubject<string>(
    this._translationService.getTranslations()().BREADCRUMBS.PREFIX,
  );

  /**
   * HTML id
   */
  protected _id: string;

  /**
   * Getter for id
   */
  get id(): string {
    return this._id;
  }
}
