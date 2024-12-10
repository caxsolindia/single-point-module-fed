/* eslint-disable */
import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Upload: { input: any; output: any };
};

export type AddUpdateProjectResponse = {
  __typename?: "AddUpdateProjectResponse";
  message?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

export type Certificate = {
  __typename?: "Certificate";
  certificateExpiryDate?: Maybe<Scalars["String"]["output"]>;
  certificateID?: Maybe<Scalars["String"]["output"]>;
  certificateIcon?: Maybe<Scalars["String"]["output"]>;
  certificateImageURL?: Maybe<Scalars["String"]["output"]>;
  certificateIssueDate?: Maybe<Scalars["String"]["output"]>;
  certificateName?: Maybe<Scalars["String"]["output"]>;
  certificateURL?: Maybe<Scalars["String"]["output"]>;
  organizationName?: Maybe<Scalars["String"]["output"]>;
  skill?: Maybe<Scalars["String"]["output"]>;
};

export type CertificateCreationInput = {
  certificateExpiryDate?: InputMaybe<Scalars["String"]["input"]>;
  certificateIssueDate?: InputMaybe<Scalars["String"]["input"]>;
  certificateName: Scalars["String"]["input"];
  certificateURL?: InputMaybe<Scalars["String"]["input"]>;
  organizationName: Scalars["String"]["input"];
  skill?: InputMaybe<Scalars["String"]["input"]>;
  userId: Scalars["String"]["input"];
};

export type CertificateUpdateInput = {
  certificateExpiryDate?: InputMaybe<Scalars["String"]["input"]>;
  certificateImageURL?: InputMaybe<Scalars["String"]["input"]>;
  certificateIssueDate?: InputMaybe<Scalars["String"]["input"]>;
  certificateName: Scalars["String"]["input"];
  certificateURL?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["String"]["input"];
  organizationName: Scalars["String"]["input"];
  skill?: InputMaybe<Scalars["String"]["input"]>;
  userId: Scalars["String"]["input"];
};

export type CertificateWithImageCreationInput = {
  certificateExpiryDate?: InputMaybe<Scalars["String"]["input"]>;
  certificateIssueDate?: InputMaybe<Scalars["String"]["input"]>;
  certificateName: Scalars["String"]["input"];
  certificateURL?: InputMaybe<Scalars["String"]["input"]>;
  file: Scalars["Float"]["input"];
  organizationName: Scalars["String"]["input"];
  skill?: InputMaybe<Scalars["String"]["input"]>;
  userId: Scalars["String"]["input"];
};

export type CertificateWithImageUpdateInput = {
  certificateExpiryDate?: InputMaybe<Scalars["String"]["input"]>;
  certificateImageURL?: InputMaybe<Scalars["String"]["input"]>;
  certificateIssueDate?: InputMaybe<Scalars["String"]["input"]>;
  certificateName: Scalars["String"]["input"];
  certificateURL?: InputMaybe<Scalars["String"]["input"]>;
  file: Scalars["Float"]["input"];
  id: Scalars["String"]["input"];
  organizationName: Scalars["String"]["input"];
  skill?: InputMaybe<Scalars["String"]["input"]>;
  userId: Scalars["String"]["input"];
};

export type CompanyCheckResponse = {
  __typename?: "CompanyCheckResponse";
  data?: Maybe<Scalars["String"]["output"]>;
  message?: Maybe<Scalars["String"]["output"]>;
};

export type CompanyDetails = {
  __typename?: "CompanyDetails";
  companyName?: Maybe<Scalars["String"]["output"]>;
  country?: Maybe<Scalars["String"]["output"]>;
  designation?: Maybe<Scalars["String"]["output"]>;
  employmentType?: Maybe<Scalars["String"]["output"]>;
  endDate?: Maybe<Scalars["String"]["output"]>;
  jobSummary?: Maybe<Scalars["String"]["output"]>;
  locationType?: Maybe<Scalars["String"]["output"]>;
  skill?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  startDate?: Maybe<Scalars["String"]["output"]>;
  state?: Maybe<Scalars["String"]["output"]>;
};

export type CompanyResponse = {
  __typename?: "CompanyResponse";
  companyName?: Maybe<Scalars["String"]["output"]>;
  country?: Maybe<Scalars["String"]["output"]>;
  designation?: Maybe<Scalars["String"]["output"]>;
  employmentType?: Maybe<Scalars["String"]["output"]>;
  endDate?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  jobSummary?: Maybe<Scalars["String"]["output"]>;
  locationType?: Maybe<Scalars["String"]["output"]>;
  skill?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  startDate?: Maybe<Scalars["String"]["output"]>;
  state?: Maybe<Scalars["String"]["output"]>;
};

export type Countries = {
  __typename?: "Countries";
  code?: Maybe<Scalars["String"]["output"]>;
  dial_code?: Maybe<Scalars["String"]["output"]>;
  flag?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type CountryResponses = {
  __typename?: "CountryResponses";
  data?: Maybe<Array<Maybe<Countries>>>;
  message?: Maybe<Scalars["String"]["output"]>;
  status?: Maybe<Scalars["Boolean"]["output"]>;
};

export type CreateResponse = {
  __typename?: "CreateResponse";
  data?: Maybe<Scalars["String"]["output"]>;
  message?: Maybe<Scalars["String"]["output"]>;
  status?: Maybe<Scalars["Boolean"]["output"]>;
};

export type DeleteCompanyResponse = {
  __typename?: "DeleteCompanyResponse";
  success: Scalars["Boolean"]["output"];
};

export type DeleteResponse = {
  __typename?: "DeleteResponse";
  data?: Maybe<Scalars["String"]["output"]>;
  message?: Maybe<Scalars["String"]["output"]>;
  status: Scalars["Boolean"]["output"];
};

export type DeleteUserProject = {
  __typename?: "DeleteUserProject";
  data?: Maybe<Scalars["String"]["output"]>;
  message?: Maybe<Scalars["String"]["output"]>;
  status: Scalars["Boolean"]["output"];
};

export type DeleteUserSkillsResponse = {
  __typename?: "DeleteUserSkillsResponse";
  data?: Maybe<Scalars["String"]["output"]>;
  message?: Maybe<Scalars["String"]["output"]>;
  status: Scalars["Boolean"]["output"];
};

export type ErrorDetails = {
  __typename?: "ErrorDetails";
  message: Scalars["String"]["output"];
};

export type ErrorResponse = {
  __typename?: "ErrorResponse";
  error?: Maybe<ErrorDetails>;
  success: Scalars["Boolean"]["output"];
};

export type File = {
  __typename?: "File";
  encoding: Scalars["String"]["output"];
  filename: Scalars["String"]["output"];
  mimetype: Scalars["String"]["output"];
};

export type GetAllOrganizationsResponse = {
  __typename?: "GetAllOrganizationsResponse";
  data?: Maybe<Array<Maybe<Organization>>>;
  message?: Maybe<Scalars["String"]["output"]>;
  status: Scalars["Boolean"]["output"];
};

export type GetCompaniesResponse = {
  __typename?: "GetCompaniesResponse";
  companies: Array<Maybe<CompanyResponse>>;
  message?: Maybe<Scalars["String"]["output"]>;
  status?: Maybe<Scalars["Boolean"]["output"]>;
};

export type GetCompanyDetailsResponse = {
  __typename?: "GetCompanyDetailsResponse";
  company?: Maybe<CompanyDetails>;
  message?: Maybe<Scalars["String"]["output"]>;
  status?: Maybe<Scalars["Boolean"]["output"]>;
};

export type GetLanguagesResponse = {
  __typename?: "GetLanguagesResponse";
  data?: Maybe<Array<Maybe<Languages>>>;
  message?: Maybe<Scalars["String"]["output"]>;
  status: Scalars["Boolean"]["output"];
};

export type GetModules = {
  __typename?: "GetModules";
  Modules?: Maybe<Array<Maybe<Module>>>;
};

export type GetOrganizationResponse = {
  __typename?: "GetOrganizationResponse";
  data?: Maybe<Organization>;
  message?: Maybe<Scalars["String"]["output"]>;
  status: Scalars["Boolean"]["output"];
};

export type GetProfileOverviewResponse = {
  __typename?: "GetProfileOverviewResponse";
  message?: Maybe<Scalars["String"]["output"]>;
  profile?: Maybe<ProfileOverviewResponse>;
  status: Scalars["Boolean"]["output"];
};

export type GetSummaryResponse = {
  __typename?: "GetSummaryResponse";
  message?: Maybe<Scalars["String"]["output"]>;
  status: Scalars["Boolean"]["output"];
  summary?: Maybe<Array<Maybe<SummaryResponse>>>;
};

export type GetUserSkillsResponse = {
  __typename?: "GetUserSkillsResponse";
  data?: Maybe<Array<Maybe<UserSkills>>>;
  message?: Maybe<Scalars["String"]["output"]>;
  status: Scalars["Boolean"]["output"];
};

export type Icon = {
  __typename?: "Icon";
  createdAt?: Maybe<Scalars["String"]["output"]>;
  icon?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["String"]["output"]>;
};

export type ImageUploadResponse = {
  __typename?: "ImageUploadResponse";
  data?: Maybe<Scalars["String"]["output"]>;
  message?: Maybe<Scalars["String"]["output"]>;
  status: Scalars["Boolean"]["output"];
};

export type Languages = {
  __typename?: "Languages";
  ID?: Maybe<Scalars["String"]["output"]>;
  Title?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type Message = {
  __typename?: "Message";
  companyId: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  message?: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  permissions: RolePermission;
};

export type Module = {
  __typename?: "Module";
  _id?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["String"]["output"]>;
  moduleId?: Maybe<Scalars["String"]["output"]>;
  moduleName?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["String"]["output"]>;
};

export type ModuleResponse = {
  __typename?: "ModuleResponse";
  data?: Maybe<GetModules>;
  message?: Maybe<Scalars["String"]["output"]>;
  status: Scalars["Boolean"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  _?: Maybe<Scalars["Boolean"]["output"]>;
  addCertificateWithImage: ImageUploadResponse;
  addOrUpdateProject: ProjectResponses;
  addPhoto?: Maybe<UserUploadResponse>;
  addPreviousCompany?: Maybe<AddUpdateProjectResponse>;
  addUserSkill?: Maybe<UserSkillsResponse>;
  addVideoCV?: Maybe<UserUploadResponse>;
  companyCheck?: Maybe<CompanyCheckResponse>;
  createOrganization?: Maybe<CreateResponse>;
  createRole?: Maybe<RoleMutationResponse>;
  deleteCertificate?: Maybe<DeleteResponse>;
  deleteLanguage?: Maybe<UserResponse>;
  deleteOrganization?: Maybe<OrganizationResponse>;
  deletePreviousCompany?: Maybe<DeleteCompanyResponse>;
  deleteRole?: Maybe<RoleMutationResponse>;
  deleteUserPhoto?: Maybe<UserUploadResponse>;
  deleteUserProject?: Maybe<DeleteUserProject>;
  deleteUserSkill?: Maybe<DeleteUserSkillsResponse>;
  deleteVideoCV?: Maybe<UserUploadResponse>;
  getSkillsOverview?: Maybe<SkillsOverviewResponse>;
  reviewExpertSkillRequest: ReviewExpertSkillResponse;
  updateContactNumber?: Maybe<UserResponse>;
  updateLanguage?: Maybe<UserResponse>;
  updateLinkedinURL?: Maybe<UserResponse>;
  updateOrganization?: Maybe<UpdateOrganizationResponse>;
  updatePhoto?: Maybe<UserUploadResponse>;
  updateRole?: Maybe<RoleMutationResponse>;
  updateSummary?: Maybe<UserResponse>;
  updateVideoCV?: Maybe<UserUploadResponse>;
};

export type MutationAddCertificateWithImageArgs = {
  certificateExpiryDate: Scalars["String"]["input"];
  certificateIssueDate: Scalars["String"]["input"];
  certificateName: Scalars["String"]["input"];
  certificateURL: Scalars["String"]["input"];
  file?: InputMaybe<Scalars["Upload"]["input"]>;
  organizationName: Scalars["String"]["input"];
  skill: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type MutationAddOrUpdateProjectArgs = {
  endDate: Scalars["String"]["input"];
  projectSummary: Scalars["String"]["input"];
  projectTitle?: InputMaybe<Scalars["String"]["input"]>;
  role: Scalars["String"]["input"];
  startDate: Scalars["String"]["input"];
  userId: Scalars["ID"]["input"];
  userSkills?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationAddPhotoArgs = {
  file: Scalars["Upload"]["input"];
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationAddPreviousCompanyArgs = {
  companyId?: InputMaybe<Scalars["String"]["input"]>;
  companyName: Scalars["String"]["input"];
  country: Scalars["String"]["input"];
  designation: Scalars["String"]["input"];
  employmentType: Scalars["String"]["input"];
  endDate?: InputMaybe<Scalars["String"]["input"]>;
  jobSummary: Scalars["String"]["input"];
  locationType: Scalars["String"]["input"];
  skillIds?: InputMaybe<Array<Scalars["String"]["input"]>>;
  startDate: Scalars["String"]["input"];
  state: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type MutationAddUserSkillArgs = {
  experienceInYears?: InputMaybe<Scalars["String"]["input"]>;
  proficiency?: InputMaybe<Scalars["String"]["input"]>;
  skillCategory: Scalars["String"]["input"];
  status?: InputMaybe<Scalars["Boolean"]["input"]>;
  userId: Scalars["ID"]["input"];
  userSkills: Scalars["String"]["input"];
};

export type MutationAddVideoCvArgs = {
  file: Scalars["Upload"]["input"];
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationCompanyCheckArgs = {
  companyName: Scalars["String"]["input"];
};

export type MutationCreateOrganizationArgs = {
  companyName?: InputMaybe<Scalars["String"]["input"]>;
  companySize?: InputMaybe<Scalars["String"]["input"]>;
  country?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  password?: InputMaybe<Scalars["String"]["input"]>;
  phone?: InputMaybe<Scalars["String"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationCreateRoleArgs = {
  companyId?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  permissions?: InputMaybe<Array<InputMaybe<RolePermissionDataInput>>>;
};

export type MutationDeleteCertificateArgs = {
  certificateId: Scalars["String"]["input"];
};

export type MutationDeleteLanguageArgs = {
  language?: InputMaybe<Scalars["String"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationDeleteOrganizationArgs = {
  ID: Scalars["ID"]["input"];
};

export type MutationDeletePreviousCompanyArgs = {
  companyId: Scalars["String"]["input"];
};

export type MutationDeleteRoleArgs = {
  roleId: Scalars["String"]["input"];
};

export type MutationDeleteUserPhotoArgs = {
  userId?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationDeleteUserProjectArgs = {
  projectId: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type MutationDeleteUserSkillArgs = {
  skillId: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type MutationDeleteVideoCvArgs = {
  userId?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationGetSkillsOverviewArgs = {
  companyId: Scalars["String"]["input"];
  department: Scalars["String"]["input"];
};

export type MutationReviewExpertSkillRequestArgs = {
  skillId?: InputMaybe<Scalars["ID"]["input"]>;
  status: Scalars["Boolean"]["input"];
  userId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type MutationUpdateContactNumberArgs = {
  phone?: InputMaybe<Scalars["String"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationUpdateLanguageArgs = {
  language?: InputMaybe<Scalars["String"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationUpdateLinkedinUrlArgs = {
  url?: InputMaybe<Scalars["String"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationUpdateOrganizationArgs = {
  companyName?: InputMaybe<Scalars["String"]["input"]>;
  companySize?: InputMaybe<Scalars["String"]["input"]>;
  country?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["String"]["input"];
};

export type MutationUpdatePhotoArgs = {
  file: Scalars["Upload"]["input"];
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationUpdateRoleArgs = {
  name: Scalars["String"]["input"];
  permissions?: InputMaybe<Array<InputMaybe<RolePermissionDataInput>>>;
  roleId: Scalars["String"]["input"];
};

export type MutationUpdateSummaryArgs = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationUpdateVideoCvArgs = {
  file: Scalars["Upload"]["input"];
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type Organization = {
  __typename?: "Organization";
  ID: Scalars["ID"]["output"];
  companySize?: Maybe<Scalars["String"]["output"]>;
  country?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type OrganizationResponse = {
  __typename?: "OrganizationResponse";
  message?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

export type ProfileOverviewResponse = {
  __typename?: "ProfileOverviewResponse";
  address?: Maybe<Scalars["String"]["output"]>;
  employeeId?: Maybe<Scalars["String"]["output"]>;
  gender?: Maybe<Scalars["String"]["output"]>;
  languages?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  linkedinURL?: Maybe<Scalars["String"]["output"]>;
  managerName?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  phone?: Maybe<Scalars["String"]["output"]>;
  profilephoto?: Maybe<Scalars["String"]["output"]>;
  userId?: Maybe<Scalars["String"]["output"]>;
  username?: Maybe<Scalars["String"]["output"]>;
};

export type Project = {
  __typename?: "Project";
  endDate?: Maybe<Scalars["String"]["output"]>;
  projectId?: Maybe<Scalars["String"]["output"]>;
  projectSummary?: Maybe<Scalars["String"]["output"]>;
  projectTitle?: Maybe<Scalars["String"]["output"]>;
  role?: Maybe<Scalars["String"]["output"]>;
  startDate?: Maybe<Scalars["String"]["output"]>;
  userId?: Maybe<Scalars["String"]["output"]>;
  userSkills?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type ProjectResponses = {
  __typename?: "ProjectResponses";
  data?: Maybe<Scalars["String"]["output"]>;
  message?: Maybe<Scalars["String"]["output"]>;
  status: Scalars["Boolean"]["output"];
};

export type Projects = {
  __typename?: "Projects";
  data?: Maybe<Array<Maybe<Project>>>;
  status: Scalars["Boolean"]["output"];
};

export type Query = {
  __typename?: "Query";
  findAllSkills?: Maybe<SkillResponsess>;
  getAllCertificates?: Maybe<GetAllCertificateResponse>;
  getAllModules?: Maybe<ModuleResponse>;
  getAllOrganizations?: Maybe<GetAllOrganizationsResponse>;
  getCertificateDetails?: Maybe<GetCertificateResponse>;
  getCountries?: Maybe<CountryResponses>;
  getIconByName?: Maybe<IconResponse>;
  getLanguages?: Maybe<GetLanguagesResponse>;
  getOrganization?: Maybe<GetOrganizationResponse>;
  getPreviousCompany?: Maybe<GetCompaniesResponse>;
  getPreviousCompanyDetails?: Maybe<GetCompanyDetailsResponse>;
  getProfileOverview?: Maybe<GetProfileOverviewResponse>;
  getRolePermissions?: Maybe<RolePermissionsResponses>;
  getRolesByCompanyId: RoleResponse;
  getSkillCategory?: Maybe<SkillCategoryResponse>;
  getSummary?: Maybe<GetSummaryResponse>;
  getUserPhoto?: Maybe<UserUploadResponse>;
  getUserProjects?: Maybe<Projects>;
  getUserSkills?: Maybe<GetUserSkillsResponse>;
  getVideoCV?: Maybe<UserUploadResponse>;
  hello?: Maybe<Scalars["String"]["output"]>;
};

export type QueryFindAllSkillsArgs = {
  companyId: Scalars["String"]["input"];
};

export type QueryGetAllCertificatesArgs = {
  userId: Scalars["String"]["input"];
};

export type QueryGetCertificateDetailsArgs = {
  certificateId: Scalars["String"]["input"];
};

export type QueryGetIconByNameArgs = {
  name: Scalars["String"]["input"];
};

export type QueryGetOrganizationArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryGetPreviousCompanyArgs = {
  userId: Scalars["String"]["input"];
};

export type QueryGetPreviousCompanyDetailsArgs = {
  companyId: Scalars["String"]["input"];
};

export type QueryGetProfileOverviewArgs = {
  userId: Scalars["String"]["input"];
};

export type QueryGetRolePermissionsArgs = {
  roleId: Scalars["String"]["input"];
};

export type QueryGetRolesByCompanyIdArgs = {
  companyId: Scalars["String"]["input"];
};

export type QueryGetSummaryArgs = {
  userId: Scalars["String"]["input"];
};

export type QueryGetUserPhotoArgs = {
  userId?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryGetUserProjectsArgs = {
  userId: Scalars["ID"]["input"];
};

export type QueryGetUserSkillsArgs = {
  userId: Scalars["String"]["input"];
};

export type QueryGetVideoCvArgs = {
  userId?: InputMaybe<Scalars["String"]["input"]>;
};

export type Response = {
  __typename?: "Response";
  data?: Maybe<Message>;
  message?: Maybe<Scalars["String"]["output"]>;
  status?: Maybe<Scalars["Boolean"]["output"]>;
};

export type ReviewExpertSkillInput = {
  skillId?: InputMaybe<Scalars["ID"]["input"]>;
  status?: InputMaybe<Scalars["Boolean"]["input"]>;
  userId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type ReviewExpertSkillResponse = {
  __typename?: "ReviewExpertSkillResponse";
  data?: Maybe<Scalars["String"]["output"]>;
  status: Scalars["Boolean"]["output"];
};

export type Role = {
  __typename?: "Role";
  companyId: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  permissions: RolePermission;
};

export type RoleAction = {
  __typename?: "RoleAction";
  create: Scalars["Boolean"]["output"];
  delete: Scalars["Boolean"]["output"];
  read: Scalars["Boolean"]["output"];
  update: Scalars["Boolean"]["output"];
};

export type RoleActionInput = {
  create: Scalars["Boolean"]["input"];
  delete: Scalars["Boolean"]["input"];
  read: Scalars["Boolean"]["input"];
  update: Scalars["Boolean"]["input"];
};

export type RoleActions = {
  __typename?: "RoleActions";
  create?: Maybe<Scalars["Boolean"]["output"]>;
  read?: Maybe<Scalars["Boolean"]["output"]>;
  update?: Maybe<Scalars["Boolean"]["output"]>;
};

export type RoleCompany = {
  __typename?: "RoleCompany";
  _id?: Maybe<Scalars["String"]["output"]>;
  companyId?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  roleId?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["String"]["output"]>;
};

export type RoleInput = {
  companyId: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  permissions: Array<RolePermissionInput>;
};

export type RoleMutationResponse = {
  __typename?: "RoleMutationResponse";
  message?: Maybe<Scalars["String"]["output"]>;
  status?: Maybe<Scalars["Boolean"]["output"]>;
};

export type RolePermission = {
  __typename?: "RolePermission";
  actions: Array<RoleAction>;
  moduleId: Scalars["String"]["output"];
  moduleName: Scalars["String"]["output"];
};

export type RolePermissionDataInput = {
  actions?: InputMaybe<RoleActionInput>;
  moduleId: Scalars["String"]["input"];
};

export type RolePermissionInput = {
  actions?: InputMaybe<Array<RoleActionInput>>;
  moduleId: Scalars["String"]["input"];
};

export type RolePermissions = {
  __typename?: "RolePermissions";
  actions?: Maybe<RoleActions>;
  moduleId?: Maybe<Scalars["String"]["output"]>;
  moduleName?: Maybe<Scalars["String"]["output"]>;
};

export type RolePermissionsResponse = {
  __typename?: "RolePermissionsResponse";
  message: Scalars["String"]["output"];
  permissions?: Maybe<Array<Maybe<UserRolePermission>>>;
  success: Scalars["Boolean"]["output"];
};

export type RolePermissionsResponses = {
  __typename?: "RolePermissionsResponses";
  message?: Maybe<Scalars["String"]["output"]>;
  permissions?: Maybe<Array<Maybe<RolePermissions>>>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

export type RoleResponse = {
  __typename?: "RoleResponse";
  data?: Maybe<Array<Maybe<RoleCompany>>>;
  message?: Maybe<Scalars["String"]["output"]>;
  status?: Maybe<Scalars["Boolean"]["output"]>;
};

export type Skill = {
  __typename?: "Skill";
  departmentId?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  phone?: Maybe<Scalars["String"]["output"]>;
  userId?: Maybe<Scalars["String"]["output"]>;
  userName?: Maybe<Scalars["String"]["output"]>;
};

export type SkillCategoryResponse = {
  __typename?: "SkillCategoryResponse";
  data?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  message?: Maybe<Scalars["String"]["output"]>;
  status: Scalars["Boolean"]["output"];
};

export type SkillOverView = {
  __typename?: "SkillOverView";
  basicKnowledge?: Maybe<Scalars["Int"]["output"]>;
  goodKnowledge?: Maybe<Scalars["Int"]["output"]>;
  skillId?: Maybe<Scalars["String"]["output"]>;
  skillName?: Maybe<Scalars["String"]["output"]>;
};

export type SkillResponsess = {
  __typename?: "SkillResponsess";
  data?: Maybe<Array<Maybe<Skills>>>;
  message?: Maybe<Scalars["String"]["output"]>;
  status?: Maybe<Scalars["Boolean"]["output"]>;
};

export type Skills = {
  __typename?: "Skills";
  ID?: Maybe<Scalars["String"]["output"]>;
  Title?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type SkillsOverviewResponse = {
  __typename?: "SkillsOverviewResponse";
  data?: Maybe<Array<Maybe<SkillOverView>>>;
  message?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

export type Summary = {
  __typename?: "Summary";
  description?: Maybe<Scalars["String"]["output"]>;
  username?: Maybe<Scalars["String"]["output"]>;
};

export type SummaryResponse = {
  __typename?: "SummaryResponse";
  description?: Maybe<Scalars["String"]["output"]>;
};

export type UpdateOrganizationResponse = {
  __typename?: "UpdateOrganizationResponse";
  data?: Maybe<Scalars["String"]["output"]>;
  status: Scalars["Boolean"]["output"];
};

export type UpdateRoleInput = {
  name: Scalars["String"]["input"];
  permissions: Array<RolePermissionInput>;
  roleId: Scalars["String"]["input"];
};

export type UpdateUserSkillsResponse = {
  __typename?: "UpdateUserSkillsResponse";
  data?: Maybe<Scalars["String"]["output"]>;
  status: Scalars["Boolean"]["output"];
};

export type UserResponse = {
  __typename?: "UserResponse";
  message?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

export type UserRolePermission = {
  __typename?: "UserRolePermission";
  permission: Array<RolePermission>;
};

export type UserSkills = {
  __typename?: "UserSkills";
  experienceInYears?: Maybe<Scalars["String"]["output"]>;
  proficiency?: Maybe<Scalars["String"]["output"]>;
  skillCategory?: Maybe<Scalars["String"]["output"]>;
  skillId: Scalars["ID"]["output"];
  skillName: Scalars["String"]["output"];
  status?: Maybe<Scalars["Boolean"]["output"]>;
  userId: Scalars["ID"]["output"];
};

export type UserSkillsResponse = {
  __typename?: "UserSkillsResponse";
  data?: Maybe<Scalars["String"]["output"]>;
  status?: Maybe<Scalars["Boolean"]["output"]>;
};

export type UserUploadResponse = {
  __typename?: "UserUploadResponse";
  data?: Maybe<Scalars["String"]["output"]>;
  message?: Maybe<Scalars["String"]["output"]>;
  status?: Maybe<Scalars["Boolean"]["output"]>;
};

export type AddCertificateResponse = {
  __typename?: "addCertificateResponse";
  data?: Maybe<Scalars["String"]["output"]>;
  message?: Maybe<Scalars["String"]["output"]>;
  status: Scalars["Boolean"]["output"];
};

export type Data = {
  __typename?: "data";
  Modules?: Maybe<Array<Maybe<Module>>>;
};

export type GetAllCertificateResponse = {
  __typename?: "getAllCertificateResponse";
  data?: Maybe<Array<Maybe<Certificate>>>;
  message?: Maybe<Scalars["String"]["output"]>;
  status: Scalars["Boolean"]["output"];
};

export type GetCertificateResponse = {
  __typename?: "getCertificateResponse";
  data?: Maybe<Certificate>;
  message?: Maybe<Scalars["String"]["output"]>;
  status: Scalars["Boolean"]["output"];
};

export type IconResponse = {
  __typename?: "iconResponse";
  data?: Maybe<Icon>;
  message?: Maybe<Scalars["String"]["output"]>;
  status: Scalars["Boolean"]["output"];
};

export type GetSummaryQueryVariables = Exact<{
  userId: Scalars["String"]["input"];
}>;

export type GetSummaryQuery = {
  __typename?: "Query";
  getSummary?: {
    description: string;
    __typename?: "GetSummaryResponse";
    status: boolean;
    message?: string | null;
    summary?: Array<{
      __typename?: "SummaryResponse";
      description?: string | null;
    } | null> | null;
  } | null;
};

export type GetProfileOverviewQueryVariables = Exact<{
  userId: Scalars["String"]["input"];
}>;

export type GetProfileOverviewQuery = {
  __typename?: "Query";
  getProfileOverview?: {
    __typename?: "GetProfileOverviewResponse";
    status: boolean;
    message?: string | null;
    profile?: {
      __typename?: "ProfileOverviewResponse";
      userId?: string | null;
      name?: string | null;
      username?: string | null;
      phone?: string | null;
      address?: string | null;
      gender?: string | null;
      linkedinURL?: string | null;
      employeeId?: string | null;
      profilephoto?: string | null;
      languages?: Array<string | null> | null;
      managerName?: string | null;
    } | null;
  } | null;
};

export type GetLanguagesQueryVariables = Exact<{ [key: string]: never }>;

export type GetLanguagesQuery = {
  __typename?: "Query";
  getLanguages?: {
    __typename?: "GetLanguagesResponse";
    status: boolean;
    message?: string | null;
    data?: Array<{
      __typename?: "Languages";
      name?: string | null;
      Title?: string | null;
      ID?: string | null;
    } | null> | null;
  } | null;
};

export type GetUserSkillsQueryVariables = Exact<{
  userId: Scalars["String"]["input"];
}>;

export type GetUserSkillsQuery = {
  __typename?: "Query";
  getUserSkills?: {
    __typename?: "GetUserSkillsResponse";
    status: boolean;
    message?: string | null;
    data?: Array<{
      __typename?: "UserSkills";
      userId: string;
      skillId: string;
      skillName: string;
      experienceInYears?: string | null;
      skillCategory?: string | null;
      proficiency?: string | null;
    } | null> | null;
  } | null;
};

export type GetPreviousCompanyQueryVariables = Exact<{
  userId: Scalars["String"]["input"];
}>;

export type GetPreviousCompanyQuery = {
  __typename?: "Query";
  getPreviousCompany?: {
    __typename?: "GetCompaniesResponse";
    status?: boolean | null;
    message?: string | null;
    companies: Array<{
      __typename?: "CompanyResponse";
      id?: string | null;
      companyName?: string | null;
      designation?: string | null;
      startDate?: string | null;
      endDate?: string | null;
      country?: string | null;
      state?: string | null;
      locationType?: string | null;
      employmentType?: string | null;
      jobSummary?: string | null;
      skill?: Array<string | null> | null;
    } | null>;
  } | null;
};

export type UpdateLinkedinUrlMutationVariables = Exact<{
  username?: InputMaybe<Scalars["String"]["input"]>;
  url?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type UpdateLinkedinUrlMutation = {
  __typename?: "Mutation";
  updateLinkedinURL?: {
    __typename?: "UserResponse";
    success: boolean;
    message?: string | null;
  } | null;
};

export type UpdateLanguageMutationVariables = Exact<{
  username?: InputMaybe<Scalars["String"]["input"]>;
  language?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type UpdateLanguageMutation = {
  __typename?: "Mutation";
  updateLanguage?: {
    __typename?: "UserResponse";
    success: boolean;
    message?: string | null;
  } | null;
};

export type UpdateContactNumberMutationVariables = Exact<{
  username?: InputMaybe<Scalars["String"]["input"]>;
  phone?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type UpdateContactNumberMutation = {
  __typename?: "Mutation";
  updateContactNumber?: {
    __typename?: "UserResponse";
    success: boolean;
    message?: string | null;
  } | null;
};

export type SubmitProfileDataMutationVariables = Exact<{
  username: Scalars["String"]["input"];
  language: Scalars["String"]["input"];
  url: Scalars["String"]["input"];
  phone: Scalars["String"]["input"];
}>;

export type SubmitProfileDataMutation = {
  __typename?: "Mutation";
  updateLanguage?: {
    __typename?: "UserResponse";
    success: boolean;
    message?: string | null;
  } | null;
  updateLinkedinURL?: {
    __typename?: "UserResponse";
    success: boolean;
    message?: string | null;
  } | null;
  updateContactNumber?: {
    __typename?: "UserResponse";
    success: boolean;
    message?: string | null;
  } | null;
};

export type UpdateSummaryMutationVariables = Exact<{
  username?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type UpdateSummaryMutation = {
  __typename?: "Mutation";
  updateSummary?: {
    __typename?: "UserResponse";
    message?: string | null;
    success: boolean;
  } | null;
};

export type GetUserProjectsQueryVariables = Exact<{
  userId: Scalars["ID"]["input"];
}>;

export type GetUserProjectsQuery = {
  __typename?: "Query";
  getUserProjects?: {
    __typename?: "Projects";
    status: boolean;
    data?: Array<{
      __typename?: "Project";
      userId?: string | null;
      projectId?: string | null;
      projectTitle?: string | null;
      role?: string | null;
      startDate?: string | null;
      endDate?: string | null;
      projectSummary?: string | null;
      userSkills?: Array<string | null> | null;
    } | null> | null;
  } | null;
};

export type GetAllCertificatesQueryVariables = Exact<{
  userId: Scalars["String"]["input"];
}>;

export type GetAllCertificatesQuery = {
  __typename?: "Query";
  getAllCertificates?: {
    __typename?: "getAllCertificateResponse";
    status: boolean;
    message?: string | null;
    data?: Array<{
      __typename?: "Certificate";
      certificateExpiryDate?: string | null;
      certificateID?: string | null;
      certificateImageURL?: string | null;
      certificateIssueDate?: string | null;
      certificateName?: string | null;
      certificateURL?: string | null;
      organizationName?: string | null;
      skill?: string | null;
    } | null> | null;
  } | null;
};

export type AddUserSkillMutationVariables = Exact<{
  userId: Scalars["ID"]["input"];
  userSkills: Scalars["String"]["input"];
  skillCategory: Scalars["String"]["input"];
  proficiency?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<Scalars["Boolean"]["input"]>;
  experienceInYears?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type AddUserSkillMutation = {
  __typename?: "Mutation";
  addUserSkill?: {
    __typename?: "UserSkillsResponse";
    data?: string | null;
    status?: boolean | null;
  } | null;
};

export type AddCertificateWithImageMutationVariables = Exact<{
  certificateName: Scalars["String"]["input"];
  organizationName: Scalars["String"]["input"];
  CredentialUrl: Scalars["String"]["input"];
  certificateIssueDate: Scalars["String"]["input"];
  certificateExpiryDate: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
  skill: Scalars["String"]["input"];
  file?: InputMaybe<Scalars["Upload"]["input"]>;
}>;

export type AddCertificateWithImageMutation = {
  __typename?: "Mutation";
  addCertificateWithImage: {
    __typename?: "ImageUploadResponse";
    status: boolean;
    data?: string | null;
    message?: string | null;
  };
};

export type DeleteCertificateMutationVariables = Exact<{
  certificateId: Scalars["String"]["input"];
}>;

export type DeleteCertificateMutation = {
  __typename?: "Mutation";
  deleteCertificate?: {
    __typename?: "DeleteResponse";
    status: boolean;
    data?: string | null;
    message?: string | null;
  } | null;
};

export type DeleteUserSkillMutationVariables = Exact<{
  userId: Scalars["String"]["input"];
  skillId: Scalars["String"]["input"];
}>;

export type DeleteUserSkillMutation = {
  __typename?: "Mutation";
  deleteUserSkill?: {
    __typename?: "DeleteUserSkillsResponse";
    status: boolean;
    message?: string | null;
    data?: string | null;
  } | null;
};

export type DeleteUserProjectMutationVariables = Exact<{
  userId: Scalars["String"]["input"];
  projectId: Scalars["String"]["input"];
}>;

export type DeleteUserProjectMutation = {
  __typename?: "Mutation";
  deleteUserProject?: {
    __typename?: "DeleteUserProject";
    status: boolean;
    message?: string | null;
    data?: string | null;
  } | null;
};

export const GetSummaryDocument = gql`
  query GetSummary($userId: String!) {
    getSummary(userId: $userId) {
      status
      message
      summary {
        description
      }
    }
  }
`;

/**
 * __useGetSummaryQuery__
 *
 * To run a query within a React component, call `useGetSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSummaryQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetSummaryQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetSummaryQuery,
    GetSummaryQueryVariables
  > &
    (
      | { variables: GetSummaryQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetSummaryQuery, GetSummaryQueryVariables>(
    GetSummaryDocument,
    options,
  );
}
export function useGetSummaryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSummaryQuery,
    GetSummaryQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetSummaryQuery, GetSummaryQueryVariables>(
    GetSummaryDocument,
    options,
  );
}
export function useGetSummarySuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetSummaryQuery,
    GetSummaryQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetSummaryQuery, GetSummaryQueryVariables>(
    GetSummaryDocument,
    options,
  );
}
export type GetSummaryQueryHookResult = ReturnType<typeof useGetSummaryQuery>;
export type GetSummaryLazyQueryHookResult = ReturnType<
  typeof useGetSummaryLazyQuery
>;
export type GetSummarySuspenseQueryHookResult = ReturnType<
  typeof useGetSummarySuspenseQuery
>;
export type GetSummaryQueryResult = Apollo.QueryResult<
  GetSummaryQuery,
  GetSummaryQueryVariables
>;
export const GetProfileOverviewDocument = gql`
  query GetProfileOverview($userId: String!) {
    getProfileOverview(userId: $userId) {
      status
      message
      profile {
        userId
        name
        username
        phone
        address
        gender
        linkedinURL
        employeeId
        profilephoto
        languages
        managerName
      }
    }
  }
`;

/**
 * __useGetProfileOverviewQuery__
 *
 * To run a query within a React component, call `useGetProfileOverviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileOverviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileOverviewQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetProfileOverviewQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetProfileOverviewQuery,
    GetProfileOverviewQueryVariables
  > &
    (
      | { variables: GetProfileOverviewQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetProfileOverviewQuery,
    GetProfileOverviewQueryVariables
  >(GetProfileOverviewDocument, options);
}
export function useGetProfileOverviewLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetProfileOverviewQuery,
    GetProfileOverviewQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetProfileOverviewQuery,
    GetProfileOverviewQueryVariables
  >(GetProfileOverviewDocument, options);
}
export function useGetProfileOverviewSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetProfileOverviewQuery,
    GetProfileOverviewQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetProfileOverviewQuery,
    GetProfileOverviewQueryVariables
  >(GetProfileOverviewDocument, options);
}
export type GetProfileOverviewQueryHookResult = ReturnType<
  typeof useGetProfileOverviewQuery
>;
export type GetProfileOverviewLazyQueryHookResult = ReturnType<
  typeof useGetProfileOverviewLazyQuery
>;
export type GetProfileOverviewSuspenseQueryHookResult = ReturnType<
  typeof useGetProfileOverviewSuspenseQuery
>;
export type GetProfileOverviewQueryResult = Apollo.QueryResult<
  GetProfileOverviewQuery,
  GetProfileOverviewQueryVariables
>;
export const GetLanguagesDocument = gql`
  query GetLanguages {
    getLanguages {
      status
      message
      data {
        name
        Title
        ID
      }
    }
  }
`;

/**
 * __useGetLanguagesQuery__
 *
 * To run a query within a React component, call `useGetLanguagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLanguagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLanguagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLanguagesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetLanguagesQuery,
    GetLanguagesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetLanguagesQuery, GetLanguagesQueryVariables>(
    GetLanguagesDocument,
    options,
  );
}
export function useGetLanguagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetLanguagesQuery,
    GetLanguagesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetLanguagesQuery, GetLanguagesQueryVariables>(
    GetLanguagesDocument,
    options,
  );
}
export function useGetLanguagesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetLanguagesQuery,
    GetLanguagesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetLanguagesQuery, GetLanguagesQueryVariables>(
    GetLanguagesDocument,
    options,
  );
}
export type GetLanguagesQueryHookResult = ReturnType<
  typeof useGetLanguagesQuery
>;
export type GetLanguagesLazyQueryHookResult = ReturnType<
  typeof useGetLanguagesLazyQuery
>;
export type GetLanguagesSuspenseQueryHookResult = ReturnType<
  typeof useGetLanguagesSuspenseQuery
>;
export type GetLanguagesQueryResult = Apollo.QueryResult<
  GetLanguagesQuery,
  GetLanguagesQueryVariables
>;
export const GetUserSkillsDocument = gql`
  query GetUserSkills($userId: String!) {
    getUserSkills(userId: $userId) {
      status
      message
      data {
        userId
        skillId
        skillName
        experienceInYears
        skillCategory
        proficiency
      }
    }
  }
`;

/**
 * __useGetUserSkillsQuery__
 *
 * To run a query within a React component, call `useGetUserSkillsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserSkillsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserSkillsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserSkillsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetUserSkillsQuery,
    GetUserSkillsQueryVariables
  > &
    (
      | { variables: GetUserSkillsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUserSkillsQuery, GetUserSkillsQueryVariables>(
    GetUserSkillsDocument,
    options,
  );
}
export function useGetUserSkillsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUserSkillsQuery,
    GetUserSkillsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUserSkillsQuery, GetUserSkillsQueryVariables>(
    GetUserSkillsDocument,
    options,
  );
}
export function useGetUserSkillsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetUserSkillsQuery,
    GetUserSkillsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetUserSkillsQuery,
    GetUserSkillsQueryVariables
  >(GetUserSkillsDocument, options);
}
export type GetUserSkillsQueryHookResult = ReturnType<
  typeof useGetUserSkillsQuery
>;
export type GetUserSkillsLazyQueryHookResult = ReturnType<
  typeof useGetUserSkillsLazyQuery
>;
export type GetUserSkillsSuspenseQueryHookResult = ReturnType<
  typeof useGetUserSkillsSuspenseQuery
>;
export type GetUserSkillsQueryResult = Apollo.QueryResult<
  GetUserSkillsQuery,
  GetUserSkillsQueryVariables
>;
export const GetPreviousCompanyDocument = gql`
  query GetPreviousCompany($userId: String!) {
    getPreviousCompany(userId: $userId) {
      status
      message
      companies {
        id
        companyName
        designation
        startDate
        endDate
        country
        state
        locationType
        employmentType
        jobSummary
        skill
      }
    }
  }
`;

/**
 * __useGetPreviousCompanyQuery__
 *
 * To run a query within a React component, call `useGetPreviousCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPreviousCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPreviousCompanyQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetPreviousCompanyQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetPreviousCompanyQuery,
    GetPreviousCompanyQueryVariables
  > &
    (
      | { variables: GetPreviousCompanyQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetPreviousCompanyQuery,
    GetPreviousCompanyQueryVariables
  >(GetPreviousCompanyDocument, options);
}
export function useGetPreviousCompanyLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPreviousCompanyQuery,
    GetPreviousCompanyQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetPreviousCompanyQuery,
    GetPreviousCompanyQueryVariables
  >(GetPreviousCompanyDocument, options);
}
export function useGetPreviousCompanySuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetPreviousCompanyQuery,
    GetPreviousCompanyQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetPreviousCompanyQuery,
    GetPreviousCompanyQueryVariables
  >(GetPreviousCompanyDocument, options);
}
export type GetPreviousCompanyQueryHookResult = ReturnType<
  typeof useGetPreviousCompanyQuery
>;
export type GetPreviousCompanyLazyQueryHookResult = ReturnType<
  typeof useGetPreviousCompanyLazyQuery
>;
export type GetPreviousCompanySuspenseQueryHookResult = ReturnType<
  typeof useGetPreviousCompanySuspenseQuery
>;
export type GetPreviousCompanyQueryResult = Apollo.QueryResult<
  GetPreviousCompanyQuery,
  GetPreviousCompanyQueryVariables
>;
export const UpdateLinkedinUrlDocument = gql`
  mutation UpdateLinkedinURL($username: String, $url: String) {
    updateLinkedinURL(username: $username, url: $url) {
      success
      message
    }
  }
`;
export type UpdateLinkedinUrlMutationFn = Apollo.MutationFunction<
  UpdateLinkedinUrlMutation,
  UpdateLinkedinUrlMutationVariables
>;

/**
 * __useUpdateLinkedinUrlMutation__
 *
 * To run a mutation, you first call `useUpdateLinkedinUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLinkedinUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLinkedinUrlMutation, { data, loading, error }] = useUpdateLinkedinUrlMutation({
 *   variables: {
 *      username: // value for 'username'
 *      url: // value for 'url'
 *   },
 * });
 */
export function useUpdateLinkedinUrlMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateLinkedinUrlMutation,
    UpdateLinkedinUrlMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateLinkedinUrlMutation,
    UpdateLinkedinUrlMutationVariables
  >(UpdateLinkedinUrlDocument, options);
}
export type UpdateLinkedinUrlMutationHookResult = ReturnType<
  typeof useUpdateLinkedinUrlMutation
>;
export type UpdateLinkedinUrlMutationResult =
  Apollo.MutationResult<UpdateLinkedinUrlMutation>;
export type UpdateLinkedinUrlMutationOptions = Apollo.BaseMutationOptions<
  UpdateLinkedinUrlMutation,
  UpdateLinkedinUrlMutationVariables
>;
export const UpdateLanguageDocument = gql`
  mutation UpdateLanguage($username: String, $language: String) {
    updateLanguage(username: $username, language: $language) {
      success
      message
    }
  }
`;
export type UpdateLanguageMutationFn = Apollo.MutationFunction<
  UpdateLanguageMutation,
  UpdateLanguageMutationVariables
>;

/**
 * __useUpdateLanguageMutation__
 *
 * To run a mutation, you first call `useUpdateLanguageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLanguageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLanguageMutation, { data, loading, error }] = useUpdateLanguageMutation({
 *   variables: {
 *      username: // value for 'username'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useUpdateLanguageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateLanguageMutation,
    UpdateLanguageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateLanguageMutation,
    UpdateLanguageMutationVariables
  >(UpdateLanguageDocument, options);
}
export type UpdateLanguageMutationHookResult = ReturnType<
  typeof useUpdateLanguageMutation
>;
export type UpdateLanguageMutationResult =
  Apollo.MutationResult<UpdateLanguageMutation>;
export type UpdateLanguageMutationOptions = Apollo.BaseMutationOptions<
  UpdateLanguageMutation,
  UpdateLanguageMutationVariables
>;
export const UpdateContactNumberDocument = gql`
  mutation UpdateContactNumber($username: String, $phone: String) {
    updateContactNumber(username: $username, phone: $phone) {
      success
      message
    }
  }
`;
export type UpdateContactNumberMutationFn = Apollo.MutationFunction<
  UpdateContactNumberMutation,
  UpdateContactNumberMutationVariables
>;

/**
 * __useUpdateContactNumberMutation__
 *
 * To run a mutation, you first call `useUpdateContactNumberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContactNumberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContactNumberMutation, { data, loading, error }] = useUpdateContactNumberMutation({
 *   variables: {
 *      username: // value for 'username'
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useUpdateContactNumberMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateContactNumberMutation,
    UpdateContactNumberMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateContactNumberMutation,
    UpdateContactNumberMutationVariables
  >(UpdateContactNumberDocument, options);
}
export type UpdateContactNumberMutationHookResult = ReturnType<
  typeof useUpdateContactNumberMutation
>;
export type UpdateContactNumberMutationResult =
  Apollo.MutationResult<UpdateContactNumberMutation>;
export type UpdateContactNumberMutationOptions = Apollo.BaseMutationOptions<
  UpdateContactNumberMutation,
  UpdateContactNumberMutationVariables
>;
export const SubmitProfileDataDocument = gql`
  mutation submitProfileData(
    $username: String!
    $language: String!
    $url: String!
    $phone: String!
  ) {
    updateLanguage(username: $username, language: $language) {
      success
      message
    }
    updateLinkedinURL(username: $username, url: $url) {
      success
      message
    }
    updateContactNumber(username: $username, phone: $phone) {
      success
      message
    }
  }
`;
export type SubmitProfileDataMutationFn = Apollo.MutationFunction<
  SubmitProfileDataMutation,
  SubmitProfileDataMutationVariables
>;

/**
 * __useSubmitProfileDataMutation__
 *
 * To run a mutation, you first call `useSubmitProfileDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitProfileDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitProfileDataMutation, { data, loading, error }] = useSubmitProfileDataMutation({
 *   variables: {
 *      username: // value for 'username'
 *      language: // value for 'language'
 *      url: // value for 'url'
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useSubmitProfileDataMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SubmitProfileDataMutation,
    SubmitProfileDataMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SubmitProfileDataMutation,
    SubmitProfileDataMutationVariables
  >(SubmitProfileDataDocument, options);
}
export type SubmitProfileDataMutationHookResult = ReturnType<
  typeof useSubmitProfileDataMutation
>;
export type SubmitProfileDataMutationResult =
  Apollo.MutationResult<SubmitProfileDataMutation>;
export type SubmitProfileDataMutationOptions = Apollo.BaseMutationOptions<
  SubmitProfileDataMutation,
  SubmitProfileDataMutationVariables
>;
export const UpdateSummaryDocument = gql`
  mutation UpdateSummary($username: String, $description: String) {
    updateSummary(username: $username, description: $description) {
      message
      success
    }
  }
`;
export type UpdateSummaryMutationFn = Apollo.MutationFunction<
  UpdateSummaryMutation,
  UpdateSummaryMutationVariables
>;

/**
 * __useUpdateSummaryMutation__
 *
 * To run a mutation, you first call `useUpdateSummaryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSummaryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSummaryMutation, { data, loading, error }] = useUpdateSummaryMutation({
 *   variables: {
 *      username: // value for 'username'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdateSummaryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateSummaryMutation,
    UpdateSummaryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateSummaryMutation,
    UpdateSummaryMutationVariables
  >(UpdateSummaryDocument, options);
}
export type UpdateSummaryMutationHookResult = ReturnType<
  typeof useUpdateSummaryMutation
>;
export type UpdateSummaryMutationResult =
  Apollo.MutationResult<UpdateSummaryMutation>;
export type UpdateSummaryMutationOptions = Apollo.BaseMutationOptions<
  UpdateSummaryMutation,
  UpdateSummaryMutationVariables
>;
export const GetUserProjectsDocument = gql`
  query GetUserProjects($userId: ID!) {
    getUserProjects(userId: $userId) {
      status
      data {
        userId
        projectId
        projectTitle
        role
        startDate
        endDate
        projectSummary
        userSkills
      }
    }
  }
`;

/**
 * __useGetUserProjectsQuery__
 *
 * To run a query within a React component, call `useGetUserProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserProjectsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserProjectsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetUserProjectsQuery,
    GetUserProjectsQueryVariables
  > &
    (
      | { variables: GetUserProjectsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUserProjectsQuery, GetUserProjectsQueryVariables>(
    GetUserProjectsDocument,
    options,
  );
}
export function useGetUserProjectsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUserProjectsQuery,
    GetUserProjectsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetUserProjectsQuery,
    GetUserProjectsQueryVariables
  >(GetUserProjectsDocument, options);
}
export function useGetUserProjectsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetUserProjectsQuery,
    GetUserProjectsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetUserProjectsQuery,
    GetUserProjectsQueryVariables
  >(GetUserProjectsDocument, options);
}
export type GetUserProjectsQueryHookResult = ReturnType<
  typeof useGetUserProjectsQuery
>;
export type GetUserProjectsLazyQueryHookResult = ReturnType<
  typeof useGetUserProjectsLazyQuery
>;
export type GetUserProjectsSuspenseQueryHookResult = ReturnType<
  typeof useGetUserProjectsSuspenseQuery
>;
export type GetUserProjectsQueryResult = Apollo.QueryResult<
  GetUserProjectsQuery,
  GetUserProjectsQueryVariables
>;
export const GetAllCertificatesDocument = gql`
  query GetAllCertificates($userId: String!) {
    getAllCertificates(userId: $userId) {
      status
      data {
        certificateExpiryDate
        certificateID
        certificateImageURL
        certificateIssueDate
        certificateName
        certificateURL
        organizationName
        skill
      }
      message
    }
  }
`;

/**
 * __useGetAllCertificatesQuery__
 *
 * To run a query within a React component, call `useGetAllCertificatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCertificatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCertificatesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetAllCertificatesQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAllCertificatesQuery,
    GetAllCertificatesQueryVariables
  > &
    (
      | { variables: GetAllCertificatesQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetAllCertificatesQuery,
    GetAllCertificatesQueryVariables
  >(GetAllCertificatesDocument, options);
}
export function useGetAllCertificatesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllCertificatesQuery,
    GetAllCertificatesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetAllCertificatesQuery,
    GetAllCertificatesQueryVariables
  >(GetAllCertificatesDocument, options);
}
export function useGetAllCertificatesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetAllCertificatesQuery,
    GetAllCertificatesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetAllCertificatesQuery,
    GetAllCertificatesQueryVariables
  >(GetAllCertificatesDocument, options);
}
export type GetAllCertificatesQueryHookResult = ReturnType<
  typeof useGetAllCertificatesQuery
>;
export type GetAllCertificatesLazyQueryHookResult = ReturnType<
  typeof useGetAllCertificatesLazyQuery
>;
export type GetAllCertificatesSuspenseQueryHookResult = ReturnType<
  typeof useGetAllCertificatesSuspenseQuery
>;
export type GetAllCertificatesQueryResult = Apollo.QueryResult<
  GetAllCertificatesQuery,
  GetAllCertificatesQueryVariables
>;
export const AddUserSkillDocument = gql`
  mutation AddUserSkill(
    $userId: ID!
    $userSkills: String!
    $skillCategory: String!
    $proficiency: String
    $status: Boolean
    $experienceInYears: String
  ) {
    addUserSkill(
      userId: $userId
      userSkills: $userSkills
      skillCategory: $skillCategory
      proficiency: $proficiency
      status: $status
      experienceInYears: $experienceInYears
    ) {
      data
      status
    }
  }
`;
export type AddUserSkillMutationFn = Apollo.MutationFunction<
  AddUserSkillMutation,
  AddUserSkillMutationVariables
>;

/**
 * __useAddUserSkillMutation__
 *
 * To run a mutation, you first call `useAddUserSkillMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserSkillMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserSkillMutation, { data, loading, error }] = useAddUserSkillMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      userSkills: // value for 'userSkills'
 *      skillCategory: // value for 'skillCategory'
 *      proficiency: // value for 'proficiency'
 *      status: // value for 'status'
 *      experienceInYears: // value for 'experienceInYears'
 *   },
 * });
 */
export function useAddUserSkillMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddUserSkillMutation,
    AddUserSkillMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddUserSkillMutation,
    AddUserSkillMutationVariables
  >(AddUserSkillDocument, options);
}
export type AddUserSkillMutationHookResult = ReturnType<
  typeof useAddUserSkillMutation
>;
export type AddUserSkillMutationResult =
  Apollo.MutationResult<AddUserSkillMutation>;
export type AddUserSkillMutationOptions = Apollo.BaseMutationOptions<
  AddUserSkillMutation,
  AddUserSkillMutationVariables
>;
export const AddCertificateWithImageDocument = gql`
  mutation AddCertificateWithImage(
    $certificateName: String!
    $organizationName: String!
    $CredentialUrl: String!
    $certificateIssueDate: String!
    $certificateExpiryDate: String!
    $userId: String!
    $skill: String!
    $file: Upload
  ) {
    addCertificateWithImage(
      certificateName: $certificateName
      organizationName: $organizationName
      certificateURL: $CredentialUrl
      certificateIssueDate: $certificateIssueDate
      certificateExpiryDate: $certificateExpiryDate
      userId: $userId
      skill: $skill
      file: $file
    ) {
      status
      data
      message
    }
  }
`;
export type AddCertificateWithImageMutationFn = Apollo.MutationFunction<
  AddCertificateWithImageMutation,
  AddCertificateWithImageMutationVariables
>;

/**
 * __useAddCertificateWithImageMutation__
 *
 * To run a mutation, you first call `useAddCertificateWithImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCertificateWithImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCertificateWithImageMutation, { data, loading, error }] = useAddCertificateWithImageMutation({
 *   variables: {
 *      certificateName: // value for 'certificateName'
 *      organizationName: // value for 'organizationName'
 *      CredentialUrl: // value for 'CredentialUrl'
 *      certificateIssueDate: // value for 'certificateIssueDate'
 *      certificateExpiryDate: // value for 'certificateExpiryDate'
 *      userId: // value for 'userId'
 *      skill: // value for 'skill'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useAddCertificateWithImageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddCertificateWithImageMutation,
    AddCertificateWithImageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddCertificateWithImageMutation,
    AddCertificateWithImageMutationVariables
  >(AddCertificateWithImageDocument, options);
}
export type AddCertificateWithImageMutationHookResult = ReturnType<
  typeof useAddCertificateWithImageMutation
>;
export type AddCertificateWithImageMutationResult =
  Apollo.MutationResult<AddCertificateWithImageMutation>;
export type AddCertificateWithImageMutationOptions = Apollo.BaseMutationOptions<
  AddCertificateWithImageMutation,
  AddCertificateWithImageMutationVariables
>;
export const DeleteCertificateDocument = gql`
  mutation DeleteCertificate($certificateId: String!) {
    deleteCertificate(certificateId: $certificateId) {
      status
      data
      message
    }
  }
`;
export type DeleteCertificateMutationFn = Apollo.MutationFunction<
  DeleteCertificateMutation,
  DeleteCertificateMutationVariables
>;

/**
 * __useDeleteCertificateMutation__
 *
 * To run a mutation, you first call `useDeleteCertificateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCertificateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCertificateMutation, { data, loading, error }] = useDeleteCertificateMutation({
 *   variables: {
 *      certificateId: // value for 'certificateId'
 *   },
 * });
 */
export function useDeleteCertificateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteCertificateMutation,
    DeleteCertificateMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteCertificateMutation,
    DeleteCertificateMutationVariables
  >(DeleteCertificateDocument, options);
}
export type DeleteCertificateMutationHookResult = ReturnType<
  typeof useDeleteCertificateMutation
>;
export type DeleteCertificateMutationResult =
  Apollo.MutationResult<DeleteCertificateMutation>;
export type DeleteCertificateMutationOptions = Apollo.BaseMutationOptions<
  DeleteCertificateMutation,
  DeleteCertificateMutationVariables
>;
export const DeleteUserSkillDocument = gql`
  mutation DeleteUserSkill($userId: String!, $skillId: String!) {
    deleteUserSkill(skillId: $skillId, userId: $userId) {
      status
      message
      data
    }
  }
`;
export type DeleteUserSkillMutationFn = Apollo.MutationFunction<
  DeleteUserSkillMutation,
  DeleteUserSkillMutationVariables
>;

/**
 * __useDeleteUserSkillMutation__
 *
 * To run a mutation, you first call `useDeleteUserSkillMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserSkillMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserSkillMutation, { data, loading, error }] = useDeleteUserSkillMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      skillId: // value for 'skillId'
 *   },
 * });
 */
export function useDeleteUserSkillMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteUserSkillMutation,
    DeleteUserSkillMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteUserSkillMutation,
    DeleteUserSkillMutationVariables
  >(DeleteUserSkillDocument, options);
}
export type DeleteUserSkillMutationHookResult = ReturnType<
  typeof useDeleteUserSkillMutation
>;
export type DeleteUserSkillMutationResult =
  Apollo.MutationResult<DeleteUserSkillMutation>;
export type DeleteUserSkillMutationOptions = Apollo.BaseMutationOptions<
  DeleteUserSkillMutation,
  DeleteUserSkillMutationVariables
>;
export const DeleteUserProjectDocument = gql`
  mutation DeleteUserProject($userId: String!, $projectId: String!) {
    deleteUserProject(projectId: $projectId, userId: $userId) {
      status
      message
      data
    }
  }
`;
export type DeleteUserProjectMutationFn = Apollo.MutationFunction<
  DeleteUserProjectMutation,
  DeleteUserProjectMutationVariables
>;

/**
 * __useDeleteUserProjectMutation__
 *
 * To run a mutation, you first call `useDeleteUserProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserProjectMutation, { data, loading, error }] = useDeleteUserProjectMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useDeleteUserProjectMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteUserProjectMutation,
    DeleteUserProjectMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteUserProjectMutation,
    DeleteUserProjectMutationVariables
  >(DeleteUserProjectDocument, options);
}
export type DeleteUserProjectMutationHookResult = ReturnType<
  typeof useDeleteUserProjectMutation
>;
export type DeleteUserProjectMutationResult =
  Apollo.MutationResult<DeleteUserProjectMutation>;
export type DeleteUserProjectMutationOptions = Apollo.BaseMutationOptions<
  DeleteUserProjectMutation,
  DeleteUserProjectMutationVariables
>;
