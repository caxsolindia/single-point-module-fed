import * as Yup from "yup";

export const months = [
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

const skillValidation = Yup.string()
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

export const addCertificationValidationSchema = Yup.object()
  .shape({
    CertificateTitle: Yup.string()
      .required("Certificate title is required")
      .matches(/^\S.*\S$|^\S$/, "Certificate title cannot contain whitespace"),
    Organization: Yup.string()
      .required("Organization is required")
      .matches(/^\S.*\S$|^\S$/, "Organization cannot contain whitespace"),
    CredentialUrl: Yup.string()
      .required("Credential Url is required")
      .matches(/^\S.*\S$|^\S$/, "Credential Url cannot contain whitespace"),
    Skills: Yup.array()
      .of(skillValidation)
      .required("Skills list cannot be empty"),
    startMonth: Yup.string()
      .required("Start Month is required")
      .matches(/^\S*$/, "Start Month cannot contain whitespace"),
    startYear: Yup.number()
      .required("Start Year is required")
      .min(1900, "Year must be between 1900 and 2100")
      .max(2100, "Year must be between 1900 and 2100"),
    endMonth: Yup.string()
      .required("End Month is required")
      .matches(/^\S*$/, "End Month cannot contain whitespace"),
    endYear: Yup.number()
      .required("End Year is required")
      .min(1900, "Year must be between 1900 and 2100")
      .max(2100, "Year must be between 1900 and 2100"),
  })
  .test(
    "endDate",
    "End Date should not be earlier than Start Date",
    function validateEndDate(values) {
      const { startMonth, startYear, endMonth, endYear } = values;
      const startDate = new Date(startYear, months.indexOf(startMonth));
      const endDate = new Date(endYear, months.indexOf(endMonth));

      if (endDate < startDate) {
        return this.createError({
          path: "endYear",
          message: "End Date shouldn't be earlier than Start Date",
        });
      }
      return true;
    },
  );

export const skillValidationSchema = Yup.array()
  .of(skillValidation)
  .required("Skills list cannot be empty");
