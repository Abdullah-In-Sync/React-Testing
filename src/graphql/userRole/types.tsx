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
