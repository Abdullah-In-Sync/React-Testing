export interface GetFormulationListVars {
  my_fav: number;
  my_formulation: number;
  search_text: string;
}

export interface FavForDetails {
  user_id: string;
  _id: string;
  created_date: string;
  forfav_status: number;
  formulation_id: string;
  updated_date: string;
}

export interface GetFormulation {
  _id: string;
  created_date: string;
  formulation_name: string;
  formulation_type: string;
  fav_for_detail: FavForDetails[];
  formulation_avail_for: string;
  formulation_desc: string;
  formulation_img: string;
  formulation_instruction: string;
  formulation_returnurl: string;
  formulation_status: number;
  updated_date: string;
  user_id: string;
}

export interface GetFormulationList {
  getFormulationList: GetFormulation[];
}

export interface FormulationData {
  getFormulationById: GetFormulationById;
}
export interface GetFormulationById {
  fav_for_detail?: null;
  formulation_avail_for: string;
  formulation_desc: string;
  formulation_img: string;
  formulation_instruction: string;
  formulation_name: string;
  formulation_status: number;
  formulation_type: number;
  formulation_url?: null;
  org_id: string;
  template_data: string;
  template_id: string;
  user_id: string;
  _id: string;
  download_formulation_url?: null;
}

export interface UpdateFormulationData {
  updateFormulationById: UpdateFormulationById;
}
export interface UpdateFormulationById {
  _id: string;
}
