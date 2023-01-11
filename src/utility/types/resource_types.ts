export type addResourceFormField = {
  resource_name: string;
  resource_type: number;
  disorder_id: string;
  org_id: string;
  model_id: string;
  category_id: string;
  resource_desc: string;
  resource_instruction: string;
  resource_references: string;
  agenda_id: string;
  file_name: string;
  resource_avail_therapist: number;
  resource_avail_onlyme: number;
  uploadFile: File;
  uploadFileURL: string;
};

export type editResourceFormField = {
  _id: string;
  resource_name: string;
  resource_type: number;
  disorder_id: string;
  org_id: string;
  model_id: string;
  category_id: string;
  resource_desc: string;
  resource_instruction: string;
  resource_references: string;
  agenda_id: string;
  file_name: string;
  resource_avail_therapist: number;
  resource_avail_onlyme: number;
  uploadFile?: File;
  uploadFileURL?: string;
  resource_url?: null;
  download_resource_url?: string;
  disorder_detail: string;
  model_detail: string;
  template_id?: string;
  template_data?: string;
  resource_issmartdraw?: string;
};

export type addAndEditOrganizationFormFields = {
  _id?: string;
  contract?: string;
  created_date?: string;
  logo?: string;
  logo_url?: string;
  name?: string;
  panel_color?: string;
  patient?: string;
  patient_plural?: string;
  patient_welcome_email?: string;
  side_menu_color?: string;
  therapist?: string;
  therapy?: string;
  file_name?: string;
};

export type editTemplatesFormField = {
  _id: string;
  category: string;
  name: string;
};
export type viewTemplatesFormField = {
  _id: string;
  category: string;
  name: string;
  component_name: string;
};

export type editSafetyPlanFormField = {
  _id: string;
  safety_ans: string;
  safety_ques: string;
  patient_id: string;
  safety_additional_details: string;
  safety_ans_status: string;
  safety_ques_id: string;
  safety_ques_type: string;
  safety_ques_typeoption: string;
  therapist_id: string;
  updated_date: string;
};

export type editRelapseFormField = {
  _id: string;
  relapse_ans: string;
  relapse_ques: string;
  relapse_ques_id: string;
};

export type cancleAppointmentPatientHome = {
  _id: string;
};
export type editGoalsFormField = {
  _id: string;
  created_date: string;
  patient_id: string;
  ptgoal_achievementdate: string;
  ptgoal_achievementgoal: string;
  ptgoal_audio: string;
  ptgoal_file: string;
  ptgoal_mygoal: string;
  ptgoal_pregoal: string;
  ptgoal_reviewdate: string;
  ptgoal_status: string;
  ptgoal_success: string;
  ptsession_id: string;
  pttherapy_id: string;
  therapist_id: string;
  updated_date: string;
};

export type patientAgreementFormFeild = {
  _id: string;
  patient_contract: number;
  patient_consent: number;
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
  patient_agree: number;
  patient_sexuality: string;
  __typename: string;
  addressline2: string;
  addressline1: string;
  birthdate: string;
  created_date: string;
  email: string;
  home_no: string;
  hos_id: string;
  kin_addressline1: string;
  kin_addressline2: string;
  kin_city: string;
  kin_contact_no: string;
  kin_email_address: string;
  kin_postal: string;
  kin_name: string;
  kin_relationship: string;
  nhsno: string;
  patient_consent: number;
  patient_availability: string;
  org_id: string;
  city: string;
  religion: string;
  patient_status: string;
  phone_number: string;
  postal_code: string;
};

export type patientEditProfileFormFeild = {
  _id: string;
  birthdate: string;
  patient_consent: number;
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
  //

  patient_status: string;
  patient_availability: string;
  email: string;
  phone_number: string;
  postal_code: string;
  kin_contact_no: string;
  kin_city: string;
  kin_postal: string;
  addressline2: string;
  addressline1: string;
  kin_addressline2: string;
  kin_addressline1: string;
  kin_relationship: string;
  nhsno: string;
  home_no: string;
  kin_email_address: string;
  kin_name: string;
  city: string;
  religion: string;
};
