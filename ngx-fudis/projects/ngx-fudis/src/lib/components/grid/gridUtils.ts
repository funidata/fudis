export const validateColumnInput = (input: string, inputName: string) => {
	if (input.trim() === '') {
		throw new Error(
			`Your column input "${inputName}" looks empty. Either remove it or add some proper CSS grid-template-columns values.`
		);
	}

	if (input.includes('px')) {
		throw new Error(`Your fudis-grid column input of "${inputName}" should not contain px values.`);
	}

	if (input.includes('repeat')) {
		throw new Error(
			`Your fudis-grid column "${inputName}" input contains a "repeat" CSS function for grid-template-columns. Currently fudis-grid doesn't allow it.`
		);
	}

	const inputToArray = input.split(' ');

	let sumOfFrValues = 0;

	const valueWithFr = /^[\d+]*(fr)$/;

	inputToArray.forEach((item) => {
		if (item.match(valueWithFr)) {
			const numberValue = Number(item.slice(0, -2));
			sumOfFrValues += numberValue;
		}
	});

	if (sumOfFrValues > 12) {
		throw new Error(
			`Your fudis-grid's sum of fr values for column input of "${inputName}" is over 12. Our grid is designed to be used only with maximum sum of 12 fr columns.`
		);
	}
};
