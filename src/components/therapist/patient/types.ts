export interface patientResourceListData {
  getPatResourceList?: GetPatResourceListEntity[] | null;
}
export interface GetPatResourceListEntity {
  _id: string;
  created_date: string;
  patient_id: string;
  patient_share_filename?: null;
  ptsharres_from: string;
  ptsharres_status: string;
  ptsharres_session: string;
  ptsharres_subfrom: string;
  resource_id: string;
  share_from: string;
  resource_upload?: null;
  template_id?: null;
  template_response?: null;
  updated_date?: null;
  download_patient_filename_url?: null;
  resource_data?: ResourceDataEntity[] | null;
  __typename: string;
}

export interface ResourceDataEntity {
  _id: string;
  created_date: string;
  disorder_id: string;
  download_resource_url?: null;
  template_data?: null;
  model_id: string;
  agenda_id: string;
  category_id: string;
  org_id: string;
  resource_avail_onlyme: string;
  resource_avail_therapist: string;
  resource_desc: string;
  resource_filename: string;
  resource_instruction: string;
  resource_isformualation: string;
  resource_issmartdraw: string;
  resource_name: string;
  resource_references: string;
  resource_returnurl: string;
  resource_session_no: string;
  resource_status: number;
  resource_type: number;
  resource_url: string;
  template_id?: null;
  updated_date: string;
  user_id: string;
  user_type: string;
  __typename: string;
}
