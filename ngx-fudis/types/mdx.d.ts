declare module '*.mdx' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
}
