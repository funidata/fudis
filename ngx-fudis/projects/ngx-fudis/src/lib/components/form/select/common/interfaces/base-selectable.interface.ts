import { FormControl } from '@angular/forms';
import { FudisSelectVariant } from '../../../../../types/forms';

export interface BaseSelectableComponent<T = unknown> {
  control: FormControl<T>;
  variant: FudisSelectVariant;
  autocompleteFilter: boolean;
}
