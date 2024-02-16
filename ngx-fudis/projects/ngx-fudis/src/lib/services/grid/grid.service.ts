import { Injectable, Signal, signal } from '@angular/core';
import { FudisGridAttributes } from '../../types/grid';

// TODO: Write Storybook documentation under Services. Note that there is already documentation of setGridDefaultValues in Documentation/Grid.
@Injectable()
export class FudisGridService {
  /**
   * Grid values that can be set from application. By default there are no default values.
   */
  private _defaultGridValues = signal<FudisGridAttributes>({});

  /**
   * To set default values for all Grids application uses from application.
   */
  public setGridDefaultValues(defaultValues: FudisGridAttributes): void {
    this._defaultGridValues.set(defaultValues);
  }

  /**
   * Get application's default values for Grid
   */
  public getGridDefaultValues(): Signal<FudisGridAttributes | null> {
    return this._defaultGridValues.asReadonly();
  }
}
