import { addCertificationValidationSchema } from "./CertificateValidation.ts";

describe("addExperienceValidationSchema", () => {
  it("should fail validation when CertificateTitle contains whitespace at the start or end", async () => {
    const invalidData = {
      CertificateTitle: " Invalid Certificate ",
      Organization: "Valid Organization",
      CredentialUrl: "https://google.com",
      Skills: "React, Node.js",
      startMonth: "January",
      startYear: 2020,
      endMonth: "December",
      endYear: 2021,
    };

    await expect(
      addCertificationValidationSchema.validate(invalidData),
    ).rejects.toThrow(
      "Skills must be a `array` type, but the final value was:",
    );
  });

  it("should fail validation if end date is earlier than start date", async () => {
    const invalidData = {
      CertificateTitle: "Valid Certificate",
      Organization: "Valid Organization",
      CredentialUrl: "https://google.com",
      Skills: "React, Node.js",
      startMonth: "December",
      startYear: 2021,
      endMonth: "January",
      endYear: 2021,
    };

    await expect(
      addCertificationValidationSchema.validate(invalidData),
    ).rejects.toThrow("End Date shouldn't be earlier than Start Date");
  });

  it("should fail validation if startYear is outside the valid range", async () => {
    const invalidData = {
      CertificateTitle: "Valid Certificate",
      Organization: "Valid Organization",
      CredentialUrl: "https://google.com",
      Skills: "React, Node.js",
      startMonth: "January",
      startYear: 1800,
      endMonth: "December",
      endYear: 2021,
    };

    await expect(
      addCertificationValidationSchema.validate(invalidData),
    ).rejects.toThrow("Year must be between 1900 and 2100");
  });

  it("should fail validation if any required field is missing", async () => {
    const invalidData = {
      CertificateTitle: "Valid Certificate",
      Organization: "Valid Organization",
      CredentialUrl: "https://google.com",
      Skills: "React, Node.js",
      startMonth: "January",
      startYear: 2020,
      endMonth: "December",
    };

    await expect(
      addCertificationValidationSchema.validate(invalidData),
    ).rejects.toThrow("End Year is required");
  });
  it("should pass validation when all fields are valid", async () => {
    const validData = {
      CertificateTitle: "Valid Certificate",
      Organization: "Valid Organization",
      CredentialUrl: "https://google.com",
      Skills: ["React", "Node.js"],
      startMonth: "January",
      startYear: 2020,
      endMonth: "December",
      endYear: 2021,
    };

    await expect(
      addCertificationValidationSchema.validate(validData),
    ).resolves.toBe(validData);
  });

  it("should fail validation if a skill name already exists in the context", async () => {
    const invalidData = {
      CertificateTitle: "Valid Certificate",
      Organization: "Valid Organization",
      CredentialUrl: "https://google.com",
      Skills: ["React", "Node.js"],
      startMonth: "January",
      startYear: 2020,
      endMonth: "December",
      endYear: 2021,
    };

    const context = {
      skills: ["react", "vue"],
    };

    await expect(
      addCertificationValidationSchema.validate(invalidData, { context }),
    ).rejects.toThrow("Skill name already exists.");
  });

  it("should pass validation if all skill names are unique in the context", async () => {
    const validData = {
      CertificateTitle: "Valid Certificate",
      Organization: "Valid Organization",
      CredentialUrl: "https://google.com",
      Skills: ["Angular", "Node.js"],
      startMonth: "January",
      startYear: 2020,
      endMonth: "December",
      endYear: 2021,
    };

    const context = {
      skills: ["react", "vue"],
    };

    await expect(
      addCertificationValidationSchema.validate(validData, { context }),
    ).resolves.toBe(validData);
  });
});
