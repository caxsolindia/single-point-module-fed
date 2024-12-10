import { useLazyQuery, useMutation } from "@apollo/client";
import {
  AddUserSkillDocument,
  AddUserSkillMutation,
  DeleteUserProjectDocument,
  DeleteUserProjectMutation,
  DeleteUserSkillDocument,
  DeleteUserSkillMutation,
  GetAllCertificatesDocument,
  GetAllCertificatesQuery,
  GetPreviousCompanyDocument,
  GetPreviousCompanyQuery,
  GetProfileOverviewDocument,
  GetProfileOverviewQuery,
  GetSummaryDocument,
  GetSummaryQuery,
  GetUserProjectsDocument,
  GetUserProjectsQuery,
  GetUserSkillsDocument,
  GetUserSkillsQuery,
  UpdateSummaryDocument,
  UpdateSummaryMutation,
  DeleteCertificateDocument,
  DeleteCertificateMutation,
  AddCertificateWithImageMutation,
  AddCertificateWithImageDocument,
} from "../../../../gql/operations.ts";

export const useGetSummary = (userId: string | null) => {
  const [loadSumm, { loading, error, data }] = useLazyQuery<GetSummaryQuery>(
    GetSummaryDocument,
    { variables: { userId } },
  );
  return { loadSumm, loading, error, data };
};

export const useUpdateSummary = () => {
  const [updateSummaryInDB, { loading, error, data }] =
    useMutation<UpdateSummaryMutation>(UpdateSummaryDocument);
  return { updateSummaryInDB, loading, error, data };
};

export const useAddSkill = () => {
  const [addSkillInDB, { loading, error, data }] =
    useMutation<AddUserSkillMutation>(AddUserSkillDocument);
  return { addSkillInDB, loading, error, data };
};

export const useGetProject = (userId: string | null) => {
  const [loadProject, { loading, error, data }] =
    useLazyQuery<GetUserProjectsQuery>(GetUserProjectsDocument, {
      variables: { userId },
    });
  return { loadProject, loading, error, data };
};
export const GetViewComponent = (userId: string | null) => {
  const [getProfileOverview, { loading, error, data }] =
    useLazyQuery<GetProfileOverviewQuery>(GetProfileOverviewDocument, {
      variables: { userId },
    });

  return { getProfileOverview, loading, error, data };
};

export const GetSkillComponent = (userId: string | null) => {
  const [getUserSkills, { loading, error, data }] =
    useLazyQuery<GetUserSkillsQuery>(GetUserSkillsDocument, {
      variables: { userId },
    });
  return { getUserSkills, loading, error, data };
};
export const useGetExperience = (userId: string | null) => {
  const [loadExperience, { data, loading, error }] =
    useLazyQuery<GetPreviousCompanyQuery>(GetPreviousCompanyDocument, {
      variables: { userId },
    });
  return { loadExperience, loading, error, data };
};
export const useGetAllCertificates = (userId: string | null) => {
  const [loadcertificate, { loading, error, data }] =
    useLazyQuery<GetAllCertificatesQuery>(GetAllCertificatesDocument, {
      variables: { userId },
    });
  return { loadcertificate, loading, error, data };
};

export const useDeleteCertificate = () => {
  const [DeleteCertificate, { loading, error, data }] =
    useMutation<DeleteCertificateMutation>(DeleteCertificateDocument);
  return { DeleteCertificate, loading, error, data };
};
export const useDeleteUserSkill = () => {
  const [deleteUserSkillInDB, { data, loading, error }] =
    useMutation<DeleteUserSkillMutation>(DeleteUserSkillDocument);
  return { deleteUserSkillInDB, data, loading, error };
};
export const useDeleteProjects = () => {
  const [deleteProjectsInDB, { data, loading, error }] =
    useMutation<DeleteUserProjectMutation>(DeleteUserProjectDocument);
  return { deleteProjectsInDB, data, loading, error };
};
export const useAddCertificateWithImage = () => {
  const [handleCertificateWithImageInDB, { loading, error, data }] =
    useMutation<AddCertificateWithImageMutation>(
      AddCertificateWithImageDocument,
    );
  return { handleCertificateWithImageInDB, loading, error, data };
};
