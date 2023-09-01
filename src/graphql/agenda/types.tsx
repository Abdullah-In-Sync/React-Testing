export interface AgendaDetailEntity {
  _id: string;
  agenda_name: string;
  created_date: string;
}

export interface TherapistDetailEntity {
  _id: string;
  therapy_name: string;
}

export interface AgendaListEntity {
  _id: string;
  session_id: string;
  display_order: string;
  agenda_detail: AgendaDetailEntity;
  therapy_detail: TherapistDetailEntity;
}
export interface GetAdminAgendaListEntity {
  agendalist: AgendaListEntity[] | null;
  total: number;
}
export interface GetAdminAgendaListData {
  getAdminAgendaList: GetAdminAgendaListEntity;
}

export interface GetAdminAgendaList {
  data?: GetAdminAgendaListData;
}
