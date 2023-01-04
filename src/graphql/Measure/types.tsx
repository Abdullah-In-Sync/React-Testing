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
