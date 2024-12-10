import {
  addExperienceValidationSchema,
  skillValidationSchema,
} from "./ExperienceValidation.ts"; // Replace with actual file path
import {
  MAX_LENGTH_ERROR,
  REQUIRED_FIELD_ERROR,
  WHITE_SPACE_ERROR,
} from "../../../constant/formConstant/errorConstant.ts";

const validData = {
  companyName: "Valid Company",
  designation: "Software Engineer",
  startYear: "2020",
  startMonth: "January",
  CURRENTLY_ACTIVE: false,
  endYear: "2021",
  endMonth: "December",
  skills: ["JavaScript", "React"],
  country: "USA",
  state: "California",
  locationType: "Remote",
  employeeType: "Full-time",
  experienceSummary: "Worked on various projects",
};

describe("addExperienceValidationSchema", () => {
  test("should pass validation with all required fields", async () => {
    await expect(
      addExperienceValidationSchema.isValid(validData),
    ).resolves.toBe(true);
  });

  const requiredFields = [
    "companyName",
    "designation",
    "startYear",
    "startMonth",
  ];

  test.each(requiredFields)(
    "should fail validation if %s is missing",
    async (field) => {
      const invalidData = { ...validData, [field]: undefined };
      await expect(
        addExperienceValidationSchema.validate(invalidData),
      ).rejects.toThrow(REQUIRED_FIELD_ERROR);
    },
  );

  test("should fail validation if endDate is earlier than startDate", async () => {
    const invalidData = {
      ...validData,
      startYear: "2021",
      startMonth: "December",
      endYear: "2020",
      endMonth: "January",
    };
    await expect(
      addExperienceValidationSchema.validate(invalidData),
    ).rejects.toThrow("End Date shouldn't be earlier than Start Date");
  });

  test("should pass validation if endDate is not required and CURRENTLY_ACTIVE is true", async () => {
    const activeData = {
      ...validData,
      CURRENTLY_ACTIVE: true,
      endYear: undefined,
      endMonth: undefined,
    };
    await expect(
      addExperienceValidationSchema.isValid(activeData),
    ).resolves.toBe(true);
  });

  test("should fail validation if experienceSummary exceeds max length", async () => {
    const invalidData = { ...validData, experienceSummary: "a".repeat(2501) };
    await expect(
      addExperienceValidationSchema.validate(invalidData),
    ).rejects.toThrow(MAX_LENGTH_ERROR);
  });

  test("should fail validation if companyName has leading/trailing whitespace", async () => {
    const invalidData = { ...validData, companyName: "   Invalid Company   " };
    await expect(
      addExperienceValidationSchema.validate(invalidData),
    ).rejects.toThrow(WHITE_SPACE_ERROR);
  });
});

describe("skillValidationSchema", () => {
  test("should fail validation if skill name is not unique (case insensitive)", async () => {
    const invalidSkills: string[] = ["JavaScript", "React", "javascript"]; // "javascript" is a duplicate (case insensitive)
    await expect(
      skillValidationSchema.validate(invalidSkills, {
        context: { skills: invalidSkills },
      }),
    ).rejects.toThrow("Skill name already exists.");
  });

  test("should fail validation if skill name starts with an invalid symbol", async () => {
    const invalidSkills: string[] = ["$JavaScript", "React"]; // "$JavaScript" starts with an invalid symbol
    await expect(skillValidationSchema.validate(invalidSkills)).rejects.toThrow(
      "Skill name must not start with a symbol (except for a dot).",
    );
  });

  test("should pass validation if skill name starts with a dot", async () => {
    const validSkills: string[] = [".NET", "React"]; // ".NET" is valid
    await expect(skillValidationSchema.validate(validSkills)).resolves.toBe(
      validSkills,
    );
  });
});
