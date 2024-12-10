import { renderHook, act } from "@testing-library/react";
import { useCompanyStore } from "./ExperienceStore.ts";

interface MockCompanyResponse {
  id: string;
  companyName: string;
  startDate: string;
  endDate: string;
  startMonth: string | null;
  startYear: string | null;
  endMonth: string | null;
  endYear: string | null;
  designation: string | null;
  country: string | null;
  state: string | null;
  locationType: string | null;
  employmentType: string | null;
  jobSummary: string | null;
  skill: (string | null)[];
  CURRENTLY_ACTIVE: boolean;
}

describe("useCompanyStore", () => {
  afterEach(() => {
    // Resetting state after each test
    act(() => {
      useCompanyStore.setState({
        companyId: null,
        selectedExperience: null,
        viewExperience: null,
      });
    });
  });

  test("should initialize with default values", () => {
    const { result } = renderHook(() => useCompanyStore());
    expect(result.current.companyId).toBeNull();
    expect(result.current.selectedExperience).toBeNull();
    expect(result.current.viewExperience).toBeNull();
  });

  test("should set companyId correctly", () => {
    const { result } = renderHook(() => useCompanyStore());

    act(() => {
      result.current.setCompanyId("123");
    });

    expect(result.current.companyId).toBe("123");
  });

  test("should return the same state when setting companyId with the same value", () => {
    const { result } = renderHook(() => useCompanyStore());

    // Set companyId initially
    act(() => {
      result.current.setCompanyId("123");
    });

    // Call setCompanyId again with the same value
    act(() => {
      result.current.setCompanyId("123");
    });

    // Expect the state to remain unchanged
    expect(result.current.companyId).toBe("123");
  });

  test("should return the same state when setting companyId with the same value", () => {
    const { result } = renderHook(() => useCompanyStore());

    // Set companyId initially
    act(() => {
      result.current.setCompanyId("123");
    });

    // Call setCompanyId again with the same value
    act(() => {
      result.current.setCompanyId("123");
    });

    // Expect the state to remain unchanged
    expect(result.current.companyId).toBe("123");
  });

  test("should set selectedExperience correctly", () => {
    const { result } = renderHook(() => useCompanyStore());

    const experience: MockCompanyResponse = {
      id: "exp1",
      companyName: "Test Company",
      startDate: "2023-01-01",
      endDate: "2024-01-01",
      startMonth: "01",
      startYear: "2023",
      endMonth: "01",
      endYear: "2024",
      designation: "Software Developer",
      country: "USA",
      state: "California",
      locationType: "Onsite",
      employmentType: "Full-time",
      jobSummary: "Worked on developing web applications.",
      skill: ["JavaScript"],
      CURRENTLY_ACTIVE: false,
    };

    act(() => {
      result.current.setSelectedExperience(experience);
    });

    expect(result.current.selectedExperience).toEqual(experience);
  });

  test("should return the same state when setting selectedExperience with the same value", () => {
    const { result } = renderHook(() => useCompanyStore());

    const experience: MockCompanyResponse = {
      id: "exp1",
      companyName: "Test Company",
      startDate: "2023-01-01",
      endDate: "2024-01-01",
      startMonth: "01",
      startYear: "2023",
      endMonth: "01",
      endYear: "2024",
      designation: "Software Developer",
      country: "USA",
      state: "California",
      locationType: "Onsite",
      employmentType: "Full-time",
      jobSummary: "Worked on developing web applications.",
      skill: ["JavaScript"],
      CURRENTLY_ACTIVE: false,
    };

    // Set selectedExperience initially
    act(() => {
      result.current.setSelectedExperience(experience);
    });

    // Call setSelectedExperience again with the same value
    act(() => {
      result.current.setSelectedExperience(experience);
    });

    // Expect the state to remain unchanged
    expect(result.current.selectedExperience).toEqual(experience);
  });

  test("should set viewExperience correctly with non-null values", async () => {
    const { result } = renderHook(() => useCompanyStore());

    const experiences: MockCompanyResponse[] = [
      {
        id: "exp1",
        companyName: "Test Company 1",
        startDate: "2022-01-01",
        endDate: "2023-01-01",
        startMonth: "01",
        startYear: "2022",
        endMonth: "01",
        endYear: "2023",
        designation: "Software Engineer",
        country: "USA",
        state: "California",
        locationType: "Remote",
        employmentType: "Full-time",
        jobSummary: "Developed frontend applications.",
        skill: ["React"],
        CURRENTLY_ACTIVE: false,
      },
      {
        id: "exp2",
        companyName: "Test Company 2",
        startDate: "2020-01-01",
        endDate: "2021-01-01",
        startMonth: "01",
        startYear: "2020",
        endMonth: "01",
        endYear: "2021",
        designation: "Backend Developer",
        country: "Canada",
        state: "Ontario",
        locationType: "Onsite",
        employmentType: "Part-time",
        jobSummary: "Worked on APIs.",
        skill: ["Node.js"],
        CURRENTLY_ACTIVE: false,
      },
    ];

    await act(async () => {
      await result.current.setViewExperience(experiences);
    });

    expect(result.current.viewExperience).toEqual(experiences);
  });
  test("should set viewExperience correctly with non-null values", async () => {
    const { result } = renderHook(() => useCompanyStore());

    const experiences: MockCompanyResponse[] = [
      {
        id: "exp1",
        companyName: "Test Company 1",
        startDate: "2022-01-01",
        endDate: "2023-01-01",
        startMonth: "01",
        startYear: "2022",
        endMonth: "01",
        endYear: "2023",
        designation: "Software Engineer",
        country: "USA",
        state: "California",
        locationType: "Remote",
        employmentType: "Full-time",
        jobSummary: "Developed frontend applications.",
        skill: ["React"],
        CURRENTLY_ACTIVE: false,
      },
      {
        id: "exp2",
        companyName: "Test Company 2",
        startDate: "2020-01-01",
        endDate: "2021-01-01",
        startMonth: "01",
        startYear: "2020",
        endMonth: "01",
        endYear: "2021",
        designation: "Backend Developer",
        country: "Canada",
        state: "Ontario",
        locationType: "Onsite",
        employmentType: "Part-time",
        jobSummary: "Worked on APIs.",
        skill: ["Node.js"],
        CURRENTLY_ACTIVE: false,
      },
    ];

    await act(async () => {
      await result.current.setViewExperience(experiences);
    });

    expect(result.current.viewExperience).toEqual(experiences);
  });

  test("should clear viewExperience when null is passed", async () => {
    const { result } = renderHook(() => useCompanyStore());

    await act(async () => {
      await result.current.setViewExperience(null);
    });

    expect(result.current.viewExperience).toBeNull();
  });
});
