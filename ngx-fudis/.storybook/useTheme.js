import { useEffect, useGlobals } from "@storybook/addons";

export const useTheme = (Story) => {
  const [{ theme }] = useGlobals();

  useEffect(() => {
    // eslint-disable-next-line no-undef
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return Story();
};
