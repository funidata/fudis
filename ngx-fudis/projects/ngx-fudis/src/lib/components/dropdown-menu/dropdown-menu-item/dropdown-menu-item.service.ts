import { BehaviorSubject, Observable } from 'rxjs';

export class DropdownMenuItemService {
	private clickStore = new BehaviorSubject<boolean>(true);

	private click = this.clickStore.asObservable();

	clickWatcher(): Observable<any> {
		return this.click;
	}

	close(): void {
		this.clickStore.next(true);
	}
}
