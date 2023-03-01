export interface CreateFeedbackVars {
  feedBackName: string;
  orgId: string;
  userType: string;
  sessionNo: string;
  feedBackDesc: string;
  feedQuesData: string;
  visiBility?: number;
}

export interface CreateFeedbackRes {
  createFeedback: CreateFeedback;
}

export interface CreateFeedback {
  result: boolean;
}

export interface ViewFeedbackByAdminVars {
  feedbackId: string;
}

export interface ViewFeedbackByAdminRes {
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
  questions: Question[];
  __typename: string;
}

export interface Question {
  _id: string;
  answer_options: string;
  answer_type: string;
  created_date: string;
  feedback_id: string;
  question: string;
  status: string;
  updated_date: string;
  answer: Answer;
  __typename: string;
}

export interface EditFeedbackByAdminVars {
  feedbackId: string;
  feedBackName: string;
  feedBackDesc: string;
  feedQuesData: string;
}

export interface EditFeedbackByAdminRes {
  editFeedbackByAdmin: ViewFeedbackByAdmin;
}
export interface DeleteFeedbackQuestionByAdminVars {
  questionId: string;
}

export interface DeleteFeedbackQuestionByAdminRes {
  deleteFeedbackQuesByAdmin: DeleteFeedbackQuesByAdmin;
}

export interface DeleteFeedbackQuesByAdmin {
  result: boolean;
}

export interface CheckFeedbackNameVars {
  orgId: string;
  userType: string;
  sessionNo: string;
}

export interface CheckFeedbackNameRes {
  checkFeedbackName: CheckFeedbackName[];
}

export interface CheckFeedbackName {
  org_id: string;
  organization_name: string;
  session_no: string;
}

export interface GetClientTherapySessionListVars {
  patientId: string;
  pttherapyId: string;
}
export interface GetClientTherapySessionListRes {
  getClientTherapysessionList: GetClientTherapySessionList[];
}

export interface GetClientTherapySessionList {
  session_no: string;
}
export interface TherapistGetFeedbackListVars {
  pttherapyId: string;
  sessionNo: string;
  feedbackType: string;
}

export interface TherapistGetFeedbackListRes {
  therapistGetFeedbackList: TherapistGetFeedbackList[];
}

export interface TherapistGetFeedbackList {
  _id: string;
  created_date: string;
  description: string;
  name: string;
  feedback_type: string;
  org_id: string;
  organization_name: null;
  patient_name: null;
  questions: Question[];
  session_no: string;
  status: number;
  therapist_name: null;
  therapy_name: null;
  updated_date: string;
  user_id: string;
  user_type: string;
  visibility: number;
  __typename: string;
}

export interface Answer {
  _id: string;
  answer: string;
  created_date: string;
  patient_id: string;
  pttherapy_id: string;
  question_id: string;
  status: string;
  therapist_id: string;
  updated_date: string;
  __typename: string;
}
