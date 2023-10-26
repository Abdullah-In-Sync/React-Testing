export interface ModulesData {
  getAdminModuleList: GetAdminModuleList;
}
export interface GetAdminModuleList {
  modulelist?: ModulelistEntity[] | null;
  privileges?: PrivilegesEntity[] | null;
}
export interface ModulelistEntity {
  _id: string;
  accessibility?: string[] | null;
  name: string;
  privileges?: string[] | null;
  status: number;
}
export interface PrivilegesEntity {
  _id: string;
  name: string;
  status: number;
}

export interface CustomUsersListData {
  getCustomUsersList: GetCustomUsersList;
}
export interface GetCustomUsersList {
  data?: CustomUsersDataEntity[] | null;
  total: number;
}
export interface CustomUsersDataEntity {
  _id: string;
  added_by: string;
  created_by: string;
  created_date: string;
  first_name: string;
  last_name: string;
  role_id: string;
  status: number;
  updated_date: string;
  user_id: string;
  org_detail: OrgDetail;
  org_id: string;
  role_detail: RoleDetail;
}
export interface OrgDetail {
  _id: string;
  contract: string;
  created_date: string;
  disorder_id: string;
  logo: string;
  logo_url?: null;
  model_id: string;
  name: string;
  panel_color: string;
  patient: string;
  patient_plural: string;
  patient_welcome_email: string;
  side_menu_color: string;
  therapist: string;
  therapy: string;
  therapy_id: string;
}
export interface RoleDetail {
  _id: string;
  accessibility: string;
  created_date: string;
  name: string;
  org_id: string;
  position: string;
  organization_name?: null;
  privileges: string;
  status: number;
  updated_date: string;
}

export interface RolesListData {
  getRolesbyAccessbility?: GetRolesbyAccessbilityEntity[] | null;
}
export interface GetRolesbyAccessbilityEntity {
  _id: string;
  created_date: string;
  name: string;
  accessibility: string;
  org_id: string;
  organization_name?: null;
  position: string;
  privileges: string;
  status: number;
  updated_date: string;
}
