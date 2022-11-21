import {
  ApolloError,
  LazyQueryExecFunction,
  OperationVariables,
  useLazyQuery,
} from "@apollo/client";
import {
  GET_TOKEN_DATA,
  GET_THERAPIST_TOKEN_DATA,
  GET_ADMIN_TOKEN_DATA,
} from "../../graphql/query/common";

export const localTokenValidation = (
  userType: "admin" | "patient" | "therapist"
): [
  LazyQueryExecFunction<any, OperationVariables>,
  boolean,
  any,
  ApolloError
] => {
  const tokenValidationQuery = {
    admin: GET_ADMIN_TOKEN_DATA,
    patient: GET_TOKEN_DATA,
    therapist: GET_THERAPIST_TOKEN_DATA,
  };
  const [
    getTokenData,
    { loading: tokenLoading, data: tokenData, error: tokenError },
  ] = useLazyQuery(userType ? tokenValidationQuery[userType] : GET_TOKEN_DATA);
  return [getTokenData, tokenLoading, tokenData, tokenError];
};
