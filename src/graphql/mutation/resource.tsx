import { gql } from "@apollo/client";

export const UPDATE_RESOURCE = gql`
  mutation ($ptsharresId: ID!, $update: UpdatePatientResourceInput) {
    updatePatientResourceById(ptsharresId: $ptsharresId, update: $update) {
      patient_share_filename
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

export const UPDATE_RESOURCE_TEMPLATE_RESPONSE = gql`
  mutation ($ptsharresId: ID!, $update: UpdatePatientResourceInput!) {
    updatePatientResourceById(ptsharresId: $ptsharresId, update: $update) {
      template_response
      _id
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
      template_response
      _id
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
      deleted
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
