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

export interface AdminAssessmentViewQsData {
  adminAssessmentViewQs?: AdminAssessmentViewQsEntity[] | null | undefined;
}
export interface AdminAssessmentViewQsEntity {
  _id?: string;
  category_id?: string;
  question?: string;
}

export interface OrgList {
  _id: string;
  is_shared?: boolean;
  name?: string;
}

export interface GetOrganisationSharedList {
  getOrganisationSharedList: OrgList[];
}
