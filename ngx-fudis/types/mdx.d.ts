declare module '*.mdx' {
	const MDXComponent: (props: any) => JSX.Element;
	export default MDXComponent;
}

declare module 'cypress-image-diff-js/dist/plugin';
declare module 'cypress-image-diff-js/dist/command';
