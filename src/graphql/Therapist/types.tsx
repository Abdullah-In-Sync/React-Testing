export interface MasterData {
  getMasterData?: GetMasterDataEntity[] | null;
}
export interface GetMasterDataEntity {
  _id: string;
  display_name: string;
  name: string;
}

export interface TherapistListData {
  getTherapistList: GetTherapistList;
}
export interface GetTherapistList {
  pagination: string;
  therapistlist?: TherapistlistEntity[] | null;
}
export interface TherapistlistEntity {
  name: string;
  email: string;
  phone_number: string;
  specialization: string;
  therapist_id: string;
  user_id: string;
  therapist_status?: number;
}

export interface TherapistData {
  getTherapistById: GetTherapistById;
}
export interface GetTherapistById {
  user_id: string;
  therapist_proofaccredition?: null;
  therapist_totexp: string;
  therapist_status: number;
  therapist_profaccredition?: null;
  therapist_poa_attachment: string;
  therapist_no?: null;
  therapist_name: string;
  _id: string;
  accredited_body: string;
  created_date: string;
  hos_id?: null;
  hospital_admin_id?: null;
  org_id: string;
  poa_url: string;
  therapist_add?: null;
  therapist_inscover: string;
  therapist_specialization: string;
  email: string;
  phone_number: string;
  plan: string;
  trial_period?: string;
}
