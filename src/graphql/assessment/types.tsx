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
  adminAssessmentViewQs: AdminAssessmentViewQsEntity[] | null;
}
export interface AdminAssessmentViewQsEntity {
  _id?: string;
  category_id?: string;
  question?: string;
}

export interface TherapistGetPatientAssessmentData {
  therapistGetPatientAssessment: {
    data: TherapistGetPatientAssessment | undefined;
  };
}

export interface TherapistGetPatientAssessment {
  risk: string;
  overall_assesment_text: string;
  list?: ListEntity[] | null;
  therapies?: TherapiesEntity[] | null;
  __typename: string;
}

export interface ListEntity {
  name: string;
  _id: string;
  __typename: string;
}

export interface TherapiesEntity {
  _id: string;
  pttherapy_session: string;
  pttherapy_status: number;
  __typename: string;
}

export interface GetRisksListData {
  getRisksList?: GetRisksListEntity[] | null;
}
export interface GetRisksListEntity {
  _id: string;
  name: string;
  status: number;
  __typename: string;
}

export interface OrgList {
  _id: string;
  is_shared?: boolean;
  name?: string;
}

export interface GetOrganisationSharedList {
  getOrganisationSharedList: OrgList[];
}

export interface TherapistviewAssessmentData {
  therapistviewAssessment: { data: TherapistviewAssessment };
}
export interface TherapistviewAssessment {
  _id: string;
  name: string;
  patient_id: string;
  status: number;
  updated_date: string;
  category?: CategoryEntity[] | null;
}
export interface CategoryEntity {
  _id: string;
  assessment_id: string;
  name: string;
  patient_id: string;
  share_status: number;
  status: number;
}

export interface TherapistViewAssessmentQuestionsData {
  therapistviewAssessmentQs?: {
    data: TherapistviewAssessmentQsEntity[] | null;
  };
}
export interface TherapistviewAssessmentQsEntity {
  _id: string;
  added_by: string;
  answer: string;
  category_id: string;
  created_date: string;
  patient_id: string;
  question: string;
  status: number;
  __typename: string;
}
