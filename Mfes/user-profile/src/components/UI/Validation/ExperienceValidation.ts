import * as yup from "yup";
import {
  MAX_LENGTH_ERROR,
  REQUIRED_FIELD_ERROR,
  WHITE_SPACE_ERROR,
} from "../../../constant/formConstant/errorConstant.ts";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const addExperienceValidationSchema = yup
  .object()
  .shape({
    companyName: yup
      .string()
      .required(REQUIRED_FIELD_ERROR)
      .matches(/^\S.*\S$|^\S$/, WHITE_SPACE_ERROR),
    designation: yup
      .string()
      .required(REQUIRED_FIELD_ERROR)
      .matches(/^\S.*\S$|^\S$/, WHITE_SPACE_ERROR),
    startYear: yup.mixed<string | number>().required(REQUIRED_FIELD_ERROR),
    startMonth: yup
      .string()
      .test(
        "startMonthValidation",
        REQUIRED_FIELD_ERROR,
        function testValidation(value) {
          const { CURRENTLY_ACTIVE, startYear } = this.parent;

          // If the role is currently active, no need to validate startMonth
          if (CURRENTLY_ACTIVE) {
            return true;
          }

          // If startMonth is not provided, return an error
          if (startYear && !value) {
            return this.createError({
              path: "startMonth",
              message: REQUIRED_FIELD_ERROR,
            });
          }

          return true;
        },
      ),
    skills: yup
      .array()
      .of(
        yup
          .string()
          .required(REQUIRED_FIELD_ERROR)
          .matches(/^\S.*\S$|^\S$/, WHITE_SPACE_ERROR),
      )
      .required(REQUIRED_FIELD_ERROR),
    CURRENTLY_ACTIVE: yup.boolean(),
    endYear: yup.mixed<string | number>().when("CURRENTLY_ACTIVE", {
      is: false,
      then: (schema) => schema.required(REQUIRED_FIELD_ERROR),
      otherwise: (schema) => schema.nullable(),
    }),
    endMonth: yup
      .string()
      .test(
        "endMonthValidation",
        REQUIRED_FIELD_ERROR,
        function monthValidation(value) {
          const { CURRENTLY_ACTIVE, endYear } = this.parent;

          // If the role is currently active, no need to validate endMonth
          if (CURRENTLY_ACTIVE) {
            return true;
          }

          // If endYear is provided, endMonth is required
          if (endYear && !value) {
            return this.createError({
              path: "endMonth",
              message: REQUIRED_FIELD_ERROR,
            });
          }

          return true;
        },
      ),
    country: yup.string().required(REQUIRED_FIELD_ERROR),
    state: yup.string().required(REQUIRED_FIELD_ERROR),
    locationType: yup.string().required(REQUIRED_FIELD_ERROR),
    employeeType: yup.string().required(REQUIRED_FIELD_ERROR),
    experienceSummary: yup
      .string()
      .required(REQUIRED_FIELD_ERROR)
      .matches(/^\S.*\S$|^\S$/, WHITE_SPACE_ERROR)
      .max(2500, MAX_LENGTH_ERROR),
  })
  .test(
    "endDate",
    "End Date should not be earlier than Start Date",
    function validateEndDate(values) {
      const { startMonth, startYear, endMonth, endYear } = values;

      // Check if any required field is undefined or null
      if (
        startYear === undefined ||
        endMonth === undefined ||
        endYear === undefined ||
        startMonth === undefined
      ) {
        return true; // Skip validation if required values are missing
      }

      // Convert years and months to numbers and indices
      const startYearNum =
        typeof startYear === "string" ? parseInt(startYear, 10) : startYear;
      const endYearNum =
        typeof endYear === "string" ? parseInt(endYear, 10) : endYear;
      const startMonthIndex = months.indexOf(startMonth);
      const endMonthIndex = months.indexOf(endMonth);

      // Ensure valid indices and numbers
      if (startMonthIndex === -1 || endMonthIndex === -1) {
        return true; // Skip validation if month indices are invalid
      }

      // Compare dates
      if (
        endYearNum < startYearNum ||
        (endYearNum === startYearNum && endMonthIndex < startMonthIndex)
      ) {
        return this.createError({
          path: "endYear",
          message: "End Date shouldn't be earlier than Start Date",
        });
      }

      return true;
    },
  );

const skillValidation = yup
  .string()
  .required("Skill name is required")
  .matches(
    /^(\.|[a-zA-Z0-9]).*$/,
    "Skill name must not start with a symbol (except for a dot).",
  )
  .test(
    "unique",
    "Skill name already exists.",
    function validateUniqueSkill(value) {
      const context = this?.options?.context;
      if (context && Array.isArray(context.skills)) {
        return !context.skills.some(
          (skill) => skill.toLowerCase() === value.toLowerCase(),
        );
      }
      return true;
    },
  );

export const skillValidationSchema = yup
  .array()
  .of(skillValidation)
  .required("Skills list cannot be empty");
