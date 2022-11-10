export type addResourceFormField = {
  resource_name: string;
  resource_type: number;
  disorder_id: string;
  model_id: string;
  category_id: string;
  resource_desc: string;
  resource_instruction: string;
  resource_references: string;
  agenda_id: string;
  file_name: string;
  resource_avail_admin: number;
  resource_avail_therapist: number;
  resource_avail_onlyme: number;
  resource_avail_all: number;
  uploadFile: File;
  uploadFileURL: string;
};

export type editResourceFormField = {
  _id: string;
  resource_name: string;
  resource_type: number;
  disorder_id: string;
  model_id: string;
  category_id: string;
  resource_desc: string;
  resource_instruction: string;
  resource_references: string;
  agenda_id: string;
  file_name: string;
  resource_avail_admin: number;
  resource_avail_therapist: number;
  resource_avail_onlyme: number;
  resource_avail_all: number;
  uploadFile?: File;
  uploadFileURL?: string;
  resource_url?: null;
  download_resource_url?: string;
  disorder_detail: string;
  model_detail: string;
};

export type patientProfileFormFeild = {
  _id: string;
  patient_contract: number;
  patient_employment: string;
  patient_firstname: string;
  patient_gender: string;
  patient_gpaddress: string;
  patient_gpaddressline2: string;
  patient_gpcity: string;
  patient_gpcontactno: string;
  patient_gpemailaddress: string;
  patient_gpname: string;
  patient_gppostalcode: string;
  patient_gpsurgeryname: string;
  patient_lang: string;
  patient_lastname: string;
  patient_marrital: string;
  patient_no: string;
  patient_sexuality: string;
  __typename: string;
};
