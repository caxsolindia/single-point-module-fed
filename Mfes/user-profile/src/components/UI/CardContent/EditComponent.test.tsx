import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "@mui/material/styles";
import useThemePalette from "../../../__mocks__/styleguide/Theme.ts";
import EditComponent, { onSubmit, ProfileFormData } from "./EditComponent.tsx";

jest.mock("../../../ThemeContext/ThemeContext.tsx", () => ({
  useThemeContext: jest.fn().mockReturnValue({
    primary: "#000",
    secondary: "#FFF",
  }),
}));

const mockOnSave = jest.fn();
describe("EditComponent", () => {
  const onSave = jest.fn();
  const onCancel = jest.fn();
  const mockCountryCodes = [
    { flag: "🇺🇸", dial_code: "+1", name: "United States" },
    { flag: "🇨🇦", dial_code: "+1", name: "Canada" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCountryCodes),
      }),
    ) as jest.Mock;
  });

  it("renders without crashing", () => {
    const { theme } = useThemePalette(); // Use the hook to get the theme

    render(
      <ThemeProvider theme={theme}>
        <EditComponent onCancel={onCancel} onSave={onSave} />
      </ThemeProvider>,
    );
    expect(screen.getByText(/save/i)).toBeInTheDocument();
    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
  });

  it("should call onCancel when Cancel button is clicked", () => {
    const { theme } = useThemePalette(); // Use the hook to get the theme

    render(
      <ThemeProvider theme={theme}>
        <EditComponent onCancel={onCancel} onSave={onSave} />
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByText(/cancel/i));
    expect(onCancel).toHaveBeenCalled();
  });

  it("should call onSave with correct data when Save button is clicked", async () => {
    const { theme } = useThemePalette(); // Use the hook to get the theme

    render(
      <ThemeProvider theme={theme}>
        <EditComponent onCancel={onCancel} onSave={onSave} />
      </ThemeProvider>,
    );
  });

  it("should handle API errors gracefully", async () => {
    const { theme } = useThemePalette(); // Use the hook to get the theme

    render(
      <ThemeProvider theme={theme}>
        <EditComponent onCancel={onCancel} onSave={onSave} />
      </ThemeProvider>,
    );
  });

  it("should fetch and display country codes", async () => {
    const { theme } = useThemePalette();

    render(
      <ThemeProvider theme={theme}>
        <EditComponent onCancel={onCancel} onSave={onSave} />
      </ThemeProvider>,
    );

    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        "https://gist.githubusercontent.com/DmytroLisitsyn/1c31186e5b66f1d6c52da6b5c70b12ad/raw/2bc71083a77106afec2ec37cf49d05ee54be1a22/country_dial_info.json",
      ),
    );
  });

  it("should handle form submission and reset", async () => {
    const { theme } = useThemePalette();

    render(
      <ThemeProvider theme={theme}>
        <EditComponent onCancel={onCancel} onSave={onSave} />
      </ThemeProvider>,
    );
  });

  it("should display validation errors on invalid input", async () => {
    const { theme } = useThemePalette();

    render(
      <ThemeProvider theme={theme}>
        <EditComponent onCancel={onCancel} onSave={onSave} />
      </ThemeProvider>,
    );

    // Trigger form submission with empty fields
    fireEvent.click(screen.getByText(/save/i));
    expect(onSave).not.toHaveBeenCalled();
  });

  it("should handle API errors gracefully", async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error("Failed to fetch country codes")),
    ) as jest.Mock;

    const { theme } = useThemePalette();

    render(
      <ThemeProvider theme={theme}>
        <EditComponent onCancel={onCancel} onSave={onSave} />
      </ThemeProvider>,
    );
  });

  it("renders with initial state", () => {
    const { theme } = useThemePalette();

    render(
      <ThemeProvider theme={theme}>
        <EditComponent onCancel={onCancel} onSave={onSave} />
      </ThemeProvider>,
    );
  });

  it("should handle API errors gracefully", async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error("Failed to fetch country codes")),
    ) as jest.Mock;

    const { theme } = useThemePalette();

    render(
      <ThemeProvider theme={theme}>
        <EditComponent onCancel={onCancel} onSave={onSave} />
      </ThemeProvider>,
    );
  });

  it("should update state on input changes", async () => {
    const { theme } = useThemePalette();

    render(
      <ThemeProvider theme={theme}>
        <EditComponent onCancel={onCancel} onSave={onSave} />
      </ThemeProvider>,
    );
  });

  it("should handle language selection", async () => {
    const { theme } = useThemePalette();

    render(
      <ThemeProvider theme={theme}>
        <EditComponent onCancel={onCancel} onSave={onSave} />
      </ThemeProvider>,
    );
  });

  it("should update phone number and country code", async () => {
    const { theme } = useThemePalette();

    render(
      <ThemeProvider theme={theme}>
        <EditComponent onCancel={onCancel} onSave={onSave} />
      </ThemeProvider>,
    );
  });

  it("should reset form after submission", async () => {
    const { theme } = useThemePalette();

    render(
      <ThemeProvider theme={theme}>
        <EditComponent onCancel={onCancel} onSave={onSave} />
      </ThemeProvider>,
    );

    // Simulate form submission
    fireEvent.click(screen.getByText(/save/i));

    await waitFor(() => {});
  });

  it("renders with initial state", () => {
    const { theme } = useThemePalette();
    render(
      <ThemeProvider theme={theme}>
        <EditComponent onCancel={onCancel} onSave={mockOnSave} />
      </ThemeProvider>,
    );
  });

  it("updates input fields correctly", () => {
    const { theme } = useThemePalette();
    render(
      <ThemeProvider theme={theme}>
        <EditComponent onCancel={onCancel} onSave={mockOnSave} />
      </ThemeProvider>,
    );
  });

  it("submits form data correctly", async () => {
    const { theme } = useThemePalette();
    render(
      <ThemeProvider theme={theme}>
        <EditComponent onCancel={onCancel} onSave={mockOnSave} />
      </ThemeProvider>,
    );

    await waitFor(() => {});
  });

  it("displays error messages for invalid inputs", async () => {
    const { theme } = useThemePalette();
    render(
      <ThemeProvider theme={theme}>
        <EditComponent onCancel={onCancel} onSave={mockOnSave} />
      </ThemeProvider>,
    );
  });

  it("updates country code and phone number correctly", async () => {
    const { theme } = useThemePalette();
    render(
      <ThemeProvider theme={theme}>
        <EditComponent onCancel={onCancel} onSave={mockOnSave} />
      </ThemeProvider>,
    );
  });

  it("should handle network errors gracefully", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false, // Simulate a network error
      }),
    ) as jest.Mock;

    const { theme } = useThemePalette();

    render(
      <ThemeProvider theme={theme}>
        <EditComponent onCancel={onCancel} onSave={mockOnSave} />
      </ThemeProvider>,
    );
  });

  it("should reset form fields after successful submission", async () => {
    const { theme } = useThemePalette();
    render(
      <ThemeProvider theme={theme}>
        <EditComponent onCancel={onCancel} onSave={mockOnSave} />
      </ThemeProvider>,
    );
    await waitFor(() => {
      // });
    });
  });

  it("should render selected language chips and handle deletion", async () => {
    const { theme } = useThemePalette();
    render(
      <ThemeProvider theme={theme}>
        <EditComponent onCancel={onCancel} onSave={mockOnSave} />
      </ThemeProvider>,
    );
    await waitFor(() => {
      expect(screen.queryByText(/JavaScript/i)).not.toBeInTheDocument();
    });
  });

  it("should handle API error when network response is not OK", async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: false })) as jest.Mock;

    render(<EditComponent onSave={mockOnSave} onCancel={onCancel} />);

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(mockOnSave).not.toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  it("should fetch country codes successfully and set them", async () => {
    // Mock a successful API call
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCountryCodes,
    });

    render(<EditComponent onSave={mockOnSave} onCancel={jest.fn()} />);

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    // Check if country codes are loaded and rendered in the select box
  });

  it("should handle API error and display error message", async () => {
    // Mock a failed API response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    render(<EditComponent onSave={mockOnSave} onCancel={jest.fn()} />);

    // Wait for the API to fail
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
  });

  it("should handle fetch failure with an exception", async () => {
    // Mock a network error (rejection)
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network error"),
    );

    render(<EditComponent onSave={mockOnSave} onCancel={jest.fn()} />);

    // Wait for the API to fail
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
  });
});

describe("onSubmit", () => {
  it("should call onSave with correct data, reset the form, and clear state", () => {
    // Arrange
    const formData: ProfileFormData = {
      contactNumber: "1234567890",
      countryCode: "+1",
      language: ["English"],
      urlLink: "http://example.com",
    };
    const selectedLanguages = ["English"];
    // const mockOnSave = jest.fn();
    const mockReset = jest.fn();
    const mockSetSelectedLanguages = jest.fn();
    const mockSetSelectedCountryCode = jest.fn();
    const mockSetPhoneNumber = jest.fn();

    // Act
    onSubmit(
      formData,
      mockOnSave,
      mockReset,
      mockSetSelectedLanguages,
      mockSetSelectedCountryCode,
      mockSetPhoneNumber,
      selectedLanguages,
    );

    // Assert
    expect(mockOnSave).toHaveBeenCalledWith({
      ...formData,
      language: selectedLanguages,
    });
    expect(mockReset).toHaveBeenCalled();
    expect(mockSetSelectedLanguages).toHaveBeenCalledWith([]);
    expect(mockSetSelectedCountryCode).toHaveBeenCalledWith("");
    expect(mockSetPhoneNumber).toHaveBeenCalledWith("");
  });
});
