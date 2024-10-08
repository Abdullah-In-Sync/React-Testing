export interface FeedbackFormData {
  _id?: string;
  feedBackName: string;
  orgId: string;
  userType: string;
  sessionNo: string;
  feedBackDesc: string;
  feedQuesData?: string;
  questions: FeedbackQuestion[];
  visiBility?: number;
}

export interface FeedbackQuestion {
  _id?: string;
  question: string;
  answer_type: string;
  answer_options?: string;
  status?: string;
}
