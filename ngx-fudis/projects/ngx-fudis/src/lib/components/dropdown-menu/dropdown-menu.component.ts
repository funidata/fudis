import { AfterContentInit, ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

import { FudisIdService } from '../../services/id/id.service';
import { DropdownBaseDirective } from '../../directives/form/dropdown-base/dropdown-base.directive';

@Component({
	selector: 'fudis-dropdown-menu',
	templateUrl: './dropdown-menu.component.html',
	styleUrls: ['./dropdown-menu.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenuComponent extends DropdownBaseDirective implements AfterContentInit, OnInit {
	constructor(private _idService: FudisIdService) {
		super();
		this.id = _idService.getNewParentId('dropdown-menu');
	}
}
