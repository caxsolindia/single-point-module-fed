import * as Yup from "yup";

export const REQUIRED_FIELD_ERROR = "This field is required";
export const URL_INVALID_ERROR = "Enter a valid URL";
export const CONTACT_NUMBER_INVALID_ERROR =
  "Contact number must be exactly 10 digits";
export const LANGUAGE_REQUIRED_ERROR = "At least one language is required";
export const NO_WHITESPACE_ERROR = "No leading or trailing spaces allowed";
export const DECIMAL_VALUE_ERROR = "Invalid format, use 0.0 format";
interface ValidationContext {
  selectedLanguages: string[];
}
export const validationSchema = Yup.object().shape({
  countryCode: Yup.string().required(REQUIRED_FIELD_ERROR),
  contactNumber: Yup.string().when("countryCode", {
    is: (val: string) => !!val,
    then: (schema) =>
      schema
        .required(REQUIRED_FIELD_ERROR)
        .matches(/^\d{10}$/, CONTACT_NUMBER_INVALID_ERROR),
    otherwise: (schema) => schema.required(REQUIRED_FIELD_ERROR),
  }),
  urlLink: Yup.string()
    .required("URL is required")
    .matches(/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/, URL_INVALID_ERROR),
  language: Yup.array()
    .of(Yup.string())
    .test(
      "has-visible-chips",
      LANGUAGE_REQUIRED_ERROR,
      function testValidation(value) {
        const { selectedLanguages } = this.options.context as ValidationContext;
        return selectedLanguages.length > 0 || (value && value.length > 0);
      },
    ),
});

export const addSkillsValidationSchema = Yup.object().shape({
  skillName: Yup.string()
    .required(REQUIRED_FIELD_ERROR)
    .matches(/^\S.*\S$|^\S$/, NO_WHITESPACE_ERROR), // Ensures no leading or trailing spaces
  category: Yup.string()
    .required(REQUIRED_FIELD_ERROR)
    .trim()
    .matches(/^\S.*\S$|^\S$/, NO_WHITESPACE_ERROR),
  yearsOfExperience: Yup.number()
    .required(REQUIRED_FIELD_ERROR)
    .test("is-decimal", DECIMAL_VALUE_ERROR, (value) => {
      if (value === null || value === undefined) return true;
      return /^(\d+(\.\d)?)?$/.test(value.toString());
    }),
  proficiency: Yup.string()
    .required(REQUIRED_FIELD_ERROR)
    .trim()
    .matches(/^\S.*\S$|^\S$/, NO_WHITESPACE_ERROR),
});
