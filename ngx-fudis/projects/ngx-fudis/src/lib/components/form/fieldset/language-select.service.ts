import { Subject, BehaviorSubject } from 'rxjs';
import { IFudisDropdownOption } from '../../../types/forms';

export class LanguageSelectService {
	// Using any
	public editDataDetails: any = [];

	public subject = new Subject<any>();

	private messageSource = new BehaviorSubject(this.editDataDetails);

	currentMessage = this.messageSource.asObservable();

	updateLanguage(value: IFudisDropdownOption) {
		this.messageSource.next(value);
	}
}
