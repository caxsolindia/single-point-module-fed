import { act } from "@testing-library/react";
import { useUserSkillStore } from "./UserSkillStore.ts";

const userSkillMock = {
  userId: "user-test-id",
  skillId: "577565e5-3ef6-48bb-b514-a01ec6352055",
  skillName: "Angular",
  experienceInYears: null,
  skillCategory: "Technical Skill",
  proficiency: "Expert",
  status: false,
};
const userSkillArrayMock = [userSkillMock];
const userSkillUpdateMock = {
  userId: "user-test-id",
  skillId: "577565e5-3ef6-48bb-b514-a01ec6352055",
  skillName: "Angular",
  experienceInYears: "2",
  skillCategory: "Technical Skill",
  proficiency: "Expert",
  status: false,
};
const userSkillArrayUpdateMock = [userSkillUpdateMock];
const userSkillNoSkillId = {
  userId: "user-test-id",
  skillId: "577565e5-3ef6-48bb-b514-a01ec63520123",
  skillName: "Angular",
  experienceInYears: "2",
  skillCategory: "Technical Skill",
  proficiency: "Expert",
  status: false,
};
const { setUserSkill, updateUserSkill, deleteUserSkill } =
  useUserSkillStore.getState();
describe("empty store", () => {
  test("delete skill when store empty", () => {
    act(() => {
      deleteUserSkill("577565e5-3ef6-48bb-b514-a01ec6352055");
    });
    expect(useUserSkillStore.getState().userSkill).toStrictEqual([]);
  });

  test("update skill when store empty", () => {
    act(() => {
      updateUserSkill([userSkillUpdateMock]);
    });
    expect(useUserSkillStore.getState().userSkill).toStrictEqual([]);
  });
});
describe("useUserSkillStore", () => {
  beforeAll(() => {
    // Reset the store state before each test
    act(() => {
      setUserSkill(userSkillArrayMock);
    });
  });
  afterEach(() => {
    act(() => {
      setUserSkill([]);
    });
  });
  test("initial state", () => {
    const { userSkill } = useUserSkillStore.getState();
    expect(userSkill).toStrictEqual(userSkillArrayMock);
  });
  test("setTempSummary action", () => {
    expect(useUserSkillStore.getState().userSkill).toStrictEqual(
      userSkillArrayMock,
    );
  });

  test("update skill works correctly", () => {
    act(() => {
      updateUserSkill(userSkillArrayUpdateMock);
    });
    expect(useUserSkillStore.getState().userSkill).toStrictEqual([
      userSkillUpdateMock,
    ]);
    // update skill whose id is not present in store
    act(() => {
      updateUserSkill([userSkillNoSkillId]);
    });
    expect(useUserSkillStore.getState().userSkill).toStrictEqual([
      userSkillUpdateMock,
    ]);
    act(() => {
      updateUserSkill([]);
    });
    expect(useUserSkillStore.getState().userSkill).toStrictEqual([
      userSkillUpdateMock,
    ]);
  });
  test("delete skill works correctly", () => {
    act(() => {
      deleteUserSkill("577565e5-3ef6-48bb-b514-a01ec6352055");
    });
    expect(useUserSkillStore.getState().userSkill).toStrictEqual([]);
    // deleting on empty array
    act(() => {
      deleteUserSkill("577565e5-3ef6-48bb-b514-a01ec6352055");
    });
    expect(useUserSkillStore.getState().userSkill).toStrictEqual([]);
  });
  // keep this test at end
  test("setTempSummary action for null", () => {
    act(() => {
      setUserSkill(null);
    });
    expect(useUserSkillStore.getState().userSkill).toStrictEqual([null]);
  });
});
