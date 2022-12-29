import { gql } from "@apollo/client";

export const GET_UPLOAD_RESOURCE_URL = gql`
  query MyQuery($fileName: String!) {
    getUploadResourceUrl(fileName: $fileName) {
      resource_upload
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
      _id
      ptsharres_session
      created_date
      patient_share_filename
      download_patient_filename_url
      resource_data {
        resource_name
        resource_type
        resource_url
        download_resource_url
        resource_issmartdraw
      }
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
      _id
      ptsharres_session
      ptsharres_status
      created_date
      ptsharres_from
      ptsharres_subfrom
      share_from
      resource_upload
      patient_share_filename
      download_patient_filename_url
      patient_id
      resource_id
      resource_data {
        resource_name
        resource_type
        resource_desc
        resource_instruction
        resource_references
        resource_filename
        resource_url
        download_resource_url
        resource_issmartdraw
      }
      disorder_detail {
        _id
        disorder_name
      }
      model_detail {
        _id
        model_name
      }
    }
  }
`;

export const GET_PATIENT_RESOURCE_TEMPLATE = gql`
  query getResourceDetailById($ptsharresId: String!) {
    getResourceDetailById(ptsharresId: $ptsharresId) {
      created_date
      resource_data {
        template_data
        resource_issmartdraw
        resource_name
        resource_type
        template_id
      }
      template_detail {
        component_name
        category
        _id
        name
      }
      template_response
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
      }
      template_detail {
        _id
        category
        component_name
      }
    }
  }
`;