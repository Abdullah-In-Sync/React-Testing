import {
  LazyQueryExecFunction,
  OperationVariables,
  useLazyQuery,
} from "@apollo/client";
import {
  GET_TOKEN_DATA,
  GET_ADMIN_TOKEN_DATA,
} from "../../graphql/query/common";

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

export const buildTherapistTokenValidationQuery = (
  onCompleted: (therapistData: any) => void
): [LazyQueryExecFunction<any, OperationVariables>, boolean, any] => {
  const [gettokenData, { loading: tokenLoading, data: tokenData }] =
    useLazyQuery(GET_TOKEN_DATA, {
      onCompleted: async (data) => {
        /* istanbul ignore next */
        if (data.getTokenData) {
          const user_type: string = data!.getTokenData.user_type;
          /* istanbul ignore next */
          if (user_type != "therapist") {
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

export const buildAdminTokenValidationQuery = (
  onCompleted: (adminData: any) => void
): [LazyQueryExecFunction<any, OperationVariables>, boolean, any] => {
  const [gettokenData, { loading: tokenLoading, data: tokenData }] =
    useLazyQuery(GET_ADMIN_TOKEN_DATA, {
      onCompleted: async (data) => {
        /* istanbul ignore next */
        if (data.getTokenData) {
          const user_type: string = data!.getTokenData.user_type;
          /* istanbul ignore next */
          if (user_type != "admin") {
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
