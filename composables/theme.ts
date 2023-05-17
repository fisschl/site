declare global {
  interface Document {
    startViewTransition(callback: () => Promise<void>): {
      ready: Promise<void>;
    };
  }
}

export const useTheme = () => {
  const colorMode = useColorMode();
  const isDark = computed(() => colorMode.value === "dark");
  const changeTheme = async (e: MouseEvent) => {
    const change = () => {
      colorMode.preference = isDark.value ? "light" : "dark";
      return nextTick();
    };
    if (!document.startViewTransition) return change();
    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(innerWidth, innerHeight);
    await document.startViewTransition(change).ready;
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0 at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: "ease-in",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  };
  return {
    changeTheme,
    isDark,
  };
};
