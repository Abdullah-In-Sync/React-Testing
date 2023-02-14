export interface ADMIN_VIEW_RESPONSE {
  data: Data;
}
export interface Data {
  adminViewResponseDetailById: AdminViewResponseDetailById;
}
export interface AdminViewResponseDetailById {
  _id: string;
  created_date: string;
  description: string;
  feedback_type: string;
  name: string;
  org_id: string;
  organization_name: string;
  patient_name?: null;
  questions?: QuestionsEntity[] | null;
  session_no: string;
  status: number;
  therapist_name?: null;
  therapy_name?: null;
  updated_date: string;
  user_id: string;
  user_type: string;
  visibility: number;
}
export interface QuestionsEntity {
  _id: string;
  answer_options: string;
  answer_type: string;
  answer: Answer;
  created_date: string;
  feedback_id: string;
  question: string;
  status: string;
  updated_date: string;
}
export interface Answer {
  _id?: null;
  answer?: null;
  created_date?: null;
  patient_id?: null;
  pttherapy_id?: null;
  question_id?: null;
  status?: null;
  therapist_id?: null;
  updated_date?: null;
}
