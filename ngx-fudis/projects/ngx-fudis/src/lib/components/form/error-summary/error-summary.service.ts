import { Injectable, Signal, signal } from '@angular/core';
import {
	FudisFormErrorSummaryObject,
	FudisFormErrorSummaryItem,
	FudisFormErrorSummarySection,
	FudisErrorSummaryParent,
} from '../../../types/forms';

@Injectable({ providedIn: 'root' })
export class FudisErrorSummaryService {
	private _currentErrorList: FudisFormErrorSummaryObject = {};

	private _signalCurrentErrorList = signal<FudisFormErrorSummaryObject>({});

	private _signalDynamicCurrentErrorList = signal<FudisFormErrorSummaryObject>({});

	private _errorSummaryParentList = signal<FudisErrorSummaryParent[]>([]);

	private _currentFieldsets: FudisFormErrorSummarySection[] = [];

	private _currentSections: FudisFormErrorSummarySection[] = [];

	getFieldsetList(): FudisFormErrorSummarySection[] {
		return this._currentFieldsets;
	}

	getFormsWithErrorSummary(): Signal<FudisErrorSummaryParent[]> {
		return this._errorSummaryParentList.asReadonly();
	}

	getSectionList(): FudisFormErrorSummarySection[] {
		return this._currentSections;
	}

	getVisibleErrors(): Signal<FudisFormErrorSummaryObject> {
		return this._signalCurrentErrorList.asReadonly();
	}

	getDynamicErrors(): Signal<FudisFormErrorSummaryObject> {
		return this._signalDynamicCurrentErrorList.asReadonly();
	}

	// eslint-disable-next-line class-methods-use-this
	private defineErrorId(id: string, controlName: string | undefined): string {
		return controlName ? `${id}_${controlName}` : id;
	}

	public addNewError(newError: FudisFormErrorSummaryItem): void {
		let currentErrors = this._currentErrorList;

		const errorId = this.defineErrorId(newError.id, newError.controlName);

		const langUpdated = currentErrors[errorId] && currentErrors[errorId]?.language !== newError.language;

		if (!currentErrors[errorId]) {
			currentErrors = {
				...currentErrors,
				[errorId]: {
					id: newError.id,
					errors: { [newError.type]: newError.error },
					label: newError.label,
					language: newError.language,
				},
			};
		} else {
			currentErrors = {
				...currentErrors,
				[errorId]: {
					id: newError.id,
					errors: { ...currentErrors[errorId].errors, [newError.type]: newError.error },
					label: newError.label,
					language: newError.language,
				},
			};
		}

		this._currentErrorList = currentErrors;

		if (langUpdated) {
			this.reloadErrors();
		}
	}

	public removeError(error: { id: string; controlName: string | undefined; type: string }): void {
		const currentErrors = this._currentErrorList;

		const errorId = error.controlName ? `${error.id}_${error.controlName}` : error.id;

		if (currentErrors?.[errorId]?.errors[error.type]) {
			delete currentErrors[errorId].errors[error.type];

			this._currentErrorList = currentErrors;

			this._signalDynamicCurrentErrorList.set(currentErrors);
		}
	}

	public addFieldset(fieldset: FudisFormErrorSummarySection): void {
		const existingItem = this._currentFieldsets.find((item) => {
			return item.id === fieldset.id;
		});

		if (existingItem) {
			const index = this._currentFieldsets.indexOf(existingItem);
			this._currentFieldsets[index] = fieldset;
		} else {
			this._currentFieldsets.push(fieldset);
		}
	}

	public removeFieldset(fieldset: FudisFormErrorSummarySection): void {
		const indexToRemove = this._currentFieldsets.indexOf(fieldset);

		this._currentFieldsets.splice(indexToRemove, 1);
	}

	public addSection(section: FudisFormErrorSummarySection): void {
		const existingItem = this._currentSections.find((item) => {
			return item.id === section.id;
		});

		if (existingItem) {
			const index = this._currentSections.indexOf(existingItem);
			this._currentSections[index] = section;
		} else {
			this._currentSections.push(section);
		}
	}

	public removeSection(section: FudisFormErrorSummarySection): void {
		const indexToRemove = this._currentSections.indexOf(section);

		this._currentSections.splice(indexToRemove, 1);
	}

	public reloadErrors(delay: number = 0): void {
		setTimeout(() => {
			this._signalCurrentErrorList.set(this._currentErrorList);
			this._signalDynamicCurrentErrorList.set(this._currentErrorList);
		}, delay);
	}

	public addErrorSummaryParent(parent: FudisErrorSummaryParent): void {
		const currentParents = this._errorSummaryParentList();

		const existingItem = currentParents.find((item) => {
			return item.formId === parent.formId;
		});

		if (existingItem) {
			const index = currentParents.indexOf(existingItem);
			currentParents[index] = parent;
		} else {
			currentParents.push(parent);
		}

		this._errorSummaryParentList.set(currentParents);
	}

	public removeErrorSummaryParent(parent: FudisErrorSummaryParent): void {
		const currentParents = this._errorSummaryParentList();

		const filtered = currentParents.filter((item) => {
			return item.formId !== parent.formId;
		});

		this._errorSummaryParentList.set(filtered);
	}
}
