import {
  validationSchema,
  LANGUAGE_REQUIRED_ERROR,
} from "./ValidationMessage.ts";

const validData = {
  countryCode: "+1",
  contactNumber: "1234567890",
  urlLink: "https://example.com",
  languages: ["English"],
};

describe("validationSchema", () => {
  it("should pass validation with all valid fields", async () => {
    await expect(
      validationSchema.validate(validData, {
        context: { selectedLanguages: ["English"] },
      }),
    ).resolves.toEqual(validData); // Use toEqual for comparing object values
  });

  it("should fail validation if languages array is empty", async () => {
    const invalidDataEmptyLanguages = {
      countryCode: "US",
      contactNumber: "1234567890",
      urlLink: "https://example.com",
      languages: [], // No languages selected
    };

    const context = { selectedLanguages: [] };

    await expect(
      validationSchema.validate(invalidDataEmptyLanguages, { context }),
    ).rejects.toThrow(LANGUAGE_REQUIRED_ERROR);
  });

  it("should pass validation if languages are selected in the context", async () => {
    const validDataWithContextLanguages = {
      countryCode: "US",
      contactNumber: "1234567890",
      urlLink: "https://example.com",
      languages: [], // Empty array but context has selected languages
    };

    const context = { selectedLanguages: ["English"] };

    await expect(
      validationSchema.validate(validDataWithContextLanguages, { context }),
    ).resolves.toEqual(validDataWithContextLanguages);
  });
});
