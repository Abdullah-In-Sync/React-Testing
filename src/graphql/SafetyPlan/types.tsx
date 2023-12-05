export interface GetAdminSafetyPlan {
  data: GetAdminSafetyPlanData;
}
export interface GetAdminSafetyPlanData {
  getSafetyPlanList: GetSafetyPlanList;
}
export interface GetSafetyPlanList {
  total: number;
  data?: DataEntity[] | null;
}
export interface DataEntity {
  _id: string;
  created_date: string;
  description: string;
  name: string;
  organization_name: string;
  org_id: string;
  plan_type: string;
  status: number;
  updated_date: string;
  user_id: string;
  user_type: string;
}

export interface GetAdminRelapse {
  data: GetAdminRelapseData;
}
export interface GetAdminRelapseData {
  adminRelapsePlanList: GetRelapseList;
}
export interface GetRelapseList {
  total: number;
  data?: RelapseDataEntity[] | null;
}
export interface RelapseDataEntity {
  _id: string;
  created_date: string;
  description: string;
  name: string;
  organization_name: string;
  org_id: string;
  plan_type: string;
  status: number;
  updated_date: string;
  user_id: string;
  user_type: string;
}

export interface UpdateSafetyPlanByIDRes {
  updateSafetyPlanById: null;
}
export interface UpdateSafetyPlanByIdVars {
  planId: string;
  updatePlan: UpdatePlan;
}

export interface UpdatePlan {
  status: number;
}
export interface ViewSafetyPlan {
  data: ViewSafetyPlanData;
}
export interface ViewSafetyPlanData {
  viewSafetyPlanById: ViewSafetyPlanById;
}
export interface ViewSafetyPlanById {
  _id: string;
  created_date: string;
  description: string;
  name: string;
  org_id: string;
  plan_type: string;
  questions?: QuestionsEntity[] | null;
  status: number;
  updated_date: string;
  user_id: string;
  user_type: string;
  __typename: string;
}
export interface QuestionsEntity {
  _id: string;
  created_date: string;
  plan_id: string;
  patient_answer?: string;
  safety_additional_details: string;
  safety_ques: string;
  safety_ques_status: number;
  safety_ques_type: string;
  safety_ques_typeoption: string;
  updated_date: string;
  user_id: string;
  user_type: string;
  __typename: string;
}

export interface GetPatientSafetyPlansRes {
  getPatientSafetyPlans: { data: ViewSafetyPlanById[] };
}
