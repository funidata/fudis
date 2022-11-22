import { useEffect, useGlobals } from '@storybook/addons';

export const useTheme = (Story) => {
	const [{ theme }] = useGlobals();

	useEffect(() => {
		document.body.setAttribute('data-theme', theme);
	}, [theme]);

	return Story();
};
