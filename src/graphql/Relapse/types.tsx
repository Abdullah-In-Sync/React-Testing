export interface UpdatePlan {
  status: number;
}

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
