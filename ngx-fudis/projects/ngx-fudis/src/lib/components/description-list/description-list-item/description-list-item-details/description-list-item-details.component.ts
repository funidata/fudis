import { Component, ContentChild, Host, Input, OnInit, effect } from '@angular/core';
import { FudisLanguageAbbr } from '../../../../types/miscellaneous';
import { ActionsDirective } from '../../../../directives/content-projection/actions/actions.directive';
import { DescriptionListItemComponent } from '../description-list-item.component';
import { DescriptionListComponent } from '../../description-list.component';

@Component({
  selector: 'fudis-dd, fudis-description-list-details',
  templateUrl: './description-list-item-details.component.html',
})
export class DescriptionListItemDetailsComponent implements OnInit {
  constructor(@Host() private _parent: DescriptionListItemComponent, @Host() private _parentDl: DescriptionListComponent) {
    effect(() => {
      const parentVariant = _parentDl.getVariant();

      if(parentVariant() === 'regular') {
        this._mainCssClass = 'fudis-dl__item__details';
      } else {
        this._mainCssClass = 'fudis-dl-compact__item__details';
      }
    });
  }
  @ContentChild(ActionsDirective) actions: ActionsDirective;

  @Input() lang: FudisLanguageAbbr;

  @Input() subHeading: string | undefined;

  protected _items: string[];

  protected _mainCssClass: string;

  ngOnInit(): void {
    this._items = this._parent.descriptionListItems;
  }
}
