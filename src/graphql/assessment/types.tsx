export interface AssessmentViewData {
  adminViewAssessment: AdminViewAssessment | null;
}
export interface AdminViewAssessment {
  _id: string;
  category?: Category[] | null;
  created_date: string;
  name: string;
  org_id: string;
}

export interface Category {
  _id?: string;
  name?: string;
}
