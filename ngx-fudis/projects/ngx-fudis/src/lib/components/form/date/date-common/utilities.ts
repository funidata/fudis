export const updateLocale = (value: string): string => {
	switch (value) {
		case 'en':
			return 'en-GB';
		case 'fi':
			return 'fi-FI';
		case 'sv':
			return 'sv-SE';
		default:
			return 'en-GB';
	}
};
