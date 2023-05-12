import { BehaviorSubject, Observable } from 'rxjs';
import { TFudisFormErrorSummaryItem } from '../../../types/forms';

export class ErrorSummaryService {
	private currentErrorList: TFudisFormErrorSummaryItem[] = [];

	private reloadStore = new BehaviorSubject<boolean>(true);

	private reload = this.reloadStore.asObservable();

	private visibleErrorListStore = new BehaviorSubject<TFudisFormErrorSummaryItem[]>([]);

	private visibleErrorList = this.visibleErrorListStore.asObservable();

	getVisibleErrors(): Observable<TFudisFormErrorSummaryItem[]> {
		return this.visibleErrorList;
	}

	updateErrorList(message: TFudisFormErrorSummaryItem) {
		const currentErrors = this.currentErrorList;

		const errorListIndex = currentErrors.findIndex((error) => error.id === message.id);

		if (errorListIndex !== -1 && message.errors.length > 0) {
			currentErrors[errorListIndex] = message;
		} else if (errorListIndex !== -1 && message.errors.length === 0) {
			currentErrors.splice(errorListIndex, 1);
		} else if (message.errors.length > 0) {
			currentErrors.push(message);
		}
		this.currentErrorList = currentErrors;
	}

	reloadWatcher(): Observable<any> {
		return this.reload;
	}

	reloadErrors() {
		this.reloadStore.next(this.reloadStore.value);
		const visibleErrors = [...this.currentErrorList];
		this.visibleErrorListStore.next(visibleErrors);
	}
}
