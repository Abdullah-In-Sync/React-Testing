export interface GetAdminSafetyPlan {
  data: Data;
}
export interface Data {
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
