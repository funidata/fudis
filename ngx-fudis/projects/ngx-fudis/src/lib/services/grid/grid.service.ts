import { Injectable, Signal, signal } from '@angular/core';
import { FudisGridProperties } from '../../types/grid';

@Injectable({ providedIn: 'root' })
export class FudisGridService {
  /**
   * Grid values that can be set from application. By default an empty object.
   */
  private _defaultGridValues = signal<FudisGridProperties>({});

  /**
   * To set default values for all Grids application uses from application.
   */
  public setDefaultValues(newDefaultValues: FudisGridProperties): void | never {
    let checkedNewValues: FudisGridProperties = {};

    Object.keys(newDefaultValues).forEach((key) => {
      const keyName = key as keyof FudisGridProperties;
      const newValue = newDefaultValues[keyName];

      if (newValue) {
        checkedNewValues = { ...checkedNewValues, [keyName]: newValue };
      } else {
        throw new Error(
          `FudisGridService.setDefaultValues() received on object with key of: '${keyName}' and value of: '${newValue}'. This value was not applied to default values.`,
        );
      }
    });

    this._defaultGridValues.set({ ...this._defaultGridValues(), ...checkedNewValues });
  }

  /**
   * Get application's default values for Grid
   */
  public getDefaultValues(): Signal<FudisGridProperties> {
    return this._defaultGridValues.asReadonly();
  }
}
