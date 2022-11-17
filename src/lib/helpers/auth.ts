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

export const buildPatientTokenValidationQuery = (
  onCompleted: (patientData: any) => void
): [LazyQueryExecFunction<any, OperationVariables>, boolean, any] => {
  const [gettokenData, { loading: tokenLoading, data: tokenData }] =
    useLazyQuery(GET_TOKEN_DATA, {
      onCompleted: async (data) => {
        /* istanbul ignore next */
        if (data.getTokenData) {
          const user_type: string = data!.getTokenData.user_type;
          /* istanbul ignore next */
          if (user_type != "patient") {
            window.location.href =
              "https://" + window.location.hostname + "/account";
          } else {
            await onCompleted(data!.getTokenData);
          }
        }
      },
    });
  return [gettokenData, tokenLoading, tokenData];
};
