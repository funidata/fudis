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
		'@storybook/addon-a11y',
		'storybook-version',
		{
			name: '@storybook/addon-docs',
			options: {
				transcludeMarkdown: true,
			},
		},
	],
	framework: {
		name: '@storybook/angular',
		options: { enableIvy: true },
	},
	features: { modernInlineRender: true },
	core: {
		builder: '@storybook/builder-webpack5',
	},
	staticDirs: [
		'./../projects/ngx-fudis/src/lib/assets/fonts/fira/woff2',
		'./../projects/ngx-fudis/src/lib/assets/icons',
	],
	env: (config) => ({
		...config,
		VERSION: process.env.VERSION | '0.0.0',
	}),
};
