export interface MonitoringProps {
  monitoringList?: MonitoringListApiData[];
}

export interface MonitoringListApiData {
  _id?: string;
  ca_cat_id?: string;
  ca_subcat_id?: string;
  created_date?: string;
  last_completed_date?: any;
  monitor_cat_id?: string;
  patient_id?: string;
  ptmon_frequency?: string;
  ptmon_name?: string;
  ptmon_status?: number;
  therapist_id?: string;
  __typename?: string;
}
