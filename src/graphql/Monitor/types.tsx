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
