import { BehaviorSubject, Observable } from 'rxjs';
import { TFudisFormErrorSummaryItem } from '../../../types/forms';

export class ErrorSummaryService {
	private errorListBus = new BehaviorSubject<TFudisFormErrorSummaryItem[]>([]);

	private reloadStore = new BehaviorSubject<boolean>(true);

	reload = this.reloadStore.asObservable();

	errorList = this.errorListBus.asObservable();

	getErrors(): Observable<TFudisFormErrorSummaryItem[]> {
		return this.errorList;
	}

	updateErrorList(message: TFudisFormErrorSummaryItem) {
		const currentErrors = this.errorListBus.value;

		console.log(message);

		const errorListIndex = currentErrors.findIndex((error) => error.id === message.id);

		if (errorListIndex !== -1 && message.errors.length > 0) {
			currentErrors[errorListIndex] = message;
		} else if (errorListIndex !== -1 && message.errors.length === 0) {
			currentErrors.splice(errorListIndex, 1);
		} else if (message.errors.length > 0) {
			currentErrors.push(message);
		}
		this.errorListBus.next(currentErrors);
	}

	reloadWatcher(): Observable<any> {
		return this.reload;
	}

	reloadErrors() {
		this.reloadStore.next(this.reloadStore.value);
	}
}
