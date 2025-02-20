import { Injectable, Signal, signal } from '@angular/core';
import { FudisDefaultGridProperties } from '../../types/grid';

@Injectable({ providedIn: 'root' })
export class FudisGridService {
  /**
   * Grid values that can be set from application. By default an empty object.
   */
  private _defaultGridValues = signal<FudisDefaultGridProperties>({});

  /**
   * To set default values for all Grids application uses from application.
   */
  public setDefaultValues(newDefaultValues: FudisDefaultGridProperties): void | never {
    let checkedNewValues: FudisDefaultGridProperties = {};

    Object.keys(newDefaultValues).forEach((key) => {
      const keyName = key as keyof FudisDefaultGridProperties;
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
  public getDefaultValues(): Signal<FudisDefaultGridProperties> {
    // just for science
    return this._defaultGridValues.asReadonly();
  }
}
