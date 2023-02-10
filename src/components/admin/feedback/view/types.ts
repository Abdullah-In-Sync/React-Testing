export interface AdminFeedbackView {
  viewFeedbackByAdmin: ViewFeedbackByAdmin;
}
export interface ViewFeedbackByAdmin {
  _id: string;
  created_date: string;
  description: string;
  feedback_type: string;
  name: string;
  org_id: string;
  organization_name: string;
  session_no: string;
  status: number;
  updated_date: string;
  user_id: string;
  user_type: string;
  visibility: number;
  questions?: QuestionsEntity[] | null;
  __typename: string;
}
export interface QuestionsEntity {
  _id: string;
  answer_options: string;
  answer_type: string;
  created_date: string;
  feedback_id: string;
  question: string;
  status: string;
  updated_date: string;
  answer?: null;
  __typename: string;
}
