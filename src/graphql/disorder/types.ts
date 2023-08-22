export interface AdminTherapyData {
  adminTherapyList: AdminTherapyList;
}
export interface AdminTherapyList {
  data?: AdminTherapyDataEntity[] | null;
  total: number;
}
export interface AdminTherapyDataEntity {
  therapy_name: string;
  therapy_status: number;
  organization_name: string;
  org_id: string;
  _id: string;
}
export interface AdminDisorderData {
  getAdminDisorderList: GetAdminDisorderList;
}
export interface GetAdminDisorderList {
  data?: AdminDisorderDataEntity[] | null;
  total: number;
}
export interface AdminDisorderDataEntity {
  _id: string;
  disorder_name: string;
  disorder_status: number;
  organization_settings?: OrganizationSettingsEntity[] | null;
  therapy_detail?: TherapyDetailEntity[] | null;
}
export interface OrganizationSettingsEntity {
  _id: string;
  name: string;
}
export interface TherapyDetailEntity {
  _id: string;
  therapy_name: string;
}
