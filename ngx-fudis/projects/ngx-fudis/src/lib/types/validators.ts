import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

export type FudisValidatorMessage = Observable<string> | string;

export interface FudisValidationErrors extends ValidationErrors {
  [key: string]: { message: FudisValidatorMessage; value?: unknown } | null;
}

export interface FudisValidatorFn extends ValidatorFn {
  (control: AbstractControl): FudisValidationErrors | null;
}

export interface FudisValidatorsDatepickerSettings {
  value: Date;
  message: FudisValidatorMessage;
}

export interface FudisGroupValidatorsMinMaxSettings {
  value: number;
  message: Observable<string> | string;
}
