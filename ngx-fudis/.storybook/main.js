module.exports = {
	stories: [
		'../projects/ngx-fudis/src/lib/components/**/*.stories.ts',
		'../projects/ngx-fudis/src/lib/foundations/**/*.stories.mdx',
		'../projects/documentation/**/*.stories.mdx',
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		{
			name: '@storybook/addon-docs',
			options: {
				transcludeMarkdown: true,
			},
		},
	],
	framework: '@storybook/angular',
	features: { modernInlineRender: true },
	core: {
		builder: '@storybook/builder-webpack5',
	},
	staticDirs: [
		'./../projects/ngx-fudis/src/lib/assets/fonts/fira/woff2',
		'./../projects/ngx-fudis/src/lib/assets/icons',
	],
	// See https://github.com/storybookjs/storybook/issues/1291#issuecomment-795251283
	webpackFinal: async (config, { configType }) => {
		if (NODE_ENV === 'PRODUCTION') {
			// FIXME: Use parameterized path.
			config.output.publicPath = '/basse-testaa/';
		}
		// FIXME: Remove
		config.output.publicPath = '/basse-testaa/';
		return config;
	},
	managerWebpack: async (config, { configType }) => {
		if (NODE_ENV === 'PRODUCTION') {
			// FIXME: Use parameterized path.
			config.output.publicPath = '/basse-testaa/';
		}
		// FIXME: Remove
		config.output.publicPath = '/basse-testaa/';
		return config;
	},
};
