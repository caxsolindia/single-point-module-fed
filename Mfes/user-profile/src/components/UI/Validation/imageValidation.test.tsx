import { fileValidationSchema } from "./imagevalidation.ts";

describe("fileValidationSchema", () => {
  // Helper function to create a mock File object
  const createMockFile = (size: number, type: string): File => {
    const content = new Array(size).fill("a").join(""); // Creates a string of the specified size
    return new File([content], "test-file", { type });
  };

  test("should pass validation for a valid file (JPEG, under 2MB)", async () => {
    const validFile = createMockFile(1 * 1024 * 1024, "image/jpeg"); // 1 MB JPEG file

    await expect(
      fileValidationSchema.isValid({ file: validFile }),
    ).resolves.toBe(true);
  });

  test("should fail validation for file size greater than 2MB", async () => {
    const largeFile = createMockFile(3 * 1024 * 1024, "image/png"); // 3 MB PNG file

    await expect(
      fileValidationSchema.validate({ file: largeFile }),
    ).rejects.toThrow(
      "Uploaded file exceeds the maximum 2MB limit. Please upload another file.",
    );
  });

  test("should fail validation for unsupported file format", async () => {
    const unsupportedFile = createMockFile(1 * 1024 * 1024, "image/gif"); // 1 MB GIF file

    await expect(
      fileValidationSchema.validate({ file: unsupportedFile }),
    ).rejects.toThrow(
      "Unsupported file format. Only JPEG and PNG are allowed.",
    );
  });

  test("should fail validation if file is missing", async () => {
    await expect(
      fileValidationSchema.validate({ file: undefined }),
    ).rejects.toThrow("A file is required");
  });
});
