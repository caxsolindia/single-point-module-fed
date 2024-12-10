import * as yup from "yup";

export const profileSchema = yup.object({
  summary: yup
    .string()
    .required("Profile summary is required")
    .max(2500, "Profile summary must be at most 2500 characters"),
});

export interface Errors {
  [key: string]: string;
}

// Function to handle validation
export const validateProfile = async (tempSummary: string | undefined) => {
  try {
    await profileSchema.validate(
      { summary: tempSummary },
      { abortEarly: false },
    );
    return {};
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      const validationErrors: Errors = {};
      err.inner.forEach((error) => {
        if (error.path) {
          validationErrors[error.path] = error.message;
        }
      });
      return validationErrors;
    }
    return { summary: "An unknown error occurred" };
  }
};
