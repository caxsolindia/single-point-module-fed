import { act, renderHook } from "@testing-library/react";
import useThemePalette from "./useCustomTheme.js";

describe("useThemePalette", () => {
  it("returns initial theme", () => {
    const { result } = renderHook(() => useThemePalette());
    const { theme } = result.current;
    expect(theme.palette.mode).toBe("light");
    expect(theme.palette.primary.main).toBe("rgba(115, 11, 166, 1)");
  });

  it("updates palette colors", () => {
    const { result } = renderHook(() => useThemePalette());
    act(() => {
      result.current.updatePaletteColors({
        primary: {
          main: "rgba(255, 0, 0, 1)",
        },
      });
    });
    const { theme } = result.current;
    expect(theme.palette.primary.main).toBe("rgba(255, 0, 0, 1)");
  });

  it("resets palette colors", () => {
    const { result } = renderHook(() => useThemePalette());
    act(() => {
      result.current.updatePaletteColors({
        primary: {
          main: "rgba(255, 0, 0, 1)",
        },
      });
    });
    act(() => {
      result.current.resetPaletteColors();
    });
    const { theme } = result.current;
    expect(theme.palette.primary.main).toBe("rgba(115, 11, 166, 1)");
  });
});
