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
  therapistGetPatientAssessment: TherapistGetPatientAssessment | undefined;
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
