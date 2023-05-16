// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Monitor {}

export interface AdminMonitorList {
  data?: MonitorDataEntity[] | null;
  total: number;
  __typename: string;
}

export interface AdminMonitorData {
  adminMonitorList: AdminMonitorList;
}

export interface MonitorList {
  data: AdminMonitorData;
}

export interface MonitorDataEntity {
  _id: string;
  created_date: string;
  name: string;
  org_id: string;
  organization_name: string;
  status: number;
  updated_date: string;
  __typename: string;
}
