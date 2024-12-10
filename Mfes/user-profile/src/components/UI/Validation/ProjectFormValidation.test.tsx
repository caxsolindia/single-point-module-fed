import {
  ProjectvalidationSchema,
  skillValidationSchema,
} from "./ProjectFormValidation.ts";

describe("ProjectvalidationSchema", () => {
  const validData = {
    projectTitle: "My Project",
    role: "Developer",
    startMonth: "January",
    startYear: 2020,
    endMonth: "December",
    endYear: 2021,
    skills: ["JavaScript", "React"],
    projectSummary: "This is a project summary.",
  };

  it("should fail if end date is earlier than start date", async () => {
    const invalidData = {
      ...validData,
      startMonth: "January",
      startYear: 2021,
      endMonth: "December",
      endYear: 2020, // End date is earlier
    };

    const result = await ProjectvalidationSchema.validate(invalidData).catch(
      (err) => err,
    );
    expect(result.errors).toContain(
      "End Date should not be earlier than Start Date",
    );
  });

  it("should fail if project summary exceeds 2000 characters", async () => {
    const longSummary = "a".repeat(2001);
    const invalidData = { ...validData, projectSummary: longSummary };

    const result = await ProjectvalidationSchema.validate(invalidData).catch(
      (err) => err,
    );
    expect(result.errors).toContain(
      "Project Summary cannot exceed 2000 characters",
    );
  });
});

describe("skillValidationSchema", () => {
  it("should pass with valid skills", async () => {
    const validSkills = ["JavaScript", "React"];

    await expect(skillValidationSchema.isValid(validSkills)).resolves.toBe(
      true,
    );
  });

  it("should fail if skill starts with an invalid character", async () => {
    const invalidSkills = ["!InvalidSkill"];

    const result = await skillValidationSchema
      .validate(invalidSkills)
      .catch((err) => err);
    expect(result.errors).toContain(
      "Skill name must not start with a symbol (except for a dot).",
    );
  });

  it("should fail if skills are not unique", async () => {
    const nonUniqueSkills = ["JavaScript", "javascript"];

    const result = await skillValidationSchema
      .validate(nonUniqueSkills, {
        context: { skills: nonUniqueSkills },
      })
      .catch((err) => err);

    expect(result.errors).toContain("Skill name already exists.");
  });
});
