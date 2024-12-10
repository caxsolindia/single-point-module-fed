import { mapProficiencyToLevel, mapUserSkills } from "./CommonFunctions.ts";

describe("CommonFunctions", () => {
  it("mapProficiencyToLevel gives correct response", () => {
    expect(mapProficiencyToLevel("Expert")).toStrictEqual(5);
    expect(mapProficiencyToLevel("Strong")).toStrictEqual(4);
    expect(mapProficiencyToLevel("Advanced")).toStrictEqual(3);
    expect(mapProficiencyToLevel("Basic")).toStrictEqual(2);
    expect(mapProficiencyToLevel("Dummy")).toStrictEqual(1);
  });

  it("mapUserSkills gives correct response", () => {
    const dataFromDbMock = [
      {
        userId: "user-id",
        skillId: "skill-id",
        skillName: "skill-name",
        experienceInYears: "2",
        skillCategory: "front",
        proficiency: "expert",
      },
    ];
    const response = [
      {
        experienceInYears: "2",
        proficiency: "expert",
        skillCategory: "front",
        skillId: "skill-id",
        skillName: "skill-name",
        status: true,
        userId: "user-id",
      },
    ];
    expect(mapUserSkills(null)).toStrictEqual(undefined);
    expect(mapUserSkills(undefined)).toStrictEqual(undefined);
    expect(mapUserSkills(dataFromDbMock)).toStrictEqual(response);
  });
});
