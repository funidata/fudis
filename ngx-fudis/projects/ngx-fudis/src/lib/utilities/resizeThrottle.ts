// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const throttle = (f: any, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => f.apply(this, args), delay);
  };
};
