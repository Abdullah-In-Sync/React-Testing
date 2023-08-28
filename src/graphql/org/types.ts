export interface OrgData {
  getOrgByDomain: GetOrgByDomain;
}
export interface GetOrgByDomain {
  _id: string;
  contract: string;
  created_date: string;
  disorder_id: string;
  logo: string;
  logo_url: string;
  model_id: string;
  name: string;
  panel_color: string;
  patient: string;
  patient_plural: string;
  patient_welcome_email: string;
  side_menu_color: string;
  therapist: string;
  therapy: string;
  therapy_id: string;
}
