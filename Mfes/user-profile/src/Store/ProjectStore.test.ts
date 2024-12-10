import { act, renderHook } from "@testing-library/react";
import { useUserProjectStore } from "./ProjectStore.ts";

const mockProject1 = {
  userId: "user1",
  projectId: "proj123",
  projectTitle: "Test Project",
  role: "Developer",
  startDate: "2022-01-01",
  endDate: "2022-12-31",
  projectSummary: "Worked on frontend development",
  userSkills: ["React"],
};

const userSkillArrayMock = [mockProject1];
const { setUserProject, deleteUserProject } = useUserProjectStore.getState();
describe("empty store", () => {
  test("delete skill when store empty", () => {
    act(() => {
      deleteUserProject("577565e5-3ef6-48bb-b514-a01ec6352055");
    });
    expect(useUserProjectStore.getState().userProject).toStrictEqual([]);
  });
});
describe("useUserProjectStore", () => {
  beforeAll(() => {
    act(() => {
      setUserProject(userSkillArrayMock);
    });
  });
  afterEach(() => {
    act(() => {
      setUserProject([]);
    });
  });
  test("initial state", () => {
    const { userProject } = useUserProjectStore.getState();
    expect(userProject).toStrictEqual(userSkillArrayMock);
  });
  test("setTempSummary action", () => {
    expect(useUserProjectStore.getState().userProject).toStrictEqual(
      userSkillArrayMock,
    );
  });

  test("delete Project works correctly", () => {
    act(() => {
      deleteUserProject("proj123");
    });

    expect(useUserProjectStore.getState().userProject).toStrictEqual([]);

    act(() => {
      deleteUserProject("proj123");
    });

    expect(useUserProjectStore.getState().userProject).toStrictEqual([]);
  });
  test("setTempSummary action for null", () => {
    act(() => {
      setUserProject(null);
    });
    expect(useUserProjectStore.getState().userProject).toStrictEqual([null]);
  });
});

describe("User Project Store", () => {
  it("should update projectIdSelected correctly", () => {
    const { result } = renderHook(() => useUserProjectStore());

    const newProjectId = "project123";

    // Act: Call the setProjectIdSelected function
    act(() => {
      result.current.setProjectIdSelected(newProjectId);
    });

    // Assert: Check if projectIdSelected is updated
    expect(result.current.projectIdSelected).toBe(newProjectId);
  });
});

// it("should update userProject correctly", async () => {
//   const { result } = renderHook(() => useUserProjectStore());

//   const project1 = {
//     userId: "user1",
//     projectId: "proj123",
//     projectTitle: "Test Project",
//     role: "Developer",
//     startDate: "2022-01-01",
//     endDate: "2022-12-31",
//     projectSummary: "Worked on frontend development",
//     userSkills: ["React"],
//   };

//   const project2 = {
//     userId: "user12",
//     projectId: "proj123465",
//     projectTitle: "Test Project demo",
//     role: "Developer",
//     startDate: "2022-01-01",
//     endDate: "2022-12-31",
//     projectSummary: "Worked on backend development",
//     userSkills: ["React", "Java"],
//   };

//   // Act: Set user projects
//   await act(async () => {
//     act(() => {
//       setUserProject(null);
//     });
//     console.log("after", result.current.userProject?.length);

//     await result.current.setUserProject([project1, project2]);
//   });

//   // Assert: Check if userProject is updated
//   console.log(result.current.userProject?.length);

//   expect(result.current.userProject).toEqual([project1, project2]);

//   // Test setting userProject to null
//   await act(async () => {
//     await result.current.setUserProject(null);
//   });

//   // Assert: Check if userProject is now empty
//   expect(result.current.userProject).toEqual([]);
// });
