// profileValidation.test.js
import { profileSchema, validateProfile } from "./ProfileSummaryValidation.ts"; // Adjust the path as needed

describe("Profile Validation", () => {
  it("should pass validation with valid data", async () => {
    const validSummary = "This is a valid profile summary.";
    const errors = await validateProfile(validSummary);
    expect(errors).toEqual({});
  });

  it("should fail validation when summary is missing", async () => {
    const errors = await validateProfile("");
    expect(errors).toEqual({ summary: "Profile summary is required" });
  });

  it("should fail validation when summary exceeds max length", async () => {
    const longSummary = "a".repeat(2501); // 2501 characters
    const errors = await validateProfile(longSummary);
    expect(errors).toEqual({
      summary: "Profile summary must be at most 2500 characters",
    });
  });

  it("should return unknown error for unexpected issues", async () => {
    const originalValidate = profileSchema.validate;
    profileSchema.validate = () => {
      throw new Error("Unexpected error");
    };

    const errors = await validateProfile("Valid summary");
    expect(errors).toEqual({ summary: "An unknown error occurred" });

    profileSchema.validate = originalValidate; // Restore original method
  });
});
