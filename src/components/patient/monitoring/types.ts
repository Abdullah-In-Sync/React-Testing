export interface MonitoringProps {
  monitoringList?: ApiMonitoringListData[];
  viewResponseData?: any; //ApiViewResponseData[];
  completeData?: ApiCompleteData[];
  viewResponseButtonClick?: (v) => void;
  completeButtonClick?: (v) => void;
  onSubmit?: any;
  backPress?: () => void;
  nextPress?: () => void;
  onGoButton?: (v) => void;
  initialDate?: string;
  view?: string;
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

export interface ApiViewResponseData {
  __typename: string;
  _id: string;
  created_date: string;
  emoji_ids: string;
  patient_id: string;
  ptmon_ans: string;
  ptmon_id: string;
  ptmonques_id: string;
  ptmonques_listtype: string;
  ptmonques_question: string;
  ptmonques_scalecaption: string;
  ptmonques_scalepoint: string;
  ptmonques_status: number;
  ptmonques_type: number;
  ptmonqueslog_by: string;
  therapist_id: string;
}
export interface emojisData {
  _id: string;
  emoji_url: string;
  emoji_caption: string;
  color: string;
}

export interface chartData {
  labels?: Array<string>;
  datasets?: {
    label?: string;
    data?: Array<any>;
    backgroundColor?: Array<any> | string;
    borderColor?: Array<any> | string;
    borderWidth?: number;
    fill?: boolean;
  }[];
}
