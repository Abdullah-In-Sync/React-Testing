// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AdminMonitorView {
  adminViewMonitorById: AdminViewMonitorById;
}
export interface AdminViewMonitorById {
  _id: string;
  name: string;
  created_date: string;
  org_id: string;
  organization_name: string;
  status: number;
  updated_date: string;
  questions?: QuestionsEntity[] | null;
}
export interface QuestionsEntity {
  _id: string;
  created_date: string;
  monitor_id: string;
  question: string;
  question_option: string;
  question_type: string;
  status: number;
  updated_date: string;
}

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

export interface PatientMonitorListData {
  patientMonitorList?: PatientMonitorList[] | null;
}
export interface PatientMonitorList {
  _id: string;
  added_by: string;
  created_date: string;
  name: string;
  org_id: string;
  patient_id: string;
  therapist_id?: null;
  status: number;
  updated_date: string;
}
