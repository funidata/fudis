import { AfterContentInit, Component, ElementRef, Input, OnInit } from '@angular/core';
import { HeadingLevel } from '../../../types/typography';
import { IdService } from '../../../utilities/id-service.service';

@Component({
	selector: 'fudis-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, AfterContentInit {
	@Input() id: string;

	@Input({ required: true }) title: string;

	@Input({ required: true }) titleTag: HeadingLevel;

	@Input() helpText: string;

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

	constructor(private _idService: IdService, private _elementRef: ElementRef) {}

	ngOnInit(): void {
		this._id = this.id ? this.id : this._idService.getNewId('form');
	}

	protected _formElement: HTMLFormElement | undefined;

	ngAfterContentInit(): void {
		this._formElement = this._elementRef.nativeElement as HTMLFormElement;
	}
}
