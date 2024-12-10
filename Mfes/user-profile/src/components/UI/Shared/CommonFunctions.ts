export const mapProficiencyToLevel = (proficiency: string): number => {
  switch (proficiency) {
    case "Expert":
      return 5;
    case "Strong":
      return 4;
    case "Advanced":
      return 3;
    case "Basic":
      return 2;
    default:
      return 1;
  }
};

export const mapUserSkills = (
  dataFromDB:
    | ({
        __typename?: "UserSkills";
        userId: string;
        skillId: string;
        skillName: string;
        experienceInYears?: string | null;
        skillCategory?: string | null;
        proficiency?: string | null;
      } | null)[]
    | null
    | undefined,
) => {
  return dataFromDB?.map((skill) => {
    if (skill) {
      return {
        userId: skill?.userId,
        skillId: skill?.skillId,
        skillName: skill?.skillName,
        experienceInYears: skill?.experienceInYears ?? null,
        skillCategory: skill?.skillCategory ?? "",
        proficiency: skill?.proficiency ?? "",
        status: true,
      };
    }
    return null;
  });
};
