import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormGroupValidators } from './validators';

export const checkRequiredAttributes = (
	id: string,
	requiredText: string | undefined,
	control?: FormControl,
	group?: FormGroup<any>,
	ignoreRequiredCheck?: boolean
) => {
	if (!ignoreRequiredCheck) {
		if (requiredText && !group && !control?.hasValidator(Validators.required)) {
			// eslint-disable-next-line no-console
			console.warn(
				`Fudis component with id of '${id}' has requiredText of '${requiredText}' but component's form control does not have 'Validators.required'.`
			);
		}

		if (!requiredText && group) {
			Object.keys(group.controls).forEach((controlKey) => {
				if (group.controls[controlKey].hasValidator(Validators.required)) {
					// eslint-disable-next-line no-console
					console.warn(
						`Fudis component with id of '${id}' from in control key of ${control} has 'Validators.required' but no 'requiredText' is provided.`
					);
				}
			});
		}

		if (!requiredText && control?.hasValidator(Validators.required)) {
			// eslint-disable-next-line no-console
			console.warn(
				`Fudis component with id of '${id}' from control has 'Validators.required' but no 'requiredText' is provided.`
			);
		}

		if (!requiredText && group?.hasValidator(FormGroupValidators.atLeastOneRequired)) {
			// eslint-disable-next-line no-console
			console.warn(
				`Fudis component with id of '${id}' has validator of 'FormGroupValidators.atLeastOneRequired' but is missing 'requiredText' attribute.`
			);
		}
	}
};
