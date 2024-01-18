import { gql } from "@apollo/client";

export const UPDATE_RESOURCE = gql`
  mutation ($ptsharresId: ID!, $update: UpdatePatientResourceInput) {
    updatePatientResourceById(ptsharresId: $ptsharresId, update: $update) {
      message
      result
    }
  }
`;

export const CREATE_RESOURCE = gql`
  mutation MyMutation(
    $agendaId: String
    $categoryId: String
    $disorderId: String!
    $modelId: String!
    $resourceAvailOnlyme: String!
    $resourceAvailTherapist: String!
    $resourceFilename: String!
    $resourceName: String!
    $resourceType: Int!
    $resourceDesc: String
    $resourceInstruction: String
    $resourceIsformualation: String
    $resourceIssmartdraw: String
    $resourceReferences: String
    $templateData: String
    $templateId: String
    $orgId: String!
  ) {
    createResource(
      disorderId: $disorderId
      modelId: $modelId
      resourceAvailOnlyme: $resourceAvailOnlyme
      resourceAvailTherapist: $resourceAvailTherapist
      resourceFilename: $resourceFilename
      resourceName: $resourceName
      resourceType: $resourceType
      agendaId: $agendaId
      categoryId: $categoryId
      resourceDesc: $resourceDesc
      resourceInstruction: $resourceInstruction
      resourceIsformualation: $resourceIsformualation
      resourceIssmartdraw: $resourceIssmartdraw
      resourceReferences: $resourceReferences
      templateData: $templateData
      templateId: $templateId
      orgId: $orgId
    ) {
      duplicateNames {
        _id
        name
      }
      result
    }
  }
`;

export const ADD_AGENDA = gql`
  mutation MyMutation(
    $agenda_name: String!
    $disorder_id: String!
    $display_order: Int
    $model_id: String!
    $session: String!
    $therapy_id: String!
    $org_id: String
  ) {
    createAdminAgenda(
      agenda_name: $agenda_name
      disorder_id: $disorder_id
      display_order: $display_order
      model_id: $model_id
      session: $session
      therapy_id: $therapy_id
      org_id: $org_id
    ) {
      message
      result
    }
  }
`;

export const ADMIN_UPDATE_AGENDA_BY_ID = gql`
  mutation updateAdminAgendaById(
    $agenda_id: String!
    $updateAgenda: UpdateAgendaInput
  ) {
    updateAdminAgendaById(agenda_id: $agenda_id, updateAgenda: $updateAgenda) {
      _id
      agenda_name
      agenda_session_detail {
        _id
        agenda_id
        created_date
        display_order
        session_id
        updated_date
      }
      agenda_status
      created_date
      disorder_id
      org_id
      model_id
      session
      therapy_id
      user_id
      user_type
    }
  }
`;

export const CREATE_FORMULATION = gql`
  mutation CreateFormulation(
    $resourceName: String!
    $formulationType: Int!
    $orgId: String!
    $resourceDesc: String
    $resourceInstruction: String
    $formulationAvailFor: String
    $templateData: String
    $templateId: String
  ) {
    createFormulation(
      formulation_name: $resourceName
      formulation_type: $formulationType
      org_id: $orgId
      formulation_desc: $resourceDesc
      formulation_instruction: $resourceInstruction
      formulation_avail_for: $formulationAvailFor
      template_data: $templateData
      template_id: $templateId
    ) {
      duplicateNames {
        _id
        name
      }
      message
      result
    }
  }
`;

export const UPDATE_RESOURCE_TEMPLATE_RESPONSE = gql`
  mutation ($ptsharresId: ID!, $update: UpdatePatientResourceInput!) {
    updatePatientResourceById(ptsharresId: $ptsharresId, update: $update) {
      message
      result
    }
  }
`;

export const THERAPIST_UPDATE_RESOURCE_TEMPLATE_RESPONSE = gql`
  mutation (
    $ptsharresId: ID!
    $patientId: String
    $update: UpdatePatientResourceInput!
  ) {
    updatePatientResourceById(
      ptsharresId: $ptsharresId
      patient_id: $patientId
      update: $update
    ) {
      message
      result
    }
  }
`;

export const UPDATE_RESOURCE_BY_ID = gql`
  mutation ($resourceId: ID!, $update: UpdateResourceInput!) {
    updateResourceById(resourceId: $resourceId, update: $update) {
      user_id
      user_type
      resource_name
      resource_type
      resource_issmartdraw
      resource_isformualation
      disorder_id
      model_id
      category_id
      org_id
      resource_desc
      resource_instruction
      resource_references
      resource_session_no
      agenda_id
      resource_url
      resource_avail_therapist
      resource_avail_onlyme
      resource_filename
      resource_status
      created_date
      resource_returnurl
      download_resource_url
      template_data
    }
  }
`;

export const UPDATE_TEMPLATE_BY_ID = gql`
  mutation ($templateId: ID!, $update: UpdateTemplateInput) {
    updateTemplateById(templateId: $templateId, update: $update) {
      name
      category
    }
  }
`;

export const ADD_FAVOURITE = gql`
  mutation MyMutation($resourceId: String!) {
    addFavouriteResource(resourceId: $resourceId) {
      resourceId
    }
  }
`;

export const DELETE_RESOURCE = gql`
  mutation ($resourceId: String!) {
    deleteResource(resourceId: $resourceId) {
      message
      result
    }
  }
`;

export const REMOVE_FAVOURITE = gql`
  mutation ($resfavId: String!) {
    deleteFavouriteResource(resfavId: $resfavId) {
      deleted
    }
  }
`;

export const APPROVE_RESOURCE = gql`
  mutation ($resourceId: String!) {
    adminApproveResourceById(resourceId: $resourceId) {
      _id
      resource_status
    }
  }
`;

export const SHARE_RESOURCE = gql`
  mutation ($resourceId: String!, $patientId: String!) {
    therapistShareResource(resourceId: $resourceId, patientId: $patientId) {
      result
    }
  }
`;
export const CREATE_RESOURCE_FORMULATION = gql`
  mutation MyMutation(
    $formulation_name: String!
    $formulation_filename: String!
    $formulation_type: Int!
    $org_id: String!
    $formulation_avail_for: String
    $formulation_desc: String
    $formulation_instruction: String
  ) {
    createFormulation(
      formulation_name: $formulation_name
      formulation_filename: $formulation_filename
      formulation_type: $formulation_type
      org_id: $org_id
      formulation_avail_for: $formulation_avail_for
      formulation_desc: $formulation_desc
      formulation_instruction: $formulation_instruction
    ) {
      duplicateNames {
        _id
        name
      }
      message
      result
    }
  }
`;

export const ADD_PATIENT_FILE = gql`
  mutation MyMutation(
    $file_name: String!
    $patient_id: String!
    $title: String!
    $description: String
    $is_private: Int
  ) {
    addPatientFile(
      file_name: $file_name
      patient_id: $patient_id
      title: $title
      description: $description
      is_private: $is_private
    ) {
      message
      result
    }
  }
`;

export const GET_THERAPIST_FILE_LIST = gql`
  query getPatientFileListByTherapist(
    $patient_id: String!
    $search_text: String
  ) {
    getPatientFileListByTherapist(
      patient_id: $patient_id
      search_text: $search_text
    ) {
      data {
        _id
        added_by
        created_date
        description
        download_file_url
        file_name
        file_url
        patient_id
        share_status
        status
        title
        updated_date
      }
    }
  }
`;

export const DELETE_THERAPIST_FILE = gql`
  mutation MyMutation($file_id: String!, $update: BulkUpdatePatientFileInput) {
    bulkUpdatePatientFile(file_id: $file_id, update: $update) {
      message
      result
    }
  }
`;

export const UPDATE_PATIENT_FILE = gql`
  mutation MyMutation(
    $file_id: String!
    $patient_id: String!
    $update: UpdatePatientFileInput
  ) {
    updatePatientFile(
      file_id: $file_id
      patient_id: $patient_id
      update: $update
    ) {
      message
      result
    }
  }
`;
