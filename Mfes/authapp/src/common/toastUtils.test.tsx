import { toast } from "react-hot-toast";
import "@testing-library/jest-dom";
import { showToast } from "./toastUtils.ts";

// Mock the react-hot-toast module
jest.mock("react-hot-toast", () => ({
  __esModule: true,
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    loading: jest.fn(),
  },
}));

describe("showToast", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call toast.success with the correct message and without id", () => {
    const message = "Success message";
    showToast({ type: "success", message });

    expect(toast.success).toHaveBeenCalledWith(message, undefined);
    expect(toast.error).not.toHaveBeenCalled();
    expect(toast.loading).not.toHaveBeenCalled();
  });

  it("should call toast.error with the correct message and without id", () => {
    const message = "Error message";
    showToast({ type: "error", message });

    expect(toast.error).toHaveBeenCalledWith(message, undefined);
    expect(toast.success).not.toHaveBeenCalled();
    expect(toast.loading).not.toHaveBeenCalled();
  });

  it("should call toast.loading with the correct message and without id", () => {
    const message = "Loading message";
    showToast({ type: "loading", message });

    expect(toast.loading).toHaveBeenCalledWith(message, undefined);
    expect(toast.success).not.toHaveBeenCalled();
    expect(toast.error).not.toHaveBeenCalled();
  });

  it("should call toast.success with the correct message and id", () => {
    const message = "Success message";
    const id = "unique-id";
    showToast({ type: "success", message, id });

    expect(toast.success).toHaveBeenCalledWith(message, { id });
  });

  it("should call toast.error with the correct message and id", () => {
    const message = "Error message";
    const id = "unique-id";
    showToast({ type: "error", message, id });

    expect(toast.error).toHaveBeenCalledWith(message, { id });
  });

  it("should call toast.loading with the correct message and id", () => {
    const message = "Loading message";
    const id = "unique-id";
    showToast({ type: "loading", message, id });

    expect(toast.loading).toHaveBeenCalledWith(message, { id });
  });
});
