export interface InputColumnObject {
	name: string;
	value: string;
	breakpoint: string;
}

export const validateColumnInputArray = (inputs: Array<InputColumnObject>) => {
	inputs.forEach((item) => {
		if (item.value.trim() === '') {
			throw new Error(
				`Your column input "${item.name}" looks empty. Either remove it or add some proper CSS grid-template-columns values.`
			);
		}

		if (item.value.includes('px')) {
			throw new Error(`Your fudis-grid column input of "${item.name}" should not contain px values.`);
		}

		if (item.value.includes('repeat')) {
			throw new Error(
				`Your fudis-grid column "${item.name}" input contains a "repeat" CSS function for grid-template-columns. Currently fudis-grid doesn't allow it.`
			);
		}

		const inputToArray = item.value.split(' ');

		let sumOfFrValues = 0;

		const valueWithFr = /^[\d+]*(fr)$/;

		inputToArray.forEach((el) => {
			if (el.match(valueWithFr)) {
				const numberValue = Number(el.slice(0, -2));
				sumOfFrValues += numberValue;
			}
		});

		if (sumOfFrValues > 12) {
			throw new Error(
				`Your fudis-grid's sum of fr values for column input of "${item.name}" is over 12. Our grid is designed to be used only with maximum sum of 12 fr columns.`
			);
		}
	});
};
