import { AfterContentInit, Component, ContentChild, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FudisHeadingTag, FudisHeadingSize } from '../../../types/typography';
import { FudisIdService } from '../../../utilities/id-service.service';
import { HeaderDirective } from '../../../directives/content-projection/header/header.directive';
import { ActionsDirective } from '../../../directives/content-projection/actions/actions.directive';
import { ContentDirective } from '../../../directives/content-projection/content/content.directive';
import { GridApiDirective } from '../../../directives/grid/grid-api/grid-api.directive';
import { FudisBadgeVariant } from '../../../types/miscellaneous';

@Component({
	selector: 'fudis-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class FormComponent extends GridApiDirective implements OnInit, AfterContentInit {
	@ContentChild(ActionsDirective) headerActions: ActionsDirective;

	@ContentChild(HeaderDirective) headerContent: HeaderDirective;

	@ContentChild(ContentDirective) mainContent: ContentDirective;

	@Input() id: string;

	@Input() title: string;

	@Input() titleTag: FudisHeadingTag;

	@Input() titleSize: FudisHeadingSize = 'xl';

	@Input() helpText: string;

	@Input() badge: FudisBadgeVariant | null;

	@Input() badgeText: string | null;

	@Input() errorSummaryLiveRemove: boolean = false;

	/**
	 * If Error Summary is visible. Usually set on click of form submit button.
	 */
	@Input() errorSummaryVisible: boolean = false;

	/**
	 * Help text displayed in Error Summary before listing individual errors.
	 */
	@Input({ required: true }) errorSummaryHelpText: string;

	/**
	 * Additional text for screen readers added before help text. E.g. "Attention". Comparable for "alert" icon included in Error Summary.
	 */
	@Input({ required: true }) errorSummaryScreenReaderHelpText: string;

	protected _id: string;

	constructor(private _idService: FudisIdService, private _elementRef: ElementRef) {
		super();
	}

	ngOnInit(): void {
		this._id = this.id ? this.id : this._idService.getNewId('form');
	}

	protected _formElement: HTMLFormElement | undefined;

	ngAfterContentInit(): void {
		this._formElement = this._elementRef.nativeElement as HTMLFormElement;
	}
}
