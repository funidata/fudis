/**
 * Use this decorator in the component @Inputs which are required.
 * If required Input is not provided it will generate error message to the console.
 *
 * @param target - represent of the class prototype
 * @param prop - represent of the property name that is being decorated
 *
 * `````
 * @isRequired
 * @Input() label: string
 * ````
 */

export default function isRequired(target: any, prop: string) {
	const NG_ON_ONIT_NAME = 'ngOnInit';

	/** ngOnInit might not be implemented by this component */
	const ngOnInitClone: Function | null = target[NG_ON_ONIT_NAME];

	/** Create new property */
	Object.defineProperty(target, NG_ON_ONIT_NAME, {
		value() {
			if (this[prop] == null) {
				throw new Error(`${target.constructor.name}: ${prop} is required, but was not provided`);
			}
			// Calling the original ngOnInit with its original context
			if (ngOnInitClone) {
				ngOnInitClone.call(this);
			}
		},
		// Allow ngOnInit to be redefined (if component does not have OnInit lifecycle hook)
		configurable: true,
	});
}
