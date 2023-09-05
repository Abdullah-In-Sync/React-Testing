export interface CategoryAdminData {
  getAdminCategoryList: GetAdminCategoryList;
}
export interface GetAdminCategoryList {
  total: number;
  data?: DataEntity[] | null;
}
export interface DataEntity {
  _id: string;
  category_name: string;
  category_status: number;
  created_date: string;
  disorder_detail?: DisorderDetailEntity[] | null;
  disorder_id: string;
  model_detail?: ModelDetailEntity[] | null;
  model_id: string;
  updated_date?: string | null;
  user_id: string;
  user_type: string;
  therapy_detail?: TherapyDetailEntity[] | null;
}
export interface DisorderDetailEntity {
  _id: string;
  created_date: string;
  disorder_name: string;
  disorder_status: number;
  therapy_id: string;
  user_id: string;
  user_type: string;
}
export interface ModelDetailEntity {
  _id: string;
  created_date: string;
  disorder_id: string;
  model_name: string;
  model_status: number;
  updated_date?: string | null;
  user_id: string;
  user_type: string;
}
export interface TherapyDetailEntity {
  _id: string;
  created_date: string;
  org_id: string;
  therapy_name: string;
  therapy_status: number;
  updated_date?: null;
  user_id: string;
  user_type: string;
}
