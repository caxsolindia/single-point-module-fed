import { render } from "@testing-library/react";
import { createTheme } from "@mui/material/styles";
import MuiComponentsDemo from "./MuiComponentsDemo.js";

describe("MuiComponentsDemo", () => {
  it("renders without crashing", () => {
    const theme = createTheme();
    render(<MuiComponentsDemo theme={theme} />);
  });
});
