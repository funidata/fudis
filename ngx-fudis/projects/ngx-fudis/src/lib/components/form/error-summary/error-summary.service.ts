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

	addNewError(newError: TFudisFormErrorSummaryItem): void {
		let currentErrors = this.currentErrorList;

		if (!currentErrors[newError.id]) {
			currentErrors = {
				...currentErrors,
				[newError.id]: {
					errors: { [newError.type]: newError.error },
					label: newError.label,
				},
			};
		} else {
			currentErrors = {
				...currentErrors,
				[newError.id]: {
					errors: { ...currentErrors[newError.id].errors, [newError.type]: newError.error },
					label: newError.label,
				},
			};
		}

		this.currentErrorList = currentErrors;
	}

	removeError(error: { id: string; type: string }): void {
		const currentErrors = this.currentErrorList;
		delete currentErrors[error.id].errors[error.type];

		this.currentErrorList = currentErrors;
	}

	reloadWatcher(): Observable<any> {
		return this.reload;
	}

	reloadErrors() {
		this.reloadStore.next(this.reloadStore.value);

		const visibleErrors = { ...this.currentErrorList };

		// console.log(visibleErrors);
		this.visibleErrorListStore.next(visibleErrors);
	}
}
