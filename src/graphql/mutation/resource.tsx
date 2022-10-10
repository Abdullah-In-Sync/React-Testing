import { gql } from "@apollo/client";

export const UPDATE_RESOURCE = gql`
  mutation ($ptsharresId: ID!, $update: UpdatePatientResourceInput) {
    updatePatientResourceById(ptsharresId: $ptsharresId, update: $update) {
      patient_share_filename
    }
  }
`;

export const ADMIN_CREATE_RESOURCE = gql`
  mutation MyMutation(
    $disorderId: String!
    $modelId: String!
    $resourceAvailAdmin: String!
    $resourceAvailAll: String!
    $resourceAvailOnlyme: String!
    $resourceAvailTherapist: String!
    $resourceFilename: String!
    $resourceName: String!
    $resourceType: String!
    $agendaId: String
    $categoryId: String
    $orgId: String
    $resourceDesc: String
    $resourceInstruction: String
    $resourceIsformualation: String
    $resourceIssmartdraw: String
    $resourceReferences: String
    $resourceStatus: Int
    $userType: String
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
      resourceStatus: $resourceStatus
      userType: $userType
    ) {
      _id
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
