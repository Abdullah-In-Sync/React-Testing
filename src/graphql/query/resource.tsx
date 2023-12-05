import { gql } from "@apollo/client";

export const GET_UPLOAD_RESOURCE_URL = gql`
  query MyQuery($fileName: String!) {
    getUploadResourceUrl(fileName: $fileName) {
      resource_upload
    }
  }
`;

export const GET_UPLOAD_LOGO_URL = gql`
  query MyQuery($fileName: String!, $imageFolder: String) {
    getFileUploadUrl(fileName: $fileName, imageFolder: $imageFolder) {
      upload_file_url
    }
  }
`;

export const GET_CATEGORY = gql`
  query GetCategoryByModelId($modelId: String) {
    getCategoryByModelId(modelId: $modelId) {
      _id
      category_name
    }
  }
`;

export const GET_DISORDER_MODEL_LIST = gql`
  query GetDisorderModelList {
    getDisorderModel {
      _id
      disorder_name
      disordermodel_data {
        _id
        model_name
        model_status
      }
    }
  }
`;

export const GET_UNAPPROVE_RESOURCE = gql`
  query GetAdminUnApproveResourceList {
    getAdminUnApproveResourceList {
      _id
      resource_name
      resource_desc
      user_id
      user_type
    }
  }
`;

export const GET_RESOURCE_DATA = gql`
  query GetResourceList(
    $modelId: String
    $disorderId: String
    $categoryId: String
    $resourceType: Int
    $myResource: Int
    $myFav: Int
    $searchText: String
    $orgId: String
  ) {
    getResourceList(
      modelId: $modelId
      disorderId: $disorderId
      categoryId: $categoryId
      resourceType: $resourceType
      myResource: $myResource
      myFav: $myFav
      searchText: $searchText
      orgId: $orgId
    ) {
      _id
      fav_res_detail {
        _id
        created_date
        resfav_status
        resource_id
        user_id
        user_type
      }
      resource_desc
      resource_name
      download_resource_url
      resource_url
      user_id
      user_type
    }
  }
`;

export const GET_PATIENT_RESOURCE_DATA = gql`
  query GetPatientResource {
    getPatientResourceList {
      data {
        _id
        created_date
        disorder_detail {
          _id
          disorder_name
          created_date
          disorder_status
          therapy_id
          user_id
          user_type
        }
        download_patient_filename_url
        model_detail {
          _id
          disorder_id
          created_date
          model_name
          model_status
          user_id
          user_type
        }
        patient_id
        patient_share_filename
        ptsharres_from
        ptsharres_session
        ptsharres_status
        ptsharres_subfrom
        resource_data {
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
          resource_returnurl
          resource_references
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
        resource_upload
        share_from
        template_detail {
          _id
          category
          component_name
          created_date
          name
          updated_date
        }
        template_id
        template_response
        updated_date
      }
      message
      result
    }
  }
`;

export const GET_TEMPLATE_LIST = gql`
  query ListTemplates {
    listTemplates {
      _id
      name
      component_name
      updated_date
      created_date
      category
    }
  }
`;

export const GET_PATIENT_APPOINTMENTS_LIST = gql`
  query getAppointmentsByPatientId {
    getAppointmentsByPatientId {
      _id
      app_attendee
      app_comments
      app_communication
      app_date
      app_finish
      app_no
      app_paystatus
      app_recurrence
      app_start
      app_status
      app_trackstatus
      app_type
      app_until
      app_untildate
      created_date
      patient_id
      requested_by
      therapist_data {
        _id
        accredited_body
        created_date
        hos_id
        hospital_admin_id
        org_id
        therapist_add
        therapist_inscover
        therapist_name
        therapist_no
        therapist_poa_attachment
        therapist_profaccredition
        therapist_specialization
        therapist_status
        therapist_totexp
        therapist_proofaccredition
        user_id
      }
      therapist_id
    }
  }
`;

export const GET_PATIENT_SAFETYPLAN_DETAIL_BY_ID = gql`
  query getPatientSafetyPlanList {
    getPatientSafetyPlanList {
      created_date
      _id
      patient_id
      safety_additional_details
      safety_ans_status
      safety_ans
      safety_ques
      safety_ques_id
      safety_ques_type
      safety_ques_typeoption
      therapist_id
      updated_date
    }
  }
`;

export const GET_PATIENT_SAFETY_PlANS = gql`
  query getPatientSafetyPlans {
    getPatientSafetyPlans {
      name
      description
      questions {
        _id
        patient_answer
        patient_id
        safety_ques
        safety_ques_type
        safety_ques_status
        safety_additional_details
      }
      _id
      share_status
    }
  }
`;

export const GET_PATIENT_RELAPSE_DETAIL_BY_ID = gql`
  query getPatientRelapseList {
    getPatientRelapseList {
      _id
      created_date
      order_by
      patient_id
      relapse_additional_details
      relapse_ans_detail {
        _id
        created_date
        relapse_ans
        patient_id
        relapse_ans_status
        relapse_ques_id
        therapist_id
        updated_date
      }
      relapse_ques
      relapse_ques_status
      updated_date
      user_type
    }
  }
`;

export const GET_PATIENT_HOME_DATA = gql`
  query getPatientHomeData {
    getPatientHomeData {
      appointment {
        _id
        app_finish
        app_start
        app_date
      }
    }
  }
`;
export const GET_PATIENT_RESOURCE_DETAIL = gql`
  query getResourceDetailById($ptsharresId: String!) {
    getResourceDetailById(ptsharresId: $ptsharresId) {
      data {
        _id
        created_date
        disorder_detail {
          _id
          created_date
          disorder_name
          disorder_status
          therapy_id
          user_id
          user_type
        }
        download_patient_filename_url
        model_detail {
          _id
          disorder_id
          created_date
          model_name
          model_status
          user_id
          user_type
        }
        patient_id
        patient_share_filename
        ptsharres_from
        ptsharres_session
        ptsharres_status
        ptsharres_subfrom
        resource_data {
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
        resource_upload
        share_from
        template_detail {
          _id
          category
          component_name
          created_date
          name
          updated_date
        }
        template_id
        template_response
        updated_date
      }
      message
      result
    }
  }
`;

export const GET_PATIENT_RESOURCE_TEMPLATE = gql`
  query getResourceDetailById($ptsharresId: String!) {
    getResourceDetailById(ptsharresId: $ptsharresId) {
      data {
        _id
        created_date
        disorder_detail {
          _id
          created_date
          disorder_name
          disorder_status
          therapy_id
          user_id
          user_type
        }
        download_patient_filename_url
        model_detail {
          _id
          disorder_id
          created_date
          model_name
          model_status
          user_id
          user_type
        }
        patient_id
        patient_share_filename
        ptsharres_from
        ptsharres_session
        ptsharres_status
        ptsharres_subfrom
        resource_data {
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
        resource_upload
        share_from
        template_detail {
          _id
          category
          component_name
          created_date
          name
          updated_date
        }
        template_id
        template_response
        updated_date
      }
      message
      result
    }
  }
`;

export const GET_RESOURCE_DETAIL = gql`
  query getResourceById($resourceId: String!) {
    getResourceById(resourceId: $resourceId) {
      _id
      agenda_id
      org_id
      resource_avail_onlyme
      resource_avail_therapist
      category_id
      resource_name
      resource_type
      resource_desc
      resource_instruction
      resource_references
      resource_filename
      resource_url
      download_resource_url
      resource_issmartdraw
      template_id
      template_data
      disorder_detail {
        _id
        disorder_name
      }
      model_detail {
        _id
        model_name
      }
      template_detail {
        component_name
        name
      }
    }
  }
`;

export const GET_FORMULATION_BY_ID = gql`
  query getFormulationById($formulation_id: String!) {
    getFormulationById(formulation_id: $formulation_id) {
      _id
      created_date
      download_formulation_url
      fav_for_detail {
        _id
        created_date
        forfav_status
        formulation_id
        updated_date
        user_id
      }
      formulation_avail_for
      formulation_desc
      formulation_img
      formulation_instruction
      formulation_name
      formulation_status
      formulation_type
      formulation_url
      org_id
      template_data
      template_id
      updated_date
      user_id
    }
  }
`;

export const GET_TEMPLATE_DETAIL = gql`
  query getTemplateById($templateId: String!) {
    getTemplateById(templateId: $templateId) {
      _id
      category
      component_name
      created_date
      name
      updated_date
    }
  }
`;

export const GET_PATIENT_LIST = gql`
  query therapistPatientList {
    therapistPatientList {
      _id
      patient_firstname
      patient_lastname
    }
  }
`;

export const GET_PATH_RESOURCE_BY_ID = gql`
  query getPatResourceById($patientId: String!, $resourceId: String!) {
    getPatResourceById(patientId: $patientId, resourceId: $resourceId) {
      ptsharres_session
      ptsharres_status
      created_date
      ptsharres_from
      ptsharres_subfrom
      share_from
      resource_upload
      patient_share_filename
      download_patient_filename_url
      template_id
      template_response
      _id
      resource_data {
        template_data
        template_id
        resource_name
        resource_issmartdraw
        resource_url
        download_resource_url
        resource_desc
        resource_instruction
        resource_references
      }
      template_detail {
        _id
        category
        component_name
      }
    }
  }
`;

export const GET_PATH_RESOURCE_LIST = gql`
  query getPatResourceList($patientId: String!) {
    getPatResourceList(patientId: $patientId) {
      _id
      created_date
      patient_id
      patient_share_filename
      ptsharres_from
      ptsharres_status
      ptsharres_session
      ptsharres_subfrom
      resource_id
      share_from
      resource_upload
      template_id
      template_response
      updated_date
      download_patient_filename_url
      resource_data {
        _id
        created_date
        disorder_id
        download_resource_url
        template_data
        model_id
        agenda_id
        category_id
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
        template_id
        updated_date
        user_id
        user_type
      }
    }
  }
`;
