export interface HomeworkListProps {
  homeworkList?: HomeworkListObject[];
  handleSubmit?: any;
  therapyData?: therapyData[];
  onChangeTherapy?: (v) => void;
}

export interface HomeworkListObject {
  pthomewrk_task?: string;
  therapy_id?: string;
  __typename?: string;
  pthomewrk_status?: number;
  pthomewrk_resp?: string;
  complete_status?: number | string;
  created_date?: string;
  patient_id?: string;
  pthomewrk_date?: string;
  _id?: string;
  resource_data?: object[];
  ptsharres_id?: string;
}

export interface therapyData {
  __typename?: string;
  risk_of_suicide?: number;
  pttherapy_session?: string;
  pttherapy_status?: 1;
  created_date?: string;
  therapist_id?: string;
  _id?: string;
  disorder_id?: string;
  model_id?: string;
  patient_id?: string;
  therapy_id?: string;
  therapy_detail?: {
    __typename?: string;
    _id?: string;
    created_date: string;
    org_id?: string;
    therapy_name?: string;
    therapy_status?: 1;
    user_id?: string;
    user_type?: string;
  };
  model_detail?: {
    __typename?: string;
    _id?: string;
    created_date?: string;
    disorder_id?: string;
    model_name?: string;
    model_status?: number;
    user_id?: string;
    user_type?: string;
  };
  disorder_detail?: {
    __typename?: string;
    _id?: string;
    created_date?: string;
    disorder_name?: string;
    disorder_status?: number;
    therapy_id?: string;
    user_id?: string;
    user_type?: string;
  };
}
