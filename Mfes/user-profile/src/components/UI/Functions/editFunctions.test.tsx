import React from "react";
import {
  handleDeleteLanguage,
  handleLanguageChange,
  handleCountryCodeChange,
  handlePhoneNumberChange,
  formatCertificateDate,
} from "./editFunctions.tsx";

describe("handleDeleteLanguage", () => {
  it("should remove the specified language from the list", () => {
    const setSelectedLanguages = jest.fn();

    handleDeleteLanguage("Spanish", setSelectedLanguages);

    // Capture the function passed to setSelectedLanguages
    const argument = setSelectedLanguages.mock.calls[0][0];

    // The argument should be a function, so we call it with a fake previous state
    const newLanguages = argument(["English", "Spanish", "French"]);

    // Expect the updated list of languages
    expect(newLanguages).toEqual(["English", "French"]);
  });

  it("should not change the list if the language is not present", () => {
    const setSelectedLanguages = jest.fn();

    handleDeleteLanguage("German", setSelectedLanguages);

    // Capture the function passed to setSelectedLanguages
    const argument = setSelectedLanguages.mock.calls[0][0];

    // The argument should be a function, so we call it with a fake previous state
    const newLanguages = argument(["English", "Spanish", "French"]);

    // Expect the unchanged list of languages
    expect(newLanguages).toEqual(["English", "Spanish", "French"]);
  });
});

describe("handleLanguageChange", () => {
  it("should add a new language to the list and clear the input value", () => {
    const setSelectedLanguages = jest.fn();
    const setInputValue = jest.fn();
    const clearErrors = jest.fn();

    handleLanguageChange(
      "German",
      ["English", "Spanish"],
      setSelectedLanguages,
      setInputValue,
      clearErrors,
    );

    // The setSelectedLanguages function should have been called with a function
    const argument = setSelectedLanguages.mock.calls[0][0];
    const newLanguages = argument(["English", "Spanish"]);

    // Expect the updated list of languages to include the new language
    expect(newLanguages).toEqual(["English", "Spanish", "German"]);

    // Ensure input value is cleared
    expect(setInputValue).toHaveBeenCalledWith("");

    // Ensure clearErrors was called for the language field
    expect(clearErrors).toHaveBeenCalledWith("language");
  });

  it("should not add a language that is already in the list", () => {
    const setSelectedLanguages = jest.fn();
    const setInputValue = jest.fn();
    const clearErrors = jest.fn();

    handleLanguageChange(
      "English",
      ["English", "Spanish"],
      setSelectedLanguages,
      setInputValue,
      clearErrors,
    );

    // The setSelectedLanguages function should not have been called
    expect(setSelectedLanguages).not.toHaveBeenCalled();

    // Ensure input value is cleared
    expect(setInputValue).toHaveBeenCalledWith("");

    // Ensure clearErrors was called for the language field
    expect(clearErrors).toHaveBeenCalledWith("language");
  });

  it("should not clear errors if value is null", () => {
    const setSelectedLanguages = jest.fn();
    const setInputValue = jest.fn();
    const clearErrors = jest.fn();

    handleLanguageChange(
      null,
      ["English", "Spanish"],
      setSelectedLanguages,
      setInputValue,
      clearErrors,
    );

    // The setSelectedLanguages function should not have been called
    expect(setSelectedLanguages).not.toHaveBeenCalled();

    // Ensure input value is cleared
    expect(setInputValue).toHaveBeenCalledWith("");

    // Ensure clearErrors was not called
    expect(clearErrors).not.toHaveBeenCalled();
  });
});

describe("handleCountryCodeChange", () => {
  it("should update the selected country code and call setValue with the correct parameters", () => {
    const setSelectedCountryCode = jest.fn();
    const setValue = jest.fn();

    // Simulate a change event
    const event = {
      target: {
        value: "+1", // Example new country code
      },
    } as React.ChangeEvent<HTMLInputElement>;

    handleCountryCodeChange(event, setSelectedCountryCode, setValue);

    // Check that setSelectedCountryCode was called with the new country code
    expect(setSelectedCountryCode).toHaveBeenCalledWith("+1");

    // Check that setValue was called with "countryCode" and the new country code
    expect(setValue).toHaveBeenCalledWith("countryCode", "+1");
  });
});

describe("handlePhoneNumberChange", () => {
  it("should update the phone number and call setValue with the correct parameters", () => {
    const setSelectedCountryCode = jest.fn();
    const setValue = jest.fn();

    // Simulate a change event
    const event = {
      target: {
        value: "+1",
      },
    } as React.ChangeEvent<HTMLInputElement>;

    handlePhoneNumberChange(event, setSelectedCountryCode, setValue, "+1");
    expect(setSelectedCountryCode).toHaveBeenCalledWith("+1");
    expect(setValue).toHaveBeenCalledWith("contactNumber", "+1");
  });
});
describe("formatCertificateDate", () => {
  it("should return month and year when a valid date string is provided", () => {
    const result = formatCertificateDate("10-2024");
    expect(result).toEqual({ month: "10", year: "2024" });
  });

  it("should return empty strings for month and year when input is null", () => {
    const result = formatCertificateDate(null);
    expect(result).toEqual({ month: "", year: "" });
  });

  it("should return empty strings for month and year when input is undefined", () => {
    const result = formatCertificateDate(undefined);
    expect(result).toEqual({ month: "", year: "" });
  });

  it("should return empty strings for month and year when input is an empty string", () => {
    const result = formatCertificateDate("");
    expect(result).toEqual({ month: "", year: "" });
  });

  it("should handle incorrect format gracefully", () => {
    const result = formatCertificateDate("2024-10"); // Wrong format
    expect(result).toEqual({ month: "2024", year: "10" });
  });
});
