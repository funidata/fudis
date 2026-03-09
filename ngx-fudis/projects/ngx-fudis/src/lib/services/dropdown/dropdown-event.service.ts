import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Dropdown event service shared between Icon Button and DropdownMenu components.
 *
 * Dropdown menu element's width calculation must be triggered from host Icon Button click, and it
 * should ensure that the dropdown is always fully visible.
 */

@Injectable({ providedIn: 'root' })
export class DropdownEventService {
  private _triggerCalculationSubject = new Subject<void>();

  triggerCalculation = this._triggerCalculationSubject.asObservable();

  triggerWidthCalculation() {
    this._triggerCalculationSubject.next();
  }
}
