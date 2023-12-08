import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	Inject,
	Input,
	OnChanges,
	OnDestroy,
	Signal,
	ViewChild,
	effect,
} from '@angular/core';

import { DOCUMENT } from '@angular/common';

import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';
import {
	FudisFormErrorSummaryObject,
	FudisFormErrorSummaryList,
	FudisFormErrorSummarySection,
	FudisFormErrorSummaryLink,
	FudisErrorSummaryParent,
} from '../../../types/forms';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisLanguageAbbr, FudisTranslationConfig } from '../../../types/miscellaneous';

@Component({
	selector: 'fudis-error-summary',
	templateUrl: './error-summary.component.html',
	styleUrls: ['./error-summary.component.scss'],
})
export class ErrorSummaryComponent implements OnChanges, OnDestroy {
	constructor(
		@Inject(DOCUMENT) private _document: Document,
		private _errorSummaryService: FudisInternalErrorSummaryService,
		private readonly _changeDetectorRef: ChangeDetectorRef,
		private _translationService: FudisTranslationService
	) {
		effect(() => {
			this._translations = this._translationService.getTranslations();

			this._previousLanguage = this._currentLanguage;

			this._attentionText = this._translations().ICON.ATTENTION;

			this.getErrors();
		});
	}

	@ViewChild('focusTarget') focusTarget: ElementRef;

	/**
	 * FieldSet parent element of this ErrorSummaryComponent
	 */
	@Input({ required: true }) parentComponent: HTMLFormElement;

	/**
	 * Help text displayed in Error Summary before listing individual errors
	 */
	@Input({ required: true }) helpText: string;

	/**
	 * Type of the clickable error link
	 */
	@Input() linkType: FudisFormErrorSummaryLink = 'router';

	/**
	 * Dynamic update of visible errors in the summary
	 */
	@Input() liveRemove: boolean = false;

	/**
	 * Additional text for screen readers added before help text. E.g. "Attention". Comparable for "alert" icon included in Error Summary.
	 */
	protected _attentionText: string;

	/**
	 * Fudis translations
	 */
	protected _translations: Signal<FudisTranslationConfig>;

	/**
	 * Visible errors
	 */
	protected _visibleErrorList: FudisFormErrorSummaryList[] = [];

	/**
	 * Application language toggle property
	 */
	private _previousLanguage: FudisLanguageAbbr | undefined = undefined;

	/**
	 * Application language toggle property
	 */
	private _currentLanguage: FudisLanguageAbbr | undefined = undefined;

	/**
	 * Parent form of this Error Summary
	 */
	private _errorSummaryParentInfo: FudisErrorSummaryParent;

	/**
	 * Focus counter to hit the correct focus field
	 */
	private _numberOfFocusTries: number = 0;

	getErrors(): void {
		const fetchedErrors: Signal<FudisFormErrorSummaryObject> = this.liveRemove
			? this._errorSummaryService.getDynamicErrors()
			: this._errorSummaryService.getVisibleErrors();

		this._visibleErrorList = [];

		const fieldsets: FudisFormErrorSummarySection[] = this._errorSummaryService.getFieldsetList();

		const sections: FudisFormErrorSummarySection[] = this._errorSummaryService.getSectionList();

		Object.keys(fetchedErrors()).forEach((item) => {
			const errorId = fetchedErrors()[item].id;
			if (this.parentComponent?.querySelector(`#${errorId}`)) {
				const { label } = fetchedErrors()[item];
				Object.values(fetchedErrors()[item].errors).forEach((error: any) => {
					const parentFieldset = fieldsets.find((fieldset) => {
						if (this.parentComponent?.querySelector(`#${fieldset.id} #${errorId}`)) {
							return fieldset;
						}
						return null;
					});

					const parentSection = sections.find((section) => {
						if (this.parentComponent?.querySelector(`#${section.id} #${errorId}`)) {
							return section;
						}
						return null;
					});

					const parentSectionString = parentSection ? `${parentSection.title} / ` : '';

					const parentFieldsetString = parentFieldset ? `${parentFieldset.title} / ` : '';

					const cleanedError = error.replace(/[:!?]$/, '');

					this._visibleErrorList.push({
						id: errorId,
						message: `${parentSectionString}${parentFieldsetString}${label}: ${cleanedError}`,
					});
				});
			}
		});

		this._changeDetectorRef.detectChanges();

		this._currentLanguage = this._translationService.getLanguage();

		if (
			this._document.activeElement?.classList.contains('fudis-button') &&
			this._previousLanguage === this._currentLanguage
		) {
			this.focusToErrorSummary();
		}
	}

	focusToErrorSummary(): void {
		if (this.focusTarget && this._visibleErrorList.length > 0) {
			this._numberOfFocusTries = 0;
			(this.focusTarget.nativeElement as HTMLDivElement).focus();
		} else if (this._numberOfFocusTries < 100) {
			setTimeout(() => {
				this._numberOfFocusTries += 1;
				this.focusToErrorSummary();
			}, 100);
		}
	}

	ngOnChanges(): void {
		this._errorSummaryParentInfo = {
			formId: this.parentComponent.querySelector('.fudis-form')?.getAttribute('id'),
			parentElement: this.parentComponent,
		};

		this._errorSummaryService.addErrorSummaryParent(this._errorSummaryParentInfo);
	}

	ngOnDestroy(): void {
		this._errorSummaryService.removeErrorSummaryParent(this._errorSummaryParentInfo);
	}
}
