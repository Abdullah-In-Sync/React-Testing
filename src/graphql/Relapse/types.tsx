export interface AdminCreateRelapsePlanVars {
  orgId: string;
  planName: string;
  planType: string;
  questions: string;
  planDesc: string;
}
export interface AdminCreateRelapsePlanRes {
  adminCreateRelapsePlan: { duplicateNames?: DuplicateName[]; result: boolean };
}
export interface DuplicateName {
  _id: string;
  name: string;
}

export interface ViewRelapseData {
  data: Data;
}
export interface Data {
  adminViewRelapseById: AdminViewRelapseById;
}
export interface AdminViewRelapseById {
  _id: string;
  created_date: string;
  description: string;
  name: string;
  org_id: string;
  organization_name: string;
  plan_type: "fixed" | "custom" | "";
  status: number;
  updated_date: string;
  user_id: string;
  user_type: string;
  questions?: QuestionsEntity[] | null;
  __typename: string;
}
export interface QuestionsEntity {
  _id: string;
  created_date: string;
  plan_id: string;
  relapse_additional_details: string;
  relapse_ques: string;
  relapse_ques_status: number;
  relapse_ques_type: string;
  relapse_ques_typeoption?: string | null;
  updated_date: string;
  user_id: string;
  user_type: string;
  __typename: string;
}

export interface TherapistGetAdminRelapseListData {
  therapistGetAdminRelapseList?: TherapistGetAdminRelapseListEntity[] | null;
}

export interface TherapistGetAdminRelapseListEntity {
  _id: string;
  created_date: string;
  description: string;
  name: string;
  org_id: string;
  organization_name?: null;
  plan_type: string;
  status: number;
  updated_date: string;
  user_id: string;
  user_type: string;
  __typename: string;
}

export interface AdminUpdateRelapseByIdVars {
  planId: string;
  questions: string;
  updatePlan: UpdatePlan;
}

export interface UpdatePlan {
  org_id: string;
  name: string;
  plan_type: string;
  description: string;
  user_type?: string;
  status?: number;
}

export interface AdminDeleteRelapsePlanQsVars {
  questionId: string;
}
export interface AdminDeleteRelapsePlanQsRes {
  adminDeleteRelapsePlanQs: AdminDeleteRelapsePlanQs;
}
export interface AdminDeleteRelapsePlanQs {
  _id: string;
  status: number;
}

export interface GetPatientRelapsePlansRes {
  getPatientRelapsePlans: GetPatientRelapsePlan[];
}

export interface GetPatientRelapsePlan {
  _id: string;
  created_date: string;
  description: string;
  name: string;
  patient_id: string;
  plan_owner: string;
  plan_type: string;
  questions: any[];
  share_status: number;
  therapist_id: string;
  updated_date: string;
}
