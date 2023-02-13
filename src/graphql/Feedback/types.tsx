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
