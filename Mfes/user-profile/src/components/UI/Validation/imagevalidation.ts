import * as Yup from "yup";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

export const fileValidationSchema = Yup.object().shape({
  file: Yup.mixed()
    .required("A file is required")
    .test(
      "fileSize",
      "Uploaded file exceeds the maximum 2MB limit. Please upload another file.",
      (value) => {
        return value && (value as File).size <= MAX_FILE_SIZE;
      },
    )
    .test(
      "fileFormat",
      "Unsupported file format. Only JPEG and PNG are allowed.",
      (value) => {
        return (
          value && ["image/jpeg", "image/png"].includes((value as File).type)
        );
      },
    ),
});
