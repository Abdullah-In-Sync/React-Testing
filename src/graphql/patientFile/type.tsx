export interface PaitentFileListData {
  getPatientFileList?: GetPatientFileListEntity[] | null;
}
export interface GetPatientFileListEntity {
  _id: string;
  added_by: string;
  created_date: string;
  description: string;
  download_file_url: string;
  file_name: string;
  file_url: string;
  patient_id: string;
  share_status: number;
  status: number;
  title: string;
  updated_date: string;
}
