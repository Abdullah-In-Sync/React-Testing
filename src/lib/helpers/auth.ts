import {
  LazyQueryExecFunction,
  OperationVariables,
  useLazyQuery,
} from "@apollo/client";
import { GET_TOKEN_DATA } from "../../graphql/query/common";

export const buildPatientTokenValidationQuery = (
  onCompleted: (therapistId: string) => void
): [LazyQueryExecFunction<any, OperationVariables>, boolean, any] => {
  const [gettokenData, { loading: tokenLoading, data: tokenData }] =
    useLazyQuery(GET_TOKEN_DATA, {
      onCompleted: async (data) => {
        /* istanbul ignore next */
        if (data.getTokenData) {
          let user_type: string = data!.getTokenData.user_type;
          user_type = user_type.replace("[", "");
          user_type = user_type.replace("]", "");
          /* istanbul ignore else */
          if (user_type != "patient") {
            window.location.href =
              "https://" + window.location.hostname + "/account";
          } else {
            await onCompleted(data!.getTokenData.patient_data.therapist_id);
          }
        }
      },
    });
  return [gettokenData, tokenLoading, tokenData];
};
