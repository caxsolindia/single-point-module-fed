import { useLazyQuery, useMutation } from "@apollo/client";
import { act, renderHook } from "@testing-library/react";
import {
  GetSkillComponent,
  GetViewComponent,
  useAddSkill,
  useGetExperience,
  useGetAllCertificates,
  useGetSummary,
  useUpdateSummary,
  useDeleteCertificate,
  useDeleteUserSkill,
  useDeleteProjects,
  useAddCertificateWithImage,
} from "./UserProfile.ts";
import {
  GetProfileOverviewDocument,
  GetUserSkillsDocument,
} from "../../../../gql/operations.ts";

jest.mock("@apollo/client", () => ({
  useLazyQuery: jest.fn(),
  useMutation: jest.fn(),
  gql: jest.fn(),
}));

jest.mock("../../../../gql/operations.ts", () => ({
  GetSummaryDocument: jest.fn(),
  UpdateSummaryDocument: jest.fn(),
  GetPreviousCompanyDocument: jest.fn(),
}));

describe("useGetSummary", () => {
  const mockUseLazyQuery = useLazyQuery as jest.Mock;

  beforeEach(() => {
    mockUseLazyQuery.mockClear();
  });

  it("should return initial values", () => {
    mockUseLazyQuery.mockReturnValue([
      jest.fn(),
      { loading: false, error: null, data: null },
    ]);

    const { result } = renderHook(() => useGetSummary("user-id-123"));

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toBeNull();
  });

  it("should handle loading state", () => {
    mockUseLazyQuery.mockReturnValue([
      jest.fn(),
      { loading: true, error: null, data: null },
    ]);

    const { result } = renderHook(() => useGetSummary("user-id-123"));

    expect(result.current.loading).toBe(true);
  });

  it("should handle error state", () => {
    const error = new Error("Failed to fetch");
    mockUseLazyQuery.mockReturnValue([
      jest.fn(),
      { loading: false, error, data: null },
    ]);

    const { result } = renderHook(() => useGetSummary("user-id-123"));

    expect(result.current.error).toBe(error);
  });

  it("should fetch data successfully", () => {
    const mockData = { summary: "User summary" };
    mockUseLazyQuery.mockReturnValue([
      jest.fn(),
      { loading: false, error: null, data: mockData },
    ]);

    const { result } = renderHook(() => useGetSummary("user-id-123"));

    expect(result.current.data).toBe(mockData);
  });

  it("should call loadSumm function with correct parameters", () => {
    const loadSumm = jest.fn();
    mockUseLazyQuery.mockReturnValue([
      loadSumm,
      { loading: false, error: null, data: null },
    ]);

    const { result } = renderHook(() => useGetSummary("user-id-123"));

    act(() => {
      result.current.loadSumm();
    });

    expect(loadSumm).toHaveBeenCalled();
  });
});

describe("useUpdateSummary", () => {
  const mockUseMutation = useMutation as jest.Mock;

  beforeEach(() => {
    mockUseMutation.mockClear();
  });

  it("should return initial values", () => {
    mockUseMutation.mockReturnValue([
      jest.fn(),
      { loading: false, error: null, data: null },
    ]);

    const { result } = renderHook(() => useUpdateSummary());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toBeNull();
  });

  it("should handle loading state", () => {
    mockUseMutation.mockReturnValue([
      jest.fn(),
      { loading: true, error: null, data: null },
    ]);

    const { result } = renderHook(() => useUpdateSummary());

    expect(result.current.loading).toBe(true);
  });

  it("should handle error state", () => {
    const error = new Error("Failed to update");
    mockUseMutation.mockReturnValue([
      jest.fn(),
      { loading: false, error, data: null },
    ]);

    const { result } = renderHook(() => useUpdateSummary());

    expect(result.current.error).toBe(error);
  });

  it("should update data successfully", () => {
    const mockData = { updateSummary: { success: true } };
    mockUseMutation.mockReturnValue([
      jest.fn(),
      { loading: false, error: null, data: mockData },
    ]);

    const { result } = renderHook(() => useUpdateSummary());

    expect(result.current.data).toBe(mockData);
  });

  it("should call updateSummaryInDB function correctly", () => {
    const updateSummaryInDB = jest.fn();
    mockUseMutation.mockReturnValue([
      updateSummaryInDB,
      { loading: false, error: null, data: null },
    ]);

    const { result } = renderHook(() => useUpdateSummary());

    act(() => {
      result.current.updateSummaryInDB({
        variables: { input: { userId: "user-id-123", summary: "New Summary" } },
      });
    });

    expect(updateSummaryInDB).toHaveBeenCalled();
    expect(updateSummaryInDB).toHaveBeenCalledWith({
      variables: { input: { userId: "user-id-123", summary: "New Summary" } },
    });
  });
});

describe("GetViewComponent", () => {
  const mockQuery = useLazyQuery as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call useLazyQuery with the correct variables", () => {
    const userId = "123";

    // Mock initial useLazyQuery response
    mockQuery.mockReturnValue([
      jest.fn(), // The function returned by useLazyQuery (getProfileOverview)
      { loading: false, error: null, data: null },
    ]);

    // Call the GetViewComponent function
    const { result } = renderHook(() => GetViewComponent(userId));

    // Assert that the query was called with the correct document and variables
    expect(mockQuery).toHaveBeenCalledWith(GetProfileOverviewDocument, {
      variables: { userId },
    });

    // Verify the result returned by the hook
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toBeNull();
  });

  it("should return loading state correctly", () => {
    const userId = "123";

    mockQuery.mockReturnValue([
      jest.fn(),
      { loading: true, error: null, data: null },
    ]);

    const { result } = renderHook(() => GetViewComponent(userId));

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toBeNull();
  });

  it("should return error state correctly", () => {
    const userId = "123";
    const mockError = new Error("Something went wrong");

    mockQuery.mockReturnValue([
      jest.fn(),
      { loading: false, error: mockError, data: null },
    ]);

    const { result } = renderHook(() => GetViewComponent(userId));

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(mockError);
    expect(result.current.data).toBeNull();
  });

  it("should return data correctly when the query resolves", () => {
    const userId = "123";
    const mockData = { profileOverview: { name: "John Doe" } };

    mockQuery.mockReturnValue([
      jest.fn(),
      { loading: false, error: null, data: mockData },
    ]);

    const { result } = renderHook(() => GetViewComponent(userId));

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toEqual(mockData);
  });
});

describe("GetSkillComponent", () => {
  const mockQuery = useLazyQuery as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call useLazyQuery with the correct variables", () => {
    const userId = "123";

    // Mock initial useLazyQuery response
    mockQuery.mockReturnValue([
      jest.fn(), // The function returned by useLazyQuery (getUserSkills)
      { loading: false, error: null, data: null },
    ]);

    // Call the GetSkillComponent function
    const { result } = renderHook(() => GetSkillComponent(userId));

    // Assert that the query was called with the correct document and variables
    expect(mockQuery).toHaveBeenCalledWith(GetUserSkillsDocument, {
      variables: { userId },
    });

    // Verify the result returned by the hook
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toBeNull();
  });

  it("should return loading state correctly", () => {
    const userId = "123";

    mockQuery.mockReturnValue([
      jest.fn(),
      { loading: true, error: null, data: null },
    ]);

    const { result } = renderHook(() => GetSkillComponent(userId));

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toBeNull();
  });

  it("should return error state correctly", () => {
    const userId = "123";
    const mockError = new Error("Something went wrong");

    mockQuery.mockReturnValue([
      jest.fn(),
      { loading: false, error: mockError, data: null },
    ]);

    const { result } = renderHook(() => GetSkillComponent(userId));

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(mockError);
    expect(result.current.data).toBeNull();
  });

  it("should return data correctly when the query resolves", () => {
    const userId = "123";
    const mockData = {
      userSkills: [{ skillName: "JavaScript" }, { skillName: "React" }],
    };

    mockQuery.mockReturnValue([
      jest.fn(),
      { loading: false, error: null, data: mockData },
    ]);

    const { result } = renderHook(() => GetSkillComponent(userId));

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toEqual(mockData);
  });
});

describe("useGetExperience", () => {
  const mockUseLazyQuery = useLazyQuery as jest.Mock;

  beforeEach(() => {
    mockUseLazyQuery.mockClear();
  });

  it("should return initial values", () => {
    mockUseLazyQuery.mockReturnValue([
      jest.fn(),
      { loading: false, error: null, data: null },
    ]);

    const { result } = renderHook(() => useGetExperience("user-id-123"));

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toBeNull();
  });

  it("should handle loading state", () => {
    mockUseLazyQuery.mockReturnValue([
      jest.fn(),
      { loading: true, error: null, data: null },
    ]);

    const { result } = renderHook(() => useGetExperience("user-id-123"));

    expect(result.current.loading).toBe(true);
  });

  it("should handle error state", () => {
    const error = new Error("Failed to fetch experience");
    mockUseLazyQuery.mockReturnValue([
      jest.fn(),
      { loading: false, error, data: null },
    ]);

    const { result } = renderHook(() => useGetExperience("user-id-123"));

    expect(result.current.error).toBe(error);
  });

  it("should fetch data successfully", () => {
    const mockData = { previousCompany: [{ name: "Company A" }] };
    mockUseLazyQuery.mockReturnValue([
      jest.fn(),
      { loading: false, error: null, data: mockData },
    ]);

    const { result } = renderHook(() => useGetExperience("user-id-123"));

    expect(result.current.data).toBe(mockData);
  });
});

describe("useGetAllCertificates", () => {
  const mockUseLazyQuery = useLazyQuery as jest.Mock;

  beforeEach(() => {
    mockUseLazyQuery.mockClear();
  });

  it("should return initial values", () => {
    mockUseLazyQuery.mockReturnValue([
      jest.fn(),
      { loading: false, error: null, data: null },
    ]);

    const { result } = renderHook(() => useGetAllCertificates("user-id-123"));

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toBeNull();
  });

  it("should handle loading state", () => {
    mockUseLazyQuery.mockReturnValue([
      jest.fn(),
      { loading: true, error: null, data: null },
    ]);

    const { result } = renderHook(() => useGetAllCertificates("user-id-123"));

    expect(result.current.loading).toBe(true);
  });

  it("should handle error state", () => {
    const error = new Error("Failed to fetch certificates");
    mockUseLazyQuery.mockReturnValue([
      jest.fn(),
      { loading: false, error, data: null },
    ]);

    const { result } = renderHook(() => useGetAllCertificates("user-id-123"));

    expect(result.current.error).toBe(error);
  });

  it("should fetch data successfully", () => {
    const mockData = { certificates: ["Certificate 1", "Certificate 2"] };
    mockUseLazyQuery.mockReturnValue([
      jest.fn(),
      { loading: false, error: null, data: mockData },
    ]);

    const { result } = renderHook(() => useGetAllCertificates("user-id-123"));

    expect(result.current.data).toBe(mockData);
  });

  it("should call loadcertificate function with correct parameters", () => {
    const loadcertificate = jest.fn();
    mockUseLazyQuery.mockReturnValue([
      loadcertificate,
      { loading: false, error: null, data: null },
    ]);

    const { result } = renderHook(() => useGetAllCertificates("user-id-123"));

    act(() => {
      result.current.loadcertificate();
    });

    expect(loadcertificate).toHaveBeenCalled();
  });
});

describe("useAddSkill", () => {
  const mockUseMutation = useMutation as jest.Mock;

  beforeEach(() => {
    mockUseMutation.mockClear();
  });

  it("should return initial values", () => {
    mockUseMutation.mockReturnValue([
      jest.fn(),
      { loading: false, error: null, data: null },
    ]);

    const { result } = renderHook(() => useAddSkill());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toBeNull();
  });

  it("should handle loading state", () => {
    mockUseMutation.mockReturnValue([
      jest.fn(),
      { loading: true, error: null, data: null },
    ]);

    const { result } = renderHook(() => useAddSkill());

    expect(result.current.loading).toBe(true);
  });

  it("should handle error state", () => {
    const error = new Error("Failed to update");
    mockUseMutation.mockReturnValue([
      jest.fn(),
      { loading: false, error, data: null },
    ]);

    const { result } = renderHook(() => useAddSkill());

    expect(result.current.error).toBe(error);
  });

  it("should update data successfully", () => {
    const mockData = { updateSummary: { success: true } };
    mockUseMutation.mockReturnValue([
      jest.fn(),
      { loading: false, error: null, data: mockData },
    ]);

    const { result } = renderHook(() => useAddSkill());

    expect(result.current.data).toBe(mockData);
  });
});
describe("useDeleteCertificate", () => {
  const mockUseMutation = useMutation as jest.Mock;

  beforeEach(() => {
    mockUseMutation.mockClear();
  });

  it("should return initial values", () => {
    mockUseMutation.mockReturnValue([jest.fn(), { loading: false }]);

    const { result } = renderHook(() => useDeleteCertificate());

    expect(result.current.loading).toBe(false);
  });

  it("should handle loading state", () => {
    mockUseMutation.mockReturnValue([jest.fn(), { loading: true }]);

    const { result } = renderHook(() => useDeleteCertificate());

    expect(result.current.loading).toBe(true);
  });

  it("should call DeleteCertificate function correctly", () => {
    const deleteCertificate = jest.fn();
    mockUseMutation.mockReturnValue([deleteCertificate, { loading: false }]);

    const { result } = renderHook(() => useDeleteCertificate());

    act(() => {
      result.current.DeleteCertificate({
        variables: { id: "certificate-id-123" },
      });
    });

    expect(deleteCertificate).toHaveBeenCalled();
    expect(deleteCertificate).toHaveBeenCalledWith({
      variables: { id: "certificate-id-123" },
    });
  });
});
describe("useDeleteSkill", () => {
  const mockUseMutation = useMutation as jest.Mock;

  beforeEach(() => {
    mockUseMutation.mockClear();
  });

  it("should return initial values", () => {
    mockUseMutation.mockReturnValue([
      jest.fn(),
      { loading: false, error: null, data: null },
    ]);

    const { result } = renderHook(() => useDeleteUserSkill());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toBeNull();
  });

  it("should handle loading state", () => {
    mockUseMutation.mockReturnValue([
      jest.fn(),
      { loading: true, error: null, data: null },
    ]);

    const { result } = renderHook(() => useDeleteUserSkill());

    expect(result.current.loading).toBe(true);
  });

  it("should handle error state", () => {
    const error = new Error("Failed to update");
    mockUseMutation.mockReturnValue([
      jest.fn(),
      { loading: false, error, data: null },
    ]);

    const { result } = renderHook(() => useDeleteUserSkill());

    expect(result.current.error).toBe(error);
  });

  it("should update data successfully", () => {
    const mockData = { updateSummary: { success: true } };
    mockUseMutation.mockReturnValue([
      jest.fn(),
      { loading: false, error: null, data: mockData },
    ]);

    const { result } = renderHook(() => useDeleteUserSkill());

    expect(result.current.data).toBe(mockData);
  });
});

describe("useDeleteProject", () => {
  const mockUseMutation = useMutation as jest.Mock;

  beforeEach(() => {
    mockUseMutation.mockClear();
  });

  it("should return initial values", () => {
    mockUseMutation.mockReturnValue([
      jest.fn(),
      { loading: false, error: null, data: null },
    ]);

    const { result } = renderHook(() => useDeleteProjects());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toBeNull();
  });

  it("should handle loading state", () => {
    mockUseMutation.mockReturnValue([
      jest.fn(),
      { loading: true, error: null, data: null },
    ]);

    const { result } = renderHook(() => useDeleteProjects());

    expect(result.current.loading).toBe(true);
  });

  it("should handle error state", () => {
    const error = new Error("Failed to update");
    mockUseMutation.mockReturnValue([
      jest.fn(),
      { loading: false, error, data: null },
    ]);

    const { result } = renderHook(() => useDeleteProjects());

    expect(result.current.error).toBe(error);
  });

  it("should update data successfully", () => {
    const mockData = { updateSummary: { success: true } };
    mockUseMutation.mockReturnValue([
      jest.fn(),
      { loading: false, error: null, data: mockData },
    ]);

    const { result } = renderHook(() => useDeleteProjects());

    expect(result.current.data).toBe(mockData);
  });
});
describe("useAddCertificateWithImage", () => {
  const mockUseMutation = useMutation as jest.Mock;

  beforeEach(() => {
    mockUseMutation.mockClear();
  });

  it("should return initial values", () => {
    mockUseMutation.mockReturnValue([
      jest.fn(),
      { loading: false, error: null, data: null },
    ]);

    const { result } = renderHook(() => useAddCertificateWithImage());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toBeNull();
  });

  it("should handle loading state", () => {
    mockUseMutation.mockReturnValue([
      jest.fn(),
      { loading: true, error: null, data: null },
    ]);

    const { result } = renderHook(() => useAddCertificateWithImage());

    expect(result.current.loading).toBe(true);
  });

  it("should handle error state", () => {
    const error = new Error("Failed to update");
    mockUseMutation.mockReturnValue([
      jest.fn(),
      { loading: false, error, data: null },
    ]);

    const { result } = renderHook(() => useAddCertificateWithImage());

    expect(result.current.error).toBe(error);
  });

  it("should update data successfully", () => {
    const mockData = { updateSummary: { success: true } };
    mockUseMutation.mockReturnValue([
      jest.fn(),
      { loading: false, error: null, data: mockData },
    ]);

    const { result } = renderHook(() => useAddCertificateWithImage());

    expect(result.current.data).toBe(mockData);
  });
});
