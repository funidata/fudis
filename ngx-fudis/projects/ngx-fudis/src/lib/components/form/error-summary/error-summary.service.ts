import { BehaviorSubject, Observable } from 'rxjs';
import { TFudisFormErrorSummaryObject, TFudisFormErrorSummaryItem } from '../../../types/forms';

export class ErrorSummaryService {
	private currentErrorList: TFudisFormErrorSummaryObject = {};

	private reloadStore = new BehaviorSubject<boolean>(true);

	private reload = this.reloadStore.asObservable();

	private visibleErrorListStore = new BehaviorSubject<TFudisFormErrorSummaryObject>({});

	private visibleErrorList = this.visibleErrorListStore.asObservable();

	getVisibleErrors(): Observable<TFudisFormErrorSummaryObject> {
		return this.visibleErrorList;
	}

	// eslint-disable-next-line class-methods-use-this
	defineErrorId(id: string, controlName: string | undefined): string {
		return controlName ? `${id}_${controlName}` : id;
	}

	addNewError(newError: TFudisFormErrorSummaryItem): void {
		let currentErrors = this.currentErrorList;

		const errorId = this.defineErrorId(newError.id, newError.controlName);

		if (!currentErrors[errorId]) {
			currentErrors = {
				...currentErrors,
				[errorId]: {
					id: newError.id,
					errors: { [newError.type]: newError.error },
					label: newError.label,
				},
			};
		} else {
			currentErrors = {
				...currentErrors,
				[errorId]: {
					id: newError.id,
					errors: { ...currentErrors[errorId].errors, [newError.type]: newError.error },
					label: newError.label,
				},
			};
		}

		this.currentErrorList = currentErrors;
	}

	removeError(error: { id: string; controlName: string | undefined; type: string }): void {
		const currentErrors = this.currentErrorList;

		const errorId = error.controlName ? `${error.id}_${error.controlName}` : error.id;

		delete currentErrors[errorId].errors[error.type];

		this.currentErrorList = currentErrors;
	}

	reloadWatcher(): Observable<any> {
		return this.reload;
	}

	reloadErrors() {
		const visibleErrors = { ...this.currentErrorList };
		this.visibleErrorListStore.next(visibleErrors);
	}
}
