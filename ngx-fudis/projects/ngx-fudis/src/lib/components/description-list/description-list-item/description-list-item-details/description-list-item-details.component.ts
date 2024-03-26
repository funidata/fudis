import { Component, ContentChild, Host, Input, OnInit, Optional } from '@angular/core';
import { FudisLanguageAbbr } from '../../../../types/miscellaneous';
import { ActionsDirective } from '../../../../directives/content-projection/actions/actions.directive';
import { DescriptionListItemComponent } from '../description-list-item.component';

@Component({
  selector: 'fudis-dd, fudis-description-list-details',
  templateUrl: './description-list-item-details.component.html',
})
export class DescriptionListItemDetailsComponent implements OnInit {
  constructor(@Host() @Optional() private _parent: DescriptionListItemComponent) {}
  @ContentChild(ActionsDirective) actions: ActionsDirective;

  @Input() lang: FudisLanguageAbbr;

  @Input() subHeading: string | undefined;

  protected _items: string[];

  ngOnInit(): void {
    this._items = this._parent.descriptionListItems;
  }
}
