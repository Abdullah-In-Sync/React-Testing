import { gql } from "@apollo/client";

export const GET_THERAPIST_HOMEWORK = gql`
  query therapistViewPatientHomework(
    $patient_id: String!
    $ptsession_id: String!
    $ptsession_no: Int!
    $pttherapy_id: String!
  ) {
    therapistViewPatientHomework(
      patient_id: $patient_id
      ptsession_id: $ptsession_id
      ptsession_no: $ptsession_no
      pttherapy_id: $pttherapy_id
    ) {
      homework_detail {
        _id
        complete_status
        created_date
        patient_id
        pthomewrk_date
        pthomewrk_resp
        pthomewrk_status
        pthomewrk_task
        ptsession_id
        ptsharres_id
        resource_detail {
          _id
          agenda_id
          category_id
          created_date
          disorder_id
          download_resource_url
          model_id
          org_id
          resource_avail_onlyme
          resource_avail_therapist
          resource_desc
          resource_filename
          resource_instruction
          resource_isformualation
          resource_issmartdraw
          resource_name
          resource_references
          resource_returnurl
          resource_session_no
          resource_status
          resource_type
          resource_url
          template_data
          template_id
          updated_date
          user_id
          user_type
        }
        resource_id
        therapist_id
        therapist_resp
        therapy_id
      }
      last_homework_count {
        _id
        count
      }
      last_homework_list {
        _id
        complete_status
        created_date
        patient_id
        pthomewrk_date
        pthomewrk_resp
        pthomewrk_status
        pthomewrk_task
        ptsession_id
        ptsharres_id
        resource_detail {
          _id
          agenda_id
          category_id
          created_date
          disorder_id
          download_resource_url
          model_id
          org_id
          resource_avail_onlyme
          resource_avail_therapist
          resource_desc
          resource_filename
          resource_instruction
          resource_isformualation
          resource_issmartdraw
          resource_name
          resource_references
          resource_returnurl
          resource_session_no
          resource_status
          resource_type
          resource_url
          template_data
          template_id
          updated_date
          user_id
          user_type
        }
        resource_id
        therapist_id
        therapist_resp
        therapy_id
      }
    }
  }
`;

export const GET_THERAPIST_HOMEWORK_OLD_SESSION_DATA = gql`
  query getPatientHomeworkData(
    $patient_id: String!
    $ptsession_id: String!
    $therapy_id: String!
  ) {
    getPatientHomeworkData(
      patient_id: $patient_id
      ptsession_id: $ptsession_id
      therapy_id: $therapy_id
    ) {
      _id
      complete_status
      created_date
      patient_id
      pthomewrk_date
      pthomewrk_resp
      pthomewrk_status
      pthomewrk_task
      ptsession_id
      ptshareres_id
      resource_id
      resource_name
      resource_url
      therapist_id
      therapist_resp
      therapy_id
    }
  }
`;

export const GET_POPUP_RESOURCE_LIST_DATA = gql`
  query getPopupResourceList(
    $disorderId: String
    $modelId: String
    $myFav: Int
    $myResource: Int
    $orgId: String
    $searchText: String
    $therapyId: String
  ) {
    getPopupResourceList(
      disorderId: $disorderId
      modelId: $modelId
      myFav: $myFav
      myResource: $myResource
      orgId: $orgId
      searchText: $searchText
      therapyId: $therapyId
    ) {
      _id
      agenda_id
      category_id
      created_date
      disorder_id
      download_resource_url
      fav_res_detail {
        _id
        created_date
        resfav_status
        resource_id
        user_id
        user_type
      }
      model_id
      org_id
      resource_avail_onlyme
      resource_avail_therapist
      resource_desc
      resource_instruction
      resource_isformualation
      resource_issmartdraw
      resource_name
      resource_references
      resource_returnurl
      resource_session_no
      resource_status
      resource_type
      resource_url
      updated_date
      user_id
      user_type
    }
  }
`;
