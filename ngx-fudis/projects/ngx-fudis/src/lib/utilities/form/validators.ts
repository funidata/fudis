export module FormGroupValidators {
	export function atLeastOneRequired() {
		return (controlGroup: any) => {
			const { controls } = controlGroup;

			if (controls) {
				const theOne = Object.keys(controls).find((key) => controls[key].value !== null && controls[key].value !== '');

				if (!theOne) {
					return {
						atLeastOneRequired: true,
					};
				}
			}
			return null;
		};
	}
}
