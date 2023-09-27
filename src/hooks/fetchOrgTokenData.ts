import { useLazyQuery, useQuery } from "@apollo/client";

import { defaultOrgName, tokenValidationQuery } from "../lib/constants";
import { getOrgNameFromCurrentUrl } from "../utility/helper";
import { GET_ORG_PUBLIC_DATA } from "../graphql/org/graphql";

/* istanbul ignore next */
export const queryOrgTokenData = () => {
  const hostnameFirst = getOrgNameFromCurrentUrl();
  const orgName =
    hostnameFirst && hostnameFirst === "localhost"
      ? defaultOrgName
      : hostnameFirst;
  const {
    data: { getOrgByDomain: orgQuery } = {},
    loading: getOrgDomainLoading,
  } = useQuery(GET_ORG_PUBLIC_DATA, {
    variables: {
      name: orgName,
    },
  });

  const [therapist] = useLazyQuery(tokenValidationQuery["therapist"]);
  const [patient] = useLazyQuery(tokenValidationQuery["patient"]);
  const [admin] = useLazyQuery(tokenValidationQuery["admin"]);
  const getTokenQuery = { therapist, patient, admin };
  return { orgQuery, getOrgDomainLoading, getTokenQuery };
};
