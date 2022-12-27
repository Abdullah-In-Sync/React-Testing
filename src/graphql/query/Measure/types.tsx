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
  _id: string;
}
