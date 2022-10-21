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
    $disorderId: String!
    $modelId: String!
    $resourceAvailAdmin: String!
    $resourceAvailAll: String!
    $resourceAvailOnlyme: String!
    $resourceAvailTherapist: String!
    $resourceFilename: String!
    $resourceName: String!
    $resourceType: Int!
    $agendaId: String
    $categoryId: String
    $orgId: String
    $resourceDesc: String
    $resourceInstruction: String
    $resourceIsformualation: String
    $resourceIssmartdraw: String
    $resourceReferences: String
  ) {
    createResource(
      disorderId: $disorderId
      modelId: $modelId
      resourceAvailAdmin: $resourceAvailAdmin
      resourceAvailAll: $resourceAvailAll
      resourceAvailOnlyme: $resourceAvailOnlyme
      resourceAvailTherapist: $resourceAvailTherapist
      resourceFilename: $resourceFilename
      resourceName: $resourceName
      resourceType: $resourceType
      agendaId: $agendaId
      categoryId: $categoryId
      orgId: $orgId
      resourceDesc: $resourceDesc
      resourceInstruction: $resourceInstruction
      resourceIsformualation: $resourceIsformualation
      resourceIssmartdraw: $resourceIssmartdraw
      resourceReferences: $resourceReferences
    ) {
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
      resource_avail_admin
      resource_avail_therapist
      resource_avail_onlyme
      resource_avail_all
      resource_filename
      resource_status
      created_date
      resource_returnurl
      download_resource_url
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
