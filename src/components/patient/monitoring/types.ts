export interface MonitoringProps {
  monitoringList?: ApiMonitoringListData[];
  completeData?: ApiCompleteData[];
  viewResponseButtonClick?: (v) => void;
  completeButtonClick?: (v) => void;
  onSubmit?: any;
  backPress?: () => void;
  nextPress?: () => void;
}

export interface ApiMonitoringListData {
  _id?: string;
  ca_cat_id?: string;
  ca_subcat_id?: string;
  monitor_cat_id?: string;
  patient_id?: string;
  ptmon_frequency?: string;
  ptmon_name?: string;
  ptmon_status?: number;
  therapist_id?: string;
  __typename?: string;
}
export interface ApiCompleteData {
  __typename?: string;
  _id?: string;
  created_date?: string;
  emoji_ids?: string;
  patient_id?: string;
  ptmon_ans?: null;
  ptmon_id?: string;
  ptmonques_listtype?: string;
  ptmonques_question?: string;
  ptmonques_scalecaption?: string;
  ptmonques_scalepoint?: string;
  ptmonques_status?: number;
  ptmonques_type?: number;
  therapist_id?: string;
}
