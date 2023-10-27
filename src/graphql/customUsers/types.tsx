export interface UsersData {
  getCustomUsersList: ResData;
}

export interface ResData {
  data: DataEntity[];
  total: number;
}
export interface DataEntity {
  _id: string;
  first_name: string;
  last_name: string;
  role_detail: RoleDetails;
}
export interface RoleDetails {
  _id: string;
  name: string;
  organization_name?: string | null;
  status: number;
}
