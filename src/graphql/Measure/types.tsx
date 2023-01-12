// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetPatientMeasureListVars {}

export interface GetPatientMeasureListRes {
  getPatientMeasureList: Measure[];
}

export interface Measure {
  user_type: string;
  user_id: string;
  therapist_id: string;
  status: number;
  patient_id: string;
  measure_cat_type: number;
  measure_cat_name: string;
  last_completed_date?: string;
  is_default: number;
  created_date: string;
  current_score: string;
  _id: string;
}

export interface GetMeasureDetailByPatientVars {
  measureCatId: string;
}

export interface GetMeasureDetailByPatientRes {
  getMeasureDetailByPatient: MeasureDetail[];
}

export interface MeasureDetail {
  _id: string;
  measure_cat_id: string;
  measure_cat_ques: string;
  measure_cat_ques_type: number;
  notatall?: number;
  severaldays?: number;
  halfthedays?: number;
  everyday?: number;
}

export interface UpdateMeasureScoreByPatientVars {
  measureCatId: string;
  patmscore_notatall_value: number;
  patmscore_severaldays_value: number;
  patmscore_halfthedays_value: number;
  patmscore_everyday_value: number;
  patmscore_value: number;
  patmscore_difficult: number;
  qdata: string;
}

export interface UpdateMeasureScoreByPatientRes {
  updateMeasureScoreByPatient: MeasureDetail[];
}

export interface ViewMeasureScoreByPatientVars {
  measureCatId: string;
}

export interface ViewMeasureScoreByPatientRes {
  viewMeasureScoreByPatient: ViewMeasureScoreByPatient;
}

export interface ViewMeasureScoreByPatient {
  scale_data: string[];
  score_data: ScoreDatum[];
}

export interface ScoreDatum {
  created_date: string;
  _id: string;
  patmscore_value: string;
}

// viewMeasureResponse
export interface ViewMeasureScoreResponseVar {
  patScoreId: string;
}

export interface ViewMeasureScoreResponse {
  viewMeasureResponse: ViewMeasureResponse[];
}

export interface ViewMeasureResponse {
  created_date: string;
  measure_cat_id: string;
  patient_id: string;
  patmscore_difficult: string;
  patmscore_everyday_value: string;
  patmscore_halfthedays_value: string;
  patmscore_severaldays_value: string;
  patmscore_notatall_value: string;
  patmscore_status: number;
  patmscore_value: string;
  _id: string;
  patientmeasurequestion: Patientmeasurequestion;
}

export interface Patientmeasurequestion {
  measure_cat_ques_id: string;
  patmques_everyday: number;
  measure_cat_id: string;
  patmques_ques: string;
  patmques_halfthedays: number;
  patmques_severaldays: number;
  patmques_notatall: number;
}
