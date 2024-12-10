import * as yup from "yup";

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

export const REQUIRED_FIELD_ERROR = "This field is required";
export const WHITE_SPACE_ERROR = "This field cannot contain whitespace";

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

export const ProjectvalidationSchema = yup
  .object()
  .shape({
    projectTitle: yup
      .string()
      .required(REQUIRED_FIELD_ERROR)
      .matches(/^\S*$/, WHITE_SPACE_ERROR),
    role: yup
      .string()
      .required(REQUIRED_FIELD_ERROR)
      .matches(/^\S*$/, WHITE_SPACE_ERROR),
    startMonth: yup
      .string()
      .required(REQUIRED_FIELD_ERROR)
      .matches(/^\S*$/, WHITE_SPACE_ERROR),
    startYear: yup
      .number()
      .required(REQUIRED_FIELD_ERROR)
      .min(1900, "Year must be between 1900 and 2100")
      .max(2100, "Year must be between 1900 and 2100"),
    endMonth: yup
      .string()
      .required(REQUIRED_FIELD_ERROR)
      .matches(/^\S*$/, WHITE_SPACE_ERROR),
    endYear: yup
      .number()
      .required(REQUIRED_FIELD_ERROR)
      .min(1900, "Year must be between 1900 and 2100")
      .max(2100, "Year must be between 1900 and 2100"),
    skills: yup
      .array()
      .of(skillValidation)
      .required("Skills list cannot be empty"),
    projectSummary: yup
      .string()
      .required(REQUIRED_FIELD_ERROR)
      .matches(/^\S*$/, WHITE_SPACE_ERROR)
      .max(2000, "Project Summary cannot exceed 2000 characters"),
  })
  .test(
    "endDate",
    "End Date should not be earlier than Start Date",
    function dateTest(values) {
      const { startMonth, startYear, endMonth, endYear } = values;
      const startDate = new Date(startYear, months.indexOf(startMonth));
      const endDate = new Date(endYear, months.indexOf(endMonth));

      if (endDate < startDate) {
        return this.createError({
          path: "endYear",
          message: "End Date should not be earlier than Start Date",
        });
      }
      return true;
    },
  );

export const skillValidationSchema = yup
  .array()
  .of(skillValidation)
  .required("Skills list cannot be empty");

export default ProjectvalidationSchema;
