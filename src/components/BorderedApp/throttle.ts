// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle(f: any) {
  let token: number | null = null;
  let lastArgs: unknown[] | null = null;

  const invoke = () => {
    f(...(lastArgs ?? []));
    token = null;
  };

  const result = (...args: unknown[]) => {
    lastArgs = args;
    if (!token) {
      token = requestAnimationFrame(invoke);
    }
  };

  result.cancel = () => token && cancelAnimationFrame(token);
  return result;
}
